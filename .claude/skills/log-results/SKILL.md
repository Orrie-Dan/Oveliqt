---
name: log-results
description: Record performance numbers for posted content into data/results.csv (manual entry until analytics integrations exist). Use when the user shares post stats, leads, calls booked or sales.
---

# Log results

There are no analytics integrations yet, so the user supplies the numbers (pasted text, screenshots, or answers to questions).

1. List the cards in the `posted` list (`config/trello.json`). For each one with no entry yet, ask the user for:
   impressions, engagements, clicks, leads, calls booked, sales, revenue. Accept partial data and leave unknowns blank, never 0.
   Tip for the user: leads and calls can be traced through the UTM `utm_campaign` value, or by asking new leads "how did you find us?".
2. Append one row per post and channel to `data/results.csv` (keep the header and column order exactly).
3. Add a comment on each card with its numbers. Move the card to `results_logged` **only if the user confirms the numbers are final**.
4. Show the rows you added.
