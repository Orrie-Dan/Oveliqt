---
name: prospect
description: Find businesses that show a visible need for Oveliq's services, research each one, and draft a short personalised first message for each. Saves prospects/<date>-<segment>.md, registers them in data/prospects.csv and creates cards on the Prospect Pipeline board in "Needs Review". Also drafts follow-ups and revisions. Never sends anything.
---

# Prospect

Board and lists: `prospect_board` and `prospect_lists` in `config/trello.json`. This is a **separate board** from the content pipeline.
Skip any card whose name starts with 📌 (pinned instructions).

## Hard rules (on top of CLAUDE.md)

1. **Claude never sends a message.** No WhatsApp, email, LinkedIn or form submissions. Claude drafts only. The user sends each message by hand.
2. **Claude never moves a card into** `approved`, `sent`, `replied`, `call_booked` or `won`. Those moves belong to the user.
   Claude may create cards in `needs_review`, move cards from `changes_requested` back to `needs_review`, and add comments.
3. **Public business contact details only.** Use the phone, email or WhatsApp number a business publishes itself (its website, Google Maps listing,
   official social page or LinkedIn company page). Never guess an email pattern, never look up personal phone numbers, and never store
   details about private individuals beyond a publicly listed name and role.
4. **Every observation must be real and checked.** Only say "your site doesn't load on mobile" or "there's no way to enquire" if you saw it,
   and record the evidence URL and the date you checked. If you couldn't check, don't mention it.
