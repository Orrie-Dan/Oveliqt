---
name: research
description: Weekly market and audience research for the software services company. Finds trends, buyer questions and competitor activity, writes research/<date>.md and creates idea cards on the Trello board.
---

# Research

1. Read `brand/company.md`, `brand/channels.md` and the newest file in `insights/` (if any). If `company.md` still has
   TODOs in Services or Ideal customers, warn the user that results will be generic, and continue.
2. Use WebSearch (send several searches in one turn) to find, **for the target customers and services**:
   - news and trends from the last 14 days that affect those buyers (AI adoption, regulation, funding, tools)
   - questions buyers actually ask: Reddit, Quora, LinkedIn discussions, "how much does it cost to build…", "how to choose a developer"
   - what the competitors in `company.md` are posting about
3. Write `research/YYYY-MM-DD.md` with:
   - **Top trends** (5 max). Each needs: what it is, why the buyer cares, source URL.
   - **Audience questions** (10 max), worded the way buyers phrase them
   - **Competitor gaps:** topics they ignore or handle badly
   - **Content ideas:** 8–12 ideas. Each has a hook, the content-mix category (educate/proof/opinion/offer), best channel,
     and why now. Rank them, favouring the patterns that `insights/` says led to leads.
4. Create one card per top-5 idea in the `ideas` list from `config/trello.json`:
   title `💡 <hook>`, description with angle, sources, suggested channels and the research file path.
5. Report to the user: the top 5 ideas and the board link. Remind them to move or delete idea cards, then run `/draft`.

Every claim must cite a source URL. Never present a search result as fact without one.
