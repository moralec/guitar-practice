# BACKLOG.md — guitar

Pending work, lowest risk first. Removed when done.

| What | Why | Effort | Risk | Files |
|---|---|---|---|---|
| Commit or discard the pending `songs.md` edit | It predates the Palace log and is invisible to the next session otherwise | S | low | `songs.md` |
| Decide whether `mockup-*.html` are tracked or deleted | Untracked since August; either they matter or they are noise | S | low | `mockup-a/b/c.html` |
| Exclude `logs/`, `MEMORY.md`, `BACKLOG.md` from the Netlify publish | They are deployed to the public site today; harmless but pointless | S | low | `netlify.toml` (new) |
| Warn in console when a chord in `bars` has no `CHORD_SHAPES` entry (or no guitarlele counterpart) | Missing diagrams are silent today | S | low | `index.html` `renderChordSection` |
| Build the remaining stub weeks (Beginner 6 stubs, Intermediate 4, Advanced 9) | The programme is the point of the app | L | med | `index.html` `TRACKS`, `parse-chords.js`, `songs.md` |
| Confirm archetype: `local-tool` vs `dashboard-app` | The app has a public deploy, which `local-tool-graduation` says changes archetype; one user and no client argue for staying | S | med | `.palace`, Palace registry |
