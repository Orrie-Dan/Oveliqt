import { useState } from "react";
import { oveliqStartProject } from "../content";
import ArrowUpRight from "../components/arrow-up-right";
import { Reveal } from "../motion";
import { heroIntroMode } from "../motion/hero-intro";
import "./home-hero.css";

const capabilities = [
  { title: "Websites", detail: "Digital experiences", href: "/services/web-development" },
  { title: "Software", detail: "Platforms & products", href: "/services/software-development" },
  { title: "Applied AI", detail: "Useful intelligence", href: "/services/ai-machine-learning" },
] as const;

export default function HomeHeroSection() {
  const [intro] = useState(heroIntroMode);
  const trigger = intro === "play" ? "load" : "none";

  return (
    <section className="oveliq-home-hero" aria-labelledby="home-hero-title" data-oveliq-motion="hero">
      <img
        className="oveliq-home-hero__background"
        src="/assets/hero/crimson-vortex.webp"
        alt=""
        fetchPriority="high"
        aria-hidden="true"
      />
      <div className="oveliq-home-hero__inner">
        <header className="oveliq-home-hero__intro">
          <Reveal as="p" className="oveliq-home-hero__eyebrow" trigger={trigger} delayMs={60}>
            <span aria-hidden="true" /> Independent software &amp; AI studio
          </Reveal>
          {/* Headline, intro and CTAs paint immediately (no JS-gated reveal): an empty
              hero on a slow phone reads as broken. Only a brief CSS opacity fade applies. */}
          <h1 id="home-hero-title" className="oveliq-home-hero__title oveliq-home-hero__fade">
            <span className="oveliq-home-hero__title-line">Websites. Software.</span>
            <span className="oveliq-home-hero__title-line oveliq-home-hero__title-accent">And applied AI.</span>
          </h1>
          <p className="oveliq-home-hero__description oveliq-home-hero__fade">
            Digital experiences and business tools, designed to make work simpler and move your ideas forward.
          </p>
          <div className="oveliq-home-hero__actions oveliq-home-hero__fade">
            <a className="oveliq-home-hero__cta oveliq-home-hero__cta--primary" href={oveliqStartProject.href}>
              {oveliqStartProject.label}<ArrowUpRight />
            </a>
            <a className="oveliq-home-hero__cta oveliq-home-hero__cta--secondary" href="/work">
              Explore our work<ArrowUpRight />
            </a>
          </div>
        </header>

        <Reveal className="oveliq-home-hero__scene" trigger={trigger} delayMs={500}>
          <span className="oveliq-home-hero__scene-kicker">Built around what matters</span>
          <nav className="oveliq-home-hero__capabilities" aria-label="Explore our services">
            {capabilities.map((item, index) => (
              <a href={item.href} key={item.title}>
                <span className="oveliq-home-hero__cap-index">0{index + 1}</span>
                <span className="oveliq-home-hero__cap-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="oveliq-home-hero__bottomline">
          <span>Strategy <i /> Design <i /> Engineering</span>
          <a href="/work">See what we make <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  );
}
