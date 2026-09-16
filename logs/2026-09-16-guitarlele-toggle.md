# 2026-09-16 — Guitarlele instrument toggle; join the Memory Palace

## Goal

Carlos got a guitarlele and wants the app to work for it. Later in the session: make the project a Memory Palace member.

## Done

- `index.html` — header toggle Guitar / Guitarlele (`buildInstrumentToggle`, `setInstrument`), persisted as `guitarInstrument`; `chordsForInstrument()` / `transposeChord()` / `keyForInstrument()`; header `Guitarlele shapes:` span; Step 4 meta text; eight counterpart shapes (Dm, Bm7, Gadd9, Asus4, A/C#, F#7, C#, G#m). Commit d62f7b5, live at https://guitar.ag-insights.co.uk about 20 s after push.
- `AGENTS.md` — rewritten front door (5 steps, 3 tracks, current session format); `CLAUDE.md` now a symlink to it.
- `.palace` — adopted as `local-tool` / `personal`, alias `guitar-practice`.
- `MEMORY.md`, `BACKLOG.md`, `logs/INDEX.md` — created.
- Message appended to the Palace's `INBOX.md` asking for the registry row to be completed.

## Decisions

- Transpose the displayed shapes a 4th down (option 1) rather than pitch-shift the track (+5) or add a guitarlele track. Reason: correct audio, and the pitch slider already exists for anyone who prefers option 2.
- Chord spelling follows whatever exists in `CHORD_SHAPES`; minor keys spell to the `m` chord (C# minor → G# minor).
- Archetype `local-tool`, matching the registry row that already existed, despite the public deploy. Flagged in `BACKLOG.md` for the operator.
- Logs are committed and pushed, so they deploy with the site. Accepted for now; exclusion is in the backlog.

## Corrections

- "Option 1 is best. The change of what we hear we already have in the player. Lets leave that untouched."
- "I am not seeing anything changing in the live app" — cause was a stale tab; a hard reload fixed it. Netlify headers and served content were correct.
- Palace membership question was asked twice before Carlos answered: "lets make it parte of memory palace."

## Verification

- Node: every chord used across all sessions (24 library chords) transposes to an existing shape.
- Browser via Chrome extension on `http://127.0.0.1:7432` (`file://` is refused by the extension): toggle renders, all 10 built sessions show one diagram per transposed chord, setting survives reload, coming-soon weeks do not throw, switching back restores original shapes. Repeated on the live site after deploy.

## Open

- Palace registry row still says domain `null`; the inbox message asks for `personal`.
- See `BACKLOG.md`: archetype confirmation, Netlify publish exclusions, silent-missing-diagram warning, pending `songs.md` edit.
