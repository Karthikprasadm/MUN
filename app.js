import { createSphereOrbit } from './globe-carousel-3d.js';

// Curated list of 30 verified working portrait URLs
const basePortraits = [
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80", alt: "Portrait A1" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", alt: "Portrait A2" },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80", alt: "Portrait A3" },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80", alt: "Portrait A4" },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80", alt: "Portrait A5" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", alt: "Portrait A6" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", alt: "Portrait A7" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80", alt: "Portrait A8" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80", alt: "Portrait A9" },
  { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80", alt: "Portrait A10" },
  { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80", alt: "Portrait A11" },
  { src: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=800&q=80", alt: "Portrait A12" },
  { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80", alt: "Portrait A13" },
  { src: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=80", alt: "Portrait A14" },
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80", alt: "Portrait A15" },
  { src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80", alt: "Portrait A16" },
  { src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80", alt: "Portrait A17" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", alt: "Portrait A18" },
  { src: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80", alt: "Portrait A19" },
  { src: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?auto=format&fit=crop&w=800&q=80", alt: "Portrait A20" },
  { src: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", alt: "Portrait A21" },
  { src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=800&q=80", alt: "Portrait A22" },
  { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80", alt: "Portrait A23" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", alt: "Portrait A24" },
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80", alt: "Portrait A25" },
  { src: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80", alt: "Portrait A26" },
  { src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80", alt: "Portrait A27" },
  { src: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80", alt: "Portrait A28" },
  { src: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80", alt: "Portrait A29" },
  { src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80", alt: "Portrait A30" }
];

// Duplicate the list of 30 portraits to make a total of 60 items
const galleryData = [
  ...basePortraits.map((item, idx) => ({ ...item, alt: `Portrait ${idx + 1}` })),
  ...basePortraits.map((item, idx) => ({ ...item, alt: `Portrait ${idx + 31}` }))
];

const images = galleryData.map(item => ({
  src: item.src,
  alt: item.alt
}));

const carouselRoot = document.getElementById("carousel-root");

// Standard configuration matching the Framer default properties, with count set to 60
const config = {
  images: images,
  autoRotate: true,
  speed: 14,
  axis: 'y',
  direction: 1,
  count: 55,
  radius: 165,
  distance: 445,
  tileWidth: 64,
  tileHeight: 80,
  depthFade: 0.8,
  hideBack: false,
  tilt: 0,
  cornerRadius: 4,
  tileShadow: "",
  openShadow: "0px 30px 80px 0px rgba(0,0,0,0.6)",
  openable: true,
  draggable: true,
  keyboard: true,
  respectReducedMotion: true
};

// Initialize the 3D Sphere Orbit Carousel
const carousel = createSphereOrbit(carouselRoot, config);

// Handle Window Resize to keep things centered
window.addEventListener("resize", () => {
  carousel.resize();
});
