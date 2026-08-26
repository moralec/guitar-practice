# Guitar Practice App

A single-file HTML guitar practice tool. Open `index.html` directly in the browser (file:// works fine).

## Structure

Each session has 3 steps:
1. **Warmup** — YouTube thumbnail (opens in new tab)
2. **Full Song Lesson** — Marty Music is the preferred source
3. **Play Along** — Web Audio API player with A-B loop and speed control

## Adding a new week

Add one object to the `SESSIONS` dictionary in `index.html`:

```javascript
3: {
  title:   "Song Title",
  artist:  "Artist Name",
  year:    1985,
  bpm:     120,
  key:     "A minor",
  warmup: {
    videoId: "YOUTUBE_ID",
    label:   "Short description · YouTube",
    title:   "Warmup Title",
    meta:    "One line instruction for the warmup"
  },
  lesson: { videoId: "YOUTUBE_ID", label: "Marty Music · YouTube" },
  links: [
    { label: "🎸 Tab",    url: "https://tabs.ultimate-guitar.com/..." },
    { label: "🎵 Chords", url: "https://tabs.ultimate-guitar.com/..." },
  ]
}
```

YouTube thumbnails load from `img.youtube.com` — no server needed.

## Play Along player

- Uses Web Audio API (`AudioBufferSourceNode`) — no CDN, works offline
- User loads MP3/M4A from their local library via file picker
- **Loop mode**: A-B markers + speed slider (good for drilling a riff)
- **Full song mode**: plays straight through at full speed
- Default on load: A = 0:00, B = end of file

## Weeks so far (sorted by difficulty)

| Week | Song | Artist | BPM | Key | Warmup |
|------|------|--------|-----|-----|--------|
| 0 | Every Rose Has Its Thorn | Poison | 88 | G major | Pentatonic |
| 1 | Knockin' on Heaven's Door | Guns N' Roses | 72 | G major | Strumming patterns |
| 2 | Summer of '69 | Bryan Adams | 144 | D major | Rhythm/strumming |
| 3 | Wish You Were Here | Pink Floyd | 60 | G major | Fingerpicking |
| 4 | You Give Love a Bad Name | Bon Jovi | 123 | C minor | Palm muting |
| 5 | More Than Words | Extreme | 97 | G major | Fingerpicking/chord melody |
| 6 | Money for Nothing | Dire Straits | 136 | G minor | Blues scale |
| 7 | Message in a Bottle | The Police | 150 | C# minor | Arpeggios |
| 8 | Tears in Heaven | Eric Clapton | 80 | A major | Travis picking |
| 9 | Hotel California | Eagles | 75 | B minor | Arpeggio patterns |

## Files

- `index.html` — the whole app (HTML + CSS + JS, self-contained)
- `Practice.command` — double-click to start a local server on port 7432 (only needed if YouTube embeds are required in future)
- `mockup-a/b/c.html` — original layout mockups, not used
