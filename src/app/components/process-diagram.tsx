/** Editorial line drawings for the stages of a product. */
export default function ProcessDiagram({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true" className="oveliq-process-diagram">
      <g stroke="currentColor" strokeWidth="1.5">
        {stage === 0 && <><circle cx="145" cy="70" r="42" /><circle cx="145" cy="70" r="25" strokeDasharray="3 5" /><path d="m176 101 33 33M79 70h20m92 0h20M145 4v20" /><circle cx="145" cy="70" r="6" fill="var(--accent)" stroke="none" /></>}
        {stage === 1 && <><path d="M60 45h65l70 35-70 35H60m135-35h65" /><rect x="36" y="33" width="24" height="24" rx="4" /><rect x="36" y="103" width="24" height="24" rx="4" /><rect x="143" y="63" width="34" height="34" rx="4" fill="var(--accent)" stroke="none" /><circle cx="272" cy="80" r="12" /></>}
        {stage === 2 && <><rect x="69" y="26" width="178" height="112" rx="5" /><path d="M69 47h178M87 63h53v56H87zM153 65h75m-75 15h55m-55 15h75" /><rect x="153" y="109" width="43" height="9" fill="var(--accent)" stroke="none" /></>}
        {stage === 3 && <><rect x="79" y="27" width="163" height="110" rx="5" /><path d="m123 62-22 19 22 19m74-38 22 19-22 19m-26-49-21 61" stroke="var(--accent)" strokeWidth="3" /><path d="M90 148h140M134 137v11m51-11v11" /></>}
        {stage === 4 && <><path d="M160 112V35m-30 31 30-31 30 31" stroke="var(--accent)" strokeWidth="3" /><path d="M112 83H86v52h148V83h-26M120 122h80" /><circle cx="160" cy="30" r="16" strokeDasharray="2 5" /></>}
        {stage === 5 && <><path d="M211 62a55 55 0 1 0-5 55M211 62V30m0 32h-32" /><path d="m119 101 27-27 24 14 35-35" stroke="var(--accent)" strokeWidth="3" /><circle cx="119" cy="101" r="4" fill="var(--accent)" stroke="none" /></>}
      </g>
    </svg>
  );
}
