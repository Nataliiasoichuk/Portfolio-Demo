import leafStrip from "./assets/leaf-strip.png";
import portrait from "./assets/portrait.png";
import dot from "./assets/dot.svg";
import DewAnimation from "./DewAnimation";

// Social links are placeholders until the real profile URLs are provided.
const contacts = [
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Facebook", href: "#" },
];

export default function Hero() {
  return (
    <main className="hero">
      <DewAnimation />
      <div className="hero__fade" aria-hidden />
      <img className="hero__leaf" src={leafStrip} alt="" />

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
          <a className="nav__link nav__link--active" href="#projects">Projects</a>
          <a className="nav__link" href="#how-i-think">How I think</a>
          <a className="nav__link" href="#about">About</a>
          <a className="nav__link" href="#contact">Contact</a>
          <span className="nav__divider" aria-hidden />
          <a className="btn-resume" href="#">Resume (PDF) ↓</a>
        </nav>
      </header>

      <div className="hero__rail" aria-hidden />
      <aside className="location">
        <img className="location__dot" src={dot} alt="" />
        <p className="location__title">Open to work</p>
        <p className="location__sub">Full-time junior role</p>
        <p className="location__title location__title--gap">Based in England, UK</p>
        <p className="location__sub">Remote · EET/UTC+2</p>
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
            interiors and gardens to crafts and drawing — into UI/UX. Let's discover the art of
            design together.
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

      <div className="portrait" aria-hidden={false}>
        <div className="portrait__glass" />
        <img className="portrait__img" src={portrait} alt="Portrait of Nataliia Soichuk" />
        <div className="portrait__shade" />
        <div className="portrait__sheen" />
      </div>

      <div className="hero__footer-line" aria-hidden />
      <footer className="contacts" id="contact">
        <a className="contacts__email" href="mailto:nataliiasoichuk@gmail.com">
          nataliiasoichuk@gmail.com
        </a>
        {contacts.map((c) => (
          <a key={c.label} className="contacts__link" href={c.href}>
            {c.label} ↗
          </a>
        ))}
      </footer>
    </main>
  );
}
