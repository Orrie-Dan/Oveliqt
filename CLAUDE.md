# AI Marketing System

A one-person marketing team for a software services company. It runs as a weekly loop:
**Research → Draft → Human approval (Trello) → Manual post → Log results → Learn → Research…**

## Hard rules (never break these)

1. **Nothing gets published by Claude.** Claude never posts, sends emails or replies publicly. Claude only drafts.
   This includes outreach: Claude never sends a WhatsApp, email, LinkedIn or contact-form message to a prospect.
2. **Trello is the approval gate.** A piece of content counts as approved only when the user has moved its card to
   `✅ Approved – Ready to Post`. Claude never moves a card into Approved, Posted or Results Logged unless the user asks.
3. **No invented facts.** Never invent client names, case studies, numbers, testimonials or claims about the company.
   If a post needs a proof point that isn't in `brand/company.md`, write `[PROOF NEEDED: …]` in its place.
4. **Read the brand files first.** Before drafting, always read `brand/company.md`, `brand/voice.md` and `brand/channels.md`,
   plus the latest `insights/` file if there is one.
5. **No secrets in files.** API keys (for future integrations) go in environment variables only.

## Layout

| Path | Purpose |
|---|---|
| `brand/` | Company profile, voice, channel rules. **Source of truth. The user fills these in.** |
| `config/trello.json` | Board and list IDs for the approval queue |
| `research/YYYY-MM-DD.md` | Weekly trend and audience research |
| `content/YYYY-MM-DD-<slug>.md` | Full draft of each content piece (the Trello card mirrors it) |
| `data/results.csv` | Performance data, entered by the user (or by integrations later) |
| `insights/YYYY-MM-DD.md` | Weekly learnings that feed the next research and drafting cycle |
| `reports/YYYY-MM-DD.md` | One-page daily reports |
| `prospects/YYYY-MM-DD-<segment>.md` | Prospect research and drafted outreach messages (mirrored on the Prospect Pipeline board) |
| `data/prospects.csv` | Prospect registry: deduplication, opt-outs (`do_not_contact`) and outreach outcomes |

## Commands (skills in `.claude/skills/`)

| Command | What it does |
|---|---|
| `/research` | Finds trends and audience questions, then writes `research/<date>.md` and idea cards |
| `/draft` | Turns ideas into channel-ready drafts, then creates cards in `👀 Needs Review` |
| `/revise` | Reworks cards in `✏️ Changes Requested` based on the user's comments |
| `/log-results` | Records metrics for posted content in `data/results.csv` |
| `/report` | One-page daily report: what worked, what's booked, what's next |
| `/weekly-review` | Analyses results, then writes `insights/<date>.md` to steer next week |
| `/prospect` | Finds businesses with a visible need, then drafts personal outreach cards on the separate **Prospect Pipeline** board (`prospect_board` in `config/trello.json`). Also `followups`, `revise`, `status`. Never sends. |

## Trello card conventions

- Title: `[Channel] Hook / topic`, for example `[LinkedIn] Why most MVPs fail at month 3`
- Description: the final post copy, then a `---` divider, then: goal, CTA, tracking link placeholder, visual brief, source file path
- Every CTA link uses UTM tags: `?utm_source=<channel>&utm_medium=social&utm_campaign=<YYYY-MM-DD-slug>`
  This is what lets results be attributed to a specific post later.
- Trello has no label-creation tool here, so the channel goes in the title prefix.
