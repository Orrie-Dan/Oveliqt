import { useEffect, useRef, useState, type FormEvent } from "react";
import ArrowRight from "../components/arrow-right";
import SiteLayout from "../components/site-layout";
import { oveliqContact, oveliqEnquiry } from "../content";
import { initialEnquiryService } from "../enquiry-links";
import "./pages.css";
import "./contact-page.css";

function ServiceArt({ index }: { index: number }) {
  return <svg viewBox="0 0 160 84" fill="none" aria-hidden="true" className="enquiry__art">
    {index === 0 ? <>
      <rect x="25" y="9" width="110" height="68" rx="7" fill="var(--art-paper)" stroke="currentColor" />
      <path d="M25 25h110" stroke="currentColor" opacity=".3" /><circle cx="34" cy="17" r="1.5" fill="currentColor" /><circle cx="40" cy="17" r="1.5" fill="currentColor" />
      <path d="M37 39h35m-35 7h27m-27 9h19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="89" y="34" width="33" height="31" rx="4" fill="var(--art-accent)" /><path d="m98 55 16-13m-13 0h13v12" stroke="currentColor" strokeWidth="1.5" />
    </> : index === 1 ? <>
      <rect x="29" y="19" width="99" height="56" rx="6" fill="var(--art-paper)" stroke="currentColor" /><path d="M48 19v56" stroke="currentColor" opacity=".25" />
      <path d="M35 31h6m-6 7h6m-6 7h6" stroke="currentColor" strokeLinecap="round" />
      <rect x="57" y="31" width="27" height="15" rx="3" fill="var(--art-accent)" /><path d="M92 33h22m-22 7h15M58 56h49m-49 7h36" stroke="currentColor" strokeLinecap="round" opacity=".5" />
      <rect x="112" y="6" width="25" height="39" rx="5" fill="var(--art-paper)" stroke="currentColor" /><rect x="117" y="13" width="15" height="20" rx="2" fill="var(--art-accent)" /><circle cx="124.5" cy="38" r="1.5" fill="currentColor" />
    </> : index === 2 ? <>
      <path d="M36 43h28m32 0h28M80 18v9m0 32v12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
      <rect x="17" y="29" width="28" height="28" rx="8" fill="var(--art-paper)" stroke="currentColor" /><path d="m25 43 5 5 8-10" stroke="currentColor" strokeWidth="1.5" />
      <rect x="59" y="22" width="42" height="42" rx="13" fill="var(--art-accent)" stroke="currentColor" /><path d="m80 31 3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor" />
      <rect x="115" y="29" width="28" height="28" rx="8" fill="var(--art-paper)" stroke="currentColor" /><path d="M123 39h12m-12 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="80" cy="12" r="4" stroke="currentColor" /><circle cx="80" cy="75" r="4" fill="currentColor" />
    </> : <>
      <circle cx="70" cy="42" r="29" fill="var(--art-paper)" stroke="currentColor" /><circle cx="93" cy="42" r="29" fill="var(--art-accent)" fillOpacity=".7" stroke="currentColor" />
      <path d="M81 29v26M68 42h26" stroke="currentColor" strokeWidth="1.5" /><path d="m124 15 3 4 5-1-2 5 3 4-5 1-2 5-2-5-5-1 3-4-2-5z" fill="currentColor" />
    </>}
  </svg>;
}

type Channel = "whatsapp" | "email";
const channelKey = "oveliq.enquiryChannel";

function readSavedChannel(): Channel | null {
  try {
    const saved = localStorage.getItem(channelKey);
    return saved === "whatsapp" || saved === "email" ? saved : null;
  } catch { return null; }
}

