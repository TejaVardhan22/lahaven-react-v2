#!/usr/bin/env node
/**
 * Generates the branded Open Graph image suite and the organisation logo.
 *
 * Requirements: Google Chrome (macOS default path) and `sips` (built into macOS).
 *
 * Usage:
 *   node scripts/generate-og.mjs
 *
 * Output:
 *   public/og/<route>.jpg   — 1200x630 social cards
 *   public/og-image.jpg     — default social card (home)
 *   public/logo.png         — 512x512 organisation logo for JSON-LD
 */

import { mkdir, writeFile, rm, copyFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const TMP = path.join(ROOT, '.og-build');
const OG_DIR = path.join(ROOT, 'public', 'og');
const PUBLIC_DIR = path.join(ROOT, 'public');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const PALETTE = {
  slate: '#34464F',
  charcoal: '#25313A',
  ivory: '#F6F1EC',
  sage: '#DDE5D5',
  terracotta: '#C64C3D',
};

/** @type {{slug: string, eyebrow: string, title: string, subtitle: string, accent?: string}[]} */
const cards = [
  {
    slug: 'home',
    eyebrow: 'Premium Artisan Bakery · Bengaluru',
    title: 'Celebration Starts Here!',
    subtitle:
      'Handcrafted celebration cakes, bento cakes and desserts for every moment worth remembering.',
  },
  {
    slug: 'cakes',
    eyebrow: 'The Signature Collection',
    title: 'Celebration Cakes',
    subtitle:
      'Rich flavours, elegant finishes and cakes baked fresh every morning in Bengaluru.',
  },
  {
    slug: 'bento-cakes',
    eyebrow: 'Petite Celebrations',
    title: 'Bento Cakes',
    subtitle:
      'Small cakes, big love. Personalised four-inch cakes in our signature bento boxes.',
  },
  {
    slug: 'custom-cakes',
    eyebrow: 'Bespoke Cake Studio',
    title: 'Designer & Custom Cakes',
    subtitle:
      'Your imagination, sculpted in sugar. One-of-a-kind cakes made to measure.',
  },
  {
    slug: 'desserts',
    eyebrow: 'The Sweet Finale',
    title: 'Premium Desserts',
    subtitle:
      'New York cheesecake, Italian tiramisu, brownies and more — handcrafted daily.',
  },
  {
    slug: 'about',
    eyebrow: 'Since Our First Kitchen',
    title: 'Our Story',
    subtitle:
      'A Bengaluru cake boutique built on craft, warmth and a love for celebration.',
  },
  {
    slug: 'outlets',
    eyebrow: 'Find Us Across The City',
    title: 'Five Boutiques, One Standard',
    subtitle:
      'Frazer Town · Malleshwaram · Sahakarnagar · Sanjayanagar · Yelahanka New Town',
  },
  {
    slug: 'contact',
    eyebrow: 'We Would Love To Hear From You',
    title: "Let's Bake Something Special",
    subtitle:
      'Place an order, plan a custom cake or simply say hello — our team is here to help.',
  },
  {
    slug: 'franchise',
    eyebrow: 'Partner With LaHaven',
    title: 'Grow With LaHaven',
    subtitle:
      'Boutique bakery franchise opportunities with turnkey kitchens and commissary support.',
  },
];

const cakeArt = `
<svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="160" cy="160" r="150" fill="${PALETTE.sage}" opacity="0.09"/>
  <circle cx="160" cy="160" r="122" stroke="${PALETTE.sage}" stroke-opacity="0.22"/>
  <path d="M92 232h136" stroke="${PALETTE.ivory}" stroke-width="2" stroke-linecap="round"/>
  <path d="M104 232v-44c0-5 4-9 9-9h94c5 0 9 4 9 9v44" stroke="${PALETTE.ivory}" stroke-width="2"/>
  <path d="M120 179v-34c0-4 3-7 7-7h66c4 0 7 3 7 7v34" stroke="${PALETTE.ivory}" stroke-width="2"/>
  <path d="M120 196c6 5 12 5 18 0s12-5 18 0 12 5 18 0 12-5 18 0 12 5 18 0" stroke="${PALETTE.terracotta}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M136 145v-30c0-4 3-7 7-7h34c4 0 7 3 7 7v30" stroke="${PALETTE.ivory}" stroke-width="2"/>
  <path d="M160 108V94" stroke="${PALETTE.ivory}" stroke-width="2" stroke-linecap="round"/>
  <path d="M160 82c5 6 5 11 0 15-5-4-5-9 0-15Z" fill="${PALETTE.terracotta}"/>
  <circle cx="160" cy="126" r="4.5" fill="${PALETTE.terracotta}"/>
  <path d="M146 154v12M160 152v14M174 154v12" stroke="${PALETTE.sage}" stroke-width="2" stroke-linecap="round"/>
  <path d="M78 258h164" stroke="${PALETTE.sage}" stroke-opacity="0.28" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const htmlFor = ({ eyebrow, title, subtitle }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;600&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    background: ${PALETTE.slate};
    color: ${PALETTE.ivory};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .wash {
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 88% 12%, rgba(221,229,213,0.16), transparent 42%),
      radial-gradient(circle at 4% 96%, rgba(198,76,61,0.18), transparent 46%),
      linear-gradient(140deg, #3b4f59 0%, ${PALETTE.slate} 48%, ${PALETTE.charcoal} 100%);
  }
  .grain {
    position: absolute; inset: 0; opacity: 0.05;
    background-image: radial-gradient(rgba(246,241,236,0.9) 0.6px, transparent 0.6px);
    background-size: 3px 3px;
  }
  .frame {
    position: absolute; inset: 26px;
    border: 1px solid rgba(246,241,236,0.16);
    border-radius: 22px;
  }
  .content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; padding: 64px 74px 52px; }
  .wordmark { display: flex; align-items: baseline; gap: 16px; }
  .wordmark .name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 30px; font-weight: 500; letter-spacing: 0.01em; }
  .wordmark .sub { font-size: 12px; font-weight: 500; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(246,241,236,0.62); }
  .main { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; }
  .copy { max-width: 720px; }
  .eyebrow { font-size: 13px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: ${PALETTE.sage}; }
  .rule { width: 54px; height: 2px; background: ${PALETTE.terracotta}; margin: 20px 0 22px; border-radius: 2px; }
  h1 { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: 62px; line-height: 1.04; letter-spacing: -0.015em; color: ${PALETTE.ivory}; }
  .tagline { font-family: 'Dancing Script', 'Snell Roundhand', cursive; font-size: 30px; color: ${PALETTE.terracotta}; margin-top: 16px; }
  p { margin-top: 16px; font-size: 18px; font-weight: 300; line-height: 1.55; color: rgba(246,241,236,0.76); max-width: 640px; }
  .art { width: 288px; flex-shrink: 0; opacity: 0.95; }
  .footer { margin-top: 34px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(246,241,236,0.52); }
  .footer .dot { width: 5px; height: 5px; border-radius: 50%; background: ${PALETTE.terracotta}; display: inline-block; margin: 0 12px; vertical-align: middle; }
  .footer span { display: inline-flex; align-items: center; }
</style>
</head>
<body>
  <div class="wash"></div>
  <div class="grain"></div>
  <div class="frame"></div>
  <div class="content">
    <div class="wordmark">
      <span class="name">La Haven</span>
      <span class="sub">Cake Boutique</span>
    </div>
    <div class="main">
      <div class="copy">
        <div class="eyebrow">${eyebrow}</div>
        <div class="rule"></div>
        <h1>${title}</h1>
        <div class="tagline">Celebration Starts Here!</div>
        <p>${subtitle}</p>
      </div>
      <div class="art">${cakeArt}</div>
    </div>
    <div class="footer">
      <span>lahavencakes.com<span class="dot"></span>Bengaluru, India</span>
      <span>Handcrafted · Small Batch · Since 2016</span>
    </div>
  </div>
</body>
</html>`;

const logoHtml = `<!doctype html>
<html><head><meta charset="utf-8" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; }
  html, body { width: 512px; height: 512px; overflow: hidden; }
  .mark {
    width: 512px; height: 512px; background: ${PALETTE.slate};
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', Georgia, serif; color: ${PALETTE.ivory};
  }
  .letter { font-size: 232px; line-height: 1; font-weight: 500; }
  .name { margin-top: 10px; font-family: 'Inter', sans-serif; font-size: 26px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(246,241,236,0.72); }
  .rule { width: 70px; height: 3px; background: ${PALETTE.terracotta}; margin: 24px 0 0; border-radius: 2px; }
</style></head>
<body><div class="mark"><div class="letter">L</div><div class="rule"></div><div class="name">LaHaven</div></div></body></html>`;

async function shoot(htmlPath, pngPath) {
  await run(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    `--screenshot=${pngPath}`,
    `file://${htmlPath}`,
  ]);
}

