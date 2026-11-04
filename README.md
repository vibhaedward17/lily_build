# Lily Build: ASCII Lily Bouquet, Built Step by Step

An animated bouquet of lilies drawn as coloured text characters. Made with plain HTML, CSS and JavaScript, using the Canvas API. No libraries.

**Live demo:** https://vibhaedward17.github.io/lily_build/

## Two versions of the same idea

| | Repo | What it is |
|---|---|---|
| Finished version | [Lily](https://github.com/vibhaedward17/Lily) ([live](https://vibhaedward17.github.io/Lily/)) | The full version: 11 lilies, pointer wind, 3 character sets, and a button to show the vector drawing under the text. One self-contained `index.html`. |
| Build-it-yourself version | **This repo** | A simpler version that I built stage by stage, so I understand every line. 5 lilies, stems, leaves, stamens and stars. `index.html` plus `app.js`. |

The first version was generated with AI help (Claude) and published as-is. This repo is where I rebuilt the same idea myself, one step at a time, with AI help to explain each stage.

## How it works

1. The lilies are drawn on a **hidden canvas** (400 x 500) using bezier curves and gradients.
2. Each frame, that canvas is **shrunk to a small grid** (80 x 100), so one pixel becomes one future character.
3. For every pixel, the code reads its colour and brightness with `getImageData`.
4. Brighter pixels get denser characters, from `.` (dim) to `@` (bright).
5. Each character is drawn on the **visible canvas** (640 x 800) in the pixel's own colour, which is boosted so the colours stay vivid.
6. `requestAnimationFrame` repeats this every frame.

## Building method

I built it in 9 small stages, and each one was a separate working version:

| Stage | What I added | Idea learned |
|---|---|---|
| 1 | Empty page with two canvases | A hidden canvas for drawing, a visible canvas for output |
| 2 | One petal | `bezierCurveTo` makes the pointed leaf shape |
| 3 | A full lily from 6 petals | `rotate` in a loop (360 / 6 = 60 degrees per petal) |
| 4 | Pixels turned into characters | Shrink, read pixels, pick a character by brightness |
| 5 | Animation | `requestAnimationFrame` and `Math.sin` for swaying |
| 6 | Gradient petals | Dark base to bright tip gives light and dense characters |
| 7 | A bouquet | Arrays of flowers, curved stems, leaves, time offsets so flowers move differently |
| 8 | Stamens and vivid colours | `Math.cos` and `Math.sin` for points on a circle, and colour normalising |
| 9 | Twinkling stars | `globalAlpha` with a sine wave |

## Files

- `index.html`: the page, with the hidden canvas and the visible canvas
- `app.js`: all the drawing and ASCII code

## Run it on your computer

1. Download or clone this repo.
2. Open `index.html` in your browser. You can also use the VS Code Live Server extension.

## Built with

- HTML5 Canvas
- Vanilla JavaScript
- Git and GitHub Pages

## Idea

Inspired by an ASCII lily bouquet reel on Instagram by @arimecoa. The reel's comments mention Pixi.js with an ASCII filter. I used plain canvas instead.

## Next ideas

- Pointer wind that pushes the stems
- Buttons to switch the character set
- Mobile touch support