function ChannelIcon({ channel }: { channel: Channel }) {
  return channel === "whatsapp"
    ? <svg viewBox="0 0 24 24" aria-hidden="true" className="enquiry__channel-icon"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9.1 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.5.7c.3.1.4.2.4.4 0 .5-.2 1.2-.7 1.5-.6.4-1.5.6-2.9 0a9.5 9.5 0 0 1-4.4-4.1c-.6-1.2-.4-2.4.0-3.1Z" fill="currentColor" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true" className="enquiry__channel-icon"><rect x="3.2" y="5.5" width="17.6" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(() => initialEnquiryService(window.location.search));
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const goalInput = useRef<HTMLTextAreaElement>(null);
  const moved = useRef(false);
  const phone = oveliqContact.whatsappNumber?.replace(/\D/g, "");
  const whatsappReady = Boolean(phone && /^[1-9]\d{6,14}$/.test(phone));
  const email = oveliqContact.email?.trim() || "";
  const emailReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const available: Channel[] = [...(whatsappReady ? ["whatsapp" as const] : []), ...(emailReady ? ["email" as const] : [])];
  const [channel, setChannel] = useState<Channel | null>(() => {
    const saved = readSavedChannel();
    return saved && available.includes(saved) ? saved : available[0] ?? null;
  });
  const message = `Hi Oveliqt!\n\nI need help with: ${service}\n\nMy goal: ${goal.trim()}`;
  const href = channel === "whatsapp"
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : channel === "email"
      ? `mailto:${email}?subject=${encodeURIComponent(`${oveliqEnquiry.emailSubject}: ${service}`)}&body=${encodeURIComponent(message)}`
      : "";
  function choose(next: Channel) {
    setChannel(next);
    setStatus("");
    try { localStorage.setItem(channelKey, next); } catch { /* storage unavailable: choice still applies for this visit */ }
  }
  async function copyMessage() {
    try { await navigator.clipboard.writeText(message); setStatus(`Message copied. Paste it into an email to ${email}.`); }
    catch { setStatus(`Couldn’t copy automatically. Email us at ${email}.`); }
  }
  const titles = ["What do you need help with?", "What would you like to achieve?", "Let’s start a conversation."];
  const selectedService = oveliqEnquiry.services.find(item => item.title === service);
  function useStarter(text: string) {
    setGoal(previous => previous.trim() ? `${previous.trimEnd()}\n\n${text}` : text);
    setStatus("");
    goalInput.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (moved.current) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "nearest" });
    }
    moved.current = true;
  }, [step]);
  function go(next: number) { setStatus(""); setStep(next); }
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0 && !service) return;
    if (step === 1 && !goal.trim()) { setStatus("A sentence or two is enough. Tell us what you have in mind."); return; }
    go(step + 1);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([message], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "oveliq-project-brief.txt";
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Your brief has been downloaded. Nothing has been sent.");
  }
  return <SiteLayout>
    <section className="oveliq-ip-section enquiry" aria-labelledby="page-heading">
      <div className="enquiry__inner">
        <header className="enquiry__intro">
          <p className="enquiry__eyebrow"><span /> A GOOD PLACE TO START</p>
          <h1 id="page-heading">Big ideas.<br />Small first <em>step.</em></h1>
          <div className="enquiry__intro-aside"><span className="enquiry__intro-mark" aria-hidden="true">↘</span><p>Tell us a little about what’s on your mind.<br />We’ll take it from there.</p><span className="enquiry__intro-tag">Two questions. One useful conversation.</span></div>
        </header>
        <div className="enquiry__card" id="project-brief">
          <aside className="enquiry__rail" aria-label="Enquiry progress">
            <span className="enquiry__wordmark">OVELIQT<span>↗</span></span>
            <ol>{oveliqEnquiry.steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} data-complete={step > index}>
              <span className="enquiry__step-number">{step > index ? "✓" : `0${index + 1}`}</span><span>{label}</span>
            </li>)}</ol>
            <div className="enquiry__rail-note"><div className="enquiry__orbit" aria-hidden="true"><span /><span /><span /><b>✳</b></div><p>Something useful<br />starts with a hello.</p></div>
          </aside>
          <div className="enquiry__body">
            <div className="enquiry__topline"><span>YOUR NEXT CHAPTER</span><span>0{step + 1} / 03</span></div>
            <div className="enquiry__progress" role="progressbar" aria-label="Enquiry progress" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step + 1}><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
            <div className="enquiry__panel" key={step}>
              <h2 ref={heading} tabIndex={-1}>{titles[step]}</h2>
              <p className="enquiry__hint">{step === 0 ? "Pick the closest fit. It’s okay if you’re still figuring it out." : step === 1 ? "The rough idea is perfect. No polished brief needed." : "Here’s your opening message. Sound like you?"}</p>
              {step < 2 ? <form onSubmit={next}>
                {step === 0 ? <fieldset className="enquiry__choices"><legend className="enquiry__sr-only">What do you need help with?</legend>
                  {oveliqEnquiry.services.map((item, index) => <label className="enquiry__choice" key={item.title}>
                    <input type="radio" name="service" value={item.title} checked={service === item.title} onChange={() => setService(item.title)} required />
                    <span className={`enquiry__choice-content enquiry__choice-content--${index}`}><ServiceArt index={index} /><strong>{item.title}</strong><span>{item.description}</span><span className="enquiry__check" aria-hidden="true">{service === item.title ? "✓" : "↗"}</span></span>
                  </label>)}
                </fieldset> : <>
                  <div className="enquiry__context"><span aria-hidden="true">↳</span> {service}<button type="button" onClick={() => go(0)}>Change</button></div>
                  <div className="enquiry__starters" role="group" aria-labelledby="starter-label" aria-describedby="starter-help">
                    <p id="starter-label">A little inspiration</p>
                    <p id="starter-help">Choose an idea to add a starting sentence, then make it yours.</p>
                    <div className="enquiry__starter-grid">{selectedService?.goals.map((idea, index) => {
                      const added = goal.includes(idea.text);
                      return <button key={idea.label} type="button" className="enquiry__starter" aria-pressed={added} disabled={added || goal.length + idea.text.length + 2 > 1500} onClick={() => useStarter(idea.text)}>
                        <span className="enquiry__starter-number">0{index + 1}</span><strong>{idea.label}</strong><span className="enquiry__starter-add" aria-hidden="true">{added ? "✓" : "+"}</span>
                      </button>;
                    })}</div>
                  </div>
                  <div className="enquiry__goal">
                    <label htmlFor="enquiry-goal">Your goal <span>Your own words are welcome, too.</span></label>
                    <textarea ref={goalInput} id="enquiry-goal" value={goal} onChange={event => { setGoal(event.target.value); setStatus(""); }} maxLength={1500} required rows={5} placeholder="I’d like to… so that…" aria-describedby="goal-help enquiry-status" />
                    <div id="goal-help"><span>Feel free to add who it’s for or what’s getting in the way.</span><span>{goal.length} / 1500</span></div>
                  </div>
                </>}
                <div className="enquiry__actions">
                  {step > 0 ? <button type="button" className="enquiry__back" onClick={() => go(step - 1)}>← Back</button> : <span className="enquiry__small-note">Two questions. That’s it.</span>}
                  <button className="enquiry__next" type="submit" disabled={step === 0 && !service}>{step === 0 ? "Continue" : "Review message"}<ArrowRight /></button>
                </div>
              </form> : <>
                <div className="enquiry__message"><span className="enquiry__message-label">YOU → OVELIQT</span><p>Hi Oveliqt! 👋</p><p>I need help with <strong>{service.toLowerCase()}</strong>.</p><p className="enquiry__message-goal">{goal.trim()}</p><span className="enquiry__message-check" aria-hidden="true">✓✓</span></div>
                {available.length > 1 && <fieldset className="enquiry__channels"><legend>How would you like to send it?</legend>
                  {available.map(id => <label className="enquiry__channel" key={id}>
                    <input type="radio" name="channel" value={id} checked={channel === id} onChange={() => choose(id)} />
                    <span><ChannelIcon channel={id} /><strong>{oveliqEnquiry.channels[id].label}</strong><small>{oveliqEnquiry.channels[id].detail}</small></span>
                  </label>)}
                </fieldset>}
                {!channel && <p className="enquiry__availability">Online enquiries aren’t open yet. You can save your brief for later; nothing will be sent.</p>}
                <div className="enquiry__actions"><button className="enquiry__back" type="button" onClick={() => go(1)}>← Edit answers</button>
                  {channel ? <a className="enquiry__next" href={href} {...(channel === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={() => setStatus(oveliqEnquiry.channels[channel].note)}>{oveliqEnquiry.channels[channel].action}<ArrowRight /></a> : <button className="enquiry__next" type="button" onClick={download}>Save my brief<ArrowRight /></button>}
                </div>
                {channel === "whatsapp" && <p className="enquiry__small-note enquiry__send-note">Your answers open in WhatsApp. You choose when to send.</p>}
                {channel === "email" && <p className="enquiry__small-note enquiry__send-note">Opens your email app, addressed to {email}. No email app? <button type="button" className="enquiry__inline-button" onClick={copyMessage}>Copy the message</button></p>}
              </>}
            </div>
            <p className="enquiry__status" id="enquiry-status" role="status">{status}</p>
          </div>
        </div>
        <div className="enquiry__footnote">
          <p>Start with your goal. We’ll discuss the scope, next steps and a written proposal before work begins.</p>
          {emailReady && <p>Rather write directly? <a href={`mailto:${email}`}>{email}</a></p>}
          {whatsappReady && <p>Prefer to talk first? <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp ↗</a></p>}
        </div>
      </div>
    </section>
  </SiteLayout>;
}
