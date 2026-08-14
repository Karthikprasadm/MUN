import { createSphereOrbit } from './globe-carousel-3d.js';

// Curated collection of exactly 40 high-resolution images to match the 40 sphere tiles
const galleryData = [
  { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80", alt: "Abstract dark lines" },
  { src: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80", alt: "Colorful abstract neon blur" },
  { src: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80", alt: "Cyclist speed motion blur" },
  { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80", alt: "Sun behind field grass blur" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", alt: "Blurred portrait face" },
  { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80", alt: "Tree branches bokeh lights" },
  { src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80", alt: "Sunset orange clouds blur" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", alt: "Stars night sky" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80", alt: "Green mountains clouds" },
  { src: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80", alt: "Motorcycle speed motion blur" },
  { src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80", alt: "Green trees aerial view" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", alt: "Techno circuit lines" },
  { src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", alt: "Long exposure night light trails" },
  { src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80", alt: "Runner on track athlete motion blur" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", alt: "Glacial lake hills" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", alt: "Wildflower meadow blur" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80", alt: "Misty forest trees" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", alt: "Laptop screen dark room" },
  { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80", alt: "Suspended forest bridge" },
  { src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80", alt: "Matrix digital code glitch" },
  { src: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80", alt: "Camera lens zoom motion blur" },
  { src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", alt: "Brutalist architecture stairs" },
  { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", alt: "Neon retro room" },
  { src: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80", alt: "Abstract light swirl motion" },
  { src: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?auto=format&fit=crop&w=800&q=80", alt: "Saturated studio portrait" },
  { src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80", alt: "Bokeh concert audience" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80", alt: "Dynamic stage strobe light" },
  { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80", alt: "Crowd hands concert motion" },
  { src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80", alt: "Colorful night light leak" },
  { src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80", alt: "Photographer lens flare blur" },
  { src: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=80", alt: "Abstract pop art colors" },
  { src: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80", alt: "Textured paper background" },
  { src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80", alt: "Abstract blue ink swirl" },
  { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80", alt: "Modern paint strokes" },
  { src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80", alt: "Colorful artist palette" },
  { src: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=800&q=80", alt: "Cyberpunk street lights" },
  { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", alt: "Bright distant sunset glow" },
  { src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80", alt: "Geometric light mesh" },
  { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", alt: "Server computer indicators" },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", alt: "Tech microchips glow" }
];

const images = galleryData.map(item => ({
  src: item.src,
  alt: item.alt
}));

const carouselRoot = document.getElementById("carousel-root");

// Standard configuration matching the Framer default properties
const config = {
  images: images,
  autoRotate: true,
  speed: 14,
  axis: 'y',
  direction: 1,
  count: 40,
  radius: 220,
  distance: 650,
  tileWidth: 90,
  tileHeight: 112,
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