async function main() {
  await rm(TMP, { recursive: true, force: true });
  await mkdir(TMP, { recursive: true });
  await mkdir(OG_DIR, { recursive: true });

  for (const card of cards) {
    const htmlPath = path.join(TMP, `${card.slug}.html`);
    const pngPath = path.join(TMP, `${card.slug}.png`);
    const jpgPath = path.join(OG_DIR, `${card.slug}.jpg`);

    await writeFile(htmlPath, htmlFor(card), 'utf8');
    await shoot(htmlPath, pngPath);
    await run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', pngPath, '--out', jpgPath]);
    console.log(`✓ public/og/${card.slug}.jpg`);
  }

  await copyFile(path.join(OG_DIR, 'home.jpg'), path.join(PUBLIC_DIR, 'og-image.jpg'));
  console.log('✓ public/og-image.jpg');

  const logoHtmlPath = path.join(TMP, 'logo.html');
  const logoPngPath = path.join(TMP, 'logo.png');
  await writeFile(logoHtmlPath, logoHtml, 'utf8');
  await run(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=512,512',
    `--screenshot=${logoPngPath}`,
    `file://${logoHtmlPath}`,
  ]);
  await copyFile(logoPngPath, path.join(PUBLIC_DIR, 'logo.png'));
  console.log('✓ public/logo.png');

  await rm(TMP, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
