"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import leafStrip from "./assets/leaf-strip.png";
import portrait from "./assets/portrait.png";
import dot from "./assets/dot.svg";
import DewAnimation from "./DewAnimation";
import "./hero.css";

// Social links are placeholders until the real profile URLs are provided.
const contacts = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nataliia-soichuk-474858375" },
  { label: "Behance", href: "#" },
  { label: "Facebook", href: "https://facebook.com/nataliia.soichuk" },
];

const navLinks = [
  { label: "Projects", href: "#projects", active: true },
  { label: "How I think", href: "#how-i-think" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// The first screen is laid out on three fixed artboards from Figma
// (desktop 1440, tablet 768, phone 390) and scaled to the window width.
const ARTBOARDS = [
  { query: "(max-width: 599px)", width: 390, maxZoom: 1.2 },
  { query: "(max-width: 1023px)", width: 768, maxZoom: 1.33 },
  { query: "all", width: 1440, maxZoom: 1 },
];

function useArtboardZoom() {
  useLayoutEffect(() => {
    const update = () => {
      const board = ARTBOARDS.find((b) => window.matchMedia(b.query).matches)!;
      const zoom = Math.min(board.maxZoom, document.documentElement.clientWidth / board.width);
      document.documentElement.style.setProperty("--hero-zoom", String(zoom));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
}

export default function Hero() {
  useArtboardZoom();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <main className="hero">
      <DewAnimation />
      <div className="hero__fade" aria-hidden />
      <Image className="hero__leaf" src={leafStrip} alt="" priority />
      <div className="hero__leaf-shade" aria-hidden />

      <header className="hero__header">
        <div className="brand">
          <div className="brand__logo" aria-label="NS.">
            NS<span>.</span>
          </div>
          <div className="brand__text">
            <p className="brand__name">Nataliia Soichuk</p>
            <p className="brand__role">UX/UI designer</p>
          </div>
        </div>
        <nav className="nav" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.href} className={`nav__link${l.active ? " nav__link--active" : ""}`} href={l.href}>
              {l.label}
            </a>
          ))}
          <span className="nav__divider" aria-hidden />
          <a className="btn-resume" href="#">
            <span className="btn-resume__full">Resume (PDF) ↓</span>
            <span className="btn-resume__short" aria-hidden>CV ↓</span>
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <nav id="mobile-menu" className="menu" aria-label="Main" hidden={!menuOpen}>
        {navLinks.map((l) => (
          <a
            key={l.href}
            className={`menu__link${l.active ? " menu__link--active" : ""}`}
            href={l.href}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="hero__rail" aria-hidden />
      <aside className="location">
        <div className="location__row">
          <Image className="location__dot" src={dot} alt="" width={8} height={8} />
          <p className="location__title">Open to work</p>
          <p className="location__sub">Full-time junior role</p>
        </div>
        <div className="location__row">
          <p className="location__title location__title--gap">Based in England, UK</p>
          <p className="location__sub">
            Remote<span className="sep-wide"> · </span>
            <span className="sep-narrow">, </span>EET/UTC+2
          </p>
        </div>
      </aside>
      <p className="hero__scroll">Scroll ↓</p>

      <h1 className="headline">
        <span className="headline__a">UX/UI</span>
        <span className="headline__b">Portfolio</span>
        <span className="headline__c">Design</span>
        <span className="headline__d">2026</span>
      </h1>

      <section className="intro">
        <div>
          <p className="intro__lead">Never too late to design.</p>
          <p className="intro__body">
            After 20+ years in international trade, I followed my lifelong love of design — from
            interiors and gardens to crafts and drawing — into UI/UX.{" "}
            <span className="intro__more">Let&apos;s discover the art of design together.</span>
          </p>
        </div>
        <div className="intro__buttons">
          <a className="btn btn--primary" href="#projects">
            <span>View projects</span>
            <span className="btn__arrow">→</span>
          </a>
          <a className="btn btn--secondary" href="#contact">Contact me</a>
        </div>
      </section>

      <div className="portrait">
        <div className="portrait__glass" />
        <Image className="portrait__img" src={portrait} alt="Portrait of Nataliia Soichuk" priority />
        <div className="portrait__shade" />
        <div className="portrait__sheen" />
      </div>

      <div className="hero__footer-line" aria-hidden />
      <footer className="contacts" id="contact">
        <a className="contacts__email" href="mailto:nataliiasoichuk@gmail.com">
          nataliiasoichuk@gmail.com
        </a>
        {contacts.map((c) => (
          <a
            key={c.label}
            className="contacts__link"
            href={c.href}
            {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {c.label} ↗
          </a>
        ))}
      </footer>
    </main>
  );
}
