# 2026-09-16 — Stop buttons

**Report:** Carlos: "the stop buttons do not work."

**Method:** Chrome extension was not connected, so both buttons were driven headless with the
global Playwright install (`npm root -g`), against `file://` and against the live site, with
`createBufferSource` / `createScriptProcessor` patched to count live nodes.

**Findings**

- Strumming Pattern ■ Stop (`stopBacking`): works in the headless run, local and live. The button is
  clickable, `btOn` goes false, the label returns to ▶ Play. No defect reproduced.
- Play Along ■ Stop (`stopAndReset`): defect reproduced on the plain `AudioBufferSourceNode` path
  (pitch slider at Original). `source.onended = onEnded` fires on a programmatic `source.stop()`
  too, so every restart while playing (speed, pitch, marker, mode change, Pause) reset the UI to
  stopped while the new source kept playing. The next ▶ Play stacked a second source; ■ Stop
  killed only the newest, and the orphan looped forever. Pause also lost its position for the
  same reason.
- The SoundTouch path (any non-zero pitch, which is the default on both built songs) did not
  reproduce in Chrome: the disconnected ScriptProcessor stops firing.

**Fix (index.html, uncommitted at time of writing)**

- `stopSrc()` detaches `onended` and nulls `source` / `shifter` before stopping them, and bumps
  `playGen`.
- `onended` and the SoundTouch `handleEnd` only act if their node is still the current one.
- `startSrc()` captures `playGen` before awaiting the SoundTouch import and bails if a stop or
  restart happened meanwhile.

**Verified:** after the patch, speed change keeps `isPlaying` true with one live source, Pause
leaves zero live sources and keeps the offset, Stop leaves zero live sources. Strumming Stop
unchanged and still passing.

**Not checked:** a real device. If Carlos's failing case is the strumming Stop, or Stop on
Safari/iOS, this session did not reproduce it and the report needs more detail (which browser,
which step, what still sounds).
