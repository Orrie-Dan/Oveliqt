import { useState } from "react";
import { oveliqStartProject } from "../content";
import ArrowUpRight from "../components/arrow-up-right";
import { Reveal, RevealLines } from "../motion";
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
          <RevealLines
            as="h1"
            id="home-hero-title"
            className="oveliq-home-hero__title"
            lines={["Websites. Software.", "And applied AI."]}
            lineClassNames={["", "oveliq-home-hero__title-accent"]}
            delayMs={140}
            staggerMs={100}
            trigger={trigger}
          />
          <Reveal as="p" className="oveliq-home-hero__description" trigger={trigger} delayMs={360}>
            Digital experiences and business tools, designed to make work simpler and move your ideas forward.
          </Reveal>
          <Reveal className="oveliq-home-hero__actions" trigger={trigger} delayMs={460}>
            <a className="oveliq-home-hero__cta oveliq-home-hero__cta--primary" href={oveliqStartProject.href}>
              {oveliqStartProject.label}<ArrowUpRight />
            </a>
            <a className="oveliq-home-hero__cta oveliq-home-hero__cta--secondary" href="/work">
              Explore our work<ArrowUpRight />
            </a>
          </Reveal>
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
