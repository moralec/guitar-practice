# 2026-09-16 — Guitar / Guitarlele instrument toggle

**Trigger:** Carlos got a guitarlele and wanted the app to support it.

## Decision

Three options were considered: (1) transpose the displayed chord shapes a 4th down, (2) pitch-shift the play-along track +5 semitones, (3) a dedicated guitarlele track. Carlos chose (1). The player already has a pitch slider, so (2) was left untouched by design.

## What was built (commit d62f7b5)

- Header toggle `Guitar / Guitarlele`, persisted in localStorage as `guitarInstrument`, default Guitar.
- `chordsForInstrument()` transposes every chord name 5 semitones down before `renderChordSection()` runs, so both the Step 4 diagrams and the Step 5 song map follow the instrument.
- `transposeChord()` handles root, suffix and slash bass; spelling picks whichever of default/sharp/flat exists in `CHORD_SHAPES`.
- Header shows `Guitarlele shapes: <key>` beside the song key; Step 4 meta text explains the shapes differ from the lesson video.
- Added counterpart shapes so every library chord has one a 4th down: Dm, Bm7, Gadd9, Asus4, A/C#, F#7, C#, G#m.
- CLAUDE.md gained an "Instrument toggle" section.

## Verification

- Node test over every chord used in all sessions: all 24 library chords transpose to a shape that exists.
- Browser (localhost:7432 via Chrome extension; file:// is not reachable from it): toggle renders, all 10 built sessions show one diagram per transposed chord, setting survives reload, coming-soon weeks do not error, switching back restores original shapes.
- Live site checked after Netlify deploy (~20 s after push). Carlos initially saw no change; cause was a stale tab, hard reload fixed it. Netlify serves `max-age=0, must-revalidate`, no service worker.

## Notes for next time

- Adding a chord to `CHORD_SHAPES` means also adding its counterpart a 4th down, or the guitarlele diagram silently goes missing.
- Awkward guitarlele transpositions: Message in a Bottle → G#m E F#; Hotel California → F#m C# E B D A Bm.
- Memory Palace membership was asked twice and not answered; project remains out. Ask again next session.
- `songs.md` has an uncommitted change that predates this session; left alone.
