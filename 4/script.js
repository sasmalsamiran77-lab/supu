const CONFIG = {
    oopsText: `This heart wasn't exactly on the order... but it's been on its way to you for a while now anyway. Consider it delivered, for keeps. 💗`,
    finalMessage: `Delivered with love, today and always.`,
    signOff: `— your favorite delivery partner 😉`
};

let herOrder = 'your order';
let audioCtx = null;
let soundEnabled = true;

/* ---------------- audio (tiny generated chimes, no external files) ---------------- */
function ensureAudio() {
    if (!soundEnabled) return null;
    try {
        if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            audioCtx = new AC();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    } catch (e) { return null; }
}

function chime(notes) {
    if (!soundEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    try {
        let t = ctx.currentTime;
        notes.forEach((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.13, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
            osc.connect(gain).connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.42);
            t += 0.15;
        });
    } catch (e) { }
}

const soundBtn = document.getElementById('soundToggle');
soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
    soundBtn.setAttribute('aria-label', soundEnabled ? 'Mute sound' : 'Unmute sound');
});

/* ---------------- scene control ---------------- */
function showScene(id) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function resetTracker() {
    ['step1', 'step2', 'step3'].forEach(id => document.getElementById(id).classList.remove('done'));
    document.getElementById('trackerLine1').classList.remove('fill');
    document.getElementById('trackerLine2').classList.remove('fill');
    document.getElementById('step1').classList.add('done');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function clearParticles() {
    document.getElementById('particles').innerHTML = '';
}

/* ---------------- particles ---------------- */
function spawnHeartParticles(count) {
    const container = document.getElementById('particles');
    const emojis = ['💗', '💕', '💖', '💓'];
    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.className = 'particle heart-particle';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const startX = Math.random() * 140 - 70;
        const drift = Math.random() * 100 - 50;
        const rot = Math.random() * 50 - 25;
        const delay = Math.random() * 0.5;
        const dur = 1.7 + Math.random() * 1.1;
        el.style.left = `calc(50% + ${startX}px)`;
        el.style.setProperty('--drift', drift + 'px');
        el.style.setProperty('--rot', rot + 'deg');
        el.style.animationDelay = delay + 's';
        el.style.animationDuration = dur + 's';
        el.style.fontSize = (14 + Math.random() * 12) + 'px';
        container.appendChild(el);
        setTimeout(() => el.remove(), (delay + dur + 0.3) * 1000);
    }
}

function spawnSparkles(count) {
    const container = document.getElementById('particles');
    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.className = 'particle sparkle';
        el.textContent = '✦';
        const x = Math.random() * 220 - 110;
        const y = Math.random() * 110 - 100;
        el.style.left = `calc(50% + ${x}px)`;
        el.style.bottom = `${150 + y}px`;
        el.style.animationDelay = (Math.random() * 1) + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 2400);
    }
}

function spawnConfetti(count) {
    const container = document.getElementById('particles');
    const colors = ['#FF4D6D', '#FFD166', '#8E7DD9', '#2EC4B6', '#FF8FAB'];
    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.className = 'particle confetti-piece';
        el.style.left = Math.random() * 100 + '%';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
        el.style.animationDelay = (Math.random() * 0.4) + 's';
        el.style.animationDuration = (1.5 + Math.random() * 0.9) + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
}

