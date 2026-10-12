<?php
ini_set('memory_limit', '1024M');
require_once __DIR__ . '/slice_helper.php';

$src = 'C:/myfiles/docs/smarttouch/services';

// 1. WEB & APP DEVELOPMENT (1920x5250)
echo "=== Processing Web & App Development ===\n";
$webFile = "$src/Web & App Development.png";
// Hero banner
findAndCropPhoto($webFile, 500, 1000, 150, 1770, 'web-app-hero.png');
// Web Dev - Website Development photo
findAndCropPhoto($webFile, 950, 1500, 150, 750, 'web-dev-website.png');
// Web Dev - Ecommerce Development photo
findAndCropPhoto($webFile, 1400, 1950, 150, 750, 'web-dev-ecommerce.png');
// App Dev - Mobile App graphic
findAndCropPhoto($webFile, 2100, 2600, 150, 750, 'web-dev-mobile.png');
// App Dev - UI/UX Design graphic
findAndCropPhoto($webFile, 2550, 3100, 150, 750, 'web-dev-uiux.png');
// Why Us team photo
findAndCropPhoto($webFile, 3200, 3900, 1150, 1750, 'web-dev-why-us.png');
// CTA Banner (laptop in hand)
findAndCropPhoto($webFile, 3850, 4450, 150, 1770, 'web-dev-cta-banner.png');


// 2. SEO SERVICES (1920x7585)
echo "\n=== Processing SEO Services ===\n";
$seoFile = "$src/SEO Services.png";
// Hero banner with search bar
findAndCropPhoto($seoFile, 400, 1100, 150, 1770, 'seo-hero.png');
// Split card 1: SEO Analysis
findAndCropPhoto($seoFile, 1600, 2350, 150, 750, 'seo-analysis.png');
// Split card 2: On-Page & Technical
findAndCropPhoto($seoFile, 2350, 3050, 150, 750, 'seo-onpage.png');
// Split card 3: Content SEO
findAndCropPhoto($seoFile, 3050, 3750, 150, 750, 'seo-content.png');
// Split card 4: Ecommerce SEO
findAndCropPhoto($seoFile, 3750, 4450, 150, 750, 'seo-ecommerce.png');
// Split card 5: Integrated SEO Strategy
findAndCropPhoto($seoFile, 4450, 5150, 150, 750, 'seo-integrated.png');
// Split card 6: ASO
findAndCropPhoto($seoFile, 5150, 5850, 150, 750, 'seo-aso.png');
// Split card 7: Generative AI
findAndCropPhoto($seoFile, 5850, 6550, 150, 750, 'seo-genai.png');
// Why Us laptop photo
findAndCropPhoto($seoFile, 6000, 6800, 1150, 1750, 'seo-why-us.png');
// CTA banner (Google search)
findAndCropPhoto($seoFile, 7050, 7500, 150, 1770, 'seo-cta-banner.png');


// 3. GROWTH MARKETING (1920x7028)
echo "\n=== Processing Growth Marketing ===\n";
$growthFile = "$src/Growth Marketing.png";
// Hero banner
findAndCropPhoto($growthFile, 400, 1100, 150, 1770, 'growth-hero.png');
// Google Ads card image
findAndCropPhoto($growthFile, 1400, 2100, 150, 750, 'growth-google-ads.png');
// Meta card image
findAndCropPhoto($growthFile, 2100, 2800, 150, 750, 'growth-meta.png');
// Programmatic card photo
findAndCropPhoto($growthFile, 2800, 3500, 150, 750, 'growth-programmatic.png');
// Retargeting card photo
findAndCropPhoto($growthFile, 3500, 4200, 150, 750, 'growth-retargeting.png');
// Why Us laptop photo
findAndCropPhoto($growthFile, 5600, 6300, 1150, 1750, 'growth-why-us.png');
// CTA banner
findAndCropPhoto($growthFile, 6250, 6750, 150, 1770, 'growth-cta-banner.png');


// 4. SUBSCRIPTION MARKETING PLANS (1920x3635)
echo "\n=== Processing Subscription Marketing Plans ===\n";
$subFile = "$src/Subscription Marketing Plans.png";
// Hero banner
findAndCropPhoto($subFile, 400, 1100, 150, 1770, 'subscription-hero.png');
// CTA banner (silhouettes)
findAndCropPhoto($subFile, 2800, 3450, 150, 1770, 'subscription-cta-banner.png');


// 5. HOSTING & INFRASTRUCTURE (1920x7341)
echo "\n=== Processing Hosting & Infrastructure ===\n";
$hostingFile = "$src/hosting.png";
// Hero banner (server farm)
findAndCropPhoto($hostingFile, 300, 1000, 150, 1770, 'hosting-hero.png');
// Security server corridor photo
findAndCropPhoto($hostingFile, 3600, 4600, 150, 750, 'hosting-security.png');
// CTA banner (server technician)
findAndCropPhoto($hostingFile, 6500, 7200, 150, 1770, 'hosting-cta-banner.png');


// 6. CRM & MARKETING AUTOMATION (1920x6210)
echo "\n=== Processing CRM & Marketing Automation ===\n";
$crmFile = "$src/CRM.png";
// Hero banner
findAndCropPhoto($crmFile, 400, 1100, 150, 1770, 'crm-hero.png');
// Email automation photo
findAndCropPhoto($crmFile, 2300, 3000, 150, 750, 'crm-email.png');
// WhatsApp automation photo
findAndCropPhoto($crmFile, 3000, 3700, 150, 750, 'crm-whatsapp.png');
// Customer journey automation photo
findAndCropPhoto($crmFile, 3700, 4400, 150, 750, 'crm-journey.png');
// Why Us laptop photo
findAndCropPhoto($crmFile, 4800, 5600, 1150, 1750, 'crm-why-us.png');
// CTA banner
findAndCropPhoto($crmFile, 5450, 6050, 150, 1770, 'crm-cta-banner.png');


// 7. MARKETING TECHNOLOGY (1920x5262)
echo "\n=== Processing Marketing Technology ===\n";
$martechFile = "$src/Marketing Technolgy.png";
// Hero banner
findAndCropPhoto($martechFile, 300, 1000, 150, 1770, 'martech-hero.png');
// Marketing Automation Tools photo
findAndCropPhoto($martechFile, 1150, 1850, 150, 750, 'martech-tools.png');
// Data Integrations photo
findAndCropPhoto($martechFile, 1850, 2550, 150, 750, 'martech-data.png');
// Why Us team photo
findAndCropPhoto($martechFile, 3800, 4600, 1150, 1750, 'martech-why-us.png');
// CTA banner
findAndCropPhoto($martechFile, 4550, 5150, 150, 1770, 'martech-cta-banner.png');


// 8. AI & DATA ANALYTICS (1920x5496)
echo "\n=== Processing AI & Data Analytics ===\n";
$aiFile = "$src/Ai.png";
// Hero banner
findAndCropPhoto($aiFile, 300, 1000, 150, 1770, 'ai-hero.png');
// AI Content Generation photo
findAndCropPhoto($aiFile, 1100, 1850, 150, 750, 'ai-content.png');
// Predictive Marketing photo
findAndCropPhoto($aiFile, 1850, 2600, 150, 750, 'ai-predictive.png');
// Customer Segmentation graphic
findAndCropPhoto($aiFile, 2600, 3350, 150, 750, 'ai-segmentation.png');
// CTA banner
findAndCropPhoto($aiFile, 4700, 5350, 150, 1770, 'ai-cta-banner.png');

echo "\nAll crops completed!\n";
