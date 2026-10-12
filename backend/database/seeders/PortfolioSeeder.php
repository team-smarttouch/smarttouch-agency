<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $portfolios = [
            [
                'slug' => ['en' => 'shanifi', 'ar' => 'shanifi'],
                'title' => ['en' => 'Shanifi', 'ar' => 'شركة الشنيفي للتجارة'],
                'client_name' => ['en' => 'Ibrahim Al-Shanifi for Trading and Contracting Company', 'ar' => 'شركة إبراهيم الشنيفي للتجارة والمقاولات'],
                'category' => 'web',
                'tags' => [
                    'en' => ['Content Writing', 'Web Design'],
                    'ar' => ['كتابة المحتوى', 'تصميم الويب']
                ],
                'intro' => [
                    'en' => 'Ibrahim Al-Shanifi for Trading and Contracting Company was established in 1977 by Mr. Ibrahim Al-Shanifi.',
                    'ar' => 'تأسست شركة إبراهيم الشنيفي للتجارة والمقاولات في عام 1977 على يد الأستاذ إبراهيم الشنيفي لتكون صرحاً رائداً في توزيع الأغذية والحلويات بالمملكة.'
                ],
                'hero_image' => '/images/portfolio/shanifi-hero-mockup@2x.png',
                'company_background' => [
                    'en' => "Ibrahim Al-Shanifi for Trading and Contracting Company was established in 1977 by Mr. Ibrahim Al-Shanifi, and since then it has been growing and expanding to become one of the premier food and confectionery distribution companies in the Kingdom of Saudi Arabia. Driven by an uncompromising commitment to quality and hygiene, the company represents some of the world's most beloved brands across retail and wholesale channels.\n\nIbrahim Al-Shanifi for Trading and Contracting Company represents over 40 leading international confectionery and biscuit brands, delivering fresh products across thousands of supermarket shelves, retail outlets, and partner stores nationwide.",
                    'ar' => "تأسست شركة إبراهيم الشنيفي للتجارة والمقاولات في عام 1977 على يد الأستاذ إبراهيم الشنيفي، ومنذ ذلك الحين واصلت الشركة نموها وتوسعها لتصبح واحدة من كبرى شركات توزيع الأغذية والحلويات في المملكة العربية السعودية. بفضل الالتزام الصارم بأعلى معايير الجودة والسلامة الغذائية، تمثل الشركة نخبة من أشهر العلامات التجارية العالمية في قطاع التجزئة والجملة.\n\nتمثل شركة إبراهيم الشنيفي أكثر من 40 علامة تجارية عالمية رائدة في مجال الحلويات والبسكويت، حيث تصل منتجاتها إلى آلاف أرفف السوبرماركت ومنافذ البيع بالتجزئة والمتاجر الشريكة في جميع أنحاء المملكة."
                ],
                'work_experience_image' => '/images/portfolio/shanifi-donuts@2x.png',
                'work_experience' => [
                    'en' => "Smart Touch undertook the complete redesign and digital modernization of Ibrahim Al-Shanifi for Trading. Our team worked in close collaboration with the company's executive leadership to formulate a cohesive digital identity that reflects four decades of industry leadership, reliability, and heritage in confectionery distribution.\n\nThe challenge was to create a modern web portal that showcases both the company's distinguished corporate profile and its expansive brand portfolio of international confectionery partners, while ensuring high performance, responsive layout, and seamless navigation.\n\nOur creative team developed custom graphic assets, corporate icon sets, and bilingual content in both Arabic and English. The product architecture was structured logically into categories—ranging from chocolates, biscuits, candies, and wafers—enabling B2B clients and supermarket retail chains to explore product specifications with ease.\n\nThe result is a responsive, modern corporate web portal that strengthens Ibrahim Al-Shanifi's digital footprint, reinforces partner trust, and provides an authoritative digital showcase for distributors and retail networks across Saudi Arabia and the Gulf.",
                    'ar' => "تولت سمارت تاتش مهمة التطوير الرقمي وإعادة التصميم الشامل لشركة إبراهيم الشنيفي للتجارة. عمل فريقنا بالتعاون الوثيق مع القيادة التنفيذية للشركة لصياغة هوية رقمية متماسكة تعكس أربعة عقود من الريادة والتميز والموثوقية في توزيع الحلويات والأغذية.\n\nتمثل التحدي في إنشاء بوابة ويب حديثة تبرز التاريخ المؤسسي العريق للشركة إلى جانب محفظتها الواسعة من العلامات التجارية العالمية، مع ضمان أعلى سرعات التصفح والتوافق التام مع مختلف الشاشات والأجهزة الذكية.\n\nابتكر فريقنا الإبداعي أصولاً بصرية مخصصة ومجموعات أيقونات حصرية ومحتوى تسويقياً ثنائي اللغة بدقة بالغة. وتم بناء هيكلية عرض المنتجات في تصنيفات سلسة تشمل الشوكولاتة، البسكويت، السكاكر، والويفر، مما يتيح لعملاء قطاع الأعمال وسلاسل الهايبرماركت استعراض بيانات المنتجات ومواصفاتها بكل يسر.\n\nوجاءت النتيجة في بوابة رقمية متكاملة عززت الحضور الرقمي لشركة الشنيفي ووطدت ثقة الشركاء والموزعين في المملكة العربية السعودية ومنطقة الخليج العربي."
                ],
                'showcase_image' => '/images/portfolio/shanifi-showcase-collage@2x.png',
                'design_concept' => [
                    'en' => "The design concept for the Shanifi portal was centered around warmth, appetite appeal, and clean corporate professionalism.\n\nWe developed a vibrant color palette combining appetizing warm red accents, rich chocolate cocoa browns, and fresh clean white spaces. High-resolution product photography was integrated with playful yet structured layout elements, including subtle shadow cards and dynamic product hover states.\n\nTypography was chosen for maximum readability and international appeal, utilizing modern geometric sans-serif fonts for English and elegant contemporary Cairo typography for Arabic. The responsive framework ensures optimal experience across desktops, tablets, and smartphones.",
                    'ar' => "تمحور المفهوم التصميمي لبوابة الشنيفي حول الدفء وجاذبية المنتجات اللذيذة مع الحفاظ على الرقي والاحترافية المؤسسية.\n\nطورنا لوحة ألوان حيوية تجمع بين درجات الأحمر الدافئ وألوان الكاكاو الغنية ومساحات بيضاء نقية ومريحة للعين. وتم دمج صور المنتجات فائقة الدقة مع عناصر تفاعلية أنيقة وتأثيرات حركية خفيفة تضفي حيوية على تصفح المنتجات.\n\nووقع الاختيار على خطوط طباعية عصرية تتميز بالوضوح والأناقة العالمية باللغتين الإنجليزية والعربية لضمان تجربة مستخدم استثنائية على الحواسيب والهواتف الذكية."
                ],
                'next_project' => [
                    'slug' => 'weetas',
                    'title' => ['en' => 'Weetas', 'ar' => 'ويتاس للعقارات'],
                    'tag' => 'Photos'
                ],
                'sort_order' => 1,
                'is_published' => true,
            ],
            [
                'slug' => ['en' => 'weetas', 'ar' => 'weetas'],
                'title' => ['en' => 'Weetas', 'ar' => 'ويتاس للعقارات'],
                'client_name' => ['en' => 'Weetas Real Estate', 'ar' => 'شركة ويتاس العقارية'],
                'category' => 'photo',
                'tags' => [
                    'en' => ['Photography', 'Web Design'],
                    'ar' => ['التصوير', 'تصميم الويب']
                ],
                'intro' => [
                    'en' => 'Leading property portal and real estate investment advisory platform based in the Kingdom of Bahrain.',
                    'ar' => 'البوابة العقارية الرائدة ومنصة الاستشارات والاستثمار العقاري الأولى في مملكة البحرين.'
                ],
                'hero_image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
                'company_background' => [
                    'en' => 'Weetas Real Estate is a major player in the GCC real estate advisory landscape, providing premier property listings, market intelligence, and investment consultancy.',
                    'ar' => 'تعتبر شركة ويتاس العقارية إحدى أبرز الشركات المتخصصة في التسويق والاستشارات العقارية في دول مجلس التعاون الخليجي.'
                ],
                'work_experience_image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                'work_experience' => [
                    'en' => 'Smart Touch provided full-stack architectural engineering, high-res architectural photography, and dynamic search functionality for property buyers and investors.',
                    'ar' => 'قدمت سمارت تاتش حلولاً تقنية شاملة تشمل تصوير المشاريع العقارية بدقة عالية وتطوير محرك بحث تفاعلي للمستثمرين والمشترين.'
                ],
                'showcase_image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                'design_concept' => [
                    'en' => 'Clean minimalist luxury design prioritizing visual property galleries, map integration, and rapid lead conversion.',
                    'ar' => 'تصميم فاخر يركز على استعراض صور الوحدات بجودة فائقة وخرائط تفاعلية تسرع وتسهل عملية التواصل والحجز.'
                ],
                'next_project' => [
                    'slug' => 'homefix',
                    'title' => ['en' => 'HomeFix', 'ar' => 'هوم فيكس'],
                    'tag' => 'Web Development'
                ],
                'sort_order' => 2,
                'is_published' => true,
            ],
            [
                'slug' => ['en' => 'homefix', 'ar' => 'homefix'],
                'title' => ['en' => 'HomeFix', 'ar' => 'هوم فيكس'],
                'client_name' => ['en' => 'HomeFix Maintenance Co.', 'ar' => 'شركة هوم فيكس لخدمات الصيانة'],
                'category' => 'web',
                'tags' => [
                    'en' => ['Web Development', 'UI/UX Design'],
                    'ar' => ['تطوير الويب', 'تصميم واجهات المستخدم']
                ],
                'intro' => [
                    'en' => 'Modern on-demand home maintenance and technical fixing service portal with real-time booking and dispatch.',
                    'ar' => 'منصة رقمية متطورة لخدمات الصيانة المنزلية الفورية مع نظام حجز ومتابعة للفرق الفنية.'
                ],
                'hero_image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
                'company_background' => [
                    'en' => 'HomeFix provides trusted residential maintenance services spanning plumbing, electrical, HVAC, and carpentry across the Kingdom.',
                    'ar' => 'تقدم هوم فيكس خدمات الصيانة المنزلية المعتمدة للسباكة والكهرباء والتكييف والنجارة في كافة مدن المملكة.'
                ],
                'work_experience_image' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
                'work_experience' => [
                    'en' => 'Smart Touch built a complete real-time dispatch booking system with instant price calculators and field technician scheduling.',
                    'ar' => 'قامت سمارت تاتش ببناء منظومة رقمية لإدارة طلبات الصيانة وتتبع الفنيين وحساب الأسعار الفوري.'
                ],
                'showcase_image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
                'design_concept' => [
                    'en' => 'Friendly, trustworthy interface with clear 3-step booking flow and instant payment confirmations.',
                    'ar' => 'واجهة مستخدم موثوقة وجذابة تمكن العميل من حجز الخدمة خلال 3 خطوات سريعة.'
                ],
                'next_project' => [
                    'slug' => 'shura',
                    'title' => ['en' => 'Shura', 'ar' => 'شركة الشورى'],
                    'tag' => 'Branding'
                ],
                'sort_order' => 3,
                'is_published' => true,
            ],
            [
                'slug' => ['en' => 'shura', 'ar' => 'shura'],
                'title' => ['en' => 'Shura', 'ar' => 'شركة الشورى للمحاماة والاستشارات'],
                'client_name' => ['en' => 'Shura Law Firm & Advisory', 'ar' => 'شركة الشورى للمحاماة والاستشارات القانونية'],
                'category' => 'branding',
                'tags' => [
                    'en' => ['Corporate Identity', 'Web Development'],
                    'ar' => ['الهوية المؤسسية', 'تطوير الويب']
                ],
                'intro' => [
                    'en' => 'Comprehensive corporate rebranding and modern bilingual web presence for prominent legal and investment advisory firm in Riyadh.',
                    'ar' => 'بناء هوية مؤسسية فاخرة ومنظومة رقمية متكاملة لشركة الشورى للمحاماة والاستشارات القانونية بالرياض.'
                ],
                'hero_image' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
                'company_background' => [
                    'en' => 'Shura Law Firm is an elite legal practice serving institutional corporations, private equity, and prominent investors in the Kingdom.',
                    'ar' => 'تعتبر شركة الشورى من كبرى شركات المحاماة الرائدة التي تقدم استشارات قانونية متقدمة للمؤسسات الاستثمارية والشركات الكبرى.'
                ],
                'work_experience_image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
                'work_experience' => [
                    'en' => 'Brand strategy, corporate iconography, luxury stationery guidelines, and an encrypted bilingual legal portal.',
                    'ar' => 'تطوير استراتيجية الهوية وتصاميم المطبوعات الرسمية الفاخرة والبوابة الرقمية المشفرة للخدمات الاستشارية.'
                ],
                'showcase_image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
                'design_concept' => [
                    'en' => 'Refined deep navy and gold aesthetic symbolizing authority, discretion, and institutional prestige.',
                    'ar' => 'طابع كلاسيكي معاصر بدرجات الكحلي الملكي والذهبي يجسد الهيبة والموثوقية والمكانة الرفيعة.'
                ],
                'next_project' => [
                    'slug' => 'shanifi',
                    'title' => ['en' => 'Shanifi', 'ar' => 'شركة الشنيفي'],
                    'tag' => 'Content Writing'
                ],
                'sort_order' => 4,
                'is_published' => true,
            ]
        ];

        foreach ($portfolios as $p) {
            Portfolio::updateOrCreate(
                ['slug->en' => $p['slug']['en']],
                $p
            );
        }
    }
}
