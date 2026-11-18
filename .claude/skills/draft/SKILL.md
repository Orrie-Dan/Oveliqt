---
name: draft
description: Turn idea cards (or a topic the user names) into channel-ready drafts in the brand voice, save them under content/ and put them on Trello in "Needs Review" for approval. Never publishes.
---

# Draft

Input: the args (a topic, or "all") or, by default, the 💡 cards currently in the `ideas` list (`config/trello.json`). Skip any card starting with 📌 (pinned instructions).

1. Read `brand/company.md`, `brand/voice.md`, `brand/channels.md`, the newest `insights/` file and the relevant `research/` file.
2. For each idea, write one version for each **active** channel in `channels.md`, following that channel's format notes.
   Follow `voice.md` strictly. Use `[PROOF NEEDED: …]` instead of inventing facts.
3. Save everything for the idea in `content/YYYY-MM-DD-<slug>.md`: one `## <Channel>` section per version,
   plus a **Visual brief** (for any version that needs an image or video: what to show, on-screen text, style) and the CTA with UTM link:
   `<booking link from company.md>?utm_source=<channel>&utm_medium=social&utm_campaign=YYYY-MM-DD-<slug>`
4. For each channel version, create a card in `needs_review`:
   - name: `[Channel] <hook>`
   - desc: the final copy, then `---`, then Goal, CTA + UTM link, Visual brief, `Source: content/<file>`
5. Archive the original 💡 idea card once its drafts exist.
6. Tell the user how many cards are waiting for review, with the board URL. Explain:
   approve = drag to ✅ Approved, change = drag to ✏️ Changes Requested and add a comment, reject = drag to 🗑️ Rejected.

Before creating cards, self-check each draft: banned words from voice.md? hook in the first line? exactly one CTA? within the length limit? Fix any failure first.
