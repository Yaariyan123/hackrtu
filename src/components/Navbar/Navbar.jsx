import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import './Navbar.css';

const navItems = [
  { label: "Home", path: "/", sectionId: "hero" },
  { label: "About", path: "/about", sectionId: "about" },
  { label: "Prizes", path: "/prizes", sectionId: "prizes" },
  { label: "Themes", path: "/themes", sectionId: "themes" },
  { label: "Timeline", path: "/timeline", sectionId: "timeline" },
  { label: "Organizers", path: "/organizers", sectionId: "organizers" },
  { label: "Contact", path: "/contact", sectionId: "contact" },
];

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [driftX, setDriftX] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = navItems.map((item) => item.sectionId);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (sectionIds.includes(id)) setActiveSection(id);
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    let previousY = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setIsVisible(currentY < previousY || currentY < 40);
      previousY = currentY;
    };

    const handleMouseMove = (event) => {
      const position = event.clientX / window.innerWidth;
      setDriftX((position - 0.5) * 18);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navTransform = `translate3d(${driftX + Math.min(scrollY * 0.04, 28)}px, ${isVisible ? 0 : -115}px, 0)`;

  const isLinkActive = (item) => {
    if (isHome) return activeSection === item.sectionId;
    return location.pathname === item.path;
  };

  const handleNavClick = (e, item) => {
    if (isMobileOpen) setIsMobileOpen(false);
    if (isHome && item.sectionId) {
      e.preventDefault();
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="navbar-shell"
      style={{ transform: navTransform }}
      data-testid="hackathon-navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`navbar-panel ${scrollY > 20 ? "navbar-panel-scrolled" : ""}`}
        data-testid="hackathon-navbar-panel"
      >
        <NavLink className="nav-brand" to="/" data-testid="navbar-brand-link">
          DISRUPT 2077
        </NavLink>

        <div className="nav-items-desktop" data-testid="navbar-desktop-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(e, item)}
              className={isLinkActive(item) ? "nav-link nav-link-active" : "nav-link"}
              data-testid={`navbar-link-${item.label.toLowerCase()}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="nav-menu-btn"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          data-testid="navbar-mobile-menu-button"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`mobile-menu ${isMobileOpen ? "mobile-menu-open" : ""}`}
        data-testid="navbar-mobile-menu-panel"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="mobile-nav-link"
            onClick={() => setIsMobileOpen(false)}
            data-testid={`mobile-navbar-link-${item.label.toLowerCase()}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};
export default Navbar;