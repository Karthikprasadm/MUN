import { createSphereOrbit } from './globe-carousel-3d.js';

// Curated list of 30 verified working red-vibe URLs from the internet
const baseRedVibeImages = [
  { src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", alt: "Red paint splash" },
  { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80", alt: "Red neon signs" },
  { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80", alt: "Red concert stage" },
  { src: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=800&q=80", alt: "Red street lights" },
  { src: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?auto=format&fit=crop&w=800&q=80", alt: "Red gel studio portrait" },
  { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80", alt: "Gold and red brushstrokes" },
  { src: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80", alt: "Red light sphere" },
  { src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80", alt: "Red geometric wireframe" },
  { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", alt: "Neon red console glow" },
  { src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80", alt: "Hot red light leaks" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", alt: "Saturated red flowers" },
  { src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80", alt: "Fiery red sunset" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80", alt: "Red concert strobe lasers" },
  { src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", alt: "Red taillight trails" },
  { src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80", alt: "Orange red morning ocean" },
  { src: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80", alt: "Red city accents" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80", alt: "Red haired woman portrait" },
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80", alt: "Warm sunlight red shirt" },
  { src: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=800&q=80", alt: "Man portrait in red overlay" },
  { src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80", alt: "Red fluid swirls" },
  { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80", alt: "Red architectural details" },
  { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", alt: "Crimson horizon glow" },
  { src: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=800&q=80", alt: "Red rose macro" },
  { src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80", alt: "Red autumn foliage" },
  { src: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=800&q=80", alt: "Red forest leaves" },
  { src: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=80", alt: "Aesthetic red abstract" },
  { src: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80", alt: "Red textured canvas" },
  { src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80", alt: "Red paint palette details" },
  { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", alt: "Computer server red indicators" },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", alt: "Tech circuits red highlights" }
];

// Duplicate the list to make a total of 60 items
const galleryData = [
  ...baseRedVibeImages.map((item, idx) => ({ ...item, alt: `${item.alt} 1` })),
  ...baseRedVibeImages.map((item, idx) => ({ ...item, alt: `${item.alt} 2` }))
];

const images = galleryData.map(item => ({
  src: item.src,
  alt: item.alt
}));

const carouselRoot = document.getElementById("carousel-root");

// Standard configuration matching the Framer default properties, with count set to 55
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
