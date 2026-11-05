// Drawing helpers for the iOS reference pages. The icons are simple stand-ins for SF Symbols.
const gearPath = (() => {
  const cx = 12, cy = 12, teeth = 8, ro = 10.5, ri = 8.2;
  let d = '';
  for (let i = 0; i < teeth * 2; i++) {
    const a0 = (i / (teeth * 2)) * Math.PI * 2, a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? ro : ri;
    const p = (a, rr) => `${(cx + rr * Math.cos(a)).toFixed(2)} ${(cy + rr * Math.sin(a)).toFixed(2)}`;
    d += (i === 0 ? 'M' : 'L') + p(a0 + 0.06, r) + 'L' + p(a1 - 0.06, r);
  }
  return d + 'Z';
})();
const icon = {
  compass: (s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 1.5a10.5 10.5 0 1 1 0 21 10.5 10.5 0 0 1 0-21Zm4.6 5.9-6.4 2.8-2.8 6.4 6.4-2.8 2.8-6.4ZM12 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/></svg>`,
  gear: (s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="${gearPath} M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z"/></svg>`,
  car: (s = 24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 10.5 16 7H8L5.6 10.5 3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/></svg>`,
  xmark: (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  location: (s = 34) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 11 19-9-9 19-2-8-8-2z"/></svg>`,
  chevron: () => `<svg width="9" height="15" viewBox="0 0 9 15" aria-hidden="true"><path d="M1.5 1.5l6 6-6 6" fill="none" stroke="var(--label3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  status: () => `<span style="display:flex;gap:6px;align-items:center"><svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="5" width="3" height="7" rx="1" fill="currentColor"/><rect x="10" y="2.5" width="3" height="9.5" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg><svg width="27" height="13" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor"/><rect x="24.5" y="4" width="1.5" height="5" rx=".7" fill="currentColor" opacity=".4"/></svg></span>`,
};
const chrome = () => `<div class="island"></div><div class="status"><span>9:41</span>${icon.status()}</div><div class="home"></div>`;
const dial = (size = 320) => {
  let ticks = '';
  for (let a = 10; a < 360; a += 10) {
    const major = a % 30 === 0;
    ticks += `<line x1="160" y1="${major ? 22 : 24}" x2="160" y2="${major ? 40 : 32}" stroke="${major ? 'var(--label)' : 'var(--label2)'}" stroke-width="${major ? 2 : 1}" stroke-linecap="round" transform="rotate(${a} 160 160)"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 320 320" aria-hidden="true">
    <g transform="rotate(-12 160 160)">
      <circle cx="160" cy="160" r="144" fill="none" stroke="var(--label3)" stroke-width="1"/>${ticks}
      <path d="M160 16 L170 40 L150 40 Z" fill="var(--north)"/>
      <g font-family="Inter" font-weight="600" font-size="20" text-anchor="middle" fill="var(--label2)">
        <text x="160" y="76" fill="var(--north)" transform="rotate(12 160 70)">N</text>
        <text x="262" y="167" transform="rotate(12 262 160)">E</text>
        <text x="160" y="258" transform="rotate(12 160 252)">S</text>
        <text x="58" y="167" transform="rotate(12 58 160)">W</text>
      </g>
    </g>
    <path d="M160 8 L150 -6 L170 -6 Z" transform="translate(0 6) rotate(180 160 7)" fill="var(--tint)"/>
  </svg>`;
};
const tabbar = (selected) => `<nav class="tabbar glass">
  <div class="tab${selected === 0 ? ' on' : ''}">${icon.compass()}<span>Compass</span></div>
  <div class="tab${selected === 1 ? ' on' : ''}">${icon.gear()}<span>Settings</span></div>
</nav>`;
const tabmin = (which) => `<div class="tabmin glass">${which === 0 ? icon.compass() : icon.gear()}</div>`;
const settingsList = () => `
  <div class="sect"><h5>Display</h5><div class="cells">
    <div class="cell">Appearance<span class="v">System ${icon.chevron()}</span></div>
  </div></div>
  <div class="sect"><h5>Location</h5><div class="cells">
    <div class="cell">Location Enabled<span class="v">Yes</span></div>
    <div class="cell note">Precise location is enabled for phone coordinates, elevation, and CarPlay travel direction.</div>
    <div class="cell link">Open Settings</div>
  </div></div>
  <div class="sect"><h5>Help</h5><div class="cells"><div class="cell link">Show Welcome Tour</div><div class="cell link">Visit the Compasslet Site</div></div></div>
  <div class="sect"><h5>About</h5><div class="cells"><div class="cell link">View Source on GitHub</div></div>
    <div class="foot">Compasslet is open source under the MIT License.</div></div>`;
const permissionSheet = () => `<div class="sheet glass" style="top:418px">
  <div class="grab"></div>
  <div class="ic-tile">${icon.location()}</div>
  <h3>Show Your Travel Direction</h3>
  <p>Compasslet uses location for coordinates and elevation, and for your travel direction during a CarPlay drive.</p>
  <div class="grow"></div>
  <div class="acts"><div class="primary">Allow Location</div><div class="plain">Not Now</div></div>
</div>`;
const compassScreen = () => `
  <div class="nav"><span></span><span class="t">Compass</span><span></span></div>
  <div class="dialwrap" style="position:absolute;top:150px;left:0;right:0">${dial()}</div>
  <div class="reading" style="position:absolute;top:500px;left:0;right:0"><div class="big rounded">12° N</div><div class="sub">Heading</div></div>`;
