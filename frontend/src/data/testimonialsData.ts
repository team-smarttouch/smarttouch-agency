export interface TestimonialItem {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  company: {
    en: string;
    ar: string;
  };
  avatar: string;
  rating: number;
  quote: {
    en: string;
    ar: string;
  };
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 8,
    name: {
      en: "MOHAMMED AL SAIF",
      ar: "محمد السيف",
    },
    role: {
      en: "Vice Chairman",
      ar: "نائب رئيس مجلس الإدارة",
    },
    company: {
      en: "Al Saif Group",
      ar: "مجموعة السيف",
    },
    avatar: "/images/testimonials/default.png",
    rating: 5,
    quote: {
      en: "There are many talented website developers out there, but finding a top-notch web designer is challenging for any business. In this day and age a website is a company’s identification card and we at Al Saif Group are extremely fortunate to have come across Smart Touch to create our company website. What impressed us the most and what we believe sets them apart from the rest is their response time and follow ups coupled with their extreme enthusiasm, insight, creativity and their attention to detail. Even under a short time frame they did not fail to deliver. We would like to thank the entire team at Smart Touch for all their hard work and cannot recommend them enough.",
      ar: "هناك العديد من مطوري المواقع الموهوبين، لكن العثور على مصمم ويب من الطراز الأول يمثل تحدياً لأي عمل. في عصرنا الحالي، الموقع الإلكتروني هو بطاقة هوية الشركة، ونحن في مجموعة السيف محظوظون للغاية بالتعامل مع سمارت تاتش لإنشاء موقع شركتنا. أكثر ما أثار إعجابنا وما يميزهم عن غيرهم هو سرعة استجابتهم ومتابعتهم المتواصلة مقترنة بالحماس البالغ والرؤية الثاقبة والإبداع والاهتمام بأدق التفاصيل. لم يتوانوا عن التسليم حتى في ضيق الوقت. نشكر فريق سمارت تاتش بأكمله على جهودهم ونوصي بهم بشدة.",
    },
  },
  {
    id: 7,
    name: {
      en: "KHALIFA AL MOHANNADI",
      ar: "خليفة المهندي",
    },
    role: {
      en: "General Manager",
      ar: "المدير العام",
    },
    company: {
      en: "Barwa Village",
      ar: "قرية بروة",
    },
    avatar: "/images/testimonials/barwa_village_general_manager.png",
    rating: 5,
    quote: {
      en: "We acknowledge that Smart Touch has done a study and a research for Barwa (Barwa Village) and it was creative. We would like to thank them for their well done research and designs proposed.",
      ar: "نقر بأن شركة سمارت تاتش قامت بدراسة وأبحاث لمشروع قرية بروة وكانت متميزة ومبتكرة. نود أن نشكرهم على أبحاثهم المتقنة والتصاميم المقترحة.",
    },
  },
  {
    id: 6,
    name: {
      en: "BASHAR AL-AZZAZ",
      ar: "بشار العزاز",
    },
    role: {
      en: "Marketing and Sales Manager",
      ar: "مدير التسويق والمبيعات",
    },
    company: {
      en: "Dar wa Emaar",
      ar: "دار وإعمار",
    },
    avatar: "/images/testimonials/bashar_image.png",
    rating: 5,
    quote: {
      en: "We thank Smart Touch for the creativity, utmost professionalism and for being open to new ideas. Also we would like to commend them for being responsive and patient and for handling the project well in spite of the pressure given. We are looking forward to work with Smart Touch again in the future.",
      ar: "نحن نشكر سمارت تاتش على الحس الإبداعي والاحتراف الهائل والانفتاح على الأفكار الجديدة. أيضاً نود أن نثني عليها لكونها متجاوبة وصبورة أثناء تعاملها مع المشروع بشكل جيد على الرغم من الضغط. ونحن نتمنى ونأمل في التعامل مع شركة سمارت تاتش مرة أخرى في المستقبل.",
    },
  },
  {
    id: 5,
    name: {
      en: "HESHAM KHAIRALLA",
      ar: "هشام خيرالله",
    },
    role: {
      en: "Co-Founder, Managing Partner",
      ar: "المؤسس المشارك، المدير الشريك",
    },
    company: {
      en: "Strategia Consulting",
      ar: "استراتيجيا للاستشارات",
    },
    avatar: "/images/testimonials/hesham_strategia_img.png",
    rating: 5,
    quote: {
      en: "It's very hard finding web design/web development solutions that are both professional yet price-competitive when compared to the vast options out there. SmartTouch was a great example of providing that. With their prompt and professional team combined with high quality creativity and design, we ended up with our company website up and running in no time. This is a company I would recommend without any hesitation and one that I would definitely put in my 'favorites' list!",
      ar: "من الصعب جداً إيجاد حلول لتطوير وتصميم مواقع الإنترنت بمنتهى المهنية وبأسعار منافسة مقارنة بالخيارات الواسعة الأخرى. سمارت تاتش مثال عظيم على توفير ذلك. بالإضافة إلى سرعة فريقهم والمهنية الممزوجة بالجودة العالية والإبداع، تم إطلاق موقع شركتنا في وقت قياسي. هذه الشركة لم أتردد في ترشيحها وبالتأكيد وضعتها في قائمتي المفضلة!",
    },
  },
  {
    id: 4,
    name: {
      en: "ENGR. TALAL A. AL-KAABI",
      ar: "م. طلال الكعبي",
    },
    role: {
      en: "General Manager",
      ar: "المدير العام",
    },
    company: {
      en: "THARAA Real Estate Investments Co.",
      ar: "شركة ثراء للاستثمارات العقارية (عضو ماشكو)",
    },
    avatar: "/images/testimonials/tharaa.png",
    rating: 5,
    quote: {
      en: "I am looking forward to do more business with Smart Touch in the near future with our appreciation and grateful for their valuable effort to help our companies to be in the position from identity and branding side which reflect their professionalism and creativity. We wish the best for Smart Touch.",
      ar: "إنني أتطلع للتعامل مع شركة سمارت تاتش في المستقبل القريب والقيام بمزيد من الأعمال معها مع تقديرنا وشكرنا لمجهودهم في مساعدة شركتنا أن تصبح لديها الهوية والعلامة التجارية الخاصة بها والتي تعكس مدى مهنيتهم وإبداعهم. ونتمنى الأفضل لشركة سمارت تاتش.",
    },
  },
  {
    id: 3,
    name: {
      en: "ABDULAZIZ M ALAFALIQ",
      ar: "عبد العزيز بن محمد العفالق",
    },
    role: {
      en: "Assistant GM for Commercial Affairs",
      ar: "مساعد المدير العام للشؤون التجارية",
    },
    company: {
      en: "Al-Husain & Al-Afaliq Group",
      ar: "مجموعة الحسين والعفالق",
    },
    avatar: "/images/testimonials/testimonial_ahgroup_client_pics.png",
    rating: 5,
    quote: {
      en: "I want to thank you and everyone else for the outstanding work you have done for us here at Al-Husain and Al-Afaliq Group website. I really believe you listened to what we wanted and delivered a quality website. The best part for me is when I had to have it my way you were never afraid to tell me that it may not look right or work well that way. I really appreciate that since sometimes what I want is not always what works best. Thanks again.",
      ar: "أريد أن أشكركم وأشكر الجميع على العمل الرائع الذي قمتم به بالنسبة لموقع شركة الحسين والعفالق. استمعتم بعناية إلى ما نريده وقمتم بتسليمنا موقعاً عالي الجودة على هذا الأساس. أفضل جزء بالنسبة لي هو توجيهكم المهني لمساعدتي على اختيار الأنسب دائماً لأن ما نريده قد لا يكون دائماً هو الأفضل. شكراً جزيلاً لكم.",
    },
  },
  {
    id: 2,
    name: {
      en: "KHALIFA ALSADA",
      ar: "خليفة السادة",
    },
    role: {
      en: "Chief Operations Officer",
      ar: "رئيس العمليات التشغيلية",
    },
    company: {
      en: "Airfoil International",
      ar: "إيرفويل إنترناشيونال",
    },
    avatar: "/images/testimonials/khalifa.png",
    rating: 5,
    quote: {
      en: "On behalf of Airfoil International, I would like to thank you for the prompt response and outstanding customer service that we received and are still receiving from Smart Touch. We appreciate your efforts and willingness to work with us and look forward to continuing to take advantage of your marketing experience and services.",
      ar: "نيابة عن شركة Airfoil International، أود أن أشكركم على الاستجابة السريعة وخدمة العملاء المتميزة التي تلقيناها ولا نزال نتلقاها من سمارت تاتش. نحن نقدر جهودكم واستعدادكم للعمل معنا، ونتطلع إلى مواصلة الاستفادة من الخبرة التسويقية والخدمات الخاصة بكم.",
    },
  },
  {
    id: 1,
    name: {
      en: "MOHAMMED IRSHAD",
      ar: "محمد إرشاد",
    },
    role: {
      en: "General Manager - Business Development",
      ar: "المدير العام لتطوير الأعمال",
    },
    company: {
      en: "WPL-KSA",
      ar: "WPL-KSA",
    },
    avatar: "/images/testimonials/irshad.png",
    rating: 5,
    quote: {
      en: "The services rendered by SMART have been synonymous with the name. SMART Businesses today require SMART Advertising with a SMART Touch. We have encountered a friendly, energetic team that can capture the concept, transform it into the desired media, own the challenges and deliver the desired results.",
      ar: "إن الخدمات التي تقدمها شركة سمارت تاتش تترادف تماماً مع معنى اسمها. فاليوم شركة سمارت تاتش تقدم مادة إعلانية بلمسة ذكية. لقد تعاملنا مع فريق عمل الشركة الذي يتسم بالودية والنشاط حيث يستوعب الفكرة ويحولها إلى المادة الإعلانية المطلوبة، ممتلكاً روح التحدي ويحقق النتائج المرجوة.",
    },
  },
];
