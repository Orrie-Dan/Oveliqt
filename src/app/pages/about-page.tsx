import ArrowRight from "../components/arrow-right";
import SiteLayout from "../components/site-layout";
import { oveliqAbout, oveliqAboutPage } from "../content";
import { Reveal } from "../motion";
import { portfolioProjects } from "../portfolio";
import "./pages.css";
import "./about-page.css";

const numberWords = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export default function AboutPage() {
  const { hero, purpose, origin, principles, collaboration, cta } = oveliqAboutPage;
  const founders = oveliqAbout.founders.filter(person => person.name?.trim());
  /* Counts come straight from the portfolio records, so they can't drift from the work shown on /work. */
  const tallies = origin.tallies.flatMap(tally => {
    const count = portfolioProjects.filter(project => project.status === tally.status).length;
    return count ? [{ count, label: count === 1 ? tally.singular : tally.plural }] : [];
  });
  return <SiteLayout><div className="oveliq-about-page">
    <section className="about-opening" aria-labelledby="page-heading">
      <div className="about-opening__top about-label"><span>ABOUT OVELIQT</span><span>DESIGN / ENGINEERING / INTELLIGENCE</span></div>
      <div className="about-opening__composition"><div className="about-opening__copy">
        <Reveal as="h1" className="about-opening__title" trigger="load"><span id="page-heading">Good thinking.</span><br /><span className="about-accent">Built into<br />the details.</span></Reveal>
        <p className="about-opening__intro">{hero.intro}</p><a href="#studio-purpose" className="about-link">Get to know the studio <ArrowRight /></a>
      </div><div className="about-studio-art" aria-hidden="true"><span className="about-studio-art__label">OVELIQT / THE STUDIO</span><span className="about-studio-art__mark">O<span>*</span></span><span className="about-studio-art__foot">Think it through.<br />Make it work.</span><span className="about-studio-art__index">01&#8212;05</span></div></div>
      <nav className="about-studio-index" aria-label="On this page"><span>Independent software & AI studio</span><a href="#studio-purpose">The studio &#8600;</a><a href="#studio-origin">How we started &#8600;</a><a href="#studio-team">The people &#8600;</a><a href="#working-together">Working together &#8600;</a></nav>
    </section>

    <section id="studio-purpose" className="about-purpose about-section" aria-labelledby="purpose-heading"><p className="about-label">{purpose.label}</p><div>
      <Reveal as="h2" className="about-heading"><span id="purpose-heading">The people using it.</span><br />The problem behind it.</Reveal>
      <div className="about-purpose__copy">{purpose.paragraphs.map((paragraph, i) => <Reveal as="p" key={paragraph} delayMs={i * 60}>{paragraph}</Reveal>)}</div>
      <div className="about-disciplines">{["Product thinking", "Interface design", "Software engineering", "Applied AI & data"].map((item, i) => <span key={item}><small>0{i + 1}</small>{item}</span>)}</div>
    </div></section>

    <section id="studio-origin" className="about-origin about-section" aria-labelledby="origin-heading">
      <p className="about-label">{origin.label}</p>
      <div className="about-origin__body">
        <Reveal as="h2" className="about-heading"><span id="origin-heading">{origin.title[0]}</span><br /><span className="about-accent">{origin.title[1]}</span></Reveal>
        <blockquote className="about-origin__question"><span aria-hidden="true">“</span>{origin.question}<span aria-hidden="true">”</span></blockquote>
        <div className="about-origin__copy">{origin.paragraphs.map((paragraph, i) => <Reveal as="p" key={paragraph} delayMs={i * 60} className="about-body">{paragraph}</Reveal>)}</div>
        {tallies.length > 0 && <div className="about-origin__tallies"><p className="about-label">The work so far</p><ul>{tallies.map(tally => <li key={tally.label}><strong>{numberWords[tally.count] ?? tally.count}</strong><span>{tally.label}</span></li>)}</ul><a className="about-link" href="/work">See every project <ArrowRight /></a></div>}
      </div>
    </section>

    {founders.length > 0 && <section className="about-people about-section" aria-labelledby="people-heading"><p className="about-label">THE PEOPLE / BEHIND THE WORK</p><h2 id="people-heading" className="about-heading">Meet your collaborators.</h2><div className="about-people__grid">{founders.map(person => <article key={person.id}>
      {person.imageSrc && <img src={person.imageSrc} alt={person.imageAlt || person.name || ""} loading="lazy" />}<h3>{person.name}</h3>{person.role && <p className="about-label">{person.role}</p>}{person.bio && <p className="about-body">{person.bio}</p>}{person.links?.map(link => <a className="about-link" key={link.href} href={link.href}>{link.label}<ArrowRight /></a>)}
    </article>)}</div></section>}

    <section id="studio-team" className="about-team about-section" aria-labelledby="team-heading">
      <div className="about-team__heading"><p className="about-label">03 / TWO BROTHERS, ONE STUDIO</p><div><h2 id="team-heading" className="about-heading">A small team.<br />Close to the work.</h2><p className="about-body">Oveliqt is built by two brothers who share the same curiosity about how things work and how they could work better. We stay involved from the first conversation through design, engineering and handover.</p></div></div>
      <div className="about-team__principles"><article><span className="about-label about-accent">01 / DIRECT</span><h3>You work with us.</h3><p className="about-body">The people shaping and building your product are the people you speak with.</p></article><article><span className="about-label about-accent">02 / SHARED</span><h3>One joined-up process.</h3><p className="about-body">Product decisions, design and engineering stay connected throughout the work.</p></article><article><span className="about-label about-accent">03 / PRACTICAL</span><h3>Built for real use.</h3><p className="about-body">We focus on what will make a difference in the day-to-day, then make it clear and dependable.</p></article></div>
      <a className="about-link" href="/work">Explore the work <ArrowRight /></a>
    </section>

    <section className="about-principles about-section" aria-labelledby="principles-heading">
      <div className="about-principles__heading"><p className="about-label">{principles.label}</p><Reveal as="h2" className="about-heading"><span id="principles-heading">{principles.title[0]}</span><br />{principles.title[1]}</Reveal></div>
      <ol className="about-principles__grid">{principles.items.map((item, i) => <Reveal as="li" key={item.title} delayMs={i * 60} className="about-principle"><span className="about-label about-accent" aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3><p className="about-body">{item.body}</p></Reveal>)}</ol>
    </section>

    <section id="working-together" className="about-collaboration about-section" aria-labelledby="collaboration-heading"><div className="about-collaboration__intro"><p className="about-label">{collaboration.label}</p><Reveal as="h2" className="about-heading"><span id="collaboration-heading">A clear conversation.</span><br />A shared direction.</Reveal><p className="about-body">{collaboration.intro}</p><a href="/pricing" className="about-link">Explore ways to work together <ArrowRight /></a></div><ol className="about-commitments">{collaboration.items.map(item => <Reveal as="li" key={item.number} className="about-commitment"><span className="about-label about-accent" aria-hidden="true">{item.number} /</span><div><h3>{item.title}</h3><p className="about-body">{item.body}</p></div></Reveal>)}</ol></section>

    <section className="about-invitation about-section" aria-labelledby="invitation-heading"><p className="about-label">{cta.label}</p><Reveal as="h2" className="about-heading"><span id="invitation-heading">What would you</span><br />like to build?</Reveal><div className="about-invitation__bottom"><p className="about-body">{cta.body}</p><div className="about-invitation__links"><a className="about-link about-link--primary" href={cta.href}>{cta.linkLabel}<ArrowRight /></a><a className="about-link" href={cta.secondaryHref}>{cta.secondaryLabel}<ArrowRight /></a></div></div></section>
  </div></SiteLayout>;
}
