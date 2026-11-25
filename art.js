// Hand-drawn illustrations of the two of us, aged across five stages.
// Stage index: 0 = 29, 1 = 35, 2 = 45, 3 = 65, 4 = 80
(function () {
  const HER_SKIN = '#ebba98', HER_SHADE = '#d79f7c';
  const HIM_SKIN = '#dca37d', HIM_SHADE = '#c48760';
  const HER_HAIR = ['#3a2219', '#3a2219', '#47322a', '#a39c96', '#e4e0dc'];
  const HER_BROW = ['#3a2219', '#3a2219', '#47322a', '#8f8780', '#b9b2ab'];
  const HIM_HAIR = ['#1c1411', '#1c1411', '#36302c', '#9b958f', '#ebe9e6'];
  const BEARD    = ['#1c1411', '#1c1411', '#4f4844', '#aca6a0', '#efeeeb'];
  const HIM_BROW = ['#1c1411', '#1c1411', '#36302c', '#7f7973', '#b5afa9'];
  const HER_TOP  = ['#b4bcc3', '#c9808a', '#5f8f78', '#d4a245', '#9b7cb6'];
  const HIM_TOP  = ['#bcd4e6', '#8fb0d1', '#6d8fb8', '#7f9fb8', '#a9bccd'];
  const LINE = 'rgba(110,60,40,.5)';

  const heart = (x, y, s, fill, extra = '') =>
    `<path ${extra} transform="translate(${x} ${y}) scale(${s})" d="M0 6 C0 -2 -12 -4 -12 4 C-12 10 -4 14 0 19 C4 14 12 10 12 4 C12 -4 0 -2 0 6 Z" fill="${fill}"/>`;

  // ---------- scenes ----------
  function scene(s) {
    const id = 'sc' + s;
    if (s === 0) { // in the car, like the photo
      const trees = [[30, 150, 26], [70, 140, 30], [115, 152, 24], [370, 120, 30], [395, 150, 26]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8fc27a"/>`).join('');
      return `
        <rect width="400" height="320" fill="#ddd7ce"/>
        <rect x="-10" y="70" width="170" height="120" rx="16" fill="#d6ecf5"/>
        <path d="M336 36 L410 26 L410 250 L344 250 Z" fill="#d6ecf5"/>
        <rect x="-10" y="150" width="170" height="40" fill="#e9e3d8"/>
        ${trees}
        <rect x="-10" y="70" width="170" height="120" rx="16" fill="none" stroke="#c9c2b7" stroke-width="6"/>
        <path d="M336 36 L410 26 L410 250 L344 250 Z" fill="none" stroke="#c9c2b7" stroke-width="6"/>
        <rect x="14" y="104" width="74" height="92" rx="22" fill="#2a2a2a"/>
        <rect x="40" y="190" width="18" height="22" fill="#9a9a9a"/>
        <rect x="4" y="206" width="100" height="130" rx="20" fill="#232323"/>
        <rect x="200" y="60" width="140" height="200" rx="40" fill="#2a2a2a"/>`;
    }
    if (s === 1) { // our first home, evening
      const city = [[24, 110, 18, 40], [44, 96, 16, 54], [62, 116, 20, 34], [84, 90, 14, 60], [100, 106, 22, 44]]
        .map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#4b3f6b"/>`).join('');
      const bulbs = Array.from({ length: 13 }, (_, i) => {
        const x = 10 + i * 31, y = 22 + Math.sin(i * 0.9) * 8 + 6;
        return `<circle cx="${x}" cy="${y}" r="7" fill="#ffe9a8" opacity=".35"/><circle cx="${x}" cy="${y}" r="3.2" fill="#ffd66b"/>`;
      }).join('');
      return `
        <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#6c5b9e"/><stop offset=".6" stop-color="#e98f8a"/><stop offset="1" stop-color="#f7b27a"/></linearGradient></defs>
        <rect width="400" height="320" fill="#f4dfcd"/>
        <rect x="16" y="44" width="110" height="112" rx="6" fill="url(#${id})"/>
        ${city}
        <rect x="16" y="44" width="110" height="112" rx="6" fill="none" stroke="#fff8f0" stroke-width="7"/>
        <path d="M71 44 V156 M16 100 H126" stroke="#fff8f0" stroke-width="4"/>
        <rect x="318" y="58" width="64" height="52" rx="4" fill="#fff8f0" stroke="#b98a6a" stroke-width="4"/>
        ${heart(350, 72, 1, '#e0566b')}
        <path d="M0 18 Q100 44 200 22 T400 26" stroke="#7a6a5a" stroke-width="1.5" fill="none"/>
        ${bulbs}`;
    }
    if (s === 2) { // a sunny garden
      const flowers = [[20, 280, '#f28ca0'], [44, 296, '#ffd66b'], [70, 286, '#9b7cb6'], [330, 288, '#f28ca0'], [356, 276, '#ffd66b'], [384, 292, '#ffffff']]
        .map(([x, y, c]) => `<line x1="${x}" y1="${y}" x2="${x}" y2="330" stroke="#4f8a4a" stroke-width="3"/>` +
          [0, 72, 144, 216, 288].map(a => `<ellipse cx="${x}" cy="${y - 7}" rx="4" ry="7" fill="${c}" transform="rotate(${a} ${x} ${y})"/>`).join('') +
          `<circle cx="${x}" cy="${y}" r="3.5" fill="#e8a33a"/>`).join('');
      return `
        <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#a9dbf3"/><stop offset="1" stop-color="#eef8fc"/></linearGradient></defs>
        <rect width="400" height="320" fill="url(#${id})"/>
        <circle cx="60" cy="58" r="40" fill="#fff2b8" opacity=".6"/><circle cx="60" cy="58" r="26" fill="#ffd66b"/>
        <ellipse cx="330" cy="60" rx="34" ry="12" fill="#fff"/><ellipse cx="350" cy="52" rx="20" ry="12" fill="#fff"/>
        <path d="M-10 200 Q100 150 210 190 T410 175 V330 H-10 Z" fill="#a8d590"/>
        <path d="M-10 240 Q120 210 240 236 T410 226 V330 H-10 Z" fill="#8cc275"/>
        ${flowers}`;
    }
    if (s === 3) { // an autumn park
      const leaves = [[40, 60, '#e0773a', 30], [90, 120, '#c9492e', -20], [180, 40, '#e8a33a', 50], [380, 210, '#c9492e', 10], [30, 200, '#e8a33a', -40], [210, 110, '#e0773a', 70], [360, 30, '#e8a33a', 0]]
        .map(([x, y, c, r]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('');
      const crown = [[340, 70, 46, '#e0773a'], [380, 100, 40, '#c9492e'], [310, 110, 38, '#e8a33a'], [360, 140, 36, '#e0773a']]
        .map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');
      return `
        <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fbe3c4"/><stop offset="1" stop-color="#f6cfa6"/></linearGradient></defs>
        <rect width="400" height="320" fill="url(#${id})"/>
        <rect x="346" y="120" width="20" height="210" fill="#7a5238"/>
        ${crown}
        <path d="M-10 250 Q200 225 410 250 V330 H-10 Z" fill="#d9a46b"/>
        <rect x="0" y="236" width="400" height="10" rx="4" fill="#8a5e40"/>
        ${leaves}`;
    }
    // s === 4: sunset on the porch
    const rails = Array.from({ length: 14 }, (_, i) => `<rect x="${i * 30}" y="228" width="8" height="100" fill="#8a5e40"/>`).join('');
    return `
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6c5b7b"/><stop offset=".45" stop-color="#c06c84"/><stop offset="1" stop-color="#f8b195"/></linearGradient></defs>
      <rect width="400" height="320" fill="url(#${id})"/>
      <circle cx="330" cy="200" r="60" fill="#ffd48a" opacity=".35"/><circle cx="330" cy="200" r="38" fill="#ffd48a"/>
      <path d="M-10 214 Q120 196 250 212 T410 206 V330 H-10 Z" fill="#7d4e6b"/>
      <path d="M40 70 q8 -8 16 0 q8 -8 16 0 M90 50 q6 -6 12 0 q6 -6 12 0 M300 60 q6 -6 12 0 q6 -6 12 0" stroke="#3d2c45" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${rails}
      <rect x="0" y="220" width="400" height="14" rx="3" fill="#9c6b48"/>`;
  }

  // ---------- her ----------
  function her(s) {
    const hair = HER_HAIR[s], top = HER_TOP[s];
    const len = [304, 304, 292, 236, 0][s];
    let g = '';
    // back hair
    if (s < 4) {
      g += `<path d="M140 92 C 90 92 78 132 83 172 C 87 ${len - 64} 72 ${len - 32} 78 ${len} L 202 ${len} C 208 ${len - 32} 193 ${len - 64} 197 172 C 202 132 190 92 140 92 Z" fill="${hair}"/>`;
      g += `<ellipse cx="84" cy="${len - 8}" rx="13" ry="18" fill="${hair}"/><ellipse cx="196" cy="${len - 8}" rx="13" ry="18" fill="${hair}"/>`;
    } else {
      g += `<path d="M140 92 C 88 92 78 136 84 190 Q 98 204 114 194 L 166 194 Q 182 204 196 190 C 202 136 192 92 140 92 Z" fill="${hair}"/>`;
    }
    // neck + chin shadow
    g += `<path d="M126 178 L126 242 Q140 252 154 242 L154 178 Z" fill="${HER_SKIN}"/>`;
    g += `<ellipse cx="140" cy="194" rx="16" ry="9" fill="${HER_SHADE}"/>`;
    // body
    g += `<path d="M62 330 C 64 264 96 238 140 235 C 184 238 216 264 218 330 Z" fill="${top}"/>`;
    if (s === 0) { // tank top straps & neckline
      g += `<path d="M112 238 Q140 272 168 238 Z" fill="${HER_SKIN}"/>`;
    } else if (s >= 3) { // cardigan
      g += `<path d="M120 237 L140 280 L160 237 Z" fill="${HER_SKIN}"/>`;
      g += `<path d="M140 280 V330" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`;
      g += [292, 310].map(y => `<circle cx="146" cy="${y}" r="3" fill="rgba(255,255,255,.7)"/>`).join('');
      // pearls
      g += Array.from({ length: 9 }, (_, i) => {
        const t = i / 8, x = 122 + 36 * t, y = 240 + Math.sin(t * Math.PI) * 16;
        return `<circle cx="${x}" cy="${y}" r="2.6" fill="#fffaf0" stroke="#d8cfc0" stroke-width=".6"/>`;
      }).join('');
    } else {
      g += `<path d="M118 237 Q140 262 162 237 Z" fill="${HER_SKIN}"/>`;
    }
    // face
    g += `<ellipse cx="140" cy="150" rx="41" ry="49" fill="${HER_SKIN}"/>`;
    // front strands over shoulders
    if (s < 4) {
      g += `<path d="M100 136 C 90 180 100 ${len - 70} 84 ${len - 2} C 106 ${len - 34} 114 200 107 160 Z" fill="${hair}"/>`;
      g += `<path d="M180 136 C 190 180 180 ${len - 70} 196 ${len - 2} C 174 ${len - 34} 166 200 173 160 Z" fill="${hair}"/>`;
    } else {
      g += `<path d="M100 140 C 94 165 96 182 90 194 C 104 190 110 176 107 158 Z" fill="${hair}"/>`;
      g += `<path d="M180 140 C 186 165 184 182 190 194 C 176 190 170 176 173 158 Z" fill="${hair}"/>`;
    }
    // fringe, side-swept
    g += `<path d="M98 160 C 92 112 116 93 142 94 C 170 95 188 114 183 162 C 179 134 166 119 150 114 C 136 124 116 132 98 160 Z" fill="${hair}"/>`;
    if (s === 2) g += `<path d="M150 100 C 162 108 172 122 176 140" stroke="#bdb6af" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    // brows
    g += `<path d="M114 136 Q125 130 134 135 M146 135 Q155 130 166 136" stroke="${HER_BROW[s]}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
    // eyes
    g += [125, 155].map(x => `<ellipse cx="${x}" cy="150" rx="4.4" ry="5.2" fill="#2b1a14"/><circle cx="${x + 1.6}" cy="148" r="1.5" fill="#fff"/>`).join('');
    g += `<path d="M120 146 l-4 -3 M160 146 l4 -3" stroke="#2b1a14" stroke-width="1.6" stroke-linecap="round"/>`;
    // nose, blush, lips
    g += `<path d="M141 155 Q136 167 143 168" stroke="${HER_SHADE}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    g += `<ellipse cx="117" cy="168" rx="8" ry="5" fill="#f08a8a" opacity=".35"/><ellipse cx="163" cy="168" rx="8" ry="5" fill="#f08a8a" opacity=".35"/>`;
    g += `<path d="M127 177 Q140 191 153 177 Q140 182 127 177 Z" fill="#b8323f"/>`;
    // age lines
    if (s >= 2) g += `<path d="M112 147 l-6 -2 M112 152 l-6 1 M168 147 l6 -2 M168 152 l6 1" stroke="${LINE}" stroke-width="1.3" stroke-linecap="round"/>`;
    if (s >= 3) g += `<path d="M124 166 Q119 176 124 185 M156 166 Q161 176 156 185 M119 158 Q125 162 131 158 M149 158 Q155 162 161 158" stroke="${LINE}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
    if (s >= 4) g += `<path d="M118 126 Q128 122 136 125 M132 194 Q140 197 148 194 M130 206 Q140 210 150 206" stroke="${LINE}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
    // glasses
    if (s >= 3) g += `<g stroke="#8a5a3c" stroke-width="2.2" fill="rgba(255,255,255,.14)"><circle cx="125" cy="151" r="11.5"/><circle cx="155" cy="151" r="11.5"/><path d="M136.5 150 Q140 146 143.5 150" fill="none"/></g>`;
    return g;
  }

  // ---------- him ----------
  function him(s) {
    const hair = HIM_HAIR[s], beard = BEARD[s], top = HIM_TOP[s];
    let g = '';
    // neck & body
    g += `<path d="M250 172 L250 238 Q265 248 280 238 L280 172 Z" fill="${HIM_SKIN}"/>`;
    g += `<path d="M180 330 C 184 260 220 233 265 230 C 310 233 346 260 350 330 Z" fill="${top}"/>`;
    if (s === 0) { // crew neck tee with the painted print + seatbelt
      g += `<path d="M245 232 Q265 252 285 232 Z" fill="${HIM_SKIN}" stroke="#a9c3d6" stroke-width="4"/>`;
      g += `<g opacity=".85"><ellipse cx="292" cy="288" rx="22" ry="12" fill="#6cc3a8" transform="rotate(-12 292 288)"/>
            <ellipse cx="282" cy="296" rx="12" ry="7" fill="#4f7fd1"/><ellipse cx="308" cy="282" rx="9" ry="6" fill="#4f7fd1"/>
            <ellipse cx="300" cy="300" rx="8" ry="5" fill="#9fd28a"/></g>`;
      g += `<path d="M322 238 L300 330" stroke="#262626" stroke-width="17"/>`;
    } else if (s === 1) {
      g += `<path d="M245 232 Q265 252 285 232 Z" fill="${HIM_SKIN}" stroke="#7c9cbf" stroke-width="4"/>`;
    } else if (s === 2) { // collared shirt
      g += `<path d="M248 232 L265 262 L282 232 Z" fill="${HIM_SKIN}"/>`;
      g += `<path d="M244 230 L262 262 L250 268 L236 238 Z M286 230 L268 262 L280 268 L294 238 Z" fill="#f2f6fa"/>`;
      g += `<path d="M265 262 V330" stroke="rgba(0,0,0,.18)" stroke-width="2"/>` + [280, 300, 320].map(y => `<circle cx="265" cy="${y}" r="2.4" fill="#f2f6fa"/>`).join('');
    } else if (s === 3) { // sweater over a collar
      g += `<path d="M244 232 Q265 258 286 232 Z" fill="#f2f6fa"/><path d="M252 233 L265 250 L278 233 Z" fill="${HIM_SKIN}"/>`;
      g += `<path d="M242 232 Q265 262 288 232" stroke="#6f8ea6" stroke-width="5" fill="none"/>`;
    } else { // cardigan
      g += `<path d="M246 232 L265 286 L284 232 Z" fill="#e9e1d4"/><path d="M252 232 L265 250 L278 232 Z" fill="${HIM_SKIN}"/>`;
      g += [296, 314].map(y => `<circle cx="270" cy="${y}" r="3" fill="#6b5a48"/>`).join('');
    }
    // ears & face
    g += `<ellipse cx="225" cy="140" rx="7.5" ry="11" fill="${HIM_SKIN}"/><ellipse cx="305" cy="140" rx="7.5" ry="11" fill="${HIM_SKIN}"/>`;
    g += `<ellipse cx="265" cy="138" rx="40" ry="50" fill="${HIM_SKIN}"/>`;
    // beard
    g += `<path d="M225 126 C 223 180 242 208 265 209 C 288 208 307 180 305 126 C 302 148 297 158 291 163 C 282 157 248 157 239 163 C 233 158 228 148 225 126 Z" fill="${beard}"/>`;
    g += `<path d="M243 167 C 251 155 279 155 287 167 C 277 161 253 161 243 167 Z" fill="${beard}"/>`;
    // smile
    g += `<path d="M251 170 Q265 186 279 170 Q265 174 251 170 Z" fill="#fff" stroke="#5a2e26" stroke-width="1.6" stroke-linejoin="round"/>`;
    // hair
    if (s <= 2) {
      g += `<path d="M222 136 C 214 96 236 70 268 70 C 300 70 320 96 308 136 C 305 116 297 106 287 101 C 270 109 246 106 236 101 C 229 110 225 120 222 136 Z" fill="${hair}"/>`;
      g += `<path d="M234 98 C 242 62 288 52 306 82 C 290 74 262 74 246 92 Z" fill="${hair}"/>`;
      if (s === 2) g += `<path d="M228 120 C 228 112 230 106 233 102 M302 120 C 302 112 300 106 297 102" stroke="#9b958f" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    } else if (s === 3) {
      g += `<path d="M223 136 C 218 104 236 84 266 84 C 296 84 312 104 307 136 C 304 118 299 110 293 105 C 282 98 250 98 238 105 C 232 112 227 122 223 136 Z" fill="${hair}"/>`;
    } else {
      g += `<path d="M223 142 C 218 122 224 108 236 102 C 232 116 230 128 232 144 Z M307 142 C 312 122 306 108 294 102 C 298 116 300 128 298 144 Z" fill="${hair}"/>`;
      g += `<path d="M252 92 Q265 85 278 92 M258 98 Q266 94 274 98" stroke="${hair}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    }
    // brows & eyes
    g += `<path d="M239 121 Q249 114 259 119 M271 119 Q281 114 291 121" stroke="${HIM_BROW[s]}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    g += [250, 280].map(x => `<ellipse cx="${x}" cy="134" rx="4.2" ry="4.8" fill="#24140f"/><circle cx="${x + 1.5}" cy="132.3" r="1.4" fill="#fff"/>`).join('');
    // nose
    g += `<path d="M266 138 Q258 152 267 154" stroke="${HIM_SHADE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    // age lines
    if (s >= 2) g += `<path d="M236 132 l-6 -2 M236 137 l-6 1 M294 132 l6 -2 M294 137 l6 1" stroke="${LINE}" stroke-width="1.3" stroke-linecap="round"/>`;
    if (s >= 3) g += `<path d="M246 106 Q265 101 284 106 M249 112 Q265 108 281 112 M244 143 Q250 147 256 143 M274 143 Q280 147 286 143" stroke="${LINE}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
    // glasses
    if (s >= 2) {
      const c = s === 2 ? '#2d2d2d' : '#7a5236';
      g += `<g stroke="${c}" stroke-width="2.4" fill="rgba(255,255,255,.14)"><rect x="237" y="125" width="26" height="19" rx="6"/><rect x="267" y="125" width="26" height="19" rx="6"/>
            <path d="M263 133 Q265 130.5 267 133 M237 131 L226 129 M293 131 L304 129" fill="none"/></g>`;
    }
    return g;
  }

  // little hearts drifting between us
  function hearts(s) {
    return `<g class="drift">${heart(206, 64, 1.05, '#e0566b')}${heart(186, 40, .6, '#f08aa0', 'opacity=".85"')}${heart(222, 30, .45, '#f6b3c0', 'opacity=".8"')}</g>`;
  }

  window.coupleArt = function (s) {
    return `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of us">
      ${scene(s)}${him(s)}${her(s)}${hearts(s)}</svg>`;
  };
})();
