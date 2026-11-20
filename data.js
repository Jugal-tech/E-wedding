/**
 * Royal Rajasthani Indian Wedding - Data & Media Configuration
 * Aarav Singh & Priya Rathore • Jaipur, Rajasthan (Feb 17-19, 2027)
 */

// Target Wedding Date for Countdown
window.WEDDING_DATE_TARGET = new Date('2027-02-18T19:00:00+05:30').getTime();

// Verified High-Resolution Indian Wedding & Rajasthani Palace Photos
window.INDIAN_PHOTOS = {
  jaipurPalaceArch: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1600',
  indianWeddingVarmala: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1600',
  indianCoupleRoyalPortrait: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1400',
  indianBridalMehendi: 'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1400',
  indianHaldiMarigold: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1400',
  indianBrideRedLehenga: 'https://images.pexels.com/photos/2781104/pexels-photo-2781104.jpeg?auto=compress&cs=tinysrgb&w=1400',
  indianWeddingMandapRitual: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1400',
  indianGroomSherwani: 'https://images.pexels.com/photos/3397026/pexels-photo-3397026.jpeg?auto=compress&cs=tinysrgb&w=1400',
  udaipurLakePalace: 'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=1400',
  jaipurHawaMahalGate: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=1400',
  indianWeddingLights: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1400'
};

// Hero Media Assets
window.HERO_MEDIA = {
  palaceBackdrop: window.INDIAN_PHOTOS.jaipurPalaceArch,
  welcomeHero: window.INDIAN_PHOTOS.indianWeddingVarmala,
  couplePortrait: window.INDIAN_PHOTOS.indianCoupleRoyalPortrait,
  filmPoster: window.INDIAN_PHOTOS.indianBrideRedLehenga,
  weddingFilmVideo: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-together-in-a-garden-42404-large.mp4',
  sangeetHighlightVideo: 'https://assets.mixkit.co/videos/preview/mixkit-sparklers-at-a-wedding-celebration-42415-large.mp4'
};

