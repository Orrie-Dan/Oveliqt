---
name: report
description: Produce the one-page daily marketing report - what worked, what's booked, what's next - from the Trello board and data/results.csv.
---

# Daily report

Write `reports/YYYY-MM-DD.md` and show it to the user. **One page max.** Use only real data and say clearly when data is missing.

```
# Marketing report: <date>

## What worked (last 7 days)
Top 3 posts by leads (then clicks if there are no leads yet): channel, hook, numbers. One line on *why* it likely worked.

## What's booked
Leads / calls / sales this week vs last week (from results.csv). Pipeline value if known.

## Pipeline status
Counts per Trello list: Ideas · Needs Review · Changes Requested · Approved (ready to post) · Posted
⚠️ Flag cards waiting in Needs Review for more than 2 days, and Approved cards not yet posted.

## What's next (max 3 actions)
Concrete actions for today, e.g. "Review 4 cards", "Post the approved LinkedIn piece", "Log results for 2 posts".
```

Get list contents via the Trello tools using the IDs in `config/trello.json`.
