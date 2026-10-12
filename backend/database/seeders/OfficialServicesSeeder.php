<?php

namespace Database\Seeders;

use App\Models\SeoMetadata;
use App\Models\Service;
use Illuminate\Database\Seeder;

class OfficialServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => ['en' => 'ai-data-analytics', 'ar' => 'ai-data-analytics'],
                'title' => ['en' => 'AI & Data Analytics', 'ar' => 'الذكاء الاصطناعي وتحليل البيانات'],
                'short_description' => [
                    'en' => 'Every campaign, every customer interaction, and every platform you use generates data. The question is whether that data is working for you. At Smarttouch, we build the systems and frameworks to turn that data into decisions.',
                    'ar' => 'كل حملة وتفاعل للعملاء وكل منصة تستخدمها تولد بيانات قيمة. السؤال هو كيف تجعل هذه البيانات تعمل لصالحك؟ في سمارت تاتش، نبني الأنظمة والأطر الذكية لتحويل البيانات إلى قرارات استثمارية مدروسة.'
                ],
                'full_content' => [
                    'en' => '<h3>Intelligent Data Systems for Enterprise Growth</h3><p>We combine advanced machine learning with business intelligence dashboards to give you crystal-clear visibility into customer acquisition, churn prediction, and revenue optimization.</p><ul><li>Predictive customer lifetime value modeling</li><li>Automated real-time reporting dashboards</li><li>Custom AI recommendation engines</li><li>Big data pipeline architectures</li></ul>',
                    'ar' => '<h3>أنظمة بيانات ذكية لنمو المؤسسات</h3><p>نجمع بين خوارزميات التعلم الآلي ولوحات معلومات الأعمال لنمنحك رؤية استراتيجية واضحة حول استقطاب العملاء وتوقع سلوكياتهم وتعظيم الإيرادات.</p>'
                ],
                'icon' => 'Cpu',
                'featured_image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => ['en' => 'crm-marketing-automation', 'ar' => 'crm-marketing-automation'],
                'title' => ['en' => 'CRM & Marketing Automation', 'ar' => 'إدارة علاقات العملاء وأتمتة التسويق'],
                'short_description' => [
                    'en' => 'Streamline your customer journeys with enterprise CRM integration, behavioral email automation, and automated sales funnels that nurture leads 24/7.',
                    'ar' => 'ارتقِ بتجربة عملائك من خلال دمج أنظمة إدارة علاقات العملاء المتقدمة وأتمتة الرسائل البريدية وسلاسل المبيعات الذكية التي تعمل على مدار الساعة.'
                ],
                'full_content' => [
                    'en' => '<h3>Automated Customer Journeys at Scale</h3><p>Never let a qualified lead slip through the cracks. We configure, integrate, and automate HubSpot, Salesforce, Zoho, and custom CRM platforms with your digital touchpoints.</p>',
                    'ar' => '<h3>مسارات عملاء مؤتمتة وقابلة للتوسع</h3><p>نربط ونؤتمت منصات إدارة علاقات العملاء مع كافة نقاط الاتصال الرقمية لديك لضمان متابعة فورية لكل عميل محتمل وتحويله إلى عميل دائم.</p>'
                ],
                'icon' => 'Users',
                'featured_image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => ['en' => 'marketing-technology', 'ar' => 'marketing-technology'],
                'title' => ['en' => 'Marketing Technology', 'ar' => 'تكنولوجيا التسويق والحلول الرقمية'],
                'short_description' => [
                    'en' => 'Harness modern martech stacks, server-side conversion tracking, and automated attribution modeling to maximize every dollar of marketing spend.',
                    'ar' => 'سخّر أحدث حزم تكنولوجيا التسويق والتتبع الدقيق لتعظيم العائد على كل ريال يُنفق في حملاتك الإعلانية والرقمية.'
                ],
                'full_content' => [
                    'en' => '<h3>Modern MarTech Stacks Built for Speed</h3><p>We audit, architect, and deploy marketing technology ecosystems that synchronize your ad platforms, customer data, and analytics without slowing down page load times.</p>',
                    'ar' => '<h3>بنية تكنولوجية تسويقية فائقة السرعة</h3><p>نبني ونربط المنظومات التقنية التسويقية التي تدمج بيانات المنصات الإعلانية ومؤشرات الأداء بأعلى كفاءة وسرعة استجابة.</p>'
                ],
                'icon' => 'Zap',
                'featured_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => ['en' => 'seo-marketing', 'ar' => 'seo-marketing'],
                'title' => ['en' => 'SEO Services', 'ar' => 'خدمات تحسين محركات البحث'],
                'short_description' => [
                    'en' => 'Dominate top Google rankings in Saudi Arabia and the GCC with our algorithmic, data-driven technical SEO, semantic content, and bilingual keyword clustering.',
                    'ar' => 'تصدر المراكز الأولى في محركات البحث بالمملكة العربية السعودية والخليج عبر خطط سيو تقنية متقدمة واستراتيجيات استهداف دقيقة باللغتين العربية والإنجليزية.'
                ],
                'full_content' => [
                    'en' => '<h3>Organic Search Dominance in KSA & GCC</h3><p>Technical Core Web Vitals optimization, schema markup, high-intent Arabic and English search clusters, and authoritative digital PR that drives qualified organic traffic.</p>',
                    'ar' => '<h3>الهيمنة على نتائج البحث الطبيعي</h3><p>تحسين البنية التقنية لموقعك وسرعة التحميل، مع بناء المحتوى الاستراتيجي الذي يجذب العملاء ذوي النية الشرائية العالية.</p>'
                ],
                'icon' => 'TrendingUp',
                'featured_image' => 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'slug' => ['en' => 'growth-marketing', 'ar' => 'growth-marketing'],
                'title' => ['en' => 'Growth Marketing', 'ar' => 'التسويق للنمو وتوسيع الأعمال'],
                'short_description' => [
                    'en' => 'Rapid, data-backed experimentation across paid search, social advertising, and conversion rate optimization designed to sustainably accelerate your revenue.',
                    'ar' => 'تجارب سريعة ومبنية على البيانات عبر الإعلانات الممولة وشبكات التواصل وتحسين معدل التحويل لتسريع نمو إيراداتك بثبات واستدامة.'
                ],
                'full_content' => [
                    'en' => '<h3>Full-Funnel Performance Engineering</h3><p>We blend creative excellence with ruthless data attribution to scale qualified customer acquisition while driving down customer acquisition cost (CAC).</p>',
                    'ar' => '<h3>هندسة نمو شاملة ومستدامة</h3><p>ندمج الإبداع البصري مع التحليل الرقمي الصارم للوصول إلى أعلى عائد على الإنفاق الإعلاني وتوسيع قاعدة عملائك.</p>'
                ],
                'icon' => 'Target',
                'featured_image' => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'slug' => ['en' => 'web-app-development', 'ar' => 'web-app-development'],
                'title' => ['en' => 'Web & App Development', 'ar' => 'تطوير تطبيقات الويب والجوال'],
                'short_description' => [
                    'en' => 'High-performance web and mobile platforms engineered with Next.js 16, React Native, and Laravel 12. From high-concurrency SaaS to custom consumer portals.',
                    'ar' => 'منصات ويب وتطبيقات جوال فائقة الأداء مبنية بأحدث تقنيات Next.js 16 و React Native و Laravel 12، مصممة للمؤسسات والشركات الطموحة.'
                ],
                'full_content' => [
                    'en' => '<h3>Enterprise Web & Mobile Software Engineering</h3><p>We build resilient, ultra-fast web and mobile applications with sub-50ms API response times, 60fps fluid UI animations, and secure cloud infrastructure.</p>',
                    'ar' => '<h3>هندسة برمجية متطورة للويب وتطبيقات الهواتف</h3><p>نبني منصات وتطبيقات سريعة وآمنة للغاية مع تجارب مستخدم استثنائية تضمن تفاعل العملاء ومرونة العمليات.</p>'
                ],
                'icon' => 'Code2',
                'featured_image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'slug' => ['en' => 'subscription-marketing', 'ar' => 'subscription-marketing'],
                'title' => ['en' => 'Subscription Marketing Plans', 'ar' => 'باقات التسويق بالاشتراك الشهري'],
                'short_description' => [
                    'en' => 'Agile, fixed-monthly subscription marketing packages that provide your business with an entire team of senior designers, copywriters, and developers.',
                    'ar' => 'باقات اشتراك تسويقي شهرية مرنة تضع تحت تصرفك فريقاً متكاملاً من كبار المصممين والكتّاب والمطورين بتكلفة محددة وثابتة.'
                ],
                'full_content' => [
                    'en' => '<h3>Your Full-Service Dedicated Growth Team</h3><p>No lengthy contract negotiations or hiring headaches. Subscribe to a tier that fits your scale, submit unlimited marketing requests, and enjoy continuous delivery.</p>',
                    'ar' => '<h3>فريق نمو مخصص لأعمالك</h3><p>تخلص من أعباء التوظيف وإدارة الفرق. اشترك في الباقة المناسبة لمرحلة نموك واستمتع بإنجاز مستمر لكافة متطلباتك التسويقية والإبداعية.</p>'
                ],
                'icon' => 'Layers',
                'featured_image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'slug' => ['en' => 'hosting-infrastructure', 'ar' => 'hosting-infrastructure'],
                'title' => ['en' => 'Hosting & Infrastructure', 'ar' => 'الاستضافة والبنية التحتية السحابية'],
                'short_description' => [
                    'en' => 'High-availability cloud hosting, containerized Docker deployments, and edge CDN acceleration with 99.99% uptime guarantees across Saudi Arabia.',
                    'ar' => 'استضافة سحابية عالية الموثوقية وبنية تحتية مدارة بحاويات Docker وشبكات تسريع CDN مع ضمان استقرار 99.99% داخل المملكة وخارجها.'
                ],
                'full_content' => [
                    'en' => '<h3>Scalable Cloud Infrastructure & Managed DevOps</h3><p>Enterprise server configurations with automated daily backups, SSL certification, DDoS mitigation, and 24/7 proactive system monitoring.</p>',
                    'ar' => '<h3>بنية تحتية سحابية آمنة وإدارة خوادم متقدمة</h3><p>خوادم مجهزة بأعلى معايير الأمان والنسخ الاحتياطي اليومي والحماية من الهجمات ودعم فني على مدار الساعة.</p>'
                ],
                'icon' => 'Cloud',
                'featured_image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($services as $data) {
            $service = Service::updateOrCreate(
                ['slug->en' => $data['slug']['en']],
                $data
            );

            // Seed SEO metadata
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'service', 'entity_id' => $service->id],
                [
                    'meta_title' => [
                        'en' => $data['title']['en'] . ' | Smart Touch Digital Agency',
                        'ar' => $data['title']['ar'] . ' | وكالة سمارت تاتش الرقمية',
                    ],
                    'meta_description' => [
                        'en' => mb_substr($data['short_description']['en'], 0, 155, 'UTF-8'),
                        'ar' => mb_substr($data['short_description']['ar'], 0, 155, 'UTF-8'),
                    ],
                    'focus_keywords' => [
                        'en' => 'Smart Touch, Saudi Arabia, ' . $data['title']['en'],
                        'ar' => 'سمارت تاتش, السعودية, ' . $data['title']['ar'],
                    ],
                ]
            );
        }
    }
}
