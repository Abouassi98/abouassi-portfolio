import type { SiteContent } from './types';

/**
 * ⚠️ Governed by `job_hunter/resumes/FACT_LEDGER.json`, exactly as `en.ts` is.
 * This is a translation of the same claims, not a second set of claims: the
 * `sameShapeAcrossLocales` test asserts the two locales expose the same ids in
 * the same order, so a claim cannot be added here and only here.
 *
 * Technology names stay in Latin script — that is how Arabic technical writing
 * actually reads, and transliterating them would look wrong to the audience
 * this locale exists for.
 */
export const ar: SiteContent = {
  profile: {
    name: 'محمد أبوعاصي',
    title: 'مهندس برمجيات أول — موبايل · ويب · باك إند',
    location: 'الرياض، السعودية',
    status: 'إقامة قابلة للنقل · متاح فورًا',
    blurb:
      'أبني تطبيق الدفع الذي عليه أن يجتاز الجهة التنظيمية — ومعه، بشكل متزايد، لوحة التحكم والخدمات التي خلفه. قرابة ست سنوات بين Flutter وAndroid، وReact وTypeScript على الويب، وعمل خدمات Java/Spring داخل منصات الدفع نفسها.',
    email: 'mohamedabouassi@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/Abouassi98' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mohamed-abouassi' },
      { label: 'pub.dev', href: 'https://pub.dev/packages/card_hub' },
    ],
  },

  metrics: [
    {
      claimId: 'M-012',
      value: '1M+',
      label: 'تنزيل لتطبيق Bravo',
      note: 'المحفظة الاستهلاكية التي بنيتها؛ أعلن العميل هذا الرقم علنًا في 2026',
      attribution: { kind: 'context', employer: 'Istinara-MATC' },
    },
    {
      claimId: 'M-001',
      value: '$5M+',
      label: 'قيمة مُعالَجة',
      note: 'عبر منصة الدفع التي خدمتها المحفظة وحزمتها البرمجية',
      attribution: { kind: 'context', employer: 'Istinara-MATC' },
    },
    {
      claimId: 'M-002',
      value: '384K+',
      label: 'محفظة',
      note: 'على المنصة نفسها',
      attribution: { kind: 'context', employer: 'Istinara-MATC' },
    },
    {
      claimId: 'M-004',
      value: '4s → 1s',
      label: 'زمن الإقلاع البارد',
      note: 'عبر تأجيل تحميل المكوّنات، وbaseline profiles، والتهيئة الكسولة للوحدات',
      attribution: { kind: 'causal' },
    },
  ],

  tracks: [
    {
      id: 'mobile',
      name: 'موبايل',
      line: 'هنا يقع فعليًا معظم مسيرتي على مدى قرابة ست سنوات — Flutter وAndroid الأصلي، ومعظمه في المدفوعات.',
      points: [
        'بنيت محفظة Bravo الاستهلاكية وحزمة دفع Android مُحصَّنة من الصفر.',
        'قدت تنفيذ بيئة تشغيل التطبيقات المصغّرة داخل المحفظة: مضيف معزول لتطبيقات الأطراف الثالثة، مع عزل حسب الأصل، وإدارة للتثبيت ودورة الحياة، وسجل صلاحيات محدود بنطاق الجلسة.',
        'أمن المدفوعات تحت جهة تنظيمية — تشفير AES-256 للبيانات المخزّنة، وتثبيت الشهادات عبر TLS 1.3، وتحصين التطبيق RASP، وربط الجهاز، وNFC HCE لأجهزة الدفع اللاتلامسي.',
        'معمارية معيارية على نطاق واسع: Gradle متعدد الوحدات على Android، ومستودعات Melos أحادية على Flutter، وحدود DDD على الاثنين.',
      ],
      stack: ['Flutter', 'Dart', 'Riverpod', 'Kotlin', 'Jetpack Compose', 'Coroutines/Flow', 'Melos', 'Gradle', 'Shorebird OTA'],
    },
    {
      id: 'web',
      name: 'ويب',
      line: 'React وTypeScript — لوحات تشغيل، وأدوات للتجّار، ومنصات داخلية.',
      points: [
        'بنيت لوحة تشغيل على Next.js App Router — معالجات مسارات مُنمَّطة خلف وسيط جلسات، تغطي جانب العملاء والموردين والكتالوج في سوق B2B.',
        'أطلقت محادثة فورية ومركز إشعارات، وتصدير جداول، ورفع صور، وتحرير حدود تغطية الموردين.',
        'بنيت لوحة تكامل للتجّار — إدارة بيانات الاعتماد وWebhooks إلى جانب عرض المعاملات والتسويات.',
        'دعم عربي/إنجليزي كامل مع RTL في React: تنسيق واعٍ بالاتجاه، بحيث ينعكس التخطيط والأيقونات والرسوم البيانية، لا أن تُترجَم النصوص وحدها.',
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'TanStack Query', 'TanStack Table', 'Tailwind CSS', 'Radix UI', 'Zod', 'React Testing Library'],
    },
    {
      id: 'backend',
      name: 'باك إند',
      line: 'Java وSpring Boot، داخل منصات الدفع نفسها التي بنيت تطبيقاتها.',
      points: [
        'بنيت طبقة مصادقة ذات نطاق محدود على Spring Security — سطح فلترة معزول بسياسة أصل خاصة به وبوابة توافر، أُضيف بجوار سلسلة قائمة دون تغيير سلوكها.',
        'كتبت مجموعة اختبارات التكامل خلفها: التعامل مع الرموز، وتوحيد صيغ المسارات، وتغطية حدود المعدل والانحدار، مع بدائل حتمية للوقت وحالة الإعداد.',
        'عملت داخل منظومة من عشر خدمات Spring Boot — كل خدمة قابلة للنشر باستقلال، تتواصل عبر HTTP ووسيط رسائل، مع PostgreSQL وFlyway لكل خدمة.',
        'شاركت في قرارات مخطط دفتر القيد المزدوج ومعالجة التحويلات المتكرّرة بأمان على نواة محفظة حيّة.',
      ],
      stack: ['Java 17/21', 'Spring Boot 3', 'Spring Security', 'Spring WebFlux', 'PostgreSQL', 'Flyway', 'Redis', 'RabbitMQ', 'JUnit'],
    },
  ],

  projects: [
    {
      id: 'bravo',
      name: 'Bravo — محفظة استهلاكية ومنصة تطبيقات مصغّرة',
      role: 'مهندس برمجيات أول',
      period: '2023 – حتى الآن',
      domain: 'تقنية مالية · Istinara-MATC',
      summary:
        'محفظة استهلاكية تجاوزت مليون تنزيل، وحزمة الدفع المُحصَّنة خلفها، وبيئة تشغيل تتيح لتطبيقات الأطراف الثالثة أن تعمل بداخلها بأمان.',
      points: [
        'بنيت المحفظة وحزمة الدفع من الصفر — حقن تبعيات معزول، ونمط MVI، وثلاث طبقات من أمن العميل.',
        'قدت تنفيذ بيئة التطبيقات المصغّرة: عزل حسب الأصل، وإدارة التثبيت ودورة الحياة، وسجل صلاحيات محدود بنطاق الجلسة، وبوابة نطاق للجسر تُشتق من سجل مُولَّد.',
        'حصّنت قياسات التطبيقات المصغّرة — ميزانيات لكل جلسة، وحجب بيانات التحليلات الحسّاسة، وربط مُعرّف التتبّع.',
        'بنيت الطبقة المقابلة للمصادقة على جانب الخادم في Spring Security. نصفا الميزة نفسها.',
        'تحصين RASP وربط الجهاز، موصولَين بسياسة الاستجابة الخاصة بالتطبيق.',
        'إشعارات وتقارير أعطال مزدوجة عبر FCM وHuawei HMS، حتى تعمل المحفظة على الأجهزة الخالية من خدمات Google Play.',
      ],
      tags: ['Flutter', 'Kotlin', 'Spring Security', 'Payments', 'Security'],
      links: [
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=istinara.bravocash' },
        { label: 'App Store', href: 'https://apps.apple.com/eg/app/bravo-sudan-pay/id1665773476' },
      ],
    },
    {
      id: 'daftarpay',
      name: 'Daftarpay — منصة مدفوعات على Android',
      role: 'مهندس موبايل أول',
      period: '2024 – 2026',
      domain: 'تقنية مالية · خاضعة لتنظيم SAMA/PDPL',
      summary: 'منصة مدفوعات معيارية بـKotlin/Compose، مبنية لسوق سعودي خاضع للتنظيم.',
      points: [
        'كتبت التصميم عالي المستوى وبنيت معمارية Gradle المعيارية القائمة عليه.',
        'تشفير SQLCipher AES-256 مغلَّف بـAndroid Keystore، وتثبيت الشهادات عبر TLS 1.3، وتسجيل تدقيق يغطي تسعة أنواع من الأحداث.',
        'تحقق مزدوج القناة من الدفع مع أقفال حالة ذرّية، بحيث لا يؤدي تأكيد مُعاد إلى خصم مزدوج.',
        'خفّضت زمن الإقلاع البارد من نحو أربع ثوانٍ إلى نحو ثانية واحدة، عبر تأجيل تحميل المكوّنات، وbaseline profiles، والتهيئة الكسولة للوحدات.',
        'أجريت أكثر من 30 مقابلة تقنية بينما نما فريق الموبايل من ثلاثة إلى سبعة، وأرشدت مهندسَين حتى مستوى senior.',
      ],
      tags: ['Kotlin', 'Jetpack Compose', 'Security', 'Performance'],
    },
    {
      id: 'mycity',
      name: 'MyCity — تطبيق خدمات أمانة منطقة الرياض',
      role: 'مطوّر موبايل متكامل',
      period: '2026 – حتى الآن',
      domain: 'قطاع حكومي · عبر World of System & Software',
      summary:
        'تطبيق خدمات بلدية قائم بالفعل على Flutter، انضممت إليه في منتصف دورة حياته ضمن فريق يضم أكثر من عشرة مساهمين. لم أضع معماريته.',
      points: [
        'أزلت انسداد إصدارات Android بحل تعارض في AAR-metadata على compileSdk 36، تتبّعته عبر دورة حياة مشروع Gradle.',
        'نفّذت التحويل بين التاريخين الهجري والميلادي ومنتقيات التاريخ في أنحاء التطبيق.',
        'أزلت الاقتران باللغة من إعداد محرّكَي الخرائط المزدوجَين، بما يهيّئ طبقات الخرائط لدعم الإنجليزية.',
        'أضفت هيكل نماذج متجاوبًا لدعم الأجهزة اللوحية في مسارات المصادقة والتقديم.',
      ],
      tags: ['Flutter', 'Gradle', 'Localization', 'Government'],
      links: [
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.alriyadh.mycity&hl=en' },
      ],
    },
    {
      id: 'mozodi',
      name: 'Mozodi — منصة تجارة B2B',
      role: 'مهندس (موبايل وويب)',
      period: '2021 – حتى الآن',
      domain: 'تجارة B2B · عن بُعد',
      summary: 'تطبيق الموبايل، ولاحقًا لوحة التشغيل وبوابة الموردين على Next.js.',
      points: [
        'بنيت مستودعًا أحاديًا بـMelos — تطبيقان، وثماني حزم مشتركة، وستّ عشرة وحدة وظيفية — مع تكامل شامل مع خرائط Google.',
        'بنيت لوحة التشغيل على Next.js App Router بمعالجات مسارات مُنمَّطة خلف وسيط جلسات.',
        'محادثة فورية ومركز إشعارات، وتصدير جداول، ورفع صور، وحدود تغطية للموردين.',
        'دعم عربي/إنجليزي عبر البوابات، ونماذج آمنة نوعيًا على React Hook Form مع مخططات Zod.',
        'دفعت زمن حل طلبات الدعم من 4.6 إلى 3.1 يوم عبر ميزة المحادثة داخل التطبيق التي بنيتها.',
      ],
      tags: ['Flutter', 'Next.js', 'TypeScript', 'TanStack'],
    },
    {
      id: 'alahram',
      name: 'الأهرام — التشطيبات والديكور',
      role: 'مهندس موبايل (عقد)',
      period: '2024',
      domain: 'مجموعة إعلامية · عمليات ميدانية',
      summary: 'مستودع أحادي بـMelos يضم ثلاثة تطبيقات على نمط DDD، بخطوط إصدار مستقلة من قاعدة شيفرة واحدة.',
      points: [
        'وضعت معمارية المستودع الأحادي بأكثر من عشر حزم مشتركة وخطوط إصدار مستقلة.',
        'بنيت طبقة بيانات تعمل دون اتصال على Drift مع إدارة دورة حياة محدودة النطاق عبر Riverpod للاستخدام الميداني.',
        'حافظت على الجودة عبر قطار إصدار لثلاثة تطبيقات باختبارات golden وقواعد lint مخصّصة وتقارير تغطية، إضافة إلى محرّك PDF على الجهاز يدعم العربية باتجاه RTL.',
      ],
      tags: ['Flutter', 'Melos', 'Offline-first', 'DDD'],
      links: [
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.eg_alahram.alahram' },
      ],
    },
  ],

  experience: [
    { org: 'أمانة منطقة الرياض', note: 'جهة التوظيف: World of System & Software', role: 'مطوّر موبايل متكامل', period: '04/2026 – حتى الآن', where: 'الرياض، السعودية' },
    { org: 'Istinara-MATC', role: 'مهندس برمجيات أول', period: '08/2023 – حتى الآن · دوام كامل حتى 05/2024، ثم استشاري', where: 'القاهرة، مصر' },
    { org: 'Mozodi', role: 'مهندس برمجيات', period: '07/2021 – حتى الآن · عن بُعد؛ دوام كامل، ثم جزئي وعقود', where: 'الكويت (عن بُعد)' },
    { org: 'Daftarpay', role: 'مهندس موبايل أول', period: '05/2024 – 04/2026', where: 'الرياض، السعودية' },
    { org: 'مجموعة الأهرام', role: 'مهندس موبايل (عقد)', period: '2024', where: 'عن بُعد' },
    { org: 'Elnooronline', role: 'مطوّر موبايل', period: '11/2020 – 05/2021', where: 'الإسكندرية، مصر (عن بُعد)' },
  ],

  skills: [
    { group: 'موبايل', items: ['Flutter', 'Dart', 'Riverpod', 'BLoC', 'Melos', 'Kotlin', 'Jetpack Compose', 'Coroutines/Flow', 'Gradle multi-module', 'Shorebird OTA', 'Platform Channels'] },
    { group: 'ويب', items: ['React', 'Next.js (App Router)', 'TypeScript', 'TanStack Query', 'TanStack Table', 'Redux Toolkit', 'Tailwind CSS', 'Radix UI', 'Material UI', 'Zod', 'i18next / RTL'] },
    { group: 'باك إند', items: ['Java 17/21', 'Spring Boot 3', 'Spring Security', 'Spring WebFlux', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Redis', 'RabbitMQ', 'REST API design'] },
    { group: 'الأمن', items: ['AES-256', 'SQLCipher', 'Android Keystore', 'Certificate pinning (TLS 1.3)', 'RASP app-shielding', 'Device binding', 'NFC HCE', 'JWT', 'SAMA/PDPL-regulated delivery'] },
    { group: 'المعمارية', items: ['Clean Architecture', 'Domain-Driven Design', 'MVI / MVVM', 'SDK design', 'Monorepos', 'Offline-first', 'Idempotency', 'Double-entry ledger modelling'] },
    { group: 'الاختبار والتسليم', items: ['React Testing Library', 'Jest', 'JUnit', 'Mockito', 'Widget & golden tests', 'Git', 'GitHub Actions', 'Docker', 'Fastlane', 'Codemagic', 'Sentry', 'Firebase'] },
  ],

  languages: 'العربية (اللغة الأم) · الإنجليزية (مستوى مهني) · الألمانية (A2، قيد الدراسة)',
  education: 'بكالوريوس هندسة الحاسبات — معهد طنطا العالي للهندسة والتكنولوجيا، 2016 – 2021',

  ui: {
    skipToContent: 'تخطَّ إلى المحتوى',
    nav: { work: 'الأعمال', tracks: 'ما أعمله', experience: 'الخبرة', skills: 'المهارات', contact: 'تواصل' },
    heroCta: 'شاهد الأعمال',
    sections: {
      work: { eyebrow: 'أعمال مختارة', title: 'منتجات، لا لقطات شاشة' },
      tracks: { eyebrow: 'ما أعمله', title: 'ثلاثة مسارات، وعقلية منتج واحدة' },
      experience: { eyebrow: 'الخبرة', title: 'أين جرى العمل' },
      skills: { eyebrow: 'المهارات', title: 'ما أستعين به' },
      contact: { eyebrow: 'تواصل', title: 'منفتح على أدوار senior في الرياض — وعن بُعد.' },
    },
    contactBlurb:
      'موبايل، أو ويب، أو منصة المدفوعات التي خلفهما. في الرياض بإقامة قابلة للنقل، ومتاح فورًا.',
    localeSwitchLabel: 'English',
    externalLinkContext: (projectName) => `${projectName} — يفتح في تبويب جديد`,
    builtWith: 'مبني بـReact وTypeScript وVite',
  },
};
