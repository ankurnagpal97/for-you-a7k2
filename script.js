// ✏️ Edit the words here — everything else builds itself.
const STORY = [
  {
    age: 29, when: 'today', title: 'I got it wrong.',
    text: "Today I said something I shouldn't have. It wasn't fair, it wasn't true, and you didn't deserve to hear it. I'm truly, deeply sorry.",
  },
  {
    age: 35, when: 'our own little home', title: "I won't be perfect.",
    text: "I'd love to promise I'll never mess up again, but I'd be lying. I'll still get things wrong sometimes. What I can promise is that I'll always own it, and always come back to you first.",
  },
  {
    age: 45, when: 'the busy years', title: 'Still listening.',
    text: "Life will get loud: work, families, a hundred small worries. Even on the hardest days I'll keep listening, keep learning, and keep saying sorry when I'm wrong.",
  },
  {
    age: 65, when: 'slower walks', title: 'Still reaching for your hand.',
    text: "My hair will be grey and my jokes will be worse. I'll still reach for your hand on every walk, and I'll still be the first to say \"I'm sorry. I love you.\"",
  },
  {
    age: 80, when: 'still us', title: 'Different face. Same me.',
    text: "If I'm lucky enough to be 80 beside you, I'll still be learning how to love you better. The wrinkles will change. The way I feel about you won't.",
  },
];

const BACK_NOTES = [
  'turn the page, <span>my love</span>',
  'still sorry when I\'m wrong,<br><span>still yours</span>',
  'every year,<br>a little <span>better</span>',
  'every mistake,<br>an <span>honest sorry</span>',
  'every age,<br><span>you</span>',
  'one last page…',
];
const DOODLES = ['✉️', '🤍', '🌱', '🍂', '🌅', '💌'];

const book = document.getElementById('book');
const song = document.getElementById('song');
const musicBtn = document.getElementById('music');
const dotsEl = document.getElementById('dots');

// ---------- build pages ----------
const fronts = [];
fronts.push(`
  <div class="face front cover">
    <figure class="polaroid"><img src="assets/us.jpg" alt="Us, in the car"><figcaption>us ♡</figcaption></figure>
    <h1>A little book<br>of <em>us</em></h1>
    <div class="sub">for the person I hurt today,<br>and love every single day</div>
    <div class="tap">tap to open ♪</div>
  </div>`);

STORY.forEach((p, i) => {
  fronts.push(`
    <div class="face front">
      <div class="art">${window.coupleArt(i)}<div class="badge">${p.age}<small>YEARS</small></div></div>
      <div class="copy">
        <p class="when">at ${p.age} · ${p.when}</p>
        <h2>${p.title}</h2>
        <p>${p.text}</p>
        <div class="refrain"><span>still sorry · <b>still yours</b></span><span>${i + 1}</span></div>
      </div>
    </div>`);
});

fronts.push(`
  <div class="face front final" id="final">
    <figure class="polaroid"><img src="assets/us.jpg" alt="Us"><figcaption>29, 35, 45, 65, 80… ♡</figcaption></figure>
    <h2>I'm sorry for today.</h2>
    <p>I'll make mistakes at every age.<br>I'll be sorry, and yours, at every age too.</p>
    <div class="ask">Will you forgive me?</div>
    <div class="answers"><button id="yes">Yes ♡</button><button id="no">No</button></div>
    <div class="thanks">Thank you. I love you,<br>today and every page after. ♡</div>
  </div>`);

const N = fronts.length;
const pages = fronts.map((front, i) => {
  const el = document.createElement('div');
  el.className = 'page';
  const back = i < N - 1
    ? `<div class="face back"><div class="note">${BACK_NOTES[i] || ''}</div><div class="doodle">${DOODLES[i] || '♡'}</div></div>`
    : `<div class="face back"></div>`;
  el.innerHTML = front + back;
  el.style.zIndex = N - i;
  book.appendChild(el);
  return el;
});
for (let i = 0; i < N; i++) dotsEl.appendChild(document.createElement('i'));

// ---------- navigation ----------
let current = 0; // index of the page showing on the right
let busy = false;

function update() {
  book.classList.toggle('open', current > 0);
  document.getElementById('prev').disabled = current === 0;
  document.getElementById('next').disabled = current === N - 1;
  [...dotsEl.children].forEach((d, i) => d.classList.toggle('on', i === current));
}

