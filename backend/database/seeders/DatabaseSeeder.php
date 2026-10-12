<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Inquiry;
use App\Models\Page;
use App\Models\Post;
use App\Models\SeoMetadata;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Roles & Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@smarttouch.com'],
            [
                'name' => 'Agency Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        $contentUser = User::firstOrCreate(
            ['email' => 'content@smarttouch.com'],
            [
                'name' => 'Content Specialist',
                'password' => Hash::make('password123'),
                'role' => 'content',
            ]
        );

        $seoUser = User::firstOrCreate(
            ['email' => 'seo@smarttouch.com'],
            [
                'name' => 'SEO Strategist',
                'password' => Hash::make('password123'),
                'role' => 'seo',
            ]
        );

        // 2. Seed Services
        $services = [
            [
                'title' => ['en' => 'Web & App Development', 'ar' => 'تطوير تطبيقات الويب والجوال'],
                'slug' => ['en' => 'web-app-development', 'ar' => 'web-app-development'],
                'short_description' => [
                    'en' => 'High-performance web and mobile solutions engineered with Next.js, React Native, and Laravel 12.',
                    'ar' => 'حلول برمجية متطورة للويب والجوال مبنية بأحدث أطر العمل العالمية مع أداء استثنائي وتصميم عصري.'
                ],
                'full_content' => [
                    'en' => 'We engineer high-converting web and mobile applications with enterprise architecture, blazing speeds, fluid animations, and robust backend APIs. From custom SaaS platforms to client-facing iOS/Android apps, our solutions scale seamlessly.',
                    'ar' => 'نقوم بهندسة وتطوير تطبيقات ويب وجوال عالية التحويل بهندسة متطورة وسرعات فائقة وتأثيرات بصرية انسيابية وواجهات برمجية قوية تتكيف وتنمو مع توسع أعمالك.'
                ],
                'icon' => 'Code2',
                'features' => [
                    ['en' => 'Next.js 16 & React Architecture', 'ar' => 'هندسة معمارية متطورة باستخدام Next.js'],
                    ['en' => 'Cross-Platform iOS & Android', 'ar' => 'تطبيقات جوال متوافقة مع كافة الأجهزة'],
                    ['en' => 'Enterprise Laravel 12 API', 'ar' => 'واجهات برمجية آمنة مبنية بـ Laravel 12'],
                    ['en' => 'Sub-second Response Times', 'ar' => 'سرعة استجابة فائقة وأداء معتمد عالمياً'],
                ],
                'sort_order' => 1,
            ],
            [
                'title' => ['en' => 'Web Development', 'ar' => 'تطوير المواقع الإلكترونية'],
                'slug' => ['en' => 'web-development', 'ar' => 'tatweer-al-mawaqia'],
                'short_description' => [
                    'en' => 'Ultra-fast, responsive, modern web applications built on Next.js and Laravel.',
                    'ar' => 'تطبيقات ويب فائقة السرعة ومتجاوبة ومبنية بأحدث تقنيات Next.js و Laravel.'
                ],
                'full_content' => [
                    'en' => 'We engineer high-converting web applications with enterprise architecture, blazing speeds, fluid animations, and robust backend APIs.',
                    'ar' => 'نقوم بهندسة وتطوير تطبيقات ويب عالية التحويل بهندسة متطورة وسرعات فائقة وتأثيرات بصرية انسيابية وواجهات برمجية قوية.'
                ],
                'icon' => 'Code2',
                'features' => [
                    ['en' => 'Custom Architecture & API', 'ar' => 'هندسة معمارية مخصصة وواجهات برمجية'],
                    ['en' => 'Headless CMS Integration', 'ar' => 'تكامل مع أنظمة إدارة المحتوى المتقدمة'],
                    ['en' => 'Performance & Core Web Vitals', 'ar' => 'أداء فائق وتحسين مؤشرات الويب الحيوية'],
                ],
                'sort_order' => 2,
            ],
            [
                'title' => ['en' => 'Mobile App Development', 'ar' => 'تطوير تطبيقات الجوال'],
                'slug' => ['en' => 'mobile-app-development', 'ar' => 'tatweer-tatbiqat-al-jawwal'],
                'short_description' => [
                    'en' => 'Native and cross-platform mobile apps delivering seamless iOS and Android user experiences.',
                    'ar' => 'تطبيقات جوال لأنظمة iOS وأندرويد تقدم تجارب مستخدم استثنائية وسلسة.'
                ],
                'full_content' => [
                    'en' => 'Turn your product vision into reality with intuitive, scalable mobile apps that your users will fall in love with.',
                    'ar' => 'حول رؤيتك إلى واقع ملموس مع تطبيقات هواتف ذكية تفاعلية وقابلة للتوسع تنال إعجاب عملائك.'
                ],
                'icon' => 'Smartphone',
                'features' => [
                    ['en' => 'iOS & Android Native Performance', 'ar' => 'أداء متميز على iOS وأندرويد'],
                    ['en' => 'Secure Cloud Backend Sync', 'ar' => 'مزامنة سحابية آمنة في الوقت الفعلي'],
                    ['en' => 'App Store & Google Play Launch', 'ar' => 'نشر وتجهيز المتاجر الرسمية'],
                ],
                'sort_order' => 2,
            ],
            [
                'title' => ['en' => 'SEO Marketing & Growth', 'ar' => 'التسويق وتحسين محركات البحث'],
                'slug' => ['en' => 'seo-marketing', 'ar' => 'tahsin-muharrikat-al-bahth'],
                'short_description' => [
                    'en' => 'Data-driven SEO campaigns to rank #1 on Google and capture qualified organic leads.',
                    'ar' => 'حملات سيو مبنية على البيانات لتصدر المرتبة الأولى على جوجل وجذب عملاء مهتمين.'
                ],
                'full_content' => [
                    'en' => 'Comprehensive technical SEO, keyword dominance, schema optimization, and high-authority link acquisition in English & Arabic.',
                    'ar' => 'تحسين تقني شامل لمحركات البحث وهيمنة الكلمات المفتاحية وتحسين البيانات المنظمة وبناء الروابط باللغتين العربية والإنجليزية.'
                ],
                'icon' => 'TrendingUp',
                'features' => [
                    ['en' => 'Keyword Dominance & Clustering', 'ar' => 'استراتيجية الكلمات المفتاحية المستهدفة'],
                    ['en' => 'Technical Audit & Schema Markup', 'ar' => 'تدقيق تقني وتنسيق البيانات المنظمة'],
                    ['en' => 'Bilingual Content Optimization', 'ar' => 'تحسين المحتوى المزدوج باللغتين'],
                ],
                'sort_order' => 3,
            ],
            [
                'title' => ['en' => 'Creative Branding & Design', 'ar' => 'الهوية البصرية والتصميم الإبداعي'],
                'slug' => ['en' => 'creative-branding', 'ar' => 'al-hawiya-al-basariya'],
                'short_description' => [
                    'en' => 'Distinctive visual identity, logos, brand guidelines, and UI/UX design that elevate your presence.',
                    'ar' => 'هوية بصرية مميزة وشعارات وأدلة استخدام وتصاميم واجهات ترتقي بعلامتك التجارية.'
                ],
                'full_content' => [
                    'en' => 'We shape memorable brand personas that communicate credibility, vision, and market leadership across every digital touchpoint.',
                    'ar' => 'نصيغ هويات تجارية لا تُنسى تعكس الثقة والريادة في كل نقطة اتصال رقمية مع الجمهور.'
                ],
                'icon' => 'Palette',
                'features' => [
                    ['en' => 'Logo & Brand Identity Guidelines', 'ar' => 'شعار متكامل ودليل الهوية التجارية'],
                    ['en' => 'UI/UX Interactive Prototypes', 'ar' => 'تصاميم واجهات وتجارب مستخدم تفاعلية'],
                    ['en' => 'Marketing Collaterals', 'ar' => 'مواد إعلانية وتسويقية مطبوعة ورقمية'],
                ],
                'sort_order' => 4,
            ]
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(
                ['slug->en' => $srv['slug']['en']],
                $srv
            );
        }

        // 3. Seed Dynamic Pages
        $pages = [
            [
                'title' => ['en' => 'About SmartTouch', 'ar' => 'من نحن - سمارت تاتش'],
                'slug' => ['en' => 'about-us', 'ar' => 'man-nahnu'],
                'template' => 'about',
                'content' => [
                    'en' => 'SmartTouch is a forward-thinking digital advertising and technology agency. We partner with trailblazing brands to build transformative web, mobile, and marketing experiences.',
                    'ar' => 'سمارت تاتش هي وكالة رائدة في مجال الدعاية والتسويق الرقمي وتكنولوجيا الويب. نتشارك مع العلامات التجارية الطموحة لبناء تجارب رقمية وتسويقية متميزة.'
                ],
            ],
            [
                'title' => ['en' => 'Privacy Policy', 'ar' => 'سياسة الخصوصية'],
                'slug' => ['en' => 'privacy-policy', 'ar' => 'siyasat-al-khususiya'],
                'template' => 'default',
                'content' => [
                    'en' => 'At SmartTouch, we prioritize your data security and privacy. This policy outlines how we handle, store, and protect your information.',
                    'ar' => 'في سمارت تاتش، نولي سرية وأمان بياناتكم أهمية قصوى. توضح هذه الوثيقة سياسات جمع البيانات وحمايتها.'
                ],
            ],
            [
                'title' => ['en' => 'Terms of Service', 'ar' => 'الشروط والأحكام'],
                'slug' => ['en' => 'terms-conditions', 'ar' => 'al-shuroot-wal-ahkam'],
                'template' => 'default',
                'content' => [
                    'en' => 'Welcome to SmartTouch. By accessing our services, websites, or software solutions, you agree to our standard contractual terms.',
                    'ar' => 'مرحباً بكم في سمارت تاتش. باستخدامكم لخدماتنا ومواقعنا أو حلولنا البرمجية، فإنكم توافقون على الشروط والأحكام التعاقدية.'
                ],
            ],
        ];

        foreach ($pages as $pg) {
            Page::updateOrCreate(
                ['slug->en' => $pg['slug']['en']],
                $pg
            );
        }

        // 4. Seed Blog Categories & Posts
        $catTech = Category::updateOrCreate(
            ['slug->en' => 'technology'],
            [
                'name' => ['en' => 'Technology & Development', 'ar' => 'التكنولوجيا والتطوير'],
                'slug' => ['en' => 'technology', 'ar' => 'al-tiqniya-wal-tatweer'],
            ]
        );

        $catMarketing = Category::updateOrCreate(
            ['slug->en' => 'marketing'],
            [
                'name' => ['en' => 'Marketing & SEO', 'ar' => 'التسويق وسيو'],
                'slug' => ['en' => 'marketing', 'ar' => 'al-tasweeq-wal-seo'],
            ]
        );

        $posts = [
            [
                'user_id' => $contentUser->id,
                'category_id' => $catTech->id,
                'title' => [
                    'en' => 'The Latest Innovation in Web 2026',
                    'ar' => 'أحدث الابتكارات في عالم الويب 2026'
                ],
                'slug' => [
                    'en' => 'the-latest-innovation-in-web-2026',
                    'ar' => 'the-latest-innovation-in-web-2026'
                ],
                'summary' => [
                    'en' => 'Discover the breakthrough technologies reshaping web development in 2026: AI rendering engines, edge orchestration, and fluid fluid interaction design.',
                    'ar' => 'اكتشف أحدث التقنيات الثورية التي تعيد صياغة تطوير مواقع الويب في 2026: محركات المعالجة الذكية، والتفاعل الانسيابي فائق السرعة.'
                ],
                'content' => [
                    'en' => 'The web in 2026 is defined by instantaneous responsiveness, generative user experiences, and seamless headless synchronization. In this deep dive, our technical directors dissect how cutting-edge stacks combining Next.js 16 and Laravel 12 are powering the next generation of scalable web applications.',
                    'ar' => 'يشهد عالم الويب في 2026 ثورة حقيقية في سرعة الاستجابة اللحظية والتجارب الرقمية المولدة بالذكاء الاصطناعي. يستعرض فريقنا الفني كيف تضع بنيات Next.js و Laravel 12 معايير جديدة تماماً لكبرى المؤسسات العالمية.'
                ],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'user_id' => $contentUser->id,
                'category_id' => $catMarketing->id,
                'title' => [
                    'en' => 'Search Engine Dominance: Next-Gen SEO Strategies in 2026',
                    'ar' => 'الهيمنة على محركات البحث: استراتيجيات تحسين السيو في 2026'
                ],
                'slug' => [
                    'en' => 'next-gen-seo-strategies-2026',
                    'ar' => 'istratijiyat-al-seo-al-haditha-2026'
                ],
                'summary' => [
                    'en' => 'Explore how AI-driven search, semantic clustering, and Core Web Vitals dictate top rankings.',
                    'ar' => 'اكتشف كيف يتحكم البحث المعتمد على الذكاء الاصطناعي ومؤشرات الأداء في تصدر النتائج الأولى.'
                ],
                'content' => [
                    'en' => 'Organic search has evolved beyond simple keyword densities. Search algorithms now inspect intent, user interaction momentum, and instant mobile responsiveness. In this article we outline actionable frameworks for achieving top visibility...',
                    'ar' => 'تطور البحث الطبيعي ليتجاوز مجرد تكرار الكلمات المفتاحية. أصبحت خوارزميات البحث تركز على نية الباحث وسلاسة التفاعل وسرعة الأداء على الجوال. نستعرض هنا أهم الاستراتيجيات العملية لتصدر نتائج البحث...'
                ],
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'user_id' => $contentUser->id,
                'category_id' => $catTech->id,
                'title' => [
                    'en' => 'Why Fast Next.js & Laravel Stacks Are Dominating Enterprise Web',
                    'ar' => 'لماذا تتصدر منظومة Next.js و Laravel تطوير مواقع الشركات الكبرى'
                ],
                'slug' => [
                    'en' => 'nextjs-laravel-enterprise-stack',
                    'ar' => 'nextjs-laravel-lil-sharikat'
                ],
                'summary' => [
                    'en' => 'Combining modern headless frontend rendering with a battle-tested Laravel 12 API backend.',
                    'ar' => 'الجمع بين واجهات Next.js المتطورة وسرعة استجابتها مع قوة وأمان واجهات برمجة تطبيقات Laravel 12.'
                ],
                'content' => [
                    'en' => 'Modern digital experiences demand fluid 60fps animations, zero-lag transitions, and rock-solid relational data integrity. Coupling Next.js App Router with Laravel 12 provides the ultimate synergy for speed, security, and developer joy...',
                    'ar' => 'تتطلب التجارب الرقمية الحديثة حركات انسيابية فائقة وسرعة انتقال سلسة مع الحفاظ على موثوقية وأمان البيانات. يشكل دمج Next.js مع Laravel 12 الحل الأمثل لتحقيق السرعة والأمان...'
                ],
                'status' => 'published',
                'published_at' => now(),
            ]
        ];

        foreach ($posts as $pst) {
            Post::updateOrCreate(
                ['slug->en' => $pst['slug']['en']],
                $pst
            );
        }

        // 5. Seed Sample Inquiries
        $webService = Service::where('slug->en', 'web-development')->first();
        $seoService = Service::where('slug->en', 'seo-marketing')->first();

        Inquiry::create([
            'service_id' => $webService ? $webService->id : null,
            'service_name' => 'Web Development',
            'name' => 'Sarah Al-Mansoor',
            'email' => 'sarah@almansoorgroup.com',
            'phone' => '+966 50 123 4567',
            'company' => 'Al-Mansoor Retail Group',
            'budget_range' => '$10k - $25k',
            'message' => 'We require a high-end bilingual ecommerce and portal revamp with custom Arabic branding and Next.js performance.',
            'status' => 'new',
            'locale' => 'ar',
            'ip_address' => '127.0.0.1',
        ]);

        Inquiry::create([
            'service_id' => $seoService ? $seoService->id : null,
            'service_name' => 'SEO Marketing & Growth',
            'name' => 'David Miller',
            'email' => 'david@horizonfintech.io',
            'phone' => '+1 (555) 321-9876',
            'company' => 'Horizon FinTech',
            'budget_range' => '+$25k',
            'message' => 'Looking for an enterprise technical SEO overhaul and multilingual content optimization for our Middle East launch.',
            'status' => 'contacted',
            'admin_notes' => 'Introductory call scheduled for Tuesday 10am.',
            'locale' => 'en',
            'ip_address' => '127.0.0.1',
        ]);
    }
}