// Authentic Illustrated Mughal/Rajputana Arch SVG Fallback (guarantees zero broken images)
window.createIndianWeddingFallback = function(title, subtitle) {
  const safeTitle = (title || 'SHUBH VIVAH').slice(0, 26).toUpperCase();
  const safeSub = (subtitle || 'JAIPUR • RAJASTHAN').slice(0, 28).toUpperCase();
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <defs>
        <radialGradient id="royalBg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stop-color="#580B1C"/>
          <stop offset="55%" stop-color="#2D050E"/>
          <stop offset="100%" stop-color="#120205"/>
        </radialGradient>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFF0C9"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#8C621C"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#royalBg)"/>
      <path d="M110 920 V420 Q110 340 160 300 Q150 240 210 210 Q220 150 290 135 Q335 85 400 75 Q465 85 510 135 Q580 150 590 210 Q650 240 640 300 Q690 340 690 420 V920 Z" fill="rgba(212,175,55,0.04)" stroke="url(#goldStroke)" stroke-width="2.5"/>
      <path d="M135 900 V430 C135 245 275 155 400 115 C525 155 665 245 665 430 V900 Z" fill="none" stroke="url(#goldStroke)" stroke-width="1" stroke-dasharray="6 5"/>
      <circle cx="400" cy="365" r="56" fill="none" stroke="url(#goldStroke)" stroke-width="1.5"/>
      <path d="M400 325 C412 348, 412 372, 400 398 C388 372, 388 348, 400 325 Z" fill="#D4AF37" opacity="0.85"/>
      <path d="M400 398 C378 384, 368 364, 374 345 C386 356, 394 374, 400 398 Z" fill="#D4AF37" opacity="0.65"/>
      <path d="M400 398 C422 384, 432 364, 426 345 C414 356, 406 374, 400 398 Z" fill="#D4AF37" opacity="0.65"/>
      <text x="400" y="485" text-anchor="middle" fill="#FFF3D6" font-family="Georgia, serif" font-size="30" letter-spacing="5">${safeTitle}</text>
      <text x="400" y="530" text-anchor="middle" fill="#D4AF37" font-family="sans-serif" font-size="14" letter-spacing="7">${safeSub}</text>
      <text x="400" y="575" text-anchor="middle" fill="#E6C786" font-family="Georgia, serif" font-style="italic" font-size="18">Aarav &amp; Priya • Jaipur 2027</text>
    </svg>`
  );
};

// Couple Love Story Timeline
window.LOVE_STORY_TIMELINE = [
  {
    year: 'Nov 2022',
    location: 'Jaipur',
    title: 'First Met',
    story: 'Rambagh Polo Finale, Jaipur.',
    quote: '“One evening, forever.”',
    image: window.INDIAN_PHOTOS.jaipurHawaMahalGate
  },
  {
    year: 'Aug 2024',
    location: 'Udaipur',
    title: 'Lake Pichola',
    story: 'Monsoon rain by the palace.',
    quote: '“Home is wherever we are together.”',
    image: window.INDIAN_PHOTOS.udaipurLakePalace
  },
  {
    year: 'Dec 2025',
    location: 'Jaipur',
    title: 'The Proposal',
    story: 'Five hundred diyas & heirloom polki.',
    quote: '“She said yes.”',
    image: window.INDIAN_PHOTOS.indianCoupleRoyalPortrait
  },
  {
    year: 'Feb 2027',
    location: 'Jaipur',
    title: 'Shubh Vivah',
    story: 'Singh & Rathore families unite.',
    quote: '“Two lineages, one sacred fire.”',
    image: window.INDIAN_PHOTOS.indianWeddingVarmala
  }
];

// Six Royal Wedding Celebrations
window.WEDDING_EVENTS = [
  {
    id: 'haldi',
    name: 'Haldi Utsav',
    hindiTitle: 'हल्दी',
    tagline: 'Marigolds & Turmeric',
    dayLabel: 'Day 01 • 10:30 AM',
    date: '17 Feb 2027',
    time: '10:30 AM',
    venue: 'Surya Mahal Courtyard',
    dressCode: 'Marigold Yellow',
    paletteSwatches: ['#F59E0B', '#FDE68A', '#FFFBEB'],
    gradientOverlay: 'from-[#140206] via-[#451A03]/55 to-transparent',
    description: 'Sunlit turmeric & marigold showers in the royal courtyard.',
    ritualHighlight: 'Ancestral Pithi Blessing',
    hospitalityNote: 'Kesar lassi & floral dupattas for all guests.',
    coverImage: window.INDIAN_PHOTOS.indianHaldiMarigold,
    gallery: [
      { url: window.INDIAN_PHOTOS.indianHaldiMarigold, caption: 'Marigold Courtyard' },
      { url: window.INDIAN_PHOTOS.indianWeddingVarmala, caption: 'Pithi Smiles' },
      { url: window.INDIAN_PHOTOS.indianCoupleRoyalPortrait, caption: 'Golden Blessings' }
    ]
  },
  {
    id: 'mehendi',
    name: 'Mehendi',
    hindiTitle: 'मेहंदी',
    tagline: 'Sojat Henna & Lac Bangles',
    dayLabel: 'Day 01 • 4:30 PM',
    date: '17 Feb 2027',
    time: '4:30 PM',
    venue: 'Chandra Bagh Terraces',
    dressCode: 'Emerald & Leheriya',
    paletteSwatches: ['#059669', '#6EE7B7', '#D4AF37'],
    gradientOverlay: 'from-[#140206] via-[#064E3B]/55 to-transparent',
    description: 'Bridal henna & sarangi melodies under the twilight sky.',
    ritualHighlight: 'Mehendi Reveal',
    hospitalityNote: 'Handcrafted lac bangles & traditional Mojaris.',
    coverImage: window.INDIAN_PHOTOS.indianBridalMehendi,
    gallery: [
      { url: window.INDIAN_PHOTOS.indianBridalMehendi, caption: 'Bridal Henna' },
      { url: window.INDIAN_PHOTOS.indianBrideRedLehenga, caption: 'Polki & Kundan' },
      { url: window.INDIAN_PHOTOS.indianHaldiMarigold, caption: 'Garden Folk Music' }
    ]
  },
  {
    id: 'sangeet',
    name: 'Sangeet Mehfil',
    hindiTitle: 'संगीत',
    tagline: 'Starlight & Folk Fusion',
    dayLabel: 'Day 01 • 8:30 PM',
    date: '17 Feb 2027',
    time: '8:30 PM',
    venue: 'Diwan-i-Khas Ballroom',
    dressCode: 'Velvet & Antique Gold',
    paletteSwatches: ['#4C1D95', '#D4AF37', '#1E1B4B'],
    gradientOverlay: 'from-[#140206] via-[#2E1065]/60 to-transparent',
    description: 'Manganiyar ballads & energetic family dance celebrations.',
    ritualHighlight: 'Royal Dance-Off',
    hospitalityNote: 'Mewari royal grill & spiced saffron cocktails.',
    coverImage: window.INDIAN_PHOTOS.indianWeddingLights,
    gallery: [
      { url: window.INDIAN_PHOTOS.indianWeddingLights, caption: 'Grand Ballroom' },
      { url: window.INDIAN_PHOTOS.indianCoupleRoyalPortrait, caption: 'First Dance' },
      { url: window.INDIAN_PHOTOS.jaipurPalaceArch, caption: 'Jaipur Night' }
    ]
  },
  {
    id: 'baraat',
    name: 'Shahi Baraat',
    hindiTitle: 'बारात',
    tagline: 'Royal Safas & Nagada',
    dayLabel: 'Day 02 • 4:30 PM',
    date: '18 Feb 2027',
    time: '4:30 PM',
    venue: 'Rajputana Pol Gate',
    dressCode: 'Crimson Safa & Sherwani',
    paletteSwatches: ['#991B1B', '#D4AF37', '#FFF1F2'],
    gradientOverlay: 'from-[#140206] via-[#7F1D1D]/60 to-transparent',
    description: 'Marwari horses, nagada drums & royal Milni ceremony.',
    ritualHighlight: 'Toran & Grand Milni',
    hospitalityNote: 'Safa-tying lounge opens at 3:30 PM.',
    coverImage: window.INDIAN_PHOTOS.indianGroomSherwani,
    gallery: [
      { url: window.INDIAN_PHOTOS.indianGroomSherwani, caption: 'Royal Groom' },
      { url: window.INDIAN_PHOTOS.jaipurHawaMahalGate, caption: 'Palace Gateway' },
      { url: window.INDIAN_PHOTOS.indianHaldiMarigold, caption: 'Rose Petal Welcome' }
    ]
  },
  {
    id: 'wedding',
    name: 'Varmala & Pheras',
    hindiTitle: 'शुभ विवाह',
    tagline: 'Seven Sacred Vows',
    dayLabel: 'Day 02 • 7:30 PM',
    date: '18 Feb 2027',
    time: '7:30 PM',
    venue: 'The Lotus Mandap',
    dressCode: 'Banarasi & Jodhpuri',
    paletteSwatches: ['#6B0F23', '#D4AF37', '#FBF7F0'],
    gradientOverlay: 'from-[#140206] via-[#4C0519]/70 to-transparent',
    description: 'Sacred Vedic vows around the holy Agni by the palace lake.',
    ritualHighlight: 'Varmala & Saptapadi',
    hospitalityNote: 'Warm pashmina shawls available lakeside.',
    coverImage: window.INDIAN_PHOTOS.indianWeddingMandapRitual,
    gallery: [
      { url: window.INDIAN_PHOTOS.indianWeddingMandapRitual, caption: 'Sacred Agni' },
      { url: window.INDIAN_PHOTOS.indianWeddingVarmala, caption: 'Varmala Exchange' },
      { url: window.INDIAN_PHOTOS.indianBrideRedLehenga, caption: 'Bridal Couture' }
    ]
  },
  {
    id: 'reception',
    name: 'Grand Reception',
    hindiTitle: 'स्वागत समारोह',
    tagline: 'Candlelit Palace Banquet',
    dayLabel: 'Day 03 • 8:00 PM',
    date: '19 Feb 2027',
    time: '8:00 PM',
    venue: 'Sheesh Mahal Lawns',
    dressCode: 'Black Tie & Bandhgala',
    paletteSwatches: ['#1F2937', '#D4AF37', '#F5E6C4'],
    gradientOverlay: 'from-[#140206] via-[#291D0A]/65 to-transparent',
    description: 'Royal banquet, live symphonic ensemble & rampart fireworks.',
    ritualHighlight: 'Royal Entry & Fireworks',
    hospitalityNote: 'Seven-course royal Rajasthani and global dinner.',
    coverImage: window.INDIAN_PHOTOS.udaipurLakePalace,
    gallery: [
      { url: window.INDIAN_PHOTOS.udaipurLakePalace, caption: 'Illuminated Palace' },
      { url: window.INDIAN_PHOTOS.indianCoupleRoyalPortrait, caption: 'Newlyweds' },
      { url: window.INDIAN_PHOTOS.indianWeddingLights, caption: 'Candlelit Banquet' }
    ]
  }
];

// Cinematic Gallery Items with Categories and Aspect Ratios
window.GALLERY_ITEMS = [
  {
    id: 'g1',
    type: 'photo',
    event: 'Pre-Wedding',
    title: 'Nahargarh Sunset',
    caption: 'Jaipur Fort Panorama',
    aspectClass: 'aspect-portrait',
    url: window.INDIAN_PHOTOS.indianCoupleRoyalPortrait
  },
  {
    id: 'g2',
    type: 'photo',
    event: 'Baraat & Pheras',
    title: 'Sacred Varmala',
    caption: 'Lotus Mandap Ceremony',
    aspectClass: 'aspect-3-4',
    url: window.INDIAN_PHOTOS.indianWeddingVarmala
  },
  {
    id: 'g3',
    type: 'video',
    event: 'Pre-Wedding',
    title: 'Jaipur Cinema Reel',
    caption: '4K Motion Highlights',
    aspectClass: 'aspect-video',
    url: window.INDIAN_PHOTOS.jaipurPalaceArch,
    videoUrl: window.HERO_MEDIA.weddingFilmVideo
  },
  {
    id: 'g4',
    type: 'photo',
    event: 'Haldi',
    title: 'Marigold Morning',
    caption: 'Surya Mahal Courtyard',
    aspectClass: 'aspect-portrait',
    url: window.INDIAN_PHOTOS.indianHaldiMarigold
  },
  {
    id: 'g5',
    type: 'photo',
    event: 'Mehendi',
    title: 'Bridal Henna',
    caption: 'Chandra Bagh Terraces',
    aspectClass: 'aspect-portrait',
    url: window.INDIAN_PHOTOS.indianBridalMehendi
  },
  {
    id: 'g6',
    type: 'video',
    event: 'Sangeet',
    title: 'Sangeet Highlights',
    caption: 'Diwan-i-Khas Celebration',
    aspectClass: 'aspect-video',
    url: window.INDIAN_PHOTOS.indianWeddingLights,
    videoUrl: window.HERO_MEDIA.sangeetHighlightVideo
  },
  {
    id: 'g7',
    type: 'photo',
    event: 'Baraat & Pheras',
    title: 'Vedic Agni',
    caption: 'Saptapadi Seven Vows',
    aspectClass: 'aspect-3-4',
    url: window.INDIAN_PHOTOS.indianWeddingMandapRitual
  },
  {
    id: 'g8',
    type: 'photo',
    event: 'Reception',
    title: 'Crimson Zardozi',
    caption: 'The Royal Bride',
    aspectClass: 'aspect-portrait',
    url: window.INDIAN_PHOTOS.indianBrideRedLehenga
  },
  {
    id: 'g9',
    type: 'photo',
    event: 'Baraat & Pheras',
    title: 'Ivory Sherwani',
    caption: 'The Royal Groom',
    aspectClass: 'aspect-portrait',
    url: window.INDIAN_PHOTOS.indianGroomSherwani
  }
];

// Initial Guest Blessings
window.INITIAL_WISHES = [
  {
    id: 'w1',
    name: 'Vikramaditya & Gayatri Singh',
    relation: 'Parents of the Groom',
    message: 'May your home forever echo with love, prosperity, and eternal grace.',
    timestamp: 'Blessing',
    photoUrl: null,
    isDemoSession: false
  },
  {
    id: 'w2',
    name: 'Rajendra & Sunita Rathore',
    relation: 'Parents of the Bride',
    message: 'Khamma Ghani. Wishing you both a lifetime of divine companionship and joy.',
    timestamp: 'Blessing',
    photoUrl: null,
    isDemoSession: false
  }
];