/* ---------------- delivery run (scooter) ---------------- */
function runDelivery(kind) {
    showScene('scene-delivery');
    resetTracker();
    const statusEl = document.getElementById('statusText');
    statusEl.textContent = kind === 'heart'
        ? 'Your delivery partner is on the way! 🛵'
        : "Redelivering your actual order... 😅";

    const scooter = document.getElementById('scooterWrap');
    scooter.classList.remove('drive');
    void scooter.offsetWidth; // force reflow so the reset is instant & invisible

    setTimeout(() => {
        scooter.classList.add('drive');
        document.getElementById('trackerLine1').classList.add('fill');
    }, 150);

    setTimeout(() => {
        document.getElementById('step2').classList.add('done');
        document.getElementById('trackerLine2').classList.add('fill');
    }, 1550);

    setTimeout(() => {
        document.getElementById('step3').classList.add('done');
    }, 2950);

    const onArrive = (e) => {
        if (e.target !== scooter || e.propertyName !== 'transform') return;
        scooter.removeEventListener('transitionend', onArrive);
        statusEl.textContent = 'Your delivery has arrived! 📦';
        setTimeout(() => kind === 'heart' ? unboxHeart() : unboxOrder(), 650);
    };
    scooter.addEventListener('transitionend', onArrive);
}

/* ---------------- unboxing: the heart (mistaken delivery) ---------------- */
function unboxHeart() {
    showScene('scene-unbox');
    const caption = document.getElementById('revealCaption');
    const sub = document.getElementById('revealSub');
    caption.innerHTML = `
    <div class="reveal-container">
        <img src="images/img1.jpeg" alt="Surprise" class="reveal-image">
    </div>
`;
    sub.textContent = '\u00A0';
    document.getElementById('finalActions').classList.add('hidden');

    const box = document.getElementById('box');
    const item = document.getElementById('revealItem');
    box.classList.remove('open');
    item.classList.remove('pop');
    item.innerHTML = `
      <div class="heart-wrap">
        <svg class="heart-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FF8FAB"/>
              <stop offset="100%" stop-color="#FF3B5C"/>
            </linearGradient>
          </defs>
          <path fill="url(#heartGrad)" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div class="love-tag">With Love</div>
      </div>`;
    void box.offsetWidth;
    clearParticles();

    setTimeout(() => {
        box.classList.add('open');
        chime([523.25, 659.25, 783.99]);
    }, 550);

    setTimeout(() => {
        item.classList.add('pop');
        spawnHeartParticles(9);
        spawnSparkles(7);
    }, 1150);

    setTimeout(showOops, 10000);
}

function showOops() {
    document.getElementById('oopsText').textContent = CONFIG.oopsText;
    document.getElementById('oopsOverlay').classList.remove('hidden');
    chime([392, 349.23]);
}

document.getElementById('realOrderBtn').addEventListener('click', () => {
    document.getElementById('oopsOverlay').classList.add('hidden');
    runDelivery('order');
});

/* ---------------- unboxing: her real order ---------------- */
function unboxOrder() {
    showScene('scene-unbox');
    const caption = document.getElementById('revealCaption');
    const sub = document.getElementById('revealSub');
    caption.textContent = "Here's your actual order!";
    sub.textContent = 'Sorry about that mix-up 🙈';
    document.getElementById('finalActions').classList.add('hidden');

    const box = document.getElementById('box');
    const item = document.getElementById('revealItem');
    box.classList.remove('open');
    item.classList.remove('pop');
    item.innerHTML = `
      <div class="order-wrap">
        <div class="order-emoji">🎁</div>
        <div class="order-name">${escapeHtml(herOrder)}</div>
      </div>`;
    void box.offsetWidth;
    clearParticles();

    setTimeout(() => {
        box.classList.add('open');
    }, 550);

    setTimeout(() => {
        item.classList.add('pop');
        spawnConfetti(40);
        chime([523.25, 659.25, 783.99, 1046.5]);
    }, 1150);

    setTimeout(() => {
        document.getElementById('finalMsg').textContent = CONFIG.finalMessage;
        document.getElementById('signOff').textContent = CONFIG.signOff;
        document.getElementById('finalActions').classList.remove('hidden');
    }, 2700);
}

/* ---------------- wiring ---------------- */
document.getElementById('startBtn').addEventListener('click', () => {
    const val = document.getElementById('orderInput').value.trim();
    herOrder = val.length ? val : 'your order';
    ensureAudio();
    runDelivery('heart');
});

document.getElementById('orderInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('startBtn').click();
});

