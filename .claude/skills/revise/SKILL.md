---
name: revise
description: Rework Trello cards in "Changes Requested" using the user's comments on them, then send them back to "Needs Review".
---

# Revise

1. List the cards in the `changes_requested` list (`config/trello.json`) and read each card's comments.
2. Rewrite the copy to address every comment, following `brand/voice.md`. Update the card description and the matching section of the `content/` file.
3. If a comment states a lasting preference (e.g. "never use questions as hooks"), add it to `brand/voice.md` under Do / Don't
   and tell the user you did. This is how the voice improves over time.
4. Add a short comment on the card summarising what changed, then move it back to `needs_review`.
5. Report what was revised. Never move a card to Approved.
