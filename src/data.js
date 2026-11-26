const whatsappHref = `https://api.whatsapp.com/send?phone=919553733673&text=${encodeURIComponent('Yo\uD83D\uDD90\uD83C\uDFFB')}`

// Everything you are likely to edit lives here.
export const profile = {
  name: 'Ranga',
  greeting: "Hi, I'm",
  // Words that roll under the name. Replace with your own titles.
  roles: ['Full-Stack Developer', 'Creative Coder', 'UI Engineer'],
  tagline:
    'Crafting modern full-stack web experiences with clean code, creative motion, and scalable digital architecture.',
  resumeUrl: '/resume.pdf', // put your PDF in the public/ folder
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: whatsappHref },
  ],
  ctaLabel: "Let's talk",
  ctaHref: whatsappHref,
}

// ---------------------------------------------------------------------------
// PROJECTS. To add one, copy a block below and fill it in. Cards appear
// automatically, numbered in order.
//   path        : live URL or path to the project (e.g. 'https://example.com'
//                 or '/my-project'). Leave '' until you have it; the button
//                 stays pending until a path is added.
//   repo / demo : optional URLs (demo also works as a fallback if path is '').
//   accent      : colour of the card's banner and hover glow.
//   image       : optional path like '/images/projects/my-site.jpg' for the
//                 banner. Without it the card draws its own banner.
// ---------------------------------------------------------------------------
// Path to the assets in /public/images
const base = import.meta.env.BASE_URL

export const projectsSection = {
  eyebrow: 'Featured works',
  title: 'Projects.',
}

export const projects = [
  {
    id: 'stories-by-sai-adabala',
    title: 'Stories by Sai Adabala',
    category: 'Photography Portfolio',
    kicker: 'Visual Gallery Engine // v1.0',
    description: 'A premium photography portfolio showcasing creative stories and visual experiences.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Visual Gallery'],
    status: 'Online',
    accent: '#9b5cff',
    path: 'https://storiesbysaiadabala.github.io/storiesbysaiadabala/',
    repo: '',
    demo: '',
    image: `${base}images/projects/stories-by-sai-adabala.jpg`,
  },
  {
    id: 'ayush-enterprises',
    title: 'Ayush Enterprises',
    category: 'Construction & Business',
    kicker: 'Industrial Web Platform // v1.0',
    description:
      'A business website for a construction supplier, showcasing construction materials, equipment, and completed projects.',
    tags: ['Product Catalog', 'Interactive UI', 'Search & Filters', 'Responsive Design'],
    status: 'Online',
    accent: '#ffa63d',
    path: 'https://www.ayushenterprises.net/', 
    repo: '',
    demo: '',
    image: `${base}images/projects/ayush-enterprises.jpg`,
  },
  {
    id: 'pk-ventures',
    title: 'PK Ventures',
    category: 'Real Estate & Web',
    kicker: 'Real Estate Platform // v1.0',
    description:
      'A real estate website for showcasing residential projects, plots, and premium developments.',
    tags: ['3D Animations', 'Interactive UI', 'Scroll Effects', 'Responsive Design'],
    status: 'Online',
    accent: '#22d3a6',
    path: 'https://pkventures.vercel.app/',
    repo: '',
    demo: '',
    image: `${base}images/projects/pk-ventures.jpg`,
  },
  {
    id: 'travel-website',
    title: 'Travel Website',
    category: 'Travel & Discovery',
    kicker: 'Destination Explorer // v1.0',
    description: 'A travel discovery website for exploring destinations, trips, and travel experiences.',
    tags: ['Destinations', 'Interactive UI', 'Trip Discovery', 'Responsive Design'],
    status: 'Online',
    accent: '#22e568',
    path: 'https://travel-website.vercel.app/',
    repo: '',
    demo: '',
    image: `${base}images/projects/travel-website.jpg`,
  },
]

export const aboutSection = {
  titleLead: 'Get to Know',
  titleAccent: 'Me.',
  bio: "I'm Ranga Rao Nagireddy, a Front-end focused MERN Stack Developer who enjoys building modern, responsive and interactive web experiences that solve real-world problems.",
  bgImage: `${base}images/about-bg.jpg`,
  education: {
    label: 'Education',
    degree: 'B.Tech in ECE',
    school: 'Lovely Professional University',
    year: '2023',
  },
  skillsHeading: 'Technical Skills',
  skills: [
    { id: 'html', name: 'HTML5', type: 'logo' },
    { id: 'css', name: 'CSS3', type: 'logo' },
    { id: 'js', name: 'JavaScript', type: 'logo' },
    { id: 'react', name: 'React', type: 'logo' },
    { id: 'node', name: 'Node.js', type: 'logo' },
    { id: 'express', name: 'Express.js', type: 'logo' },
    { id: 'mongodb', name: 'MongoDB', type: 'logo' },
    { id: 'sql', name: 'SQL', type: 'logo' },
    { id: 'threejs', name: 'Three.js', type: 'logo' },
    { id: 'tailwind', name: 'Tailwind CSS', type: 'logo' },
    { id: 'sap', name: 'SAP Basis', type: 'logo' },
    { id: 'rtl', name: 'RTL Design & Verification', type: 'text', lines: ['RTL Design', '&', 'Verification'] },
  ],
}

export const footerSection = {
  firstName: 'Ranga Rao',
  lastName: 'Nagireddy',
  subtitle: 'Frontend Developer | MERN Stack',
  homeHref: '#home',
  leavesImage: `${base}images/about-bg.jpg`,
  quickLinks: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#work' },
    { label: 'Contact', href: whatsappHref },
  ],
  contact: {
    email: 'rangaraonaidu143@gmail.com',
    phoneDisplay: '+91 95537 33673',
    whatsappHref,
    location: 'Andhra Pradesh, India',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Andhra+Pradesh%2C+India',
  },
  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Naidu-07' },
    { id: 'linkedin', label: 'LinkedIn', href: 'http://www.linkedin.com/in/ranga-rao-naidu' },
    { id: 'whatsapp', label: 'WhatsApp', href: whatsappHref },
  ],
}

// Path to the portrait poses in /public/images
export const poses = Object.fromEntries(
  [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'exact-right',
    'up-left',
    'up-right',
    'down', // looking down and to the left
    'right-bottom',
  ].map((key) => [key, `${base}images/${key}.jpg`]),
)
