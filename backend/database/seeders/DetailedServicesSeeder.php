<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\SeoMetadata;
use Illuminate\Database\Seeder;

class DetailedServicesSeeder extends Seeder
{
    public function run(): void
    {
        $servicesData = [
            // 1. Web & App Development
            [
                'slug' => ['en' => 'web-app-development', 'ar' => 'tatweer-al-mawaqie-wal-tatbiqat'],
                'title' => ['en' => 'Web & App Development', 'ar' => 'تطوير المواقع والتطبيقات'],
                'short_description' => [
                    'en' => 'Your site is not simply a web presence; it is where your clients make their decisions about whether to take a risk on you or walk away. We design sites and applications that have all of the right elements, both in form and function.',
                    'ar' => 'موقعك ليس مجرد واجهة رقمية، بل هو المكان الذي يقرر فيه عملاؤك الوثوق بك أو التراجع. نحن نصمم مواقع وتطبيقات تجمع بين الأناقة والوظيفة المتكاملة.'
                ],
                'icon' => 'Code',
                'featured_image' => '/images/services/web-app-hero.png',
                'sort_order' => 1,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'Web & App Development', 'ar' => 'تطوير المواقع والتطبيقات'],
                        'lead' => [
                            'en' => 'Your site is not simply a web presence; it is where your clients make their decisions about whether to take a risk on you or walk away. We design sites and applications that have all of the right elements, both in form and function.',
                            'ar' => 'موقعك ليس مجرد واجهة رقمية، بل هو المكان الذي يقرر فيه عملاؤك الوثوق بك أو التراجع. نحن نصمم مواقع وتطبيقات تجمع بين الأناقة والوظيفة المتكاملة.'
                        ],
                        'image' => '/images/services/web-app-hero.png',
                        'sublead' => [
                            'en' => 'Whether you need a business website, an online store, a landing page, or a mobile app, what we build is built around your goals, not a template someone else already used.',
                            'ar' => 'سواء كنت بحاجة إلى موقع مؤسسي، متجر إلكتروني، صفحة هبوط، أو تطبيق جوال، نبني حلولاً مخصصة لأهدافك وليست قوالب جاهزة.'
                        ]
                    ],
                    [
                        'id' => 'web-services',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'Web Development Services', 'ar' => 'خدمات تطوير المواقع الإلكترونية'],
                        'items' => [
                            [
                                'title' => ['en' => 'Website Development', 'ar' => 'تطوير المواقع الإلكترونية'],
                                'description' => [
                                    'en' => 'Fast, clean, and built to convert. We develop websites that represent your brand properly and give visitors a reason to stay and take action.',
                                    'ar' => 'سريعة، متقنة، ومصممة لتحقيق التحويلات. نطور مواقع تمثل هويتك بأعلى معايير وتمنح زوارك سبباً للتفاعل والشراء.'
                                ],
                                'image' => '/images/services/web-dev-website.png'
                            ],
                            [
                                'title' => ['en' => 'E-commerce Development', 'ar' => 'تطوير المتاجر الإلكترونية'],
                                'description' => [
                                    'en' => 'An online selling platform is not just about having an online product page. Our e-commerce development services can be carried out using different platforms like Shopify and WooCommerce for ease and retention purposes.',
                                    'ar' => 'منصة البيع الإلكتروني لا تقتصر على عرض المنتجات. نقدم حلول تطوير التجارة الإلكترونية عبر Shopify و WooCommerce لضمان السلاسة ونمو المبيعات.'
                                ],
                                'image' => '/images/services/web-dev-ecommerce.png'
                            ]
                        ]
                    ],
                    [
                        'id' => 'app-services',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'App Development Services', 'ar' => 'خدمات تطوير التطبيقات'],
                        'theme' => 'lavender',
                        'items' => [
                            [
                                'title' => ['en' => 'Mobile App Development', 'ar' => 'تطوير تطبيقات الجوال'],
                                'description' => [
                                    'en' => 'iOS App, Android App, or both. We develop mobile apps that work the way your users expect, built around real use cases, not just features for the sake of it.',
                                    'ar' => 'تطبيقات iOS، أندرويد، أو كلاهما. نطور تطبيقات تعمل وفق تطلعات المستخدمين ومبنية على حالات استخدام حقيقية تلبي احتياجات عملائك.'
                                ],
                                'image' => '/images/services/web-dev-mobile.png'
                            ],
                            [
                                'title' => ['en' => 'UI/UX Design', 'ar' => 'تصميم واجهات وتجربة المستخدم'],
                                'description' => [
                                    'en' => 'Good design is not decoration; it is the difference between someone completing a purchase and someone closing the tab. We design interfaces that are clear, intuitive, and built around how people actually behave.',
                                    'ar' => 'التصميم المتقن ليس مجرد زينة؛ بل هو الفارق بين إتمام عملية الشراء أو إغلاق الصفحة. نصمم واجهات سلسة وسهلة الفهم تحاكي السلوك الفعلي للمستخدم.'
                                ],
                                'image' => '/images/services/web-dev-uiux.png'
                            ]
                        ]
                    ],
                    [
                        'id' => 'why-us',
                        'type' => 'why_us',
                        'title' => ['en' => 'Why Smart Touch?', 'ar' => 'لماذا سمارت تاتش؟'],
                        'description' => [
                            'en' => 'A lot of agencies claim to be the best web and app development agency around. We would rather earn that. A few things that genuinely set us apart:',
                            'ar' => 'تدعي الكثير من الوكالات أنها الأفضل في تطوير المواقع والتطبيقات، لكننا نفضل إثبات ذلك بالنتائج. إليك ما يميزنا فعلياً:'
                        ],
                        'checkpoints' => [
                            ['en' => 'We do not hand you a template and call it done.', 'ar' => 'لا نسلمك قالباً جاهزاً ونعتبر المشروع منتهياً.'],
                            ['en' => 'Every project starts with understanding your business, your users, and what success actually looks like for you. Then we build it.', 'ar' => 'يبدأ كل مشروع بفهم دقيق لطبيعة عملك ومستخدميك ومعايير نجاحك، ثم نبدأ البناء.'],
                            ['en' => 'We stay involved, not just at the kickoff, but throughout.', 'ar' => 'نبقى على تواصل مستمر ودعم متواصل، ليس فقط عند الانطلاق بل طوال مسار المشروع.']
                        ],
                        'image' => '/images/services/web-dev-why-us.png'
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Ready To Build Something That Works?', 'ar' => 'جاهز لبناء مشروع رقمي فعال ومتميز؟'],
                        'subtitle' => ['en' => 'Tell us about your project and we will take it from there.', 'ar' => 'أخبرنا بتفاصيل مشروعك وسنتولى تحويله إلى واقع.'],
                        'button_text' => ['en' => 'Contact Us', 'ar' => 'تواصل معنا'],
                        'button_link' => '/contact',
                        'image' => '/images/services/web-dev-cta-banner.png',
                        'theme' => 'laptop'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'Web & App Development Services | Smart Touch', 'ar' => 'خدمات تطوير المواقع والتطبيقات | سمارت تاتش'],
                    'meta_description' => ['en' => 'Custom websites, e-commerce stores, and high-performance mobile applications built around your business goals.', 'ar' => 'تطوير مواقع ومتاجر وتطبيقات جوال مخصصة وفق أهداف أعمالك بأحدث التقنيات.']
                ]
            ],

            // 2. SEO Services
            [
                'slug' => ['en' => 'seo-services', 'ar' => 'khadamat-seo'],
                'title' => ['en' => 'SEO Services', 'ar' => 'خدمات تحسين محركات البحث (SEO)'],
                'short_description' => [
                    'en' => "Search Engine Optimization puts your business on Google's first page without paying per click. We handle on-page SEO to make your content rank and technical SEO to make sure your site performs the way Google expects.",
                    'ar' => 'يضع تحسين محركات البحث عملك في الصفحة الأولى على جوجل دون الدفع مقابل كل نقرة. نتولى السيو الداخلي والتقني لضمان تصدر موقعك.'
                ],
                'icon' => 'Search',
                'featured_image' => '/images/services/seo-hero.png',
                'sort_order' => 2,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'SEO Services', 'ar' => 'خدمات تحسين محركات البحث (SEO)'],
                        'lead' => [
                            'en' => "Search Engine Optimization puts your business on Google's first page without paying per click. We handle on-page SEO to make your content rank and technical SEO to make sure your site performs the way Google expects, so the right people find you, and you stay there.",
                            'ar' => 'يضع تحسين محركات البحث عملك في الصفحة الأولى على جوجل دون الدفع مقابل كل نقرة. نتولى السيو الداخلي والتقني لضمان أداء موقعك وتصدره الدائم.'
                        ],
                        'image' => '/images/services/seo-hero.png',
                        'sublead' => [
                            'en' => "Beyond that, we offer SEM to drive immediate traffic through paid ads, and GEO to make sure your business is the one AI tools like ChatGPT reference when they answer searches directly.\n\nIf your business is based in Saudi Arabia and your customers are in a specific city or region, we can get you into Google's Map Pack, the results that show up before everything else. Unlike most SEO companies that treat local as an afterthought, we make it a core part of the work. As your SEO consultant, we set up and optimize your Google Business Profile, target location-specific keywords, and help you build reviews that actually move the needle.",
                            'ar' => "إلى جانب ذلك، نقدم إعلانات محركات البحث SEM لزيادة الزيارات الفورية، وتحسين الذكاء الاصطناعي التوليدي GEO لتكون شركتك المرجع المفضل لأدوات مثل ChatGPT.\n\nوإذا كان مقر عملك في السعودية أو تستهدف مدينة معينة، نساعدك في تصدر حزمة خرائط جوجل Google Map Pack التي تظهر قبل كل النتائج. وبصفتنا استشاري السيو الخاص بك، نهيئ ملفك التجاري، ونستهدف الكلمات المفتاحية المحلية لتعزيز ثقة عملائك."
                        ]
                    ],
                    [
                        'id' => 'seo-services-list',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'Our SEO Services', 'ar' => 'خدمات السيو المتكاملة لدينا'],
                        'subtitle' => [
                            'en' => "We don't have copy-paste strategies. What we build depends on your business, your market, and where the real gaps are.",
                            'ar' => 'لا نعتمد استراتيجيات منسوخة. ما نبنيه يعتمد على طبيعة عملك وسوقك والثغرات الحقيقية التي نكتشفها.'
                        ],
                        'items' => [
                            [
                                'title' => ['en' => 'SEO Analysis', 'ar' => 'تحليل وتدقيق السيو'],
                                'description' => [
                                    'en' => 'We start by finding out where you actually stand: rankings, technical health, competitor gaps, missed opportunities. The SEO analysis shapes everything that comes after it.',
                                    'ar' => 'نبدأ بمعرفة موقعك الحقيقي بدقة: التصنيفات، الصحة التقنية، ثغرات المنافسين، والفرص الضائعة. يوجه هذا التحليل كل خطوة لاحقة.'
                                ],
                                'image' => '/images/services/seo-analysis.png'
                            ],
                            [
                                'title' => ['en' => 'On-Page & Technical SEO', 'ar' => 'السيو الداخلي والتقني'],
                                'description' => [
                                    'en' => 'We go through your site properly: fixing what is broken, tightening the structure, and making sure every page is pulling its weight.',
                                    'ar' => 'نفحص موقعك بشكل شامل: إصلاح المشاكل البرمجية، إحكام البنية الهيكلية، والتأكد من مساهمة كل صفحة في تعزيز الترتيب.'
                                ],
                                'image' => '/images/services/seo-onpage.png'
                            ],
                            [
                                'title' => ['en' => 'Content SEO', 'ar' => 'سيو المحتوى'],
                                'description' => [
                                    'en' => 'Keywords alone do not cut it anymore. Our website content optimization rewrites and restructures your content so it ranks well, reads naturally, and gives visitors a reason to stick around and take action.',
                                    'ar' => 'الكلمات المفتاحية وحدها لم تعد كافية. نعيد هيكلة محتواك ليحتل الصدارة، ويُقرأ بسلاسة، ويمنح زوارك سبباً مقنعاً للتفاعل.'
                                ],
                                'image' => '/images/services/seo-content.png'
                            ],
                            [
                                'title' => ['en' => 'Ecommerce SEO', 'ar' => 'سيو المتاجر الإلكترونية'],
                                'description' => [
                                    'en' => 'Product pages, categories, site speed, duplicate content: ecommerce SEO is its own discipline. We handle it across Shopify, WooCommerce, and other platforms, with one goal: more people finding your products and buying them.',
                                    'ar' => 'صفحات المنتجات، التصنيفات، سرعة الموقع، وتكرار المحتوى. ندير سيو المتاجر عبر مختلف المنصات بهدف واحد: مضاعفة المبيعات.'
                                ],
                                'image' => '/images/services/seo-ecommerce.png'
                            ],
                            [
                                'title' => ['en' => 'Integrated SEO Strategy', 'ar' => 'استراتيجية السيو الشاملة'],
                                'description' => [
                                    'en' => 'Everything is tied together into one plan, with clear milestones and monthly reporting so you always know what is happening and what comes next.',
                                    'ar' => 'نربط كافة الجوانب في خطة موحدة، بمراحل واضحة وتقارير شهرية شفافة لتكون دائماً على دراية بالتقدم المحرز.'
                                ],
                                'image' => '/images/services/seo-integrated.png'
                            ],
                            [
                                'title' => ['en' => 'ASO (App Store Optimization)', 'ar' => 'تحسين متجر التطبيقات (ASO)'],
                                'description' => [
                                    'en' => 'Got an app? Then your app store listing needs to work as hard as your website does. We optimize your title, keywords, screenshots, and description so people searching the App Store or Google Play actually land on you instead of a competitor.',
                                    'ar' => 'لديك تطبيق؟ يجب أن تعمل صفحة تطبيقك بكفاءة موقعك. نحسن العنوان والكلمات المفتاحية واللقطات لضمان ظهورك الأول وزيادة التنزيلات النشطة.'
                                ],
                                'image' => '/images/services/seo-aso.png'
                            ],
                            [
                                'title' => ['en' => 'Generative AI Optimization (GEO)', 'ar' => 'تحسين محركات الذكاء الاصطناعي (GEO)'],
                                'description' => [
                                    'en' => "Search isn't just Google anymore. People ask ChatGPT, Gemini, and other AI tools questions and expect an answer on the spot. We structure your content so these tools pick it up, understand it, and reference your business by name.",
                                    'ar' => 'لم يعد البحث مقتصراً على جوجل. يسأل المستخدمون ChatGPT و Gemini للحصول على إجابات مباشرة. نهيئ محتواك لتقوم هذه النماذج بترشيح شركتك كمرجع موثوق.'
                                ],
                                'image' => '/images/services/seo-genai.png'
                            ]
                        ]
                    ],
                    [
                        'id' => 'why-us',
                        'type' => 'why_us',
                        'title' => ['en' => 'Why Smart Touch?', 'ar' => 'لماذا سمارت تاتش؟'],
                        'description' => [
                            'en' => 'A lot of agencies claim to be the best SEO agency around. We would rather earn that. A few things that genuinely set us apart:',
                            'ar' => 'تدعي الكثير من الوكالات أنها الأفضل في السيو، لكننا نفضل إثبات ذلك بالأرقام والنتائج الحقيقية. إليك ما يميزنا:'
                        ],
                        'checkpoints' => [
                            ['en' => 'We know the local market, how people here search, what they click, and what actually converts.', 'ar' => 'نعرف خفايا السوق المحلي وسلوكيات البحث الفعلية للجمهور في السعودية والخليج.'],
                            ['en' => 'We do Arabic and English SEO properly, not as an afterthought.', 'ar' => 'نقدم سيو ثنائي اللغة (عربي وإنجليزي) باحترافية وتخصيص عميق.'],
                            ['en' => 'Reporting that shows real numbers, not just traffic graphs that look good.', 'ar' => 'تقارير توضح العائد الحقيقي والتحويلات، وليس فقط رسوماً بيانية لزيارات وهمية.'],
                            ['en' => 'Your strategy is built for your business. We do not recycle templates.', 'ar' => 'استراتيجيتك مبنية خصيصاً لمشروعك، دون أي قوالب مكررة.'],
                            ['en' => 'We stay involved, not just at the kickoff, but throughout.', 'ar' => 'دعم استشاري دائم ومستمر لمواكبة كافة تحديثات خوارزميات البحث.']
                        ],
                        'image' => '/images/services/seo-why-us.png'
                    ],
                    [
                        'id' => 'faq',
                        'type' => 'faq_accordion',
                        'title' => ['en' => 'Frequently Asked Questions', 'ar' => 'الأسئلة الشائعة'],
                        'items' => [
                            [
                                'question' => ['en' => 'What does SEO mean?', 'ar' => 'ماذا يعني تحسين محركات البحث (SEO)؟'],
                                'answer' => [
                                    'en' => 'SEO stands for Search Engine Optimization. It means improving your website so it appears higher in search engine results like Google when people search for products or services related to your business.',
                                    'ar' => 'يرمز SEO إلى تحسين محركات البحث. يعني تحسين موقعك ليظهر في المراتب الأولى على جوجل عندما يبحث العملاء عن خدماتك أو منتجاتك.'
                                ]
                            ],
                            [
                                'question' => ['en' => 'How long does it take to see results from SEO?', 'ar' => 'كم من الوقت يستغرق ظهور نتائج السيو؟'],
                                'answer' => [
                                    'en' => "Typically, measurable organic improvements start showing within 3 to 6 months, depending on your website's domain age, competitive landscape, and technical foundation.",
                                    'ar' => 'عادةً ما تبدأ النتائج الملموسة في الظهور خلال 3 إلى 6 أشهر، اعتماداً على عمر النطاق، والمنافسة في مجالك، والبنية التقنية لموقعك.'
                                ]
                            ],
                            [
                                'question' => ['en' => 'What is the difference between SEO and SEM?', 'ar' => 'ما الفرق بين السيو (SEO) والإعلانات الممولة (SEM)؟'],
                                'answer' => [
                                    'en' => 'SEO focuses on earning free organic placement through optimizations, while SEM (Search Engine Marketing) involves paying for immediate ad placements on search engines.',
                                    'ar' => 'يركز السيو على كسب الظهور المجاني الدائم عبر التحسينات، بينما يعتمد SEM على إعلانات جوجل مدفوعة الأجر للحصول على نتائج فورية.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Ready To Rank At The Top Of Google?', 'ar' => 'جاهز لتصدر نتائج البحث الأولى في جوجل؟'],
                        'button_text' => ['en' => 'Contact Us', 'ar' => 'تواصل معنا'],
                        'button_link' => '/contact',
                        'image' => '/images/services/seo-cta-banner.png',
                        'theme' => 'google'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'SEO Services in Saudi Arabia & Gulf | Smart Touch', 'ar' => 'خدمات تحسين محركات البحث في السعودية والخليج | سمارت تاتش'],
                    'meta_description' => ['en' => 'Dominate Google search results, map pack, and AI search engines with custom bilingual SEO strategies.', 'ar' => 'تصدر نتائج بحث جوجل وحزمة الخرائط ومحركات الذكاء الاصطناعي باستراتيجيات سيو احترافية.']
                ]
            ],

            // 3. Growth Marketing
            [
                'slug' => ['en' => 'growth-marketing', 'ar' => 'al-tasweeq-li-numow-al-aamal'],
                'title' => ['en' => 'Growth Marketing', 'ar' => 'التسويق لنمو الأعمال'],
                'short_description' => [
                    'en' => 'Growth marketing is what happens when you stop guessing and start building something that works, where every campaign has a purpose and the results are ones you can actually measure.',
                    'ar' => 'تسويق النمو هو الانتقال من التخمين إلى بناء منظومة تسويقية متكاملة تحقق عائداً ملموساً وقابلاً للقياس الدقيق.'
                ],
                'icon' => 'TrendingUp',
                'featured_image' => '/images/services/growth-hero.png',
                'sort_order' => 3,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'Growth Marketing', 'ar' => 'التسويق لنمو الأعمال'],
                        'lead' => [
                            'en' => 'Most businesses are spending money on marketing. The real question is whether that money is actually doing anything. Growth marketing is what happens when you stop guessing and start building something that works, where every campaign has a purpose, every channel connects to the next, and the results are ones you can actually measure.',
                            'ar' => 'تنفق معظم الشركات ميزانيات ضخمة على التسويق، لكن السؤال الحقيقي هو ما إذا كانت هذه الأموال تحقق نمواً فعلياً. تسويق النمو هو الانتقال من التخمين إلى بناء منظومة متكاملة تقيس كل خطوة بدقة.'
                        ],
                        'image' => '/images/services/growth-hero.png'
                    ],
                    [
                        'id' => 'performance-marketing',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'Performance Marketing', 'ar' => 'التسويق بالأداء'],
                        'items' => [
                            [
                                'title' => ['en' => 'Google Ads Management', 'ar' => 'إدارة إعلانات جوجل'],
                                'description' => [
                                    'en' => 'When someone types what you sell into Google, you want to be the first thing they see. We manage Google Ads campaigns that go after the right searches, keep costs under control, and bring in people who are close to making a decision, not just browsing.',
                                    'ar' => 'عندما يبحث عميل محتمل عن خدماتك، يجب أن يراك أولاً. ندير حملات إعلانات جوجل مستهدفة بدقة تضبط التكاليف وتجلب عملاء جاهزين لاتخاذ القرار.'
                                ],
                                'image' => '/images/services/growth-google-ads.png'
                            ],
                            [
                                'title' => ['en' => 'Meta Ads Management', 'ar' => 'إدارة إعلانات ميتا (فيسبوك وانستغرام)'],
                                'description' => [
                                    'en' => 'People spend a lot of time on Facebook and Instagram before they ever open Google. We run Meta campaigns that put your brand in front of them early, build the right kind of interest, and push them toward converting.',
                                    'ar' => 'يقضي جمهورك وقتاً طويلاً على انستغرام وفيسبوك. نطلق حملات إعلانية إبداعية تبرز علامتك في التوقيت المناسب وتدفعهم نحو الشراء.'
                                ],
                                'image' => '/images/services/growth-meta.png'
                            ],
                            [
                                'title' => ['en' => 'Programmatic Advertising', 'ar' => 'الإعلانات البرمجية الآلية'],
                                'description' => [
                                    'en' => 'Your audience does not live on one platform. Programmatic advertising lets us reach them across the web with the right message, managed properly so your budget goes where it actually performs.',
                                    'ar' => 'جمهورك متواجد في منصات ومواقع متعددة. تتيح الإعلانات البرمجية استهدافهم أينما تصفحوا وتوجيه ميزانيتك للمسارات الأكثر ربحية.'
                                ],
                                'image' => '/images/services/growth-programmatic.png'
                            ],
                            [
                                'title' => ['en' => 'Retargeting Campaigns', 'ar' => 'حملات إعادة الاستهداف'],
                                'description' => [
                                    'en' => 'The first visit rarely ends in a sale. Retargeting is how you stay in front of people who showed interest and bring them back when they are ready to move.',
                                    'ar' => 'نادراً ما تنتهي الزيارة الأولى بعملية شراء. تعيد حملات الاستهداف تذكير المهتمين بعروضك لإعادتهم وإتمام الصفقة.'
                                ],
                                'image' => '/images/services/growth-retargeting.png'
                            ]
                        ]
                    ],
                    [
                        'id' => 'cro',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Conversion Rate Optimization (CRO)', 'ar' => 'تحسين معدل التحويل (CRO)'],
                        'subtitle' => [
                            'en' => 'Traffic without conversions is just a number. CRO is about making sure the people who land on your site actually do something.',
                            'ar' => 'الزيارات بدون تحويلات مجرد أرقام لا تفيد. يضمن CRO تحويل الزوار إلى عملاء فعليين يدفعون.'
                        ],
                        'columns' => 3,
                        'cards' => [
                            [
                                'icon' => 'Zap',
                                'title' => ['en' => 'Landing Page Optimization', 'ar' => 'تحسين صفحات الهبوط'],
                                'description' => [
                                    'en' => 'If your landing page is not converting, the problem is usually not the ad. We look at the page itself: the message, the layout, the friction points, and fix what is getting in the way.',
                                    'ar' => 'إذا لم تحقق صفحة الهبوط أهدافها، فالمشكلة في الصفحة نفسها. نعدل الرسائل والتصميم ونزيل أي عقبات تعطل الشراء.'
                                ]
                            ],
                            [
                                'icon' => 'Filter',
                                'title' => ['en' => 'Funnel Analysis', 'ar' => 'تحليل مسار التحويل'],
                                'description' => [
                                    'en' => 'We go through your funnel stage by stage and find where people are dropping off. Then we figure out why and do something about it.',
                                    'ar' => 'ندرس كل مرحلة في مسار العميل لنكتشف نقاط التسرب ونعالج أسباب التراجع فوراً.'
                                ]
                            ],
                            [
                                'icon' => 'GitFork',
                                'title' => ['en' => 'A/B Testing', 'ar' => 'اختبارات المقارنة (A/B Testing)'],
                                'description' => [
                                    'en' => 'We do not rely on instincts. We test. Headlines, layouts, button copy, offers: whatever needs to be validated gets tested properly so decisions are based on data, not opinions.',
                                    'ar' => 'لا نعتمد على الحدس، بل نختبر العناوين والتصميم والعروض علمياً لاتخاذ قرارات مدعومة بالبيانات.'
                                ]
                            ],
                            [
                                'icon' => 'ShoppingCart',
                                'title' => ['en' => 'Checkout Optimization', 'ar' => 'تحسين مرحلة الدفع'],
                                'description' => [
                                    'en' => 'People abandon carts for a reason. Usually it is something small that adds unnecessary friction. We go through the checkout flow and remove whatever is getting between your customer and the confirmation page.',
                                    'ar' => 'يتخلى العملاء عن سلة الشراء لأسباب دقيقة. نزيل التعقيدات ونسهل خطوات الدفع لمضاعفة المبيعات.'
                                ]
                            ],
                            [
                                'icon' => 'Activity',
                                'title' => ['en' => 'User Behaviour Analytics', 'ar' => 'تحليل سلوك المستخدمين'],
                                'description' => [
                                    'en' => 'We track how real users move through your site. Where they click, where they slow down, where they leave. That information tells us exactly where to focus.',
                                    'ar' => 'نتتبع حركة المستخدمين وخرائط الحرارة لمعرفة أين ينقرون وأين يتوقفون، ونركز على تحسين التجربة.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'app-growth',
                        'type' => 'card_grid',
                        'title' => ['en' => 'App Growth Marketing', 'ar' => 'تسويق نمو التطبيقات'],
                        'subtitle' => [
                            'en' => 'An app without users is just code sitting on a server. Getting people to download it, use it, and actually come back is its own discipline.',
                            'ar' => 'التطبيق بدون مستخدمين مجرد كود مهمل. جذب المستخدمين وتحفيزهم على التفاعل المستمر هو صلب تخصصنا.'
                        ],
                        'columns' => 4,
                        'cards' => [
                            [
                                'icon' => 'Star',
                                'title' => ['en' => 'App Install Campaigns', 'ar' => 'حملات تثبيت التطبيقات'],
                                'description' => [
                                    'en' => 'We run install campaigns across Google, Meta, and other relevant channels with one focus: bringing in users who will stick around, not inflate your numbers and disappear.',
                                    'ar' => 'حملات تثبيت عبر جوجل وميتا تركز على جذب مستخدمين حقيقيين متفاعلين وليس مجرد أرقام عابرة.'
                                ]
                            ],
                            [
                                'icon' => 'LayoutGrid',
                                'title' => ['en' => 'App Store Optimization (ASO)', 'ar' => 'تحسين متجر التطبيقات'],
                                'description' => [
                                    'en' => 'Before someone downloads your app, they read the listing. We optimize everything on that page: the title, the description, the keywords, the visuals, so more people find it and more of them hit install.',
                                    'ar' => 'قبل التنزيل، يتفحص العميل صفحة التطبيق. نحسن العنوان والوصف والتصميم لرفع معدل التحميل.'
                                ]
                            ],
                            [
                                'icon' => 'Shuffle',
                                'title' => ['en' => 'Mobile Attribution', 'ar' => 'تتبع الإسناد الرقمي للجوال'],
                                'description' => [
                                    'en' => 'We set up and manage attribution through AppsFlyer, Adjust, and Kochava so you always know which channels are driving installs, which ones are not pulling their weight, and where to shift your budget.',
                                    'ar' => 'نربط أدوات AppsFlyer و Adjust لتعرف بدقة أي القنوات تجلب التثبيتات والاشتراكات لترشيد ميزانيتك.'
                                ]
                            ],
                            [
                                'icon' => 'Repeat',
                                'title' => ['en' => 'User Retention Marketing', 'ar' => 'تسويق استبقاء المستخدمين'],
                                'description' => [
                                    'en' => 'Downloads are the beginning, not the goal. We build retention strategies that keep users coming back, re-engage the ones who have gone quiet, and reduce the churn that quietly kills app growth.',
                                    'ar' => 'التنزيل مجرد بداية. نبني استراتيجيات استبقاء تعيد تفعيل المستخدمين وتمنع فقدانهم لضمان استدامة النمو.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'why-us',
                        'type' => 'why_us',
                        'title' => ['en' => 'Why Smart Touch?', 'ar' => 'لماذا سمارت تاتش؟'],
                        'description' => [
                            'en' => 'A few things that genuinely set us apart:',
                            'ar' => 'إليك ما يميز منهجيتنا في تسويق النمو:'
                        ],
                        'checkpoints' => [
                            ['en' => 'We do not just run campaigns and send you a report at the end of the month.', 'ar' => 'لا نكتفي بإطلاق الحملات وإرسال تقرير روتيني نهاية الشهر.'],
                            ['en' => 'We look at the whole picture, from the first time someone sees your brand to the point they become a customer, and we work on every part of that journey.', 'ar' => 'ننظر إلى الصورة الكاملة للعميل من أول ظهور للعلامة وحتى إتمام الشراء، ونطور كل مرحلة.'],
                            ['en' => 'No recycled strategies, no vanity metrics, just work that is built around what your business actually needs.', 'ar' => 'لا قوالب جاهزة ولا مؤشرات شكلية، بل حلول واقعية تناسب عملك وتزيد إيراداتك.']
                        ],
                        'image' => '/images/services/growth-why-us.png'
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Ready To Grow?', 'ar' => 'جاهز لتنمية أعمالك؟'],
                        'subtitle' => ['en' => 'Tell us about your business and let us build something that delivers.', 'ar' => 'أخبرنا عن أهدافك ودعنا نبني منظومة تسويقية تحقق لك النتائج.'],
                        'button_text' => ['en' => 'Contact Us', 'ar' => 'تواصل معنا'],
                        'button_link' => '/contact',
                        'image' => '/images/services/growth-cta-banner.png',
                        'theme' => 'chart'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'Growth Marketing & Performance Marketing | Smart Touch', 'ar' => 'تسويق النمو والتسويق بالأداء | سمارت تاتش'],
                    'meta_description' => ['en' => 'Scale your revenue with Google Ads, Meta Ads, Conversion Rate Optimization, and App Growth Marketing.', 'ar' => 'ضاعف إيراداتك مع إعلانات جوجل، ميتا، تحسين معدلات التحويل، وتسويق نمو التطبيقات.']
                ]
            ],

            // 4. Subscription Marketing Plans
            [
                'slug' => ['en' => 'subscription-marketing-plans', 'ar' => 'khitat-al-tasweeq-bil-ishtirak'],
                'title' => ['en' => 'Subscription Marketing Plans', 'ar' => 'خطط التسويق بالاشتراك الشهري'],
                'short_description' => [
                    'en' => 'Consistent marketing. Real results. No long-term contracts. Choose the plan that fits your business; cancel or upgrade anytime.',
                    'ar' => 'تسويق مستمر وموثوق. نتائج حقيقية وملموسة. بدون عقود طويلة الأجل. اختر الباقة المناسبة وقم بالترقية في أي وقت.'
                ],
                'icon' => 'Layers',
                'featured_image' => '/images/services/subscription-hero.png',
                'sort_order' => 4,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'Subscription Marketing Plans', 'ar' => 'خطط التسويق بالاشتراك الشهري'],
                        'lead' => [
                            'en' => 'Consistent marketing. Real results. No long-term contracts.',
                            'ar' => 'تسويق مستمر وموثوق. نتائج حقيقية وملموسة. بدون عقود طويلة الأجل.'
                        ],
                        'image' => '/images/services/subscription-hero.png',
                        'sublead' => [
                            'en' => 'Choose the plan that fits your business; cancel or upgrade anytime.',
                            'ar' => 'اختر الخطة المناسبة لحجم أعمالك، مع إمكانية الترقية أو الإلغاء في أي وقت بكل مرونة.'
                        ]
                    ],
                    [
                        'id' => 'pricing',
                        'type' => 'pricing_tiers',
                        'title' => ['en' => 'Choose Your Plan', 'ar' => 'اختر الباقة المناسبة لك'],
                        'tiers' => [
                            [
                                'name' => ['en' => 'Starter', 'ar' => 'الباقة الأساسية (Starter)'],
                                'price' => '$1,500',
                                'period' => ['en' => '/month', 'ar' => '/شهرياً'],
                                'description' => [
                                    'en' => 'Ideal for small businesses just getting started with digital marketing. We build your foundation with consistent content, basic ad campaigns, and a steady social presence so you show up online the right way.',
                                    'ar' => 'مثالية للشركات الناشئة والصغيرة لبناء حضور رقمي احترافي عبر محتوى منتظم وحملات إعلانية مستهدفة.'
                                ],
                                'features' => [
                                    ['en' => 'Social Media Management', 'ar' => 'إدارة منصات التواصل الاجتماعي'],
                                    ['en' => 'Paid Ads', 'ar' => 'إعلانات ممولة'],
                                    ['en' => 'Content Creation', 'ar' => 'صناعة المحتوى الإبداعي'],
                                    ['en' => 'Analytics & Reporting', 'ar' => 'تقارير وتحليلات شهرية']
                                ],
                                'cta_text' => ['en' => 'Get Started', 'ar' => 'ابدأ الآن'],
                                'cta_link' => '/contact?plan=starter'
                            ],
                            [
                                'name' => ['en' => 'Growth', 'ar' => 'باقة النمو (Growth)'],
                                'price' => '$3,500',
                                'period' => ['en' => '/month', 'ar' => '/شهرياً'],
                                'description' => [
                                    'en' => 'For businesses ready to scale. More content, bigger ad budgets, and deeper SEO work to drive real traffic and leads with closer tracking to keep improving results.',
                                    'ar' => 'للشركات الطامحة للتوسع السريع، تشمل حجماً أكبر من المحتوى، وإعلانات موسعة، وتحسين سيو مكثف.'
                                ],
                                'features' => [
                                    ['en' => 'Social Media Management', 'ar' => 'إدارة منصات التواصل الاجتماعي'],
                                    ['en' => 'Paid Ads', 'ar' => 'إعلانات ممولة متقدمة'],
                                    ['en' => 'Content Creation', 'ar' => 'صناعة المحتوى والتصاميم'],
                                    ['en' => 'Analytics & Reporting', 'ar' => 'تقارير وتحليلات أسبوعية وشهرية']
                                ],
                                'cta_text' => ['en' => 'Get Started', 'ar' => 'ابدأ الآن'],
                                'cta_link' => '/contact?plan=growth',
                                'popular' => true
                            ],
                            [
                                'name' => ['en' => 'Enterprise', 'ar' => 'باقة المؤسسات (Enterprise)'],
                                'price' => '$7,000',
                                'period' => ['en' => '/month', 'ar' => '/شهرياً'],
                                'description' => [
                                    'en' => 'Full-scale marketing for brands that need maximum output and reach. Advanced campaigns, high-volume content, aggressive SEO, and dedicated strategy support built to compete at the top.',
                                    'ar' => 'منظومة تسويقية متكاملة للشركات الكبرى، تشمل إنتاجاً غزيراً واستراتيجيات منافسة في الصدارة.'
                                ],
                                'features' => [
                                    ['en' => 'Social Media Management', 'ar' => 'إدارة شاملة لجميع المنصات'],
                                    ['en' => 'Paid Ads', 'ar' => 'إدارة حملات متعددة القنوات'],
                                    ['en' => 'Content Creation', 'ar' => 'إنتاج فيديو ومحتوى متميز'],
                                    ['en' => 'Analytics & Reporting', 'ar' => 'لوحات تحكم مباشرة ومتابعة دورية']
                                ],
                                'cta_text' => ['en' => 'Get Started', 'ar' => 'ابدأ الآن'],
                                'cta_link' => '/contact?plan=enterprise'
                            ]
                        ]
                    ],
                    [
                        'id' => 'every-plan-includes',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Every Plan Includes:', 'ar' => 'تتضمن كل باقة المزايا التالية:'],
                        'columns' => 4,
                        'cards' => [
                            [
                                'icon' => 'Share2',
                                'title' => ['en' => 'Social Media Management', 'ar' => 'إدارة منصات التواصل'],
                                'description' => ['en' => 'Consistent, on-brand posting.', 'ar' => 'نشر دوري يعكس هوية علامتك التجارية باحتراف.']
                            ],
                            [
                                'icon' => 'Megaphone',
                                'title' => ['en' => 'Paid Ads', 'ar' => 'الإعلانات الممولة'],
                                'description' => ['en' => 'Targeted campaigns on Google & Meta.', 'ar' => 'حملات موجهة بدقة على جوجل وميتا.']
                            ],
                            [
                                'icon' => 'PenTool',
                                'title' => ['en' => 'Content Creation', 'ar' => 'صناعة المحتوى'],
                                'description' => ['en' => 'Visuals, copy, and creative assets.', 'ar' => 'تصاميم ونصوص ورسومات مبتكرة تجذب جمهورك.']
                            ],
                            [
                                'icon' => 'Search',
                                'title' => ['en' => 'SEO', 'ar' => 'تحسين محركات البحث'],
                                'description' => ['en' => 'Optimized to rank and get found.', 'ar' => 'تهيئة دائمة لتصدر نتائج البحث واستقطاب الزوار.']
                            ],
                            [
                                'icon' => 'BarChart3',
                                'title' => ['en' => 'Analytics & Reporting', 'ar' => 'التحليلات والتقارير'],
                                'description' => ['en' => 'Clear monthly performance insights.', 'ar' => 'تقارير شهرية واضحة ومفهومة توضح تطور الأداء.']
                            ]
                        ]
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Ready To Grow?', 'ar' => 'جاهز للبدء والنمو؟'],
                        'subtitle' => ['en' => 'Tell us about your business and let us build something that delivers.', 'ar' => 'تواصل معنا اليوم لبدء خطتك التسويقية المخصصة.'],
                        'button_text' => ['en' => 'Get Started Today', 'ar' => 'ابدأ معنا اليوم'],
                        'button_link' => '/contact',
                        'image' => '/images/services/subscription-cta-banner.png',
                        'theme' => 'silhouettes'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'Subscription Marketing Plans | Smart Touch', 'ar' => 'باقات التسويق بالاشتراك الشهري | سمارت تاتش'],
                    'meta_description' => ['en' => 'Flexible monthly digital marketing subscription plans without long term contracts for growing businesses.', 'ar' => 'باقات تسويق رقمي شهرية مرنة دون عقود طويلة تلائم مختلف مراحل نمو الشركات.']
                ]
            ],

            // 5. Hosting & Infrastructure
            [
                'slug' => ['en' => 'hosting-infrastructure', 'ar' => 'al-istidafa-wal-binya-al-tahtiyya'],
                'title' => ['en' => 'Hosting & Infrastructure', 'ar' => 'الاستضافة والبنية التحتية'],
                'short_description' => [
                    'en' => 'Nobody really notices hosting until something goes wrong with it. At Smart Touch, we provide you with managed cloud hosting and server management to eliminate downtime.',
                    'ar' => 'نادراً ما ينتبه أحد للاستضافة حتى يحدث عطل طارئ. في سمارت تاتش نقدم استضافة سحابية مدارة بالكامل تحمي موقعك وتضمن استقراره الدائم.'
                ],
                'icon' => 'Server',
                'featured_image' => '/images/services/hosting-hero.png',
                'sort_order' => 5,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'Hosting & Infrastructure', 'ar' => 'الاستضافة والبنية التحتية'],
                        'lead' => [
                            'en' => 'Nobody really notices hosting until something goes wrong with it. By then, it is already too late to think about it properly. So at Smart Touch, we provide you with a managed hosting service to manage your website in order to avoid this error.',
                            'ar' => 'نادراً ما ينتبه أحد للاستضافة حتى يحدث عطل طارئ، وحينها يكون الأوان قد فات. في سمارت تاتش نقدم استضافة مدارة بالكامل تحمي موقعك وتضمن استقراره الدائم.'
                        ],
                        'image' => '/images/services/hosting-hero.png'
                    ],
                    [
                        'id' => 'managed-hosting',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Managed Hosting', 'ar' => 'الاستضافة المدارة بالكامل'],
                        'subtitle' => [
                            'en' => 'Enterprise performance without server management headaches.',
                            'ar' => 'أداء فائق للشركات دون عناء إدارة وتأمين الخوادم بنفسك.'
                        ],
                        'columns' => 4,
                        'cards' => [
                            [
                                'icon' => 'Cloud',
                                'title' => ['en' => 'Server Setup (AWS, Google Cloud, Azure, Alibaba Cloud)', 'ar' => 'إعداد السحابة (AWS, Google, Azure)'],
                                'description' => [
                                    'en' => 'Every project is different, so the server setup changes too. Sometimes AWS makes sense, sometimes it is Google Cloud or Azure, sometimes Alibaba Cloud fits better depending on where your users are. We pick based on what you actually need, not what is easiest for us.',
                                    'ar' => 'نختار ونعد الخادم الأنسب لطبيعة مشروعك وجغرافية زوارك، سواء كان AWS أو Google Cloud أو Azure.'
                                ]
                            ],
                            [
                                'icon' => 'Activity',
                                'title' => ['en' => 'Server Monitoring', 'ar' => 'مراقبة الخوادم 24/7'],
                                'description' => [
                                    'en' => 'Once it is running, somebody has to watch it. Not glance at it once a day; actually watch it. Load, memory, uptime, all tracked constantly. Most issues get caught and fixed quietly, long before a visitor would ever notice anything happened.',
                                    'ar' => 'نراقب موارد الخادم واستقراره لحظة بلحظة، ونعالج التحديات التقنية بصمت قبل أن يشعر بها الزائر.'
                                ]
                            ],
                            [
                                'icon' => 'Zap',
                                'title' => ['en' => 'Performance Optimization', 'ar' => 'تحسين الأداء والسرعة'],
                                'description' => [
                                    'en' => 'Servers slow down as traffic builds; that is just how it works. So configurations get revisited and adjusted along the way instead of staying frozen from day one.',
                                    'ar' => 'نضبط إعدادات الخوادم دورياً مع زيادة حركة المرور لضمان استمرار الاستجابة الفائقة.'
                                ]
                            ],
                            [
                                'icon' => 'Database',
                                'title' => ['en' => 'Backup Management', 'ar' => 'إدارة النسخ الاحتياطي'],
                                'description' => [
                                    'en' => 'And backups run on their own, on schedule, so no manual reminders needed. One less thing to lose sleep over.',
                                    'ar' => 'نسخ احتياطي مؤتمت ومستمر وفق جداول منتظمة لضمان حماية بياناتك وأمانها الكامل.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'performance-opt',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Website Performance Optimization', 'ar' => 'تحسين أداء وسرعة المواقع'],
                        'subtitle' => [
                            'en' => 'A slow page costs you the visitor before they even read a word. Speed is not a nice-to-have here, it is the whole game.',
                            'ar' => 'الموقع البطيء يخسرك الزائر قبل أن يقرأ كلمة واحدة. السرعة ليست ميزة إضافية، بل هي الأساس.'
                        ],
                        'columns' => 4,
                        'cards' => [
                            [
                                'icon' => 'Globe',
                                'title' => ['en' => 'CDN Optimization (Cloudflare)', 'ar' => 'شبكة توزيع المحتوى (Cloudflare CDN)'],
                                'description' => [
                                    'en' => 'Content gets routed through Cloudflare so it loads from somewhere close to whoever is visiting, rather than traveling from one server far away every single time.',
                                    'ar' => 'توزيع البيانات عبر أقرب خادم للزائر حول العالم لتقليل زمن الاستجابة إلى أقصى حد.'
                                ]
                            ],
                            [
                                'icon' => 'Cpu',
                                'title' => ['en' => 'LiteSpeed / Nginx Tuning', 'ar' => 'تهيئة LiteSpeed / Nginx'],
                                'description' => [
                                    'en' => 'Most hosting providers stop at installing LiteSpeed or Nginx and leave the defaults untouched. We go further and actually tune the settings for real performance gains.',
                                    'ar' => 'نضبط ونخصص إعدادات LiteSpeed و Nginx المتقدمة لمضاعفة سرعة معالجة الطلبات.'
                                ]
                            ],
                            [
                                'icon' => 'HardDrive',
                                'title' => ['en' => 'Database Optimization', 'ar' => 'تحسين قواعد البيانات'],
                                'description' => [
                                    'en' => 'A page can look perfectly fine and still load slowly because of one bad query sitting underneath it. That is usually where we look first when something feels off.',
                                    'ar' => 'تنظيف الاستعلامات وفهرستها لمنع أي بطء ناتج عن تراكم البيانات.'
                                ]
                            ],
                            [
                                'icon' => 'Layers',
                                'title' => ['en' => 'Caching Layers (Redis, Varnish)', 'ar' => 'طبقات التخزين المؤقت (Redis, Varnish)'],
                                'description' => [
                                    'en' => 'Redis and Varnish sit in the middle, holding onto content so it does not need rebuilding from scratch on every single visit.',
                                    'ar' => 'حفظ الصفحات والاستجابات المتكررة لمنح الزوار تجربة تصفح فورية وخاطفة.'
                                ]
                            ],
                            [
                                'icon' => 'TrendingUp',
                                'title' => ['en' => 'Traffic Spike Handling', 'ar' => 'استيعاب طفرات الزيارات المفاجئة'],
                                'description' => [
                                    'en' => 'Sudden surges happen; a post goes viral, a sale goes live, and the site needs to survive that moment without falling over.',
                                    'ar' => 'حماية موقعك من الانهيار أثناء الحملات الإعلانية ومواسم التخفيضات الكبرى.'
                                ]
                            ],
                            [
                                'icon' => 'Shuffle',
                                'title' => ['en' => 'Load Balancing', 'ar' => 'توزيع الأحمال (Load Balancing)'],
                                'description' => [
                                    'en' => 'That survival comes down to load balancing: splitting traffic across several servers instead of letting one carry all the weight alone.',
                                    'ar' => 'توزيع حركة المرور بذكاء على عدة خوادم لمنع الضغط والتعطل.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'security',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'Security & Protection', 'ar' => 'الأمان والحماية المتقدمة'],
                        'subtitle' => [
                            'en' => 'Most businesses think about security after something goes wrong; a breach, a defaced website, or a server that suddenly stops responding. By then, the damage is done, and fixing it costs far more than preventing it would have ever done. We do not wait for the incident. We build the defenses before anyone tests them.',
                            'ar' => 'تفكر أغلب الشركات في الأمان بعد وقوع الكارثة. في سمارت تاتش، لا ننتظر وقوع الحادث، بل نبني التحصينات الاستباقية لحماية بياناتك.'
                        ],
                        'items' => [
                            [
                                'title' => ['en' => 'Comprehensive Defense Architecture', 'ar' => 'بنية دفاعية متكاملة'],
                                'description' => [
                                    'en' => 'We deploy active firewalls, rate limiting, and real-time vulnerability monitoring to safeguard your mission-critical applications.',
                                    'ar' => 'نطبق جدران نارية متطورة وحماية ضد هجمات حجب الخدمة ومراقبة فورية للثغرات.'
                                ],
                                'image' => '/images/services/hosting-security.png',
                                'checkpoints' => [
                                    ['en' => 'Firewall Configuration: A server without a properly configured firewall is an open door. We design and implement firewall rules that block unauthorized traffic.', 'ar' => 'إعداد الجدار الناري: قواعد صارمة لمنع الوصول غير المصرح به.'],
                                    ['en' => 'DDoS Protection: We layer traffic-filtering and rate-limiting strategies to absorb and deflect attack traffic before it reaches your infrastructure.', 'ar' => 'الحماية من هجمات DDoS: امتصاص الهجمات وتصفيتها لضمان بقاء الموقع متصلاً.'],
                                    ['en' => 'Malware Removal: We run deep scans, identify compromised files, remove the threat at the root, and trace how it got in so it does not happen again.', 'ar' => 'فحص وإزالة البرمجيات الخبيثة وتتبع مصدر الاختراق لمنع تكراره.'],
                                    ['en' => 'Server Hardening: We strip out what does not need to be there, close unnecessary services, and tighten everything down.', 'ar' => 'تحصين الخوادم: إغلاق المنافذ الزائدة وتعزيز صلاحيات الوصول لأعلى درجات الأمان.'],
                                    ['en' => 'Vulnerability Scanning: Automated routine scans to detect weakness before attackers do.', 'ar' => 'فحص دوري للثغرات البرمجية والتعامل الفوري مع أي ثغرة جديدة.']
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'backup-disaster',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Backup & Disaster Recovery', 'ar' => 'النسخ الاحتياطي والتعافي من الكوارث'],
                        'columns' => 2,
                        'cards' => [
                            [
                                'icon' => 'Archive',
                                'title' => ['en' => 'Automated Backups', 'ar' => 'النسخ الاحتياطي الآلي'],
                                'description' => [
                                    'en' => 'Manual backups get skipped. Schedules slip. Someone forgets. We take that dependency on human memory out of the equation entirely. Your data backs up automatically on a schedule you define, with verification to confirm each backup is actually usable, not just a file that exists.',
                                    'ar' => 'أتمتة شاملة للنسخ الاحتياطي مع التحقق الدوري من سلامة النسخ وإمكانية استرجاعها فوراً.'
                                ]
                            ],
                            [
                                'icon' => 'ShieldCheck',
                                'title' => ['en' => 'Disaster Recovery Planning', 'ar' => 'خطة التعافي من الكوارث'],
                                'description' => [
                                    'en' => 'A recovery plan that only exists in someone\'s head is not a plan. We work with you to document exactly what needs to happen when something goes wrong: which systems get restored first, who is responsible, how long it should take.',
                                    'ar' => 'خطة استجابة موثقة بدقة تحدد خطوات استعادة الأنظمة وأولوياتها لتقليل فترات التوقف.'
                                ]
                            ],
                            [
                                'icon' => 'Globe',
                                'title' => ['en' => 'Multi-Region Redundancy', 'ar' => 'النسخ المتعدد في مناطق جغرافية مختلفة'],
                                'description' => [
                                    'en' => 'Storing backups in the same location as your primary infrastructure defeats the purpose. We distribute your data across multiple geographic regions so that a regional outage does not take your backups down with it.',
                                    'ar' => 'توزيع النسخ على مراكز بيانات جغرافية متعددة لضمان بقاء بياناتك حتى في حالات تعطل مركز بيانات كامل.'
                                ]
                            ],
                            [
                                'icon' => 'RefreshCw',
                                'title' => ['en' => 'Failover Systems', 'ar' => 'أنظمة التحويل التلقائي عند الأعطال (Failover)'],
                                'description' => [
                                    'en' => 'When a primary server goes down, your failover system should take over before most users even notice. When a primary server goes down, traffic shifts to a standby environment within seconds. Your services stay online. Your users don\'t notice.',
                                    'ar' => 'تحويل الزيارات تلقائياً خلال ثوانٍ إلى بيئة بديلة عند حدوث أي خلل في الخادم الأساسي.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'monitoring',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Monitoring & Incident Response', 'ar' => 'المراقبة والاستجابة للحوادث'],
                        'columns' => 4,
                        'cards' => [
                            [
                                'icon' => 'Activity',
                                'title' => ['en' => 'Uptime Monitoring', 'ar' => 'مراقبة التوفر والاستقرار'],
                                'description' => ['en' => 'Continuous checkups to ensure maximum uptime.', 'ar' => 'فحص دوري على مدار الثانية للتأكد من اتصال الموقع وعمله بأعلى كفاءة.']
                            ],
                            [
                                'icon' => 'Bell',
                                'title' => ['en' => 'Alert System', 'ar' => 'نظام إنذار مبكر'],
                                'description' => ['en' => 'Instant alerts on performance dips or resource limits.', 'ar' => 'تنبيهات فورية للمهندسين عند أي مؤشر على هبوط الأداء.']
                            ],
                            [
                                'icon' => 'Wrench',
                                'title' => ['en' => 'Troubleshooting', 'ar' => 'استكشاف الأعطال وحلها'],
                                'description' => ['en' => 'Rapid technical diagnosis and fix.', 'ar' => 'تشخيص فوري ومعالجة جذرية للمشاكل التقنية المعقدة.']
                            ],
                            [
                                'icon' => 'ShieldAlert',
                                'title' => ['en' => 'Emergency Response', 'ar' => 'استجابة فورية للطوارئ'],
                                'description' => ['en' => 'Rapid action to minimize downtime.', 'ar' => 'فريق طوارئ متأهب على مدار الساعة للتدخل العاجل وحماية سير أعمالك.']
                            ]
                        ]
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Ready To Build A Secure And High-Performance Infrastructure?', 'ar' => 'جاهز لتأسيس بنية تحتية سحابية فائقة السرعة والأمان؟'],
                        'subtitle' => ['en' => 'Contact us today and let our experts design the hosting solution your business needs.', 'ar' => 'تواصل مع خبرائنا اليوم لتصميم البيئة السحابية الأمثل لمتطلبات عملك.'],
                        'button_text' => ['en' => 'Contact Us', 'ar' => 'تواصل معنا'],
                        'button_link' => '/contact',
                        'image' => '/images/services/hosting-cta-banner.png',
                        'theme' => 'server'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'Managed Cloud Hosting & Infrastructure | Smart Touch', 'ar' => 'الاستضافة السحابية المدارة والبنية التحتية | سمارت تاتش'],
                    'meta_description' => ['en' => 'Reliable managed cloud hosting on AWS, Google Cloud, and Azure with 99.9% uptime and 24/7 monitoring.', 'ar' => 'استضافة سحابية مدارة على AWS و Google Cloud و Azure مع مراقبة مدار الساعة وحماية متقدمة.']
                ]
            ],

            // 6. CRM & Marketing Automation
            [
                'slug' => ['en' => 'crm-marketing-automation', 'ar' => 'idarat-ilaqat-al-umala-wal-atmatat'],
                'title' => ['en' => 'CRM & Marketing Automation', 'ar' => 'إدارة علاقات العملاء والأتمتة التسويقية'],
                'short_description' => [
                    'en' => 'Most businesses don\'t have a data problem; they have a scattered data problem. We come in, understand how your team sells, and build your CRM and automation properly.',
                    'ar' => 'لا تعاني الشركات من نقص البيانات بل من تشتتها. ندرس أسلوب مبيعاتك ونبني لك نظام CRM وأتمتة متقناً على HubSpot أو Salesforce أو Zoho أو Odoo.'
                ],
                'icon' => 'Users',
                'featured_image' => '/images/services/crm-hero.png',
                'sort_order' => 6,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'CRM & Marketing Automation', 'ar' => 'إدارة علاقات العملاء والأتمتة التسويقية'],
                        'lead' => [
                            'en' => 'Most businesses don\'t have a data problem; they have a scattered data problem, with leads in one place, customer information in another, and a sales team working off memory. We fix that.',
                            'ar' => 'لا تعاني معظم الشركات من نقص البيانات، بل من تشتتها بين جهات الاتصال وملفات الإكسل دون مركز موحد. نحن نعالج هذه الفجوة ونوحد بياناتك.'
                        ],
                        'image' => '/images/services/crm-hero.png'
                    ],
                    [
                        'id' => 'crm-platforms',
                        'type' => 'platform_logos',
                        'title' => ['en' => 'CRM Setup & Integration', 'ar' => 'إعداد ودمج أنظمة إدارة علاقات العملاء'],
                        'subtitle' => [
                            'en' => "If you already have a CRM, it's either half-configured or quietly being ignored. If you don't have one yet, picking the wrong setup will cost you more than starting without one.\n\nWe come in, understand how your team sells, and build it properly: whether that's HubSpot, Salesforce, Zoho, or Odoo.",
                            'ar' => "إن كان لديك نظام CRM، فهو غالباً غير مكتمل الإعداد أو مهمل. وإن لم تكن تملكه، فاختيار المنظومة الخاطئة سيكلفك الكثير.\n\nنحن ندرس آلية مبيعاتك ونبني النظام المناسب لك سواء على HubSpot أو Salesforce أو Zoho أو Odoo."
                        ],
                        'platforms' => [
                            ['name' => 'HubSpot', 'logo' => '/images/services/crm-platform-hubspot.png'],
                            ['name' => 'Salesforce', 'logo' => '/images/services/crm-platform-salesforce.png'],
                            ['name' => 'Zoho', 'logo' => '/images/services/crm-platform-zoho.png'],
                            ['name' => 'Odoo', 'logo' => '/images/services/crm-platform-odoo.png']
                        ],
                        'cards' => [
                            [
                                'icon' => 'Users',
                                'title' => ['en' => 'CRM Setup', 'ar' => 'تهيئة نظام الـ CRM'],
                                'description' => [
                                    'en' => 'Your pipeline, your stages, your team\'s structure. We configure everything to match how deals actually move in your business, not how the software demo showed it.',
                                    'ar' => 'مسارات المبيعات، ومراحل الصفقات، وهيكلة الفريق. نهيئ كل شيء ليطابق الواقع الفعلي لحركة مبيعاتك.'
                                ]
                            ],
                            [
                                'icon' => 'Code',
                                'title' => ['en' => 'Website Integration', 'ar' => 'الربط التقني بالموقع'],
                                'description' => [
                                    'en' => 'Every form fill, page visit, and chat gets captured and sent straight to your CRM. No manual imports, no leads sitting in someone\'s inbox.',
                                    'ar' => 'الربط الآلي بين نماذج موقعك، والمحادثات، ونظام الـ CRM مباشرة دون أي إدخال يدوي مفقود.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'marketing-automation',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'Marketing Automation Services in Smart Touch', 'ar' => 'خدمات الأتمتة التسويقية في سمارت تاتش'],
                        'subtitle' => [
                            'en' => 'At Smart Touch, we help your businesses automate customer interactions via WhatsApp, email campaigns, and customer journey mapping, and implement marketing activities with minimal human intervention as possible.',
                            'ar' => 'نساعدك في أتمتة تفاعلات العملاء عبر رسائل واتساب، والحملات البريدية، ومسارات التحويل بأقل تدخل بشري ممكن.'
                        ],
                        'items' => [
                            [
                                'title' => ['en' => 'Email Automation', 'ar' => 'أتمتة البريد الإلكتروني'],
                                'description' => [
                                    'en' => 'Marketing automation plays an effective role in the email part by delivering the right message to the right audience at the right time, through many steps like:',
                                    'ar' => 'إيصال الرسالة المناسبة للشخص المناسب في التوقيت المثالي عبر خطوات ذكية:'
                                ],
                                'image' => '/images/services/crm-email.png',
                                'checkpoints' => [
                                    ['en' => 'Sending welcome messages immediately after subscribing.', 'ar' => 'إرسال رسائل ترحيب فورية عند الاشتراك.'],
                                    ['en' => 'Predicting ideal sending times, message titles, and types of personalized content that are most attractive to the customer.', 'ar' => 'تحديد التوقيت الأمثل والعناوين الجذابة بناءً على اهتمامات العميل.'],
                                    ['en' => 'Formulating and modifying mail content based on user behavior to ensure that messages arrive that are consistent with the interests of each individual customer.', 'ar' => 'تخصيص المحتوى وفق سلوك وتفاعل كل عميل.']
                                ]
                            ],
                            [
                                'title' => ['en' => 'WhatsApp Automation', 'ar' => 'أتمتة رسائل واتساب'],
                                'description' => [
                                    'en' => 'What distinguishes WhatsApp most from other applications is that it is a direct and continuous line of communication with customers. We automate WhatsApp for your business:',
                                    'ar' => 'واتساب هو قناة التواصل المباشرة الأكثر تفاعلاً مع العملاء في المنطقة:'
                                ],
                                'image' => '/images/services/crm-whatsapp.png',
                                'checkpoints' => [
                                    ['en' => 'Automated response to frequently asked questions.', 'ar' => 'ردود آلية ذكية وفورية على استفسارات العملاء المتكررة.'],
                                    ['en' => 'Follow up on order status updates.', 'ar' => 'تحديثات وإشعارات حالة الطلبات والمشتريات آلياً.'],
                                    ['en' => 'Book appointments.', 'ar' => 'تأكيد المواعيد والحجوزات ومتابعتها.'],
                                    ['en' => 'Lead classification.', 'ar' => 'تصنيف وتوجيه العملاء المحتملين تلقائياً إلى الفريق المختص.']
                                ]
                            ],
                            [
                                'title' => ['en' => 'Customer Journey Automation', 'ar' => 'أتمتة مسار رحلة العميل'],
                                'description' => [
                                    'en' => 'This process allows tracking a customer\'s individual transactions across various channels, in order to design a comprehensive customer journey aimed at making purchasing decisions without the need for manual analysis.',
                                    'ar' => 'تتبع تفاعلات العميل عبر مختلف القنوات وتوجيهه بذكاء وسلاسة نحو قرار الشراء دون حاجة للتدخل اليدوي المستمر.'
                                ],
                                'image' => '/images/services/crm-journey.png'
                            ]
                        ]
                    ],
                    [
                        'id' => 'why-us',
                        'type' => 'why_us',
                        'title' => ['en' => 'Why Smart Touch?', 'ar' => 'لماذا سمارت تاتش؟'],
                        'description' => [
                            'en' => 'A few things that set our CRM & Automation apart:',
                            'ar' => 'إليك ما يميز حلولنا في الـ CRM والأتمتة:'
                        ],
                        'checkpoints' => [
                            ['en' => 'We build CRM systems people actually use by configuring them around how your team works, training everyone properly, and staying involved after launch to make sure adoption sticks.', 'ar' => 'نبني أنظمة يستخدمها فريقك بالفعل عبر تهيئتها لتناسب أسلوب عملهم وتدريبهم المستمر عليها.'],
                            ['en' => 'We create data-driven automation strategies tailored to achieve your business goals.', 'ar' => 'استراتيجيات أتمتة دقيقة مصممة خصيصاً لتحقيق مستهدفاتك البيعية والتسويقية.'],
                            ['en' => 'We continuously improve your systems to maximize performance and ROI.', 'ar' => 'تحسين مستمر لضمان أعلى عائد استثماري من منظومة الـ CRM.'],
                            ['en' => 'We reduce human intervention and errors by up to 98%.', 'ar' => 'تقليص التدخل البشري والأخطاء الإدارية بنسبة تصل إلى 98%.']
                        ],
                        'image' => '/images/services/crm-why-us.png',
                        'cta_box' => [
                            'title' => ['en' => 'Contact us now to discuss your requirements and find the best solutions for your business.', 'ar' => 'تواصل معنا لمناقشة متطلباتك وتحديد الحل الأنسب لمشروعك.'],
                            'button_text' => ['en' => 'Contact Us', 'ar' => 'تواصل معنا'],
                            'button_link' => '/contact'
                        ]
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Ready To Start Your Project?', 'ar' => 'جاهز لبدء مشروعك معنا؟'],
                        'button_text' => ['en' => 'Chat on WhatsApp', 'ar' => 'تحدث معنا عبر واتساب'],
                        'button_link' => 'https://wa.me/966500000000',
                        'image' => '/images/services/crm-cta-banner.png',
                        'theme' => 'whatsapp'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'CRM & Marketing Automation Services | Smart Touch', 'ar' => 'إدارة علاقات العملاء والأتمتة التسويقية | سمارت تاتش'],
                    'meta_description' => ['en' => 'Certified CRM setup on HubSpot, Salesforce, Zoho, and Odoo with WhatsApp and email automation.', 'ar' => 'تهيئة أنظمة CRM معتمدة على هب سبوت وسيلزفورس وزوهو وأودو مع أتمتة الواتساب والإيميل.']
                ]
            ],

            // 7. Marketing Technology
            [
                'slug' => ['en' => 'marketing-technology', 'ar' => 'tiknolojya-al-tasweeq'],
                'title' => ['en' => 'Marketing Technology', 'ar' => 'تكنولوجيا التسويق (MarTech)'],
                'short_description' => [
                    'en' => 'Marketing evolves quickly, and your technology needs to keep pace. At Smart Touch, we build the systems that connect your stack, automate the busywork, and turn your marketing tech into an engine for growth.',
                    'ar' => 'يتطور التسويق باستمرار ويجب أن تواكب أدواتك هذا التطور. في سمارت تاتش، نبني منظومات تربط أدواتك التسويقية وتوفر وقت فريقك للتركيز على النمو.'
                ],
                'icon' => 'Cpu',
                'featured_image' => '/images/services/martech-hero.png',
                'sort_order' => 7,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'Marketing Technology', 'ar' => 'تكنولوجيا التسويق (MarTech)'],
                        'lead' => [
                            'en' => 'Marketing evolves quickly, and your technology needs to keep pace. When your tools don\'t talk to each other, your team spends more time chasing data than using it. At Smart Touch, we build the systems that connect your stack, automate the busywork, and turn your marketing technology into something that works for you, not against you.',
                            'ar' => 'يتطور التسويق بسرعة فائقة، ويجب أن تواكب أدواتك هذا التطور. عندما لا تتصل أنظمتك ببعضها، يضيع وقت فريقك في جمع البيانات يدوياً. نبني منظومات تربط أدواتك التسويقية وتوفر وقت فريقك للتركيز على النمو.'
                        ],
                        'image' => '/images/services/martech-hero.png'
                    ],
                    [
                        'id' => 'martech-dev',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'Marketing Tech Development', 'ar' => 'تطوير حلول تكنولوجيا التسويق'],
                        'items' => [
                            [
                                'title' => ['en' => 'Marketing Automation Tools', 'ar' => 'أدوات الأتمتة التسويقية'],
                                'description' => [
                                    'en' => 'Manually triggering every email, follow-up, and lead handoff does not scale. Generic automation platforms only get you so far before you are working around their limitations instead of your own process. We build custom automation tools tailored to how your team actually sells and markets, so leads are nurtured, follow-ups are delivered on time, and opportunities aren\'t lost due to manual processes.',
                                    'ar' => 'المتابعة اليدوية للعملاء لا تصمد مع نمو الأعمال. نبني حلول أتمتة مخصصة وفق دورة المبيعات الخاصة بك لضمان رعاية كل فرصة بيعية في وقتها.'
                                ],
                                'image' => '/images/services/martech-tools.png'
                            ],
                            [
                                'title' => ['en' => 'Data Integrations', 'ar' => 'ربط وتكامل البيانات'],
                                'description' => [
                                    'en' => 'Your CRM doesn\'t talk to your ad platforms. Your website doesn\'t talk to your email tool. And somewhere in between, someone is exporting spreadsheets just to keep the numbers aligned. We connect the platforms in your stack so data moves between them automatically, giving your team a single, reliable source of data instead of disconnected information across multiple systems.',
                                    'ar' => 'ربط منصات الإعلانات، والموقع، والـ CRM ببعضها تلقائياً دون الحاجة لتصدير ملفات إكسل يدوية، لتكون كافة البيانات متزامنة وموثوقة.'
                                ],
                                'image' => '/images/services/martech-data.png'
                            ]
                        ]
                    ],
                    [
                        'id' => 'dashboards-attribution',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Custom Dashboards & Attribution', 'ar' => 'لوحات التحكم المخصصة ونماذج الإسناد'],
                        'columns' => 3,
                        'theme' => 'lavender_container',
                        'cards' => [
                            [
                                'icon' => 'LayoutGrid',
                                'title' => ['en' => 'Custom Marketing Dashboards', 'ar' => 'لوحات تحكم تسويقية مخصصة'],
                                'description' => [
                                    'en' => 'Off-the-shelf reporting tools show you what the platform thinks matters, not necessarily what matters to your business. We build dashboards designed around your specific goals and metrics, so the people who need answers can find them without digging through tabs and fields that don\'t apply to how you operate.',
                                    'ar' => 'تقارير مصممة خصيصاً لمؤشرات الأداء التي تهم إدارتك التنفيذية بدلاً من التقارير العامة غير المفيدة.'
                                ]
                            ],
                            [
                                'icon' => 'Shuffle',
                                'title' => ['en' => 'Attribution Systems', 'ar' => 'أنظمة قياس وإسناد العائد (Attribution)'],
                                'description' => [
                                    'en' => 'If your reporting hands the credit for every sale to the last click, you\'re probably misreading your own funnel and misallocating your budget along with it. We build attribution systems that track the full customer journey across touchpoints, so you can see what\'s actually driving conversions, not just what happened right before someone bought.',
                                    'ar' => 'تتبع الرحلة الكاملة للعميل عبر كافة نقاط الاتصال لتوزيع ميزانيتك بذكاء على القنوات الأكثر فاعلية.'
                                ]
                            ],
                            [
                                'icon' => 'PieChart',
                                'title' => ['en' => 'Analytics Platforms', 'ar' => 'منصات التحليل الشامل'],
                                'description' => [
                                    'en' => 'Checking performance across separate tools for ads, email, your website, and social means piecing together the same picture from fragments every single time. We build unified analytics platforms that bring every metric into one place, so your team can see the full performance picture without having to move between multiple platforms and reporting tools.',
                                    'ar' => 'توحيد كافة إحصائيات الإعلانات والموقع والتواصل الاجتماعي في واجهة موحدة توفر الرؤية الشاملة للأداء.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'why-us',
                        'type' => 'why_us',
                        'title' => ['en' => 'Why Smart Touch?', 'ar' => 'لماذا سمارت تاتش؟'],
                        'description' => [
                            'en' => 'We build around the stack you already have, give your team more day-to-day control, and stick with you after launch to keep things running.',
                            'ar' => 'نبني حلولنا بالاعتماد على أدواتك الحالية، ونمنح فريقك سهولة التحكم، ونوفر دعماً تقنياً مستمراً.'
                        ],
                        'checkpoints' => [
                            ['en' => 'We Build Around What You Already Use: No migration, no ripping out your CRM or ad platforms. We build the integrations and automations on top of what is already working.', 'ar' => 'نطور فوق أدواتك الحالية دون الحاجة لتغييرها أو إرباك سير عملك.'],
                            ['en' => 'Your Team Shouldn\'t Depend on Developers for Every Change: Segments, triggers, and dashboards: your marketing team can adjust these directly without waiting for a dev ticket.', 'ar' => 'تمكين فريق التسويق من تعديل الشرائح والمؤشرات بنفسه دون انتظار المبرمجين.'],
                            ['en' => 'Arabic, Done Properly: RTL dashboards, bilingual reporting, and marketing automation that is actually built for Arabic, not just translated after the fact.', 'ar' => 'دعم كامل للغة العربية والاتجاه من اليمين لليسار، وتقارير ثنائية اللغة صممت خصيصاً للسوق العربي.'],
                            ['en' => 'We Stay After Launch: APIs change. Attribution models drift. We catch that before it shows up in your numbers and keep things accurate over time.', 'ar' => 'متابعة فنية مستمرة وصيانة دورية للواجهات البرمجية لضمان دقة البيانات دائماً.']
                        ],
                        'image' => '/images/services/martech-why-us.png'
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Get A Free Consultation', 'ar' => 'احصل على استشارة تقنية مجانية'],
                        'button_text' => ['en' => 'Chat on WhatsApp', 'ar' => 'تحدث معنا عبر واتساب'],
                        'button_link' => 'https://wa.me/966500000000',
                        'image' => '/images/services/martech-cta-banner.png',
                        'theme' => 'consultation'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'Marketing Technology (MarTech) Solutions | Smart Touch', 'ar' => 'حلول تكنولوجيا التسويق (MarTech) | سمارت تاتش'],
                    'meta_description' => ['en' => 'Connect your marketing stack, build custom attribution systems, and eliminate manual data reporting.', 'ar' => 'ربط وتكامل الأدوات التسويقية، وتطوير لوحات تحكم وإسناد مخصصة تزيد من كفاءة أعمالك.']
                ]
            ],

            // 8. AI & Data Analytics
            [
                'slug' => ['en' => 'ai-data-analytics', 'ar' => 'al-dhaka-al-istinaie-wa-tahlil-al-bayanat'],
                'title' => ['en' => 'AI & Data Analytics', 'ar' => 'الذكاء الاصطناعي وتحليل البيانات'],
                'short_description' => [
                    'en' => 'Every campaign, every customer interaction, and every platform you use generates data. At Smart Touch, we build the systems and frameworks to turn that data into decisions.',
                    'ar' => 'تولد كل حملة وتفاعل لعملائك آلاف البيانات. في سمارت تاتش، نبني الأنظمة التي تحول تلك البيانات إلى قرارات استثمارية مدروسة.'
                ],
                'icon' => 'Sparkles',
                'featured_image' => '/images/services/ai-hero.png',
                'sort_order' => 8,
                'is_active' => true,
                'sections' => [
                    [
                        'id' => 'hero',
                        'type' => 'hero',
                        'title' => ['en' => 'AI & Data Analytics', 'ar' => 'الذكاء الاصطناعي وتحليل البيانات'],
                        'lead' => [
                            'en' => 'Every campaign, every customer interaction, and every platform you use generates data. The question is whether that data is working for you. At Smart Touch, we build the systems and frameworks to turn that data into decisions.',
                            'ar' => 'تولد كل حملة إعلانية وتفاعل لعملائك آلاف نقاط البيانات. لكن التحدي هو كيفية الاستفادة منها. في سمارت تاتش، نبني الأنظمة التي تحول تلك البيانات إلى قرارات استثمارية مدروسة.'
                        ],
                        'image' => '/images/services/ai-hero.png'
                    ],
                    [
                        'id' => 'ai-marketing-solutions',
                        'type' => 'feature_split_list',
                        'title' => ['en' => 'AI Marketing Solutions', 'ar' => 'حلول الذكاء الاصطناعي في التسويق'],
                        'items' => [
                            [
                                'title' => ['en' => 'AI Content Generation Systems', 'ar' => 'أنظمة توليد المحتوى بالذكاء الاصطناعي'],
                                'description' => [
                                    'en' => 'Creating content at scale without losing quality is harder than it sounds. Most teams end up either producing too little or spreading themselves too thin in their effort to keep up. We build AI content systems trained on your brand tone, market, and messaging so output stays consistent and your team stops bottlenecking on production.',
                                    'ar' => 'إنتاج محتوى عالي الجودة بكميات كبيرة يشكل تحدياً للفرق. ندرب نماذج ذكاء اصطناعي خاصة بنبرة علامتك وسوقك لإنتاج محتوى متسق ومتقن بسرعة قياسية.'
                                ],
                                'image' => '/images/services/ai-content.png'
                            ],
                            [
                                'title' => ['en' => 'Predictive Marketing Analytics', 'ar' => 'تحليلات التسويق التنبؤية'],
                                'description' => [
                                    'en' => 'Waiting until a campaign ends to determine if it was successful is an expensive habit. We use AI to analyze your existing data and identify patterns that tell you where to put your budget, which segments are ready to convert, and where potential customers drop off before they get close to buying.',
                                    'ar' => 'الانتظار حتى نهاية الحملة لمعرفة النتائج يكلف الكثير. نوظف خوارزميات التنبؤ لتحليل البيانات وتحديد الشرائح الأكثر استعداداً للشراء بدقة.'
                                ],
                                'image' => '/images/services/ai-predictive.png'
                            ],
                            [
                                'title' => ['en' => 'Customer Segmentation AI', 'ar' => 'تقسيم وتصنيف العملاء بالذكاء الاصطناعي'],
                                'description' => [
                                    'en' => 'Sending the same message to your entire audience is one of the quickest ways to waste a marketing budget. Our AI groups your audience based on real actions, their behavior, what catches their attention, and what they scroll past, so each message reaches exactly who it should.',
                                    'ar' => 'إرسال نفس الرسالة لكل الجمهور يهدر ميزانيتك. يقسم الذكاء الاصطناعي عملاءك استناداً إلى سلوكهم الفعلي لضمان وصول الرسالة الأنسب لكل فئة.'
                                ],
                                'image' => '/images/services/ai-segmentation.png'
                            ]
                        ]
                    ],
                    [
                        'id' => 'marketing-data-analytics',
                        'type' => 'card_grid',
                        'title' => ['en' => 'Marketing Data & Analytics', 'ar' => 'بيانات وتحليلات التسويق المتقدمة'],
                        'columns' => 2,
                        'cards' => [
                            [
                                'icon' => 'BarChart2',
                                'title' => ['en' => 'Campaign Performance Dashboards', 'ar' => 'لوحات متابعة أداء الحملات'],
                                'description' => [
                                    'en' => 'Most performance reports tell you what happened. What they rarely show you is the reason behind the numbers, or the next step to take. We build dashboards that give your team a real-time view of what\'s working across every channel, clear enough that anyone on the team can read it and deep enough that it actually informs decisions.',
                                    'ar' => 'لوحات تحكم تمنحك رؤية فورية لما وراء الأرقام عبر جميع القنوات وتساعدك في توجيه ميزانياتك بثقة.'
                                ]
                            ],
                            [
                                'icon' => 'Database',
                                'title' => ['en' => 'Marketing Data Warehouse', 'ar' => 'مستودعات البيانات التسويقية (Data Warehouse)'],
                                'description' => [
                                    'en' => 'When your data lives across five platforms, and no one can agree on the numbers, decisions get delayed or made on instinct. We consolidate everything into one organized system, structured, clean, and connected, so your team is always working from a single source of truth.',
                                    'ar' => 'توحيد كافة بيانات عملائك وحملاتك من مختلف المنصات في مستودع بيانات منظم وموحد يكون المرجع الموثوق لفريقك.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => 'why-us',
                        'type' => 'why_us',
                        'title' => ['en' => 'Why Businesses Choose Smarttouch', 'ar' => 'لماذا تختار الشركات سمارت تاتش؟'],
                        'description' => [
                            'en' => 'Data projects fail for one reason more than any other: they get built around the tool, not the business. The dashboards look impressive; the system gets set up; and three months later, nobody\'s using it. We do it differently.',
                            'ar' => 'تفشل معظم مشاريع البيانات لأنها تُبنى حول الأداة بدلاً من حاجة العمل الحقيقية. نحن نركز على التطبيق العملي الذي يحقق قيمة فورية ومستمرة.'
                        ],
                        'checkpoints' => [
                            ['en' => 'We build around your business, not a template. Every solution we deliver is designed to align the way your team operates in reality.', 'ar' => 'نبني الأنظمة حول أسلوب عملك الحقيقي وليس قوالب جاهزة لا تناسب فريقك.'],
                            ['en' => 'Complete Arabic language support, including right-to-left dashboards, dual-language reports, and materials accessible to every member of your team.', 'ar' => 'دعم كامل للغة العربية وتقارير ثنائية اللغة ولوحات تحكم تفاعلية يفهمها الجميع.'],
                            ['en' => 'We will also help you with post-system deployment by making sure everything is running smoothly and making whatever adjustments are necessary to maintain your success.', 'ar' => 'دعم فني مستمر بعد التدشين لضمان عمل كافة النماذج واللوحات بأعلى كفاءة.']
                        ],
                        'note' => [
                            'en' => 'Tell us about your business. We\'ll show you exactly where AI and data can make the biggest difference for your team before you commit to anything.',
                            'ar' => 'أخبرنا عن عملك وسنوضح لك أين يمكن للذكاء الاصطناعي أن يحقق أكبر نقلة نوعية لفريقك.'
                        ]
                    ],
                    [
                        'id' => 'cta',
                        'type' => 'cta_banner',
                        'title' => ['en' => 'Ready To Start Your Project?', 'ar' => 'جاهز للبدء وإطلاق مشروعك؟'],
                        'button_text' => ['en' => 'Chat on WhatsApp', 'ar' => 'تحدث معنا عبر واتساب'],
                        'button_link' => 'https://wa.me/966500000000',
                        'image' => '/images/services/ai-cta-banner.png',
                        'theme' => 'whatsapp'
                    ]
                ],
                'seo' => [
                    'meta_title' => ['en' => 'AI & Data Analytics Marketing Solutions | Smart Touch', 'ar' => 'حلول الذكاء الاصطناعي وتحليل البيانات التسويقية | سمارت تاتش'],
                    'meta_description' => ['en' => 'AI content generation, predictive analytics, and automated marketing data warehouses built for scale.', 'ar' => 'أنظمة توليد المحتوى، التحليلات التنبؤية، ومستودعات البيانات التسويقية بالذكاء الاصطناعي.']
                ]
            ]
        ];

        foreach ($servicesData as $item) {
            $seoData = $item['seo'] ?? null;
            unset($item['seo']);

            // Find existing service by slug en or ar, or create new
            $service = Service::where(function ($q) use ($item) {
                $q->where('slug->en', $item['slug']['en'])
                  ->orWhere('slug->ar', $item['slug']['ar']);
            })->first();

            if ($service) {
                $service->update($item);
                echo "Updated service: {$item['title']['en']}\n";
            } else {
                $service = Service::create($item);
                echo "Created service: {$item['title']['en']}\n";
            }

            if ($seoData) {
                SeoMetadata::updateOrCreate(
                    ['entity_type' => 'service', 'entity_id' => $service->id],
                    $seoData
                );
            }
        }

        echo "Seeding completed successfully!\n";
    }
}
