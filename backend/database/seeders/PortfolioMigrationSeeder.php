<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use App\Models\SeoMetadata;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioMigrationSeeder extends Seeder
{
    public function run(): void
    {
        $pdo = DB::connection()->getPdo();

        // 1. Fetch services mapping
        $servicesMap = [];
        $catMap = [
            1 => 'branding',      // Brand Identity
            2 => 'photo',         // Photography
            3 => 'branding',      // Letterheads & Envelopes
            4 => 'brochure',      // Flyer Design
            5 => 'branding',      // Graphic Design
            6 => 'brochure',      // Brochure Design
            7 => 'uiux',          // Interactive Designs
            8 => 'packaging',     // Product Packaging Services
            9 => 'branding',      // Banner Design
            10 => 'web',          // Web Design
            11 => 'app',          // Mobile Application
            12 => 'web',          // E-Commerce Web Design
            13 => 'web',          // SEO
            14 => 'pr',           // Social Media Marketing
            15 => 'pr',           // Electronic Digital Marketing
            16 => 'content',      // Content Writing
        ];

        $svcRows = $pdo->query("SELECT * FROM smtouchnew.wp_smart_services")->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($svcRows as $s) {
            $servicesMap[$s['id']] = $s;
        }

        // 2. Fetch clients mapping
        $clientsMap = [];
        $clientRows = $pdo->query("SELECT * FROM smtouchnew.wp_smart_clients")->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($clientRows as $c) {
            $clientsMap[$c['id']] = $c;
        }

        // 3. Fetch all portfolios from smtouchnew
        $portfolios = $pdo->query("SELECT * FROM smtouchnew.wp_smart_portfolio ORDER BY id ASC")->fetchAll(\PDO::FETCH_ASSOC);
        $total = count($portfolios);
        $this->command->info("Migrating {$total} portfolios from smtouchnew.wp_smart_portfolio...");

        $publicBase = base_path('../frontend/public');
        $imageFolders = [
            'portfolio-banners',
            'portfolio-thumb',
            'portfolio-carousel',
            'portfolio',
            'client-thumb'
        ];

        $resolveImg = function ($filename) use ($publicBase, $imageFolders) {
            if (empty($filename)) return null;
            $filename = trim($filename);
            foreach ($imageFolders as $f) {
                if (file_exists("$publicBase/images/portfolio/$f/$filename")) {
                    return "/images/portfolio/$f/$filename";
                }
            }
            if (file_exists("$publicBase/images/portfolio/$filename")) {
                return "/images/portfolio/$filename";
            }
            return null;
        };

        $cleanHtml = function ($html) {
            if (empty($html)) return null;
            $html = stripslashes($html);
            $html = html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            $html = str_replace(["\\'", '\\"'], ["'", '"'], $html);
            return trim($html);
        };

        foreach ($portfolios as $idx => $p) {
            $pImages = @unserialize($p['portfolio_images']) ?: [];
            $cImages = @unserialize($p['carousel_images']) ?: [];
            $metas = @unserialize($p['metas']) ?: [];
            $colors = @unserialize($p['color_params']) ?: [];

            // Services & Tags
            $sIds = array_filter(explode('-', trim($p['services'] ?? '', '-')));
            $tagsEn = [];
            $tagsAr = [];
            $primaryCategory = 'web';

            if (in_array('10', $sIds) || in_array('12', $sIds)) {
                $primaryCategory = 'web';
            } elseif (in_array('1', $sIds)) {
                $primaryCategory = 'branding';
            } elseif (in_array('2', $sIds)) {
                $primaryCategory = 'photo';
            } elseif (in_array('8', $sIds)) {
                $primaryCategory = 'packaging';
            } elseif (in_array('11', $sIds)) {
                $primaryCategory = 'app';
            } elseif (in_array('6', $sIds) || in_array('4', $sIds)) {
                $primaryCategory = 'brochure';
            } elseif (in_array('16', $sIds)) {
                $primaryCategory = 'content';
            } elseif (in_array('14', $sIds) || in_array('15', $sIds)) {
                $primaryCategory = 'pr';
            } elseif (!empty($sIds)) {
                $firstId = reset($sIds);
                $primaryCategory = $catMap[$firstId] ?? 'web';
            }

            foreach ($sIds as $sid) {
                if (isset($servicesMap[$sid])) {
                    $tagsEn[] = $servicesMap[$sid]['title'];
                    $tagsAr[] = $servicesMap[$sid]['title_ar'] ?: $servicesMap[$sid]['title'];
                }
            }

            // Client
            $client = $clientsMap[$p['client_id']] ?? null;
            $clientNameEn = $client ? $client['title'] : ($p['title'] ?? null);
            $clientNameAr = $client ? ($client['title_ar'] ?: $client['title']) : ($p['title_ar'] ?: $p['title']);

            // Images
            $mainBanner = $resolveImg($pImages['main_banner'] ?? null);
            $thumbBanner = $resolveImg($pImages['thumb_banner'] ?? null);
            $midBanner = $resolveImg($pImages['mid_banner'] ?? null);
            $bottomBanner = $resolveImg($pImages['bottom_banner'] ?? null);

            $gallery = [];
            if (is_array($cImages)) {
                foreach ($cImages as $ci) {
                    $resolved = $resolveImg($ci);
                    if ($resolved) {
                        $gallery[] = $resolved;
                    }
                }
            }

            $heroImage = $mainBanner ?: ($thumbBanner ?: ($gallery[0] ?? null));
            $thumbImage = $thumbBanner ?: ($heroImage ?: ($gallery[0] ?? null));
            $workExpImage = $midBanner ?: $heroImage;
            $showcaseImage = $bottomBanner ?: ($gallery[0] ?? $heroImage);

            // Shanifi custom mockups priority if available
            if ($p['alias'] === 'shanifi') {
                if (file_exists("$publicBase/images/portfolio/shanifi-hero-mockup@2x.png")) {
                    $heroImage = '/images/portfolio/shanifi-hero-mockup@2x.png';
                }
                if (file_exists("$publicBase/images/portfolio/shanifi-donuts@2x.png")) {
                    $workExpImage = '/images/portfolio/shanifi-donuts@2x.png';
                }
                if (file_exists("$publicBase/images/portfolio/shanifi-showcase-collage@2x.png")) {
                    $showcaseImage = '/images/portfolio/shanifi-showcase-collage@2x.png';
                }
            }

            // Brand color
            $hex = null;
            if (!empty($colors['color'])) {
                $hex = '#' . ltrim($colors['color'], '#');
            }

            // Excerpts / Intro
            $introEn = $cleanHtml($p['excerpt']);
            if (empty($introEn)) {
                $descText = strip_tags($cleanHtml($p['content_description']) ?? '');
                $introEn = mb_substr($descText, 0, 180) . (mb_strlen($descText) > 180 ? '...' : '');
            }
            $introAr = $cleanHtml($p['excerpt_ar']);
            if (empty($introAr)) {
                $descTextAr = strip_tags($cleanHtml($p['content_description_ar']) ?? '');
                $introAr = mb_substr($descTextAr, 0, 180) . (mb_strlen($descTextAr) > 180 ? '...' : '');
            }

            // Next project calculation (circular)
            $nextIdx = ($idx + 1) % $total;
            $nextP = $portfolios[$nextIdx];
            $nextSIds = array_filter(explode('-', trim($nextP['services'] ?? '', '-')));
            $nextCategoryTag = 'Web Development';
            if (!empty($nextSIds)) {
                $firstNextId = reset($nextSIds);
                $nextCategoryTag = $servicesMap[$firstNextId]['title'] ?? 'Web Development';
            }

            $nextProject = [
                'slug' => $nextP['alias'],
                'title' => [
                    'en' => $nextP['title'],
                    'ar' => $nextP['title_ar'] ?: $nextP['title']
                ],
                'tag' => $nextCategoryTag
            ];

            // Titles
            $titleEn = $p['title'];
            $titleAr = $p['title_ar'] ?: $p['title'];

            // Slugs
            $slugEn = $p['alias'];
            $slugAr = $p['alias'];

            // Save or Update Portfolio
            $portfolio = Portfolio::updateOrCreate(
                ['slug->en' => $slugEn],
                [
                    'slug' => ['en' => $slugEn, 'ar' => $slugAr],
                    'title' => ['en' => $titleEn, 'ar' => $titleAr],
                    'client_name' => ['en' => $clientNameEn, 'ar' => $clientNameAr],
                    'category' => $primaryCategory,
                    'tags' => ['en' => $tagsEn, 'ar' => $tagsAr],
                    'intro' => ['en' => $introEn, 'ar' => $introAr],
                    'hero_image' => $heroImage,
                    'thumbnail_image' => $thumbImage,
                    'company_background' => [
                        'en' => $cleanHtml($p['content_description']) ?: $introEn,
                        'ar' => $cleanHtml($p['content_description_ar']) ?: $introAr
                    ],
                    'work_experience_image' => $workExpImage,
                    'work_experience' => [
                        'en' => $cleanHtml($p['work_experience']) ?: $introEn,
                        'ar' => $cleanHtml($p['work_experience_ar']) ?: $introAr
                    ],
                    'showcase_image' => $showcaseImage,
                    'gallery_images' => $gallery,
                    'design_concept' => [
                        'en' => $cleanHtml($p['design_concept']) ?: $introEn,
                        'ar' => $cleanHtml($p['design_concept_ar']) ?: $introAr
                    ],
                    'next_project' => $nextProject,
                    'brand_color' => $hex,
                    'year_completed' => !empty($p['year_completed']) ? intval($p['year_completed']) : null,
                    'sort_order' => $idx + 1,
                    'is_published' => ($p['status'] == 1),
                ]
            );

            // Populate SEO Metadata
            $metaTitleEn = !empty($metas['meta_page_title']) ? $metas['meta_page_title'] : "{$titleEn} | Portfolio | Smart Touch";
            $metaTitleAr = !empty($metas['meta_page_title_ar']) ? $metas['meta_page_title_ar'] : "{$titleAr} | سابقة الأعمال | سمارت تاتش";
            $metaDescEn = !empty($metas['meta_page_description']) ? $metas['meta_page_description'] : $introEn;
            $metaDescAr = !empty($metas['meta_page_description_ar']) ? $metas['meta_page_description_ar'] : $introAr;

            SeoMetadata::updateOrCreate(
                [
                    'entity_type' => 'portfolio',
                    'entity_id' => $portfolio->id,
                ],
                [
                    'meta_title' => ['en' => $metaTitleEn, 'ar' => $metaTitleAr],
                    'meta_description' => ['en' => $metaDescEn, 'ar' => $metaDescAr],
                    'og_title' => ['en' => $metaTitleEn, 'ar' => $metaTitleAr],
                    'og_description' => ['en' => $metaDescEn, 'ar' => $metaDescAr],
                    'og_image' => $heroImage,
                    'canonical_url' => "https://smarttouch.me/en/portfolio/{$slugEn}.html",
                    'focus_keywords' => ['en' => array_slice($tagsEn, 0, 3), 'ar' => array_slice($tagsAr, 0, 3)],
                    'indexable' => true,
                ]
            );
        }

        $this->command->info("All {$total} portfolios and their SEO metadata successfully migrated!");
    }
}