function go(dir) {
  if (busy) return;
  const target = current + dir;
  if (target < 0 || target > N - 1) return;
  busy = true;
  const page = dir > 0 ? pages[current] : pages[current - 1];
  page.style.zIndex = N + 10;
  page.classList.toggle('flipped', dir > 0);
  current = target;
  if (current > 0) startMusic();
  update();
  setTimeout(() => {
    pages.forEach((p, i) => { p.style.zIndex = p.classList.contains('flipped') ? i + 1 : N - i; });
    busy = false;
  }, 1150);
}

pages.forEach((p, i) => p.addEventListener('click', e => {
  if (e.target.closest('button')) return;
  if (p.classList.contains('flipped')) go(-1);
  else if (i < N - 1) go(1);
}));
document.getElementById('next').onclick = () => go(1);
document.getElementById('prev').onclick = () => go(-1);
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
  if (e.key === 'ArrowLeft') go(-1);
});
let touchX = null;
book.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
book.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
});

// ---------- music ----------
const SONG_START = 43; // seconds: play from here to the end, then repeat from here
let musicOn = true, started = false, firstPlay = true;
song.addEventListener('ended', () => {
  song.currentTime = SONG_START;
  song.play().catch(() => {});
});
function fadeTo(vol, ms = 1500) {
  const from = song.volume, t0 = performance.now();
  (function step(t) {
    const k = Math.min(1, (t - t0) / ms);
    song.volume = from + (vol - from) * k;
    if (k < 1) requestAnimationFrame(step); else if (vol === 0) song.pause();
  })(t0);
}
function startMusic() {
  if (started || !musicOn) return;
  started = true;
  song.volume = 0;
  if (firstPlay) { song.currentTime = SONG_START; firstPlay = false; }
  song.play().then(() => fadeTo(.7)).catch(() => { started = false; });
}
musicBtn.onclick = () => {
  musicOn = !musicOn;
  musicBtn.classList.toggle('off', !musicOn);
  if (musicOn) { started = false; startMusic(); } else fadeTo(0, 500);
};

// ---------- the question ----------
const no = document.getElementById('no');
const yes = document.getElementById('yes');
const NO_LINES = ['No', 'Are you sure?', 'Pretty please?', 'I made tea ☕', 'One more chance?', '🥺'];
let dodges = 0;
function dodge(e) {
  e.preventDefault();
  dodges++;
  const box = no.parentElement.getBoundingClientRect();
  const finalBox = document.getElementById('final').getBoundingClientRect();
  no.style.position = 'absolute';
  const maxX = finalBox.width - no.offsetWidth - 20;
  const x = 10 + Math.random() * maxX - (box.left - finalBox.left);
  const y = -(Math.random() * (box.top - finalBox.top - 20));
  no.style.left = x + 'px';
  no.style.top = y + 'px';
  no.textContent = NO_LINES[Math.min(dodges, NO_LINES.length - 1)];
  yes.style.transform = `scale(${Math.min(1 + dodges * 0.12, 1.7)})`;
}
no.addEventListener('mouseenter', dodge);
no.addEventListener('touchstart', dodge, { passive: false });
no.addEventListener('click', dodge);

yes.addEventListener('click', () => {
  document.getElementById('final').classList.add('forgiven');
  burst(46);
  startMusic();
});

function burst(n) {
  const glyphs = ['❤', '♡', '❥', '💗', '💕'];
  for (let i = 0; i < n; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = glyphs[i % glyphs.length];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = 14 + Math.random() * 26 + 'px';
    h.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    h.style.setProperty('--rot', (Math.random() * 80 - 40) + 'deg');
    h.style.animationDuration = 3.5 + Math.random() * 3 + 's';
    h.style.animationDelay = Math.random() * 1.6 + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 9000);
  }
}

// deep link for previewing: index.html#3 opens straight to page 3
const start = parseInt(location.hash.slice(1), 10);
if (start > 0 && start < N) {
  pages.slice(0, start).forEach(p => { p.style.transition = 'none'; p.classList.add('flipped'); });
  current = start;
  pages.forEach((p, i) => { p.style.zIndex = p.classList.contains('flipped') ? i + 1 : N - i; });
  requestAnimationFrame(() => requestAnimationFrame(() => pages.forEach(p => { p.style.transition = ''; })));
}
update();
