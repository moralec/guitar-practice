#!/usr/bin/env node
/**
 * parse-chords.js
 * Converts a UG-style "chords over lyrics" text file into the grid JSON
 * format used by the guitar practice app.
 *
 * Usage:
 *   node parse-chords.js song.txt [keymap.json]
 *
 * The optional keymap.json maps source chord names to target chord names.
 * Example keymap for Every Rose (pasted in Gb, app uses G):
 *   { "Gb": "G", "Badd9": "C", "Db": "D", "Ebm": "Em" }
 *
 * Output: JavaScript object literal ready to paste as the `chords` field
 * in a session in index.html.
 */

const fs = require('fs');

// ── Chord name regex — matches most common chord symbols ──────────────────
const CHORD_RE = /^[A-G][#b]?(maj|min|m|dim|aug|sus[24]?|add\d+|[679]|maj7?|m7|7|9|11|13)?(\/.+)?$/;

// ── Is this line a chord line? ────────────────────────────────────────────
// A chord line contains only chord names and whitespace — no normal words.
function isChordLine(line) {
  const stripped = line.trim();
  if (!stripped) return false;
  // Split on whitespace; every token must be a chord name
  const tokens = stripped.split(/\s+/);
  if (tokens.length === 0) return false;
  return tokens.every(t => CHORD_RE.test(t));
}

// ── Extract ordered chord names from a chord line ─────────────────────────
function extractChords(line, keyMap) {
  return line.trim().split(/\s+/)
    .filter(t => CHORD_RE.test(t))
    .map(c => keyMap[c] || c);
}

// ── Map N chords to a 4-beat bar ──────────────────────────────────────────
// 1 chord  → whole bar       [G G G G]
// 2 chords → half each       [G G C C]
// 3 chords → 2 + 1 + 1       [G G C D]
// 4 chords → one per beat    [G C D G]
// 5+       → first four      [G C D Em ...]
function chordsToBar(chords) {
  const n = chords.length;
  if (n === 1) return [chords[0], chords[0], chords[0], chords[0]];
  if (n === 2) return [chords[0], chords[0], chords[1], chords[1]];
  if (n === 3) return [chords[0], chords[0], chords[1], chords[2]];
  return chords.slice(0, 4);
}

// ── Parse the full chart text ─────────────────────────────────────────────
function parseChart(text, keyMap) {
  const lines = text.split('\n');
  const sections = [];
  let currentSection = null;

  for (const raw of lines) {
    const line = raw.trimEnd(); // preserve leading spaces for indentation

    // Section header: [Verse 1], [Chorus], [Bridge], etc.
    const headerMatch = line.trim().match(/^\[([^\]]+)\]$/);
    if (headerMatch) {
      currentSection = { section: normaliseSection(headerMatch[1]), bars: [] };
      sections.push(currentSection);
      continue;
    }

    // Chord line inside a section
    if (currentSection && isChordLine(line)) {
      const chords = extractChords(line, keyMap);
      if (chords.length > 0) {
        currentSection.bars.push(chordsToBar(chords));
      }
    }
  }

  // Drop empty sections
  return sections.filter(s => s.bars.length > 0);
}

// Normalise section names: "Verse 1" → "Verse", "Pre-Chorus" → "Pre-chorus"
function normaliseSection(name) {
  return name
    .replace(/\s*\d+$/, '')          // remove trailing numbers
    .replace(/^pre.chorus$/i, 'Pre-chorus')
    .trim();
}

// ── Format output as JS object literal ───────────────────────────────────
function toJS(sections) {
  const lines = ['chords: { grid: ['];
  for (const sec of sections) {
    lines.push(`  { section: "${sec.section}", bars: [`);
    for (const bar of sec.bars) {
      lines.push(`    ${JSON.stringify(bar)},`);
    }
    lines.push('  ]},');
  }
  lines.push(']},');
  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────
const [,, inputFile, keyMapFile] = process.argv;

if (!inputFile) {
  console.error('Usage: node parse-chords.js <song.txt> [keymap.json]');
  process.exit(1);
}

const text   = fs.readFileSync(inputFile, 'utf8');
const keyMap = keyMapFile ? JSON.parse(fs.readFileSync(keyMapFile, 'utf8')) : {};

const sections = parseChart(text, keyMap);
console.log(toJS(sections));
