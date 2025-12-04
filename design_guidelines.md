# My Inbox Media® - Corporate Website Design Guidelines

## Project Overview
A comprehensive multi-page corporate website for My Inbox Media® - a global IT & Telecommunication solutions provider serving 25,000+ businesses across 20+ countries for 16+ years. The design emphasizes professionalism, trust, innovation, and global enterprise presence with modern 3D effects and smooth animations.

---

## 🎨 Color System

### Primary Colors
```json
{
  "navy_primary": "#1E2A44",
  "navy_dark": "#141D2F",
  "navy_light": "#2A3A54",
  "orange_primary": "#E55227",
  "orange_hover": "#D14520",
  "orange_light": "#FF6B3D"
}
```

### Secondary & Neutral Colors
```json
{
  "white": "#FFFFFF",
  "gray_50": "#F9FAFB",
  "gray_100": "#F3F4F6",
  "gray_200": "#E5E7EB",
  "gray_300": "#D1D5DB",
  "gray_600": "#4B5563",
  "gray_700": "#374151",
  "gray_900": "#111827"
}
```

### Accent & State Colors
```json
{
  "teal_accent": "#177E89",
  "gold_accent": "#FFC857",
  "success": "#10B981",
  "warning": "#F59E0B",
  "error": "#EF4444",
  "info": "#3B82F6"
}
```

### Gradient Definitions (RESTRICTED USE - Max 20% viewport)
**IMPORTANT: Use gradients ONLY for hero sections and major CTAs. Never use on text-heavy content or small UI elements.**

```css
/* Hero Section Gradient - Horizontal */
.hero-gradient {
  background: linear-gradient(135deg, #1E2A44 0%, #2A3A54 50%, #1E2A44 100%);
}

/* Accent Gradient - Subtle for cards */
.accent-gradient {
  background: linear-gradient(135deg, rgba(23, 126, 137, 0.1) 0%, rgba(255, 200, 87, 0.1) 100%);
}

/* CTA Button Gradient */
.cta-gradient {
  background: linear-gradient(135deg, #E55227 0%, #FF6B3D 100%);
}

/* Section Divider Gradient */
.divider-gradient {
  background: linear-gradient(90deg, transparent 0%, #177E89 50%, transparent 100%);
}
```

