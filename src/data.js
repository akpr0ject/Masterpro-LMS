// Editable content data — Master Pro.
// Swap these later — components stay the same.

// Unsplash helper — reliable, themed logistics / training placeholders.
const u = (id, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`

export const business = {
  name: 'Master Pro',
  short: 'Master Pro',
  tagline: 'Navigate the Future of Dispatch with Confidence',
  phoneCA: '+1 (437) 463-5865',
  phoneUS: '+1 (415) 738-3805',
  phoneIN: '(0796) 509-2246',
  email: 'registration@masterpro.ca',
  address: 'Unit 4 – 5484 Tomken Rd, Mississauga, ON L4W 2Z6',
  hoursWeek: 'Mon–Fri: 10:00am – 06:00pm',
  hoursWeekend: 'Sat–Sun: 11:00am – 05:00pm',
  // Owner / founder photo shown in the hero. Drop the real file at public/owner.jpg
  // (served at /owner.jpg). Falls back to a professional portrait until then.
  ownerImage: '/owner.jpg',
  // WhatsApp (digits only, intl format) + promo video. Swap with real assets in production.
  whatsapp: '14374635865',
  promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  social: {
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
  },
}

// Nav items map a label to the in-page section id it scrolls to.
export const navLinks = [
  { label: 'About Us', target: 'why' },
  { label: 'Why Master Pro?', target: 'benefits' },
  { label: 'Courses', target: 'courses' },
  { label: 'Resume', target: 'benefits' },
  { label: 'Documents', target: 'documents' },
]

export const heroChips = ['Dispatch', 'Freight Brokerage', 'Safety & Compliance', 'Billing', 'Resume']

// Hiring/partner network shown in the hero trust strip (logistics-themed wordmarks).
export const trustedLogos = ['Essence', 'FreightLink', 'CargoNet', 'RoadWorks', 'HaulPro', 'TransCore']

// Category / offerings strip
export const categories = [
  { title: 'Dispatch Training', tone: 'bg-pastel-green', img: u('1553413077-190dd305871c', 360, 240) },
  { title: 'Freight Brokerage', tone: 'bg-pastel-yellow', img: u('1494412574643-ff11b0a5c1c3', 360, 240) },
  { title: 'Truck Safety & Compliance', tone: 'bg-pastel-blue', img: u('1601584115197-04ecc0da31d7', 360, 240) },
  { title: 'Billing & Invoicing', tone: 'bg-pastel-pink', img: u('1554224155-6726b3ff858f', 360, 240) },
]

// Main course / program cards
// Pricing cards (ITS Dispatch style): bold solid-colour cards with an embedded course
// video, big price and a full-width Enrol button. `poster` is the video thumbnail.
const COURSE_POSTER = '/owner.jpg'

export const courses = [
  {
    title: 'Dispatch Training',
    label: 'Online Classes without Software Access',
    software: false,
    dollar: true,
    amount: '399',
    currency: 'CAD',
    unit: '/ per user',
    pdf: 'Dispatch Course PDF',
    poster: COURSE_POSTER,
    runtime: '1:00',
    theme: {
      card: 'bg-orange text-white',
      sub: 'text-white/85',
      pdf: 'text-white',
      btn: 'bg-white text-ink hover:bg-white/90',
    },
  },
  {
    title: 'Dispatch + Freight Brokerage',
    label: 'Online Classes without Software Access',
    software: true,
    dollar: true,
    amount: '549',
    currency: 'CAD',
    unit: '/ per user',
    pdf: 'Dispatch Course PDF',
    poster: COURSE_POSTER,
    runtime: '0:33',
    theme: {
      card: 'bg-white text-ink ring-1 ring-forest/10',
      sub: 'text-muted',
      pdf: 'text-ink',
      btn: 'bg-[#13b3a6] text-white hover:bg-[#0f9b90]',
    },
  },
  {
    title: 'Truck Safety & Compliance',
    label: 'Offline / Online With Software Access',
    software: false,
    dollar: true,
    amount: '699',
    currency: 'CAD',
    unit: '/ per user',
    pdf: 'Truck Safety & Compliance Course PDF',
    poster: COURSE_POSTER,
    runtime: '0:21',
    theme: {
      card: 'bg-[#5a5af0] text-white',
      sub: 'text-white/85',
      pdf: 'text-white',
      btn: 'bg-white text-ink hover:bg-white/90',
    },
  },
  {
    title: 'Billing & Invoicing',
    label: 'Online Without Software Access',
    software: true,
    dollar: true,
    amount: '249',
    currency: 'CAD',
    unit: '/ per user',
    pdf: 'Billing & Invoicing Course PDF',
    poster: COURSE_POSTER,
    runtime: '0:23',
    theme: {
      card: 'bg-[#f8c53a] text-ink',
      sub: 'text-ink/70',
      pdf: 'text-ink',
      btn: 'bg-ink text-white hover:bg-black',
    },
  },
  {
    title: 'Complete Trucking Portal',
    label: 'Save 40% — Enrol in all 4 courses',
    software: true,
    dollar: false,
    amount: '40%',
    currency: 'OFF',
    unit: 'all 4 courses',
    pdf: 'Complete Trucking Portal PDF',
    poster: COURSE_POSTER,
    runtime: '1:20',
    theme: {
      card: 'bg-forest text-white',
      sub: 'text-white/85',
      pdf: 'text-white',
      btn: 'bg-orange text-white hover:bg-orange-dark',
    },
  },
  {
    title: 'Demo Course',
    label: 'Try a sample lesson before you enrol',
    software: false,
    dollar: true,
    amount: '50',
    currency: 'CAD',
    unit: '/ per user',
    pdf: 'Demo Course PDF',
    poster: COURSE_POSTER,
    runtime: '0:45',
    theme: {
      card: 'bg-white text-ink ring-1 ring-forest/10',
      sub: 'text-muted',
      pdf: 'text-ink',
      btn: 'bg-orange text-white hover:bg-orange-dark',
    },
  },
]

// Graduate testimonials (concise, faithful excerpts)
export const testimonials = [
  {
    quote:
      'The freight brokerage course was excellent. I learned how to manage loads and talk to shippers, and after the course they helped me find a job. Now I am working as a broker — thank you!',
    name: 'Simran Kaur',
    role: 'Freight Broker · Canada',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    quote:
      'The dispatch training was great. I didn’t know much before, but the trainers explained everything step by step. After finishing, I quickly got a job with their help.',
    name: 'Kulwinder Singh',
    role: 'Dispatcher · India',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    quote:
      'Thanks to Master Pro, I am now working in my dream job as a freight broker. I cannot thank them enough for their support and guidance throughout my journey.',
    name: 'Preet Rooprai',
    role: 'Freight Broker · Canada',
    avatar: 'https://i.pravatar.cc/80?img=45',
  },
]

// Career-focused training paths
export const bootcamps = [
  {
    category: 'Dispatch',
    title: 'Dispatch Training',
    by: 'Master Pro',
    duration: '24 Hours',
    lessons: '12 Modules',
    joined: '320+ Joined',
    img: u('1521791136064-7986c2920216', 500, 360),
  },
  {
    category: 'Freight Brokerage',
    title: 'Freight Brokerage',
    by: 'Master Pro',
    duration: '36 Hours',
    lessons: '18 Modules',
    joined: '280+ Joined',
    img: u('1494412574643-ff11b0a5c1c3', 500, 360),
  },
  {
    category: 'Compliance',
    title: 'Safety & Compliance',
    by: 'Master Pro',
    duration: '28 Hours',
    lessons: '14 Modules',
    joined: '190+ Joined',
    img: u('1601584115197-04ecc0da31d7', 500, 360),
  },
]
/* note: warehouse=1553413077-190dd305871c, containers=1494412574643-ff11b0a5c1c3,
   truck=1601584115197-04ecc0da31d7, billing=1554224155-6726b3ff858f (all verified). */

// "What every student gets" — benefits (repurposed mentor grid)
export const mentors = [
  { name: 'Free Professional Resume', role: 'Industry-standard, included', img: u('1586281380349-632531db7ed4', 320, 380) },
  { name: 'Job Placement Support', role: '986+ partner companies', img: u('1521791136064-7986c2920216', 320, 380) },
  { name: 'Real Software Access', role: 'Hands-on dispatch tools', img: u('1551434678-e076c223a692', 320, 380) },
  { name: 'Small-Class Instruction', role: 'Personalized guidance', img: u('1524178232363-1fb2b075b655', 320, 380) },
]

// FAQs (faithful to source)
export const faqs = [
  {
    q: 'What contributes to your high job-placement success rate?',
    a: 'Our placement services are supported by Essence Transportation Inc. When students finish a course, we share their resumes with our network of 986 transportation and freight brokerage companies across North America.',
  },
  {
    q: 'Can these jobs help with Permanent Residency in Canada?',
    a: 'Yes. Many of the roles align with the National Occupational Classification (NOC-B) criteria, providing additional support along the immigration pathway. Many students secure well-paying jobs while addressing their immigration goals.',
  },
  {
    q: 'Can people with no prior experience get hired?',
    a: 'Absolutely. The job opportunities showcased on our platforms are obtained by students with no previous experience, and we consistently post openings for newcomers entering the transportation field.',
  },
  {
    q: 'Are the jobs on your social media genuine and free?',
    a: 'Yes. We maintain full transparency — every job featured is obtained through the standard distribution of each student’s resume upon course completion.',
  },
  {
    q: 'Are there any educational or minimum requirements?',
    a: 'No special requirements are needed. Our courses teach you everything about transportation, helping you find a job without any prior experience or qualifications.',
  },
  {
    q: 'What learning options are available?',
    a: 'We offer both onsite and online classes — including options with full software access — so you can learn in the format that fits your schedule.',
  },
]

// Documents & Resources (repurposed blog strip)
export const articles = [
  {
    tag: 'Guide',
    date: 'Downloadable PDF',
    title: 'FreightGuard Removal Guide',
    img: u('1601584115197-04ecc0da31d7', 500, 340),
  },
  {
    tag: 'Resource',
    date: 'Downloadable PDF',
    title: 'Unpaid Freight Bill Collections',
    img: u('1554224155-6726b3ff858f', 500, 340),
  },
  {
    tag: 'Guide',
    date: 'Downloadable PDF',
    title: 'Start Your Trucking Company',
    img: u('1494412574643-ff11b0a5c1c3', 500, 340),
  },
]

export const footerCols = [
  {
    title: 'Programs',
    links: [
      'Dispatch Training',
      'Dispatch + Freight Brokerage',
      'Truck Safety & Compliance',
      'Billing & Invoicing',
      'Demo Course',
    ],
  },
  {
    title: 'Academy',
    links: ['About Us', 'Why Master Pro?', 'Resume Support', 'Documents & Resources', 'Success Stories'],
  },
  {
    title: 'Contact',
    links: [
      '🇨🇦 +1 (437) 463-5865',
      '🇺🇸 +1 (415) 738-3805',
      'registration@masterpro.ca',
      'Unit 4 – 5484 Tomken Rd,',
      'Mississauga, ON L4W 2Z6',
    ],
  },
]

export const footerLegal = ['Privacy Policy', 'Terms & Conditions', 'Enrolment Contract']