5. **Proof comes only from the REAL table in `brand/company.md`.** Never use the ⛔ DO NOT USE items. Axeora = website only. The Education
   platform is "partner-led", with no name. Crosswalk always carries its caveat (better: don't use it in cold outreach).
6. **Respect opt-outs.** Anything marked `do_not_contact` in `data/prospects.csv`, or any card in `rejected`, is never drafted again.

## Modes

| Args | Mode |
|---|---|
| `<segment> [in <location>] [count]`, e.g. `hotels in Kigali 10` | **Find**: research new prospects and draft first messages (default count 10, max 15) |
| `followups` | **Follow-up**: draft follow-ups for cards in `sent` |
| `revise` | **Revise**: rework cards in `changes_requested` using the user's comments |
| `status` | **Status**: pipeline summary and what needs doing today |
| *(none)* | Ask which segment, suggesting 3 based on `brand/company.md` target industries and past results in `data/prospects.csv` |

---

## Find mode

1. **Read** `brand/company.md`, `brand/voice.md`, the newest `insights/` file (if any) and `data/prospects.csv`.
   - If the website in `company.md` is not live yet, **never link to it**. Link to the most relevant live portfolio site instead.
   - If founder names are still TODO, sign messages `[YOUR NAME], Oveliq`.
2. **Map the segment to buyer signals.** Use the four buyer problems in `company.md`:

   | Signal | Likely problem → offer |
   |---|---|
   | No website, only Instagram/Facebook/WhatsApp; outdated, broken or slow site; no clear enquiry route; PDF menu or catalogue | "People find us but don't contact us" → **Websites** |
   | Hiring admin or data-entry staff; orders taken via Google Forms or WhatsApp; "download our form" processes | "Too much admin" / "outgrew spreadsheets" → **Automation** or **Platforms** |
   | Recently funded, in an accelerator, or announced a new product with no product yet | "We have an idea" → **MVP** |
   | NGO hiring M&E or data roles; programme reports published as PDFs | Reporting → **Data & Analytics** |

3. **Search.** Use WebSearch, sending several queries in one turn: directories, Google Maps-style listings, "<segment> <location>",
   job boards for admin/data-entry roles, accelerator cohort pages and funding news. Gather about twice the target count.
4. **Qualify each candidate** by opening its own website or official page (WebFetch, or the web-fetch agent). Keep it only if **all** of these hold:
   - it's a real, operating business or organisation that fits the segment
   - there's at least one **observed** signal from step 2, with an evidence URL
   - it publishes a business contact route
   - it's not already in `data/prospects.csv` (match on business name **or** domain), unless last contacted more than 90 days ago and not `do_not_contact`
   - it's not a direct competitor (a web or software agency)
5. **Draft one first message per prospect**, in the channel the business itself uses most (WhatsApp, then email, then LinkedIn):
   - **Structure:** greeting → one specific, true observation about *their* business → one relevant proof point (closest industry match) →
     one low-pressure question. Don't pitch services lists or prices.
   - **Length:** WhatsApp/LinkedIn ≤ 70 words. Email ≤ 120 words plus a subject line ≤ 6 words (not salesy).
   - **Voice:** follow `voice.md`. No flattery ("I love your brand!"), no fake familiarity, no implied prior relationship, no urgency, no buzzwords.
   - **One link at most**, to proof, and only where it helps (e.g. ecobe.vercel.app for a catalogue-style business).
   - **Ask** for something small: "Want me to send a 2-minute idea?" or "Is this something you've thought about?" Don't ask for a call in message one.
   - Also draft **Follow-up 1** (day 4: add one helpful idea, ≤ 40 words) and **Follow-up 2** (day 10: polite close-the-loop, ≤ 30 words).
   - Self-check every draft: true observation? banned words? one ask? word limit? proof from the REAL list only? Fix any failure before saving.
6. **Save** `prospects/YYYY-MM-DD-<segment-slug>.md`, with one `## <Business>` section per prospect containing: website, location, segment,
   contact route + where it was found, signal + evidence URL + date checked, offer angle, proof used, the first message, Follow-ups 1 and 2.
   Add a **Rejected candidates** section at the end (name + one-line reason) so they aren't re-researched next time.
7. **Register** each kept prospect in `data/prospects.csv` (append rows; never rewrite existing ones). Status lives on Trello, so the CSV is the
   registry for deduplication, opt-outs and analysis.
8. **Create one card per prospect** in `prospect_lists.needs_review`:
   - name: `[<Channel>] <Business> — <signal in ≤ 6 words>`, e.g. `[WhatsApp] Hotel X — PDF menu, no booking route`
   - desc: the first message exactly as it should be sent, then `---`, then:
     `Send to:` contact route + source · `Why them:` signal + evidence URL (checked YYYY-MM-DD) · `Offer angle:` ·
     `Proof used:` · `Follow-up 1 (day 4):` · `Follow-up 2 (day 10):` · `Source: prospects/<file>` · `ID: <prospect_id>`
   - Then write the card URL into the CSV row.
9. **Report:** how many cards are waiting, with the board URL, plus a one-line note per rejected candidate category. Explain:
   - approve = drag to ✅ Approved – Ready to Send, then **send it yourself**, then drag to 📤 Sent
   - change = drag to ✏️ Changes Requested and comment
   - not a fit = drag to 🗑️ Rejected / Do Not Contact
   - Remind the user: send one at a time from their own account, and keep new cold contacts to about 10–15 a day (bulk unsolicited WhatsApp messages can get a number restricted).

## Follow-up mode

1. List cards in `prospect_lists.sent`. Use the card's activity to find the date it was moved into Sent, and its comments to see which follow-ups are already drafted.
2. For each card:
   - 4+ days since sent and no Follow-up 1 comment → add a comment: `📝 Follow-up 1 ready (send only if no reply):` + the text from the card, adjusted if needed.
   - 10+ days since sent and no Follow-up 2 comment → the same with Follow-up 2.
   - 14+ days after Follow-up 2 → recommend moving it to 🔇 No Reply / Not Now. **Don't move it yourself.**
3. Report a checklist: which follow-ups to send today, and which cards to close out.

## Revise mode

Same as `/revise`, but on the prospect board: read the comments on each `changes_requested` card, rewrite the message to address every comment,
update the card and its `prospects/` file section, comment a summary of what changed, then move it back to `needs_review`.
If a comment states a lasting preference (e.g. "never mention prices"), add it to the **Outreach preferences** section at the bottom of this file and tell the user.

## Status mode

Count cards per list, and report: replies awaiting an answer (`replied`), follow-ups due today, and conversion so far
(sent → replied → call booked → won) by segment and by signal, using the CSV for segment and signal.
If the user reports an outcome ("X said stop", "Y booked a call"), update the CSV (`outcome`, `do_not_contact`) and suggest the card move.

## data/prospects.csv columns

`prospect_id,date_added,business,domain,segment,location,channel,contact_source,signal,evidence_url,offer_angle,proof_used,card_url,outcome,do_not_contact,notes`

- `prospect_id`: `P-YYYYMMDD-NN`
- `outcome`: blank until known, then one of `replied`, `call_booked`, `won`, `no_reply`, `not_interested`
- `do_not_contact`: `yes` if they asked not to be contacted, or it's clearly inappropriate; blank otherwise
- Store contact *source* (e.g. "website footer"), not the phone number or email itself. The number stays on the Trello card, where the user needs it.

## Outreach preferences
*(Learned from the user's revision comments. Add to this list.)*
