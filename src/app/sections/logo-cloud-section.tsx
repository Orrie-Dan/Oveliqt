import { Reveal, RevealLines } from "../motion";
import { oveliqBrandTransition } from "../content";

/**
 * Brand transition between Selected Projects and Services.
 * Former Spector client logo carousel removed — Oveliqt is not ready to claim clients.
 *
 * MOTION-04: hairline bridge + breathing space after Work; RevealLines retained.
 */
export default function LogoCloudSection() {
  return (
    <section
      className="oveliq-brand-bridge w-full flex relative z-2 flex-col justify-start items-center content-center shrink-0 overflow-clip bg-background"
      id="brands"
      aria-label="Brand focus"
      data-oveliq-motion="brand-bridge"
    >
      <div className="w-full flex relative z-1 py-28 flex-col justify-center items-center content-center shrink-0 gap-6 pointer-events-none max-lg:py-20 max-lg:px-4 2xl:py-36">
        <RevealLines
          as="div"
          lines={oveliqBrandTransition.lines}
          className="w-full items-center gap-1 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]"
          lineClassName="block text-color-001 [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-[3.5rem] leading-[3.75rem] tracking-[-2.8px] text-center [font-feature-settings:'calt'_0,_'case'] [font-variation-settings:'wght'_var(--type-wght-title)] max-lg:text-[2.25rem] max-lg:leading-[2.5rem] max-lg:tracking-[-1.8px] 2xl:text-[5rem] 2xl:leading-22 2xl:tracking-[-4.8px]"
          delayMs={40}
          staggerMs={95}
          threshold={0.28}
          rootMargin="0px 0px -12% 0px"
        />
        <Reveal
          as="div"
          className="w-full flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-lg:max-w-[16.0625rem]"
          delayMs={220}
          staggerIndex={0}
          threshold={0.28}
          rootMargin="0px 0px -12% 0px"
        >
          <p
            className="block text-muted [font-family:'Plus_Jakarta_Sans_Variable',_'Plus_Jakarta_Sans_Variable_Placeholder',_sans-serif] text-base leading-[1.375rem] tracking-[-0.32px] text-center uppercase [font-feature-settings:'case']"
            dir="auto"
          >
            <strong className="inline [font-family:Inter,_'Inter_Placeholder',_sans-serif] font-bold">
              {oveliqBrandTransition.supporting}
            </strong>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
