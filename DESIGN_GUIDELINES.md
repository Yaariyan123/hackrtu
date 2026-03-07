# Disrupt Dev Hackathon 2077 — UI/UX Design Guidelines

## 1. Design Theme

**Name:** Futuristic Gold/Dark Glassmorphism  
**Vibe:** Cyberpunk, high-tech, premium, immersive

---

## 2. Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Deep Black** | `#050505` | Primary background |
| **Gold** | `#FFD700` | Accent, active states, highlights, borders |
| **White** | `#FFFFFF` | Primary headings, key text |
| **Light Gray** | `#B0B0B0` | Body text, secondary content |
| **Dark Gray** | `#1A1A1A` | Card backgrounds, elevated surfaces |
| **Glass Border** | `rgba(255, 215, 0, 0.4)` | Glassmorphism card borders |

---

## 3. Typography

| Element | Font Family | Weight | Size | Letter Spacing |
|---------|-------------|--------|------|----------------|
| **Display (Hero)** | Orbitron | 700–900 | 3rem–4.5rem | 0.05em |
| **Section Headings** | Orbitron | 700 | 2rem–2.5rem | 0.03em |
| **Card Titles** | Orbitron | 600 | 1.1rem–1.25rem | 0.02em |
| **Body Text** | Inter | 400 | 0.95rem–1rem | 0 |
| **Nav Links** | Orbitron | 500 | 0.8rem–0.9rem | 0.08em |
| **Labels** | Orbitron | 500 | 0.75rem | 0.1em |

---

## 4. Glassmorphism

- **Background:** `rgba(10, 10, 10, 0.6)` with `backdrop-filter: blur(20px)`
- **Border:** 1–2px solid `rgba(255, 215, 0, 0.4)` or `rgba(255, 255, 255, 0.1)`
- **Shadow:** `0 8px 32px rgba(0, 0, 0, 0.4)`
- **Border radius:** 12px–16px

---

## 5. Spacing & Layout

- **Section padding:** 6rem vertical, 5% horizontal
- **Card gap:** 1.5rem–2rem
- **Max content width:** 1200px

---

## 6. Animation Principles

- **Intensity:** High — “crazy and dynamic”
- **Timing:** 0.3s–0.6s for micro-interactions; 0.8s–1.2s for section reveals
- **Easing:** Custom cubic-bezier for punchy feels; `ease-out` for entrances
- **Parallax:** Subtle horizontal/vertical movement on scroll
- **Creature Eater:** GSAP ScrollTrigger — vertical timeline with character eating creatures on scroll

---

## 7. Component-Specific Rules

| Component | Notes |
|-----------|-------|
| **Navbar** | Transparent, parallax, slight horizontal shift on scroll, hamburger on mobile |
| **Hero** | Glowing title, countdown with glass cards, prominent CTA |
| **About** | 2×2 glass cards with golden borders |
| **Prizes** | 3 prize cards + participation card; 3D podium feel |
| **Themes** | Infinite horizontal loop; click to expand with more details |
| **Timeline** | Vertical bar with creature-eater; horizontal event cards |
| **Organizers** | Lead + team cards; avatar circles with initials |
| **Contact** | Glass form fields with gold borders |
| **Footer** | Social icons, address, copyright |

---

## 8. Responsive Breakpoints

- **Mobile:** &lt; 768px
- **Tablet:** 768px–1024px
- **Desktop:** &gt; 1024px

---

## 9. Accessibility

- Contrast ratio ≥ 4.5:1 for body text
- Focus states: gold outline on interactive elements
- Reduced-motion preference support for critical content