### Color Usage Rules
- **Navy (#1E2A44)**: Primary brand color, navigation, headers, footers, major sections
- **Orange (#E55227)**: CTAs, links, highlights, icons, hover states
- **White/Gray backgrounds**: All content areas, cards, forms
- **Gradients**: ONLY hero sections (max 20% viewport), never on reading areas
- **Text on Navy**: Use white (#FFFFFF) for maximum contrast
- **Text on White**: Use navy (#1E2A44) or gray-900 (#111827)

---

## 📝 Typography System

### Font Families
```css
/* Primary Font - Headings & Display */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* Secondary Font - Body & UI */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Accent Font - Stats & Numbers */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&display=swap');
```

### Typography Scale
```json
{
  "font_families": {
    "heading": "'Space Grotesk', sans-serif",
    "body": "'Inter', sans-serif",
    "mono": "'IBM Plex Mono', monospace"
  },
  "font_sizes": {
    "h1_mobile": "2.25rem",
    "h1_tablet": "3rem",
    "h1_desktop": "3.75rem",
    "h2_mobile": "1.875rem",
    "h2_tablet": "2.25rem",
    "h2_desktop": "3rem",
    "h3": "1.5rem",
    "h4": "1.25rem",
    "body_large": "1.125rem",
    "body": "1rem",
    "body_small": "0.875rem",
    "caption": "0.75rem"
  },
  "font_weights": {
    "light": 300,
    "regular": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700
  },
  "line_heights": {
    "tight": 1.2,
    "normal": 1.5,
    "relaxed": 1.75,
    "loose": 2
  }
}
```

### Typography Usage
```css
/* H1 - Main Page Titles */
.heading-1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.25rem; /* text-4xl mobile */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .heading-1 { font-size: 3rem; } /* text-5xl tablet */
}

@media (min-width: 1024px) {
  .heading-1 { font-size: 3.75rem; } /* text-6xl desktop */
}

/* H2 - Section Headings */
.heading-2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem; /* text-base mobile */
  font-weight: 600;
  line-height: 1.3;
}

@media (min-width: 768px) {
  .heading-2 { font-size: 1.125rem; } /* text-lg tablet */
}

/* Body Text */
.body-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem; /* text-base */
  font-weight: 400;
  line-height: 1.75;
  color: #374151; /* gray-700 */
}

@media (max-width: 767px) {
  .body-text { font-size: 0.875rem; } /* text-sm mobile */
}

/* Stats/Numbers */
.stat-number {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
  color: #E55227;
}
```

---

## 🧩 Component Library

### Shadcn/UI Components to Use
```json
{
  "navigation": [
    "/app/frontend/src/components/ui/navigation-menu.jsx",
    "/app/frontend/src/components/ui/sheet.jsx"
  ],
  "content_display": [
    "/app/frontend/src/components/ui/card.jsx",
    "/app/frontend/src/components/ui/carousel.jsx",
    "/app/frontend/src/components/ui/tabs.jsx",
    "/app/frontend/src/components/ui/accordion.jsx",
    "/app/frontend/src/components/ui/badge.jsx"
  ],
  "forms": [
    "/app/frontend/src/components/ui/input.jsx",
    "/app/frontend/src/components/ui/textarea.jsx",
    "/app/frontend/src/components/ui/select.jsx",
    "/app/frontend/src/components/ui/button.jsx",
    "/app/frontend/src/components/ui/form.jsx",
    "/app/frontend/src/components/ui/label.jsx"
  ],
  "feedback": [
    "/app/frontend/src/components/ui/sonner.jsx",
    "/app/frontend/src/components/ui/alert.jsx",
    "/app/frontend/src/components/ui/progress.jsx"
  ],
  "overlays": [
    "/app/frontend/src/components/ui/dialog.jsx",
    "/app/frontend/src/components/ui/popover.jsx",
    "/app/frontend/src/components/ui/tooltip.jsx"
  ],
  "admin": [
    "/app/frontend/src/components/ui/table.jsx",
    "/app/frontend/src/components/ui/pagination.jsx",
    "/app/frontend/src/components/ui/dropdown-menu.jsx"
  ]
}
```

### Button Styles (Professional Corporate)

**Shape**: Medium Radius (8px) with subtle elevation
**Surface**: Solid fills with smooth transitions
**Motion**: Subtle hover with scale and shadow

```css
/* Primary CTA Button */
.btn-primary {
  background: linear-gradient(135deg, #E55227 0%, #FF6B3D 100%);
  color: #FFFFFF;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  box-shadow: 0 4px 12px rgba(229, 82, 39, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(229, 82, 39, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1E2A44;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid #1E2A44;
  transition: background 0.2s ease, color 0.2s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #1E2A44;
  color: #FFFFFF;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: #E55227;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  transition: background 0.2s ease;
  cursor: pointer;
}

.btn-ghost:hover {
  background: rgba(229, 82, 39, 0.1);
}

/* Icon Button */
.btn-icon {
  background: #F3F4F6;
  color: #1E2A44;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: background 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.btn-icon:hover {
  background: #E5E7EB;
  transform: scale(1.05);
}
```

### Card Styles with 3D Effects

```css
/* Service Card with 3D Tilt */
.service-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.service-card:hover {
  transform: translateY(-8px) rotateX(2deg) rotateY(2deg);
  box-shadow: 0 20px 40px rgba(30, 42, 68, 0.15);
}

/* Client Logo Card */
.client-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.client-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Stat Card with Glassmorphism */
.stat-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(30, 42, 68, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

/* Testimonial Card */
.testimonial-card {
  background: #F9FAFB;
  border-left: 4px solid #E55227;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

### Form Elements

```css
/* Input Field */
.input-field {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #111827;
  background: #FFFFFF;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #E55227;
  box-shadow: 0 0 0 3px rgba(229, 82, 39, 0.1);
}

.input-field::placeholder {
  color: #9CA3AF;
}

/* Textarea */
.textarea-field {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #111827;
  background: #FFFFFF;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.textarea-field:focus {
  outline: none;
  border-color: #E55227;
  box-shadow: 0 0 0 3px rgba(229, 82, 39, 0.1);
}

/* Select Dropdown - Use Shadcn Select Component */
/* Path: /app/frontend/src/components/ui/select.jsx */
```

---

## 🎭 Animation & Motion Specifications

### Animation Library Setup
```bash
# Install Framer Motion for animations
npm install framer-motion

# Install React Intersection Observer for scroll animations
npm install react-intersection-observer
```

### Scroll Animations
```javascript
// Fade In Up Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Fade In Left
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Fade In Right
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Scale In
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Stagger Children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

### 3D Card Tilt Effect
```javascript
// Install react-tilt for 3D card effects
// npm install react-parallax-tilt

// Usage Example:
import Tilt from 'react-parallax-tilt';

<Tilt
  tiltMaxAngleX={5}
  tiltMaxAngleY={5}
  scale={1.02}
  transitionSpeed={2000}
  glareEnable={true}
  glareMaxOpacity={0.2}
  glareColor="#E55227"
  glarePosition="all"
>
  <div className="service-card">
    {/* Card content */}
  </div>
</Tilt>
```

### Counter Animation for Stats
```javascript
// Install react-countup for animated counters
// npm install react-countup

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatCounter = ({ end, suffix }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  
  return (
    <div ref={ref}>
      {inView && (
        <CountUp
          end={end}
          duration={2.5}
          suffix={suffix}
          separator=","
        />
      )}
    </div>
  );
};
```

### Carousel/Slider Configuration
```javascript
// Use Shadcn Carousel component
// Path: /app/frontend/src/components/ui/carousel.jsx

// Install embla-carousel-autoplay for auto-scroll
// npm install embla-carousel-autoplay

import Autoplay from "embla-carousel-autoplay";

// Client Logo Carousel Config
const clientCarouselOptions = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
  plugins: [
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  ]
};

// Service Carousel Config
const serviceCarouselOptions = {
  loop: true,
  align: "center",
  slidesToScroll: 1,
};
```

### Page Transition
```javascript
// Page transition wrapper
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 }
};
```

### Hover Transitions
```css
/* Standard hover transition */
.hover-transition {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

/* Smooth color transition */
.color-transition {
  transition: color 0.2s ease, background-color 0.2s ease;
}

/* Scale hover */
.scale-hover:hover {
  transform: scale(1.05);
}

/* Lift hover */
.lift-hover:hover {
  transform: translateY(-4px);
}
```

---

## 📐 Layout & Grid System

### Container Widths
```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1400px;
  }
}
```

### Grid Patterns

**Service Grid (3 columns desktop, 2 tablet, 1 mobile)**
```css
.service-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .service-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}
```

**Stats Grid (4 columns desktop, 2 mobile)**
```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

**Client Logo Grid (6 columns desktop, 3 tablet, 2 mobile)**
```css
.client-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .client-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .client-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

### Section Spacing
```css
/* Section padding */
.section {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}

/* Section with background */
.section-alt {
  background: #F9FAFB;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .section-alt {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

@media (min-width: 1024px) {
  .section-alt {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}
```

### Spacing Scale (Tailwind-based)
```json
{
  "spacing": {
    "xs": "0.5rem",
    "sm": "0.75rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
    "4xl": "4rem",
    "5xl": "5rem",
    "6xl": "6rem"
  }
}
```

---

## 🖼️ Image Assets & Usage

### Hero Section Images
```json
{
  "hero_backgrounds": [
    {
      "url": "https://images.unsplash.com/photo-1688516353461-540cd4b178fa",
      "description": "Abstract blue gradient background for hero overlay",
      "usage": "Hero section background with overlay"
    },
    {
      "url": "https://images.unsplash.com/photo-1688516353448-2351953b4b76",
      "description": "Dark blue abstract gradient",
      "usage": "Alternative hero background"
    }
  ]
}
```

### About/Team Section Images
```json
{
  "team_corporate": [
    {
      "url": "https://images.unsplash.com/photo-1758518726869-01aff69a56e3",
      "description": "Business professionals in modern office discussing",
      "usage": "About page - team collaboration section"
    },
    {
      "url": "https://images.unsplash.com/photo-1758518729685-f88df7890776",
      "description": "Business meeting with financial graphs",
      "usage": "About page - strategy and planning section"
    },
    {
      "url": "https://images.unsplash.com/photo-1758518727477-3885839edee7",
      "description": "Cheerful business team in modern office",
      "usage": "About page - company culture section"
    },
    {
      "url": "https://images.unsplash.com/photo-1758518731722-320023fb8e66",
      "description": "Business team taking selfie together",
      "usage": "About page - team spirit section"
    }
  ]
}
```

### Technology/Service Section Images
```json
{
  "technology_images": [
    {
      "url": "https://images.unsplash.com/photo-1763392638128-647961c3ccd7",
      "description": "Cell tower with antennas - telecommunication",
      "usage": "Services page - telecommunication infrastructure"
    },
    {
      "url": "https://images.pexels.com/photos/7412014/pexels-photo-7412014.jpeg",
      "description": "Digital network technology",
      "usage": "Services page - network solutions"
    },
    {
      "url": "https://images.pexels.com/photos/4556977/pexels-photo-4556977.jpeg",
      "description": "Global communication technology",
      "usage": "Services page - global reach section"
    }
  ]
}
```

### Background Textures (Subtle)
```json
{
  "textures": [
    {
      "url": "https://images.pexels.com/photos/2078266/pexels-photo-2078266.jpeg",
      "description": "Subtle gradient texture",
      "usage": "Section backgrounds with low opacity (0.05-0.1)"
    },
    {
      "url": "https://images.pexels.com/photos/6843588/pexels-photo-6843588.jpeg",
      "description": "Teal gradient texture",
      "usage": "Accent section backgrounds"
    }
  ]
}
```

### Image Optimization Guidelines
```json
{
  "optimization": {
    "hero_images": "1920x1080px, WebP format, quality 85",
    "service_cards": "800x600px, WebP format, quality 80",
    "client_logos": "300x200px, PNG with transparency",
    "team_photos": "600x600px, WebP format, quality 85",
    "thumbnails": "400x300px, WebP format, quality 75"
  },
  "lazy_loading": "Use native lazy loading for all images below fold",
  "responsive_images": "Use srcset for different screen sizes"
}
```

---

## 🎯 Page-Specific Layouts

### 1. Home Page Layout

**Hero Section**
- Full viewport height (min-h-screen)
- Navy gradient background with subtle animation
- Centered content with large heading
- Country flags ribbon below heading
- Primary CTA button with icon
- Scroll indicator at bottom
- Parallax effect on scroll

**Stats Section**
- 4-column grid (2 on mobile)
- Glassmorphism stat cards
- Animated counters on scroll into view
- Icons from lucide-react

**Featured Services Preview**
- 3-column grid (1 on mobile)
- Service cards with 3D tilt effect
- Icon, title, short description
- "Learn More" link with arrow

**Trust Indicators**
- 2-column layout (1 on mobile)
- ISO certification badges
- Security features list
- Enterprise-grade messaging

**CTA Section**
- Centered content
- Large heading
- Primary CTA button
- Background with subtle gradient

### 2. About Page Layout

**Company Story Section**
- Two-column layout (text + image)
- Timeline of milestones
- Fade-in animations

**Mission & Vision**
- Card-based layout
- Icon + heading + description
- Side-by-side on desktop

**Global Presence**
- Interactive world map (optional)
- Country list with flags
- Office locations

**Stats Grid**
- Same as home page
- Additional company metrics

### 3. Services Page Layout

**Services Grid**
- Fetch from external API
- Carousel on mobile, grid on desktop
- Service cards with:
  - Icon (lucide-react)
  - Title
  - Description
  - Features list
  - CTA button
- 3D tilt effect on hover

**Service Detail Modal/Page**
- Full description
- Features list with checkmarks
- Pricing information (if applicable)
- Contact form

### 4. Clients Page Layout

**Client Logo Wall**
- Infinite scroll carousel
- 6 logos per row on desktop
- Grayscale logos, color on hover
- Auto-play with pause on hover

**Client Stats**
- Number of clients
- Industries served
- Countries

**Testimonials Carousel**
- Card-based testimonials
- Client photo, name, company
- Quote text
- Star rating

### 5. Blog Page Layout

**Blog List**
- Grid layout (3 columns desktop, 1 mobile)
- Featured image
- Category badge
- Title, excerpt
- Read time, date
- Author info
- "Read More" link

**Blog Detail**
- Single column, max-width 768px
- Featured image
- Title, meta info
- Rich text content
- Share buttons
- Related posts

### 6. Case Studies Page Layout

**Portfolio Grid**
- Masonry layout or standard grid
- Project thumbnail
- Client name, industry
- Brief description
- "View Case Study" overlay on hover

**Case Study Detail**
- Hero image
- Client info, challenge, solution, results
- Metrics/stats
- Screenshots/images
- Testimonial quote

### 7. Testimonials Page Layout

**Testimonial Grid**
- 2-column layout (1 on mobile)
- Testimonial cards with:
  - Quote text
  - Client photo
  - Name, title, company
  - Star rating
- Filter by industry/service

### 8. Contact Page Layout

**Two-Column Layout**
- Left: Contact form
  - Name, email, phone, service dropdown, message
  - Submit button
  - Form validation
- Right: Contact information
  - Email addresses
  - Phone numbers (multiple countries)
  - Office addresses
  - Map embed (optional)

**Global Offices Section**
- Cards for each office location
- Address, phone, email
- Country flag icon

### 9. Admin Panel Layout

**Login Page**
- Centered card
- Logo
- Email/password fields
- Remember me checkbox
- Login button
- Forgot password link

**Dashboard**
- Sidebar navigation
- Top bar with user menu
- Content area with:
  - Stats cards
  - Recent activity
  - Quick actions

**Content Management**
- Table view for blogs, case studies, testimonials
- CRUD operations
- Rich text editor for content
- Image upload
- Publish/draft status

---

## 🎨 Component-Specific Styling

### Navigation Bar

```css
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  z-index: 50;
  transition: box-shadow 0.3s ease;
}

.navbar.scrolled {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.nav-link {
  color: #374151;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #E55227;
}

.nav-cta {
  background: #E55227;
  color: #FFFFFF;
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s ease;
}

.nav-cta:hover {
  background: #D14520;
}
```

### Footer

```css
.footer {
  background: #1E2A44;
  color: #FFFFFF;
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
  }
}

.footer-heading {
  color: #FFFFFF;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-link {
  color: #D1D5DB;
  display: block;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #E55227;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  transition: background 0.2s ease, transform 0.2s ease;
}

.social-link:hover {
  background: #E55227;
  transform: scale(1.1);
}
```

### Badge Component

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-primary {
  background: rgba(229, 82, 39, 0.1);
  color: #E55227;
}

.badge-success {
  background: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

.badge-info {
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
}
```

### Loading States

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F3F4F6 0%,
    #E5E7EB 50%,
    #F3F4F6 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 8px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E5E7EB;
  border-top-color: #E55227;
  border-radius: 50%;
  animation: spinner-rotate 0.8s linear infinite;
}

@keyframes spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}
```

---

## ♿ Accessibility Guidelines

### Focus States
```css
/* Visible focus indicator */
*:focus-visible {
  outline: 2px solid #E55227;
  outline-offset: 2px;
}

/* Button focus */
button:focus-visible {
  outline: 2px solid #E55227;
  outline-offset: 2px;
}

/* Link focus */
a:focus-visible {
  outline: 2px solid #E55227;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### ARIA Labels & Semantic HTML
```javascript
// All interactive elements must have proper ARIA labels
<button aria-label="Open navigation menu" data-testid="mobile-menu-button">
  <MenuIcon />
</button>

// Use semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Form labels
<label htmlFor="email">Email Address</label>
<input id="email" type="email" aria-required="true" />

// Skip to content link
<a href="#main-content" className="skip-link">Skip to main content</a>
```

### Color Contrast Requirements
- Text on navy (#1E2A44): Use white (#FFFFFF) - WCAG AAA
- Text on white: Use navy (#1E2A44) or gray-900 (#111827) - WCAG AAA
- Orange (#E55227) on white: WCAG AA compliant
- All interactive elements: Minimum 3:1 contrast ratio

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order
- Visible focus indicators
- Escape key closes modals/dropdowns
- Enter/Space activates buttons

---

## 📱 Responsive Breakpoints

```json
{
  "breakpoints": {
    "mobile": "320px - 767px",
    "tablet": "768px - 1023px",
    "desktop": "1024px - 1279px",
    "large_desktop": "1280px+"
  },
  "tailwind_breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  }
}
```

### Mobile-First Approach
```css
/* Base styles for mobile */
.element {
  font-size: 1rem;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    font-size: 1.125rem;
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    font-size: 1.25rem;
    padding: 2rem;
  }
}
```

---

## 🔧 Additional Libraries & Setup

### Required NPM Packages
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react-intersection-observer": "^9.5.0",
    "react-parallax-tilt": "^1.7.0",
    "react-countup": "^6.5.0",
    "embla-carousel-autoplay": "^8.0.0",
    "embla-carousel-react": "^8.0.0",
    "lucide-react": "^0.300.0",
    "sonner": "^1.3.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0"
  }
}
```

### Installation Commands
```bash
# Animation libraries
npm install framer-motion react-intersection-observer

# 3D effects
npm install react-parallax-tilt

# Counter animations
npm install react-countup

# Carousel
npm install embla-carousel-autoplay embla-carousel-react

# Icons
npm install lucide-react

# Toast notifications
npm install sonner

# Form handling
npm install react-hook-form zod @hookform/resolvers
```

### Icon Library Usage (Lucide React)
```javascript
import { 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Globe, 
  Shield, 
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// Usage
<MessageSquare className="w-6 h-6 text-orange-primary" />
```

---

## 🎨 Design Tokens (CSS Custom Properties)

```css
:root {
  /* Colors */
  --color-navy-primary: #1E2A44;
  --color-navy-dark: #141D2F;
  --color-navy-light: #2A3A54;
  --color-orange-primary: #E55227;
  --color-orange-hover: #D14520;
  --color-orange-light: #FF6B3D;
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-900: #111827;
  --color-teal-accent: #177E89;
  --color-gold-accent: #FFC857;
  
  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 2.5rem;
  --spacing-3xl: 3rem;
  --spacing-4xl: 4rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
  
  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

---

## 📋 Data-TestID Conventions

All interactive and key informational elements **MUST** include a `data-testid` attribute using kebab-case:

### Navigation
```javascript
<nav data-testid="main-navigation">
  <a href="/" data-testid="nav-link-home">Home</a>
  <a href="/about" data-testid="nav-link-about">About</a>
  <button data-testid="mobile-menu-toggle">Menu</button>
</nav>
```

### Buttons
```javascript
<button data-testid="cta-explore-services">Explore Services</button>
<button data-testid="contact-form-submit">Send Message</button>
<button data-testid="admin-login-submit">Login</button>
```

### Forms
```javascript
<input data-testid="contact-form-name" />
<input data-testid="contact-form-email" />
<select data-testid="contact-form-service-select" />
<textarea data-testid="contact-form-message" />
```

### Cards & Content
```javascript
<div data-testid="service-card-sms">
<div data-testid="stat-card-clients">
<div data-testid="testimonial-card-1">
<div data-testid="client-logo-card">
```

### Modals & Dialogs
```javascript
<div data-testid="service-detail-modal">
<div data-testid="admin-login-dialog">
```

---

## 🎯 Instructions to Main Agent

### Implementation Priority
1. **Setup Phase**
   - Install all required dependencies
   - Set up design tokens in index.css
   - Configure Tailwind with custom colors
   - Import Google Fonts

2. **Core Components**
   - Create reusable button components (Primary, Secondary, Ghost)
   - Create card components (Service, Stat, Client, Testimonial)
   - Set up navigation with mobile menu
   - Create footer component

3. **Page Development Order**
   - Home page (hero, stats, featured services, CTA)
   - About page
   - Services page (with API integration)
   - Clients page (with carousel)
   - Contact page (with form validation)
   - Blog list and detail pages
   - Case studies pages
   - Testimonials page
   - Admin panel (login, dashboard, content management)

4. **Animation Integration**
   - Add scroll animations to all sections
   - Implement 3D tilt effects on cards
   - Add counter animations to stats
   - Configure carousels with autoplay

5. **Testing & Optimization**
   - Test all interactive elements
   - Verify responsive design on all breakpoints
   - Check accessibility (keyboard navigation, ARIA labels)
   - Optimize images and performance

### Key Implementation Notes

**Color Usage**
- Use navy (#1E2A44) for primary brand elements
- Use orange (#E55227) sparingly for CTAs and accents
- White/light gray backgrounds for all content areas
- **NEVER use gradients on text-heavy content**
- Gradients only for hero sections (max 20% viewport)

**Typography**
- Space Grotesk for all headings
- Inter for body text and UI elements
- IBM Plex Mono for stats and numbers
- Maintain proper hierarchy with defined sizes

**Components**
- Use Shadcn/UI components from `/app/frontend/src/components/ui/`
- Carousel: `/app/frontend/src/components/ui/carousel.jsx`
- Forms: Use form.jsx, input.jsx, select.jsx, textarea.jsx
- Dialogs: Use dialog.jsx for modals
- Toasts: Use sonner.jsx for notifications

**Animations**
- Use Framer Motion for scroll animations
- Use react-parallax-tilt for 3D card effects
- Use react-countup for stat counters
- Use embla-carousel-autoplay for auto-scrolling carousels

**3D Effects**
- Apply to service cards, client cards
- Use subtle tilt angles (max 5 degrees)
- Add glare effect with orange color
- Smooth transitions (2000ms)

**Forms**
- Use react-hook-form for form handling
- Use zod for validation
- Show validation errors inline
- Use sonner for success/error toasts

**Responsive Design**
- Mobile-first approach
- Test on 320px, 768px, 1024px, 1280px
- Stack grids on mobile
- Adjust font sizes per breakpoint

**Accessibility**
- All buttons/links must have data-testid
- Proper ARIA labels on all interactive elements
- Visible focus states
- Keyboard navigation support
- Semantic HTML structure

**API Integration**
- Services fetched from external API
- Display in carousel on mobile, grid on desktop
- Show loading skeleton while fetching
- Handle errors gracefully

**Admin Panel**
- Protected routes with authentication
- CRUD operations for blogs, case studies, testimonials
- Rich text editor for content
- Image upload functionality
- Table view with pagination

### Common Mistakes to Avoid

**DON'T:**
- Use dark purple, dark blue, dark pink gradients
- Apply gradients to more than 20% of viewport
- Use gradients on small UI elements or text areas
- Center-align all text (disrupts reading flow)
- Use emoji icons (use lucide-react instead)
- Apply universal transitions (breaks transforms)
- Skip data-testid attributes
- Ignore mobile responsiveness

**DO:**
- Use solid colors for content areas
- Keep gradients for hero sections only
- Use proper color contrast (WCAG AA minimum)
- Add hover states to all interactive elements
- Use smooth transitions (0.2s-0.3s)
- Test keyboard navigation
- Optimize images (WebP format)
- Add loading states

### Brand Personality
- **Professional**: Clean layouts, proper spacing, corporate colors
- **Trustworthy**: ISO certifications, security badges, testimonials
- **Innovative**: 3D effects, smooth animations, modern design
- **Global**: Country flags, international presence, multi-language support (future)

### Visual Hierarchy
1. Hero section with large heading and CTA
2. Stats section with animated counters
3. Services preview with 3D cards
4. Trust indicators (ISO, security)
5. Client logos and testimonials
6. Final CTA section
7. Comprehensive footer

---

## 📚 Reference Links

- **Shadcn/UI Documentation**: https://ui.shadcn.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Lucide Icons**: https://lucide.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Hook Form**: https://react-hook-form.com/
- **Embla Carousel**: https://www.embla-carousel.com/

---

## ✅ Design Checklist

- [ ] All design tokens defined in CSS custom properties
- [ ] Google Fonts imported (Space Grotesk, Inter, IBM Plex Mono)
- [ ] Tailwind configured with custom colors
- [ ] All Shadcn/UI components installed
- [ ] Framer Motion installed and configured
- [ ] React Parallax Tilt installed for 3D effects
- [ ] React CountUp installed for stat animations
- [ ] Embla Carousel installed with autoplay
- [ ] Lucide React icons installed
- [ ] Sonner toast notifications installed
- [ ] React Hook Form and Zod installed
- [ ] All buttons have proper hover states
- [ ] All cards have 3D tilt effects
- [ ] All sections have scroll animations
- [ ] All forms have validation
- [ ] All interactive elements have data-testid
- [ ] All images optimized and lazy-loaded
- [ ] Responsive design tested on all breakpoints
- [ ] Accessibility features implemented
- [ ] Keyboard navigation working
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA
- [ ] Loading states for async operations
- [ ] Error handling for API calls
- [ ] Admin panel authentication working
- [ ] CRUD operations functional

---

# GENERAL UI UX DESIGN GUIDELINES

## Critical Rules

### Transition Restrictions
- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms

### Text Alignment
- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text

### Icon Usage
- NEVER use AI assistant Emoji characters like `🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇` etc for icons
- Always use **FontAwesome CDN** or **lucid-react** library already installed in package.json

## GRADIENT RESTRICTION RULE

### Prohibited Gradients
- NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element
- Prohibited gradients: blue-500 to purple-600, purple-500 to pink-500, green-500 to blue-500, red to pink etc
- NEVER use dark gradients for logo, testimonial, footer etc
- NEVER let gradients cover more than 20% of the viewport
- NEVER apply gradients to text-heavy content or reading areas
- NEVER use gradients on small UI elements (<100px width)
- NEVER stack multiple gradient layers in the same viewport

### ENFORCEMENT RULE
- If gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

### How and Where to Use Gradients
- Section backgrounds (not content backgrounds)
- Hero section header content. Eg: dark to light to dark color
- Decorative overlays and accent elements only
- Hero section with 2-3 mild color
- Gradients creation can be done for any angle say horizontal, vertical or diagonal

## Color Guidelines for AI Applications
- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

## Interaction & Animation
- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead.

## Spacing
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

## Details Matter
- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.

## Design Token Instantiation
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults
- Don't make the background dark as a default step, always understand problem first and define colors accordingly
- Example: 
  - if it implies playful/energetic, choose a colorful scheme
  - if it implies monochrome/minimal, choose a black–white/neutral scheme

## Component Reuse
- Prioritize using pre-existing components from src/components/ui when applicable
- Create new components that match the style and conventions of existing components when needed
- Examine existing components to understand the project's component patterns before creating new ones

## Component Library
- **IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/` only as a primary components as these are modern and stylish component

## Best Practices
- Use Shadcn/UI as the primary component library for consistency and accessibility
- Import path: ./components/[component-name]

## Export Conventions
- Components MUST use named exports (export const ComponentName = ...)
- Pages MUST use default exports (export default function PageName() {...})

## Toasts
- Use `sonner` for toasts
- Sonner component are located in `/app/src/components/ui/sonner.tsx`

## Visual Depth
- Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals

## Calendar Component
- If calendar is required, always add in the guideline to use shadcn calendar

---

**END OF DESIGN GUIDELINES**
