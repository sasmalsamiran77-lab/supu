/**
 * ============================================================================
 * A DIWALI NIGHT IN MY UNIVERSE ❤️
 * Master Interactive Controller & Animation Engine
 * ============================================================================
 */

/* ============================================================================
   1. EDITABLE ROMANTIC LETTER CONTENT
   You can easily edit your heartfelt message in this array!
   ============================================================================ */
const ROMANTIC_LETTER_PARAGRAPHS = [
  "My Love,",
  "This Diwali, I don't wish for a thousand lights, expensive gifts, or endless celebrations.",
  "I just wish to see you happy.",
  "You have brought a kind of brightness into my life that no festival, no fireworks, and no stars could ever match.",
  "Your smile is my favourite celebration. Your happiness is my favourite blessing.",
  "No matter how many Diwalis come and go, I hope I get to celebrate countless beautiful moments with you.",
  "You are not just a part of my world.",
  "You ARE my world.",
  "Happy Diwali, My Love. ❤️",
  "Forever Yours."
];

/* ============================================================================
   2. AESTHETIC DIWALI PHOTO REVEAL DATA
   Replaceable local image paths and romantic lines for each scene.
   ============================================================================ */
const PHOTO_REVEAL_ITEMS = [
  {
    src: "assets/images/her1.png",
    quote: "Some lights are beautiful...",
    subline: "A gentle glow in our quiet night sky."
  },
  {
    src: "assets/images/her2.png",
    quote: "But yours is my favourite.",
    subline: "The one light that illuminates my entire universe."
  },
  {
    src: "assets/images/her3.png",
    quote: "Even a thousand diyas cannot compete with your smile.",
    subline: "Pure warmth and radiance that outshines every festival."
  },
  {
    src: "assets/images/her4.png",
    quote: "Tonight, the celebration has a face. ❤️",
    subline: "Every sparkle in the sky whispers how rare you are."
  },
  {
    src: "assets/images/her5.png",
    quote: "Among billions of stars, you are my universe.",
    subline: "Where all my silent wishes and prayers found their home."
  },
  {
    src: "assets/images/her6.png",
    quote: "My greatest blessing, today and forever.",
    subline: "Every Diwali is magical because I have you."
  }
];

/* ============================================================================
   3. GLOBAL STATE & SELECTORS
   ============================================================================ */
const state = {
  isSurpriseOpened: false,
  isLetterOpened: false,
  isLetterTyped: false,
  activeRevealIndex: 0,
  isRevealPlaying: true,
  revealDuration: 6500,
  revealStartTime: 0,
  revealTimer: null,
  revealProgressInterval: null,
  activeLightboxIndex: 0,
  musicPlaying: false,
  webAudioActive: false,
  fireworksAutoTrigger: false,
  lanternsInterval: null,
  autoScrollTimer: null
};

// DOM Elements
const openingScene = document.getElementById('opening-scene');
const openSurpriseBtn = document.getElementById('openSurpriseBtn');
const mainExperience = document.getElementById('main-experience');
const exploreUniverseBtn = document.getElementById('exploreUniverseBtn');
const openingStep1 = document.getElementById('openingStep1');
const openingStep2 = document.getElementById('openingStep2');
const openingStep3 = document.getElementById('openingStep3');
const openingAction = document.getElementById('openingAction');

const bgMusic = document.getElementById('bgMusic');
const audioControl = document.getElementById('audio-control');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');

const envelopeWrapper = document.getElementById('envelopeWrapper');
const letterContentTarget = document.getElementById('letterContentTarget');

const burstFireworksBtn = document.getElementById('burstFireworksBtn');
const releaseLanternBtn = document.getElementById('releaseLanternBtn');
const lightAllDiyasBtn = document.getElementById('lightAllDiyasBtn');
const skyLanternsLayer = document.getElementById('sky-lanterns-layer');
const sparkleContainer = document.getElementById('sparkle-container');

const tellMeBtn = document.getElementById('tellMeBtn');
const surpriseAnswerBox = document.getElementById('surpriseAnswerBox');
const experienceAgainBtn = document.getElementById('experienceAgainBtn');

// Photo Reveal Stage Elements
const revealCurrentImg = document.getElementById('revealCurrentImg');
const revealPhotoFrame = document.getElementById('revealPhotoFrame');
const lightSweepOverlay = document.getElementById('lightSweepOverlay');
const revealInitiatorDiya = document.getElementById('revealInitiatorDiya');
const revealRomanticLine = document.getElementById('revealRomanticLine');
const revealRomanticSubline = document.getElementById('revealRomanticSubline');
const revealTimelineBar = document.getElementById('revealTimelineBar');
const revealPlayPauseBtn = document.getElementById('revealPlayPauseBtn');
const revealPlayIcon = document.getElementById('revealPlayIcon');
const revealDiyaSteppers = document.getElementById('revealDiyaSteppers');

// Lightbox Elements
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn = document.getElementById('lightboxNextBtn');

// Navigation Elements
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

/* ============================================================================
   4. CELESTIAL BACKGROUND & FIREWORKS ENGINE (CANVAS API)
   ============================================================================ */
class CelestialCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.fireworks = [];
    this.sparks = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.colorPalettes = [
      ['#ff4d79', '#ff9900', '#ffd700', '#ffffff'], // Romantic gold & rose
      ['#f6c445', '#ffbe3b', '#fff2c6', '#ff7b00'], // Deep amber Diwali
      ['#c77dff', '#e0aaff', '#ffd166', '#ffffff'], // Royal purple galaxy
      ['#ff5964', '#fec601', '#ff9f1c', '#ffffff']  // Festive glow
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    this.createStars(Math.min(160, Math.floor((this.width * this.height) / 7000)));
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createStars(count) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }

  addFirework(startX, startY, targetX, targetY) {
    this.fireworks.push(new Rocket(startX, startY, targetX, targetY, () => {
      this.explode(targetX, targetY);
    }));
  }

  explode(x, y) {
    const palette = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
    const count = Math.floor(Math.random() * 40) + 70;
    for (let i = 0; i < count; i++) {
      this.sparks.push(new Spark(x, y, palette));
    }
  }

  loop(timestamp) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Twinkling Stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const brightness = Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
      this.ctx.fillStyle = `rgba(255, 248, 220, ${star.alpha * brightness})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Update & Draw Rockets
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.update();
      fw.draw(this.ctx);
      if (fw.done) {
        this.fireworks.splice(i, 1);
      }
    }

    // Update & Draw Explosion Sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const sp = this.sparks[i];
      sp.update();
      sp.draw(this.ctx);
      if (sp.alpha <= 0) {
        this.sparks.splice(i, 1);
      }
    }

    requestAnimationFrame(this.loop);
  }
}

class Rocket {
  constructor(startX, startY, targetX, targetY, onExplode) {
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.onExplode = onExplode;
    this.speed = 12;
    this.angle = Math.atan2(targetY - startY, targetX - startX);
    this.distanceToTarget = Math.hypot(targetX - startX, targetY - startY);
    this.distanceTraveled = 0;
    this.trail = [];
    this.done = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 5) this.trail.shift();

    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.x += vx;
    this.y += vy;
    this.distanceTraveled += Math.hypot(vx, vy);

    if (this.distanceTraveled >= this.distanceToTarget) {
      this.done = true;
      if (this.onExplode) this.onExplode();
    }
  }

  draw(ctx) {
    ctx.strokeStyle = 'rgba(255, 215, 120, 0.8)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    if (this.trail.length > 0) {
      ctx.lineTo(this.trail[0].x, this.trail[0].y);
    }
    ctx.stroke();
  }
}

class Spark {
  constructor(x, y, palette) {
    this.x = x;
    this.y = y;
    this.color = palette[Math.floor(Math.random() * palette.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6.5 + 1.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = 0.07;
    this.friction = 0.96;
    this.alpha = 1;
    this.decay = Math.random() * 0.016 + 0.012;
    this.size = Math.random() * 2.8 + 1.2;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Instantiate canvas system
const celestialSky = new CelestialCanvas('skyCanvas');

/* ============================================================================
   5. MUSIC ENGINE & LUSH WEB AUDIO SYNTHESIZER FALLBACK
   ============================================================================ */
let audioCtx = null;
let synthInterval = null;

function initWebAudioSynth() {
  if (state.webAudioActive) {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return;
  }
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Romantic ambient acoustic chord progression: Cmaj9 -> Am9 -> Fmaj7 -> G7sus4
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // C, E, G, B
      [220.00, 261.63, 329.63, 392.00], // A, C, E, G
      [174.61, 261.63, 329.63, 349.23], // F, C, E, F
      [196.00, 261.63, 293.66, 392.00]  // G, C, D, G
    ];

    let chordIdx = 0;

    function playChord() {
      if (!state.musicPlaying || !audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);

        // Warm romantic attack and singing decay
        const startTime = audioCtx.currentTime + i * 0.18;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 4.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 4.3);
      });
    }

    playChord();
    synthInterval = setInterval(playChord, 3800);
    state.webAudioActive = true;
  } catch (err) {
    console.warn('Web Audio Ambient Synthesizer could not initialize:', err);
  }
}

function startMusic() {
  state.musicPlaying = true;
  musicToggleBtn.classList.add('music-playing');
  musicToggleBtn.setAttribute('title', 'Music is playing (click to mute)');
  musicIcon.className = "fa-solid fa-volume-high music-icon";

  // Ensure AudioContext is primed on user interaction
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Try playing the real audio file first
  if (bgMusic) {
    bgMusic.volume = 0.85;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Confirm it's actually making sound / progressing
        setTimeout(() => {
          if (bgMusic.paused || bgMusic.currentTime === 0) {
            initWebAudioSynth();
          }
        }, 600);
      }).catch((err) => {
        console.warn('Audio element play failed, using Web Audio Synthesizer:', err);
        initWebAudioSynth();
      });
    } else {
      initWebAudioSynth();
    }
  } else {
    initWebAudioSynth();
  }
}

function stopMusic() {
  state.musicPlaying = false;
  musicToggleBtn.classList.remove('music-playing');
  musicToggleBtn.setAttribute('title', 'Music is muted (click to play)');
  musicIcon.className = "fa-solid fa-volume-xmark music-icon";

  if (bgMusic) {
    bgMusic.pause();
  }
  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend();
  }
}

function toggleMusic() {
  if (state.musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
}

/* ============================================================================
   6. OPENING EXPERIENCE (THE SURPRISE FLOW)
   ============================================================================ */
function startOpeningSequence() {
  // Staggered reveals
  setTimeout(() => {
    openingStep1.classList.add('revealed');
  }, 600);

  setTimeout(() => {
    openingStep2.classList.add('revealed');
  }, 2200);

  setTimeout(() => {
    openingStep3.classList.add('revealed');
  }, 3800);

  setTimeout(() => {
    openingAction.classList.add('revealed');
  }, 5000);
}

function handleOpenSurprise() {
  if (state.isSurpriseOpened) return;
  state.isSurpriseOpened = true;

  // 1. Fireworks Celebration Blast
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.35;
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const offsetX = (Math.random() - 0.5) * 400;
      const offsetY = (Math.random() - 0.5) * 200;
      celestialSky.addFirework(cx + offsetX * 0.3, window.innerHeight, cx + offsetX, cy + offsetY);
    }, i * 220);
  }

  // 2. Play Background Music
  startMusic();

  // 3. Smooth transition to main experience
  openingScene.classList.add('opening-scene-exiting');

  setTimeout(() => {
    mainExperience.classList.remove('main-experience-hidden');
    mainExperience.classList.add('main-experience-visible');
    audioControl.classList.remove('audio-control-hidden');
    
    // Smooth scroll to hero section
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Start auto gentle fireworks in background
    startPeriodicFireworks();

    // After letting her absorb the Happy Diwali hero section for ~4.5 seconds,
    // automatically and smoothly glide down to the Photo Reveal section and begin autoplaying
    clearTimeout(state.autoScrollTimer);
    state.autoScrollTimer = setTimeout(() => {
      if (window.scrollY < 350) {
        const photoSection = document.getElementById('photo-reveal');
        if (photoSection) {
          photoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // Ensure photo reveal is actively autoplaying through her photos
      state.isRevealPlaying = true;
      if (revealPlayIcon) revealPlayIcon.className = 'fa-solid fa-pause';
      if (revealPlayPauseBtn) revealPlayPauseBtn.setAttribute('aria-label', 'Pause slideshow');
      showPhotoReveal(0);
      startRevealAutoplay();
    }, 4500);
  }, 900);
}

function startPeriodicFireworks() {
  if (state.fireworksAutoTrigger) return;
  state.fireworksAutoTrigger = true;

  setInterval(() => {
    if (!document.hidden && state.isSurpriseOpened) {
      const startX = Math.random() * window.innerWidth;
      const targetX = Math.random() * (window.innerWidth - 200) + 100;
      const targetY = Math.random() * (window.innerHeight * 0.45) + 80;
      celestialSky.addFirework(startX, window.innerHeight, targetX, targetY);
    }
  }, 4500);
}

/* ============================================================================
   7. AESTHETIC DIWALI PHOTO REVEAL THEATER & LIGHTBOX
   ============================================================================ */
function initPhotoReveal() {
  buildDiyaSteppers();

  // Play/Pause Listener
  if (revealPlayPauseBtn) {
    revealPlayPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleRevealAutoplay();
    });
  }

  // Center Photo click opens fullscreen Lightbox
  revealPhotoFrame.addEventListener('click', () => {
    openLightbox(state.activeRevealIndex);
  });

  revealPhotoFrame.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(state.activeRevealIndex);
    }
  });

  // Explore Button manual click handler
  if (exploreUniverseBtn) {
    exploreUniverseBtn.addEventListener('click', () => {
      clearTimeout(state.autoScrollTimer);
      state.isRevealPlaying = true;
      if (revealPlayIcon) revealPlayIcon.className = 'fa-solid fa-pause';
      if (revealPlayPauseBtn) revealPlayPauseBtn.setAttribute('aria-label', 'Pause slideshow');
      showPhotoReveal(0);
      startRevealAutoplay();
    });
  }

  // Touch Swipe for mobile stage
  let touchStartX = 0;
  let touchEndX = 0;

  revealPhotoFrame.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  revealPhotoFrame.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      navigatePhotoReveal(1);
    } else if (touchEndX - touchStartX > 45) {
      navigatePhotoReveal(-1);
    }
  }, { passive: true });

  // Handle Missing Image Fallback on main centerpiece
  revealCurrentImg.addEventListener('error', function() {
    this.onerror = null;
    this.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23120722'/%3E%3Ccircle cx='400' cy='450' r='180' fill='%23ff9e2c' opacity='0.2'/%3E%3Ccircle cx='400' cy='450' r='90' fill='%23ffd700' opacity='0.35'/%3E%3Ctext x='400' y='460' font-family='serif' font-size='42' fill='%23f6c445' text-anchor='middle'%3E🪔%3C/text%3E%3Ctext x='400' y='530' font-family='serif' font-size='28' fill='%23fff' text-anchor='middle'%3EMy Beautiful Universe%3C/text%3E%3Ctext x='400' y='580' font-family='sans-serif' font-size='18' fill='%23f6c445' text-anchor='middle'%3EPlace her picture at " + PHOTO_REVEAL_ITEMS[state.activeRevealIndex].src + "%3C/text%3E%3C/svg%3E";
  });

  // Show First Photo
  showPhotoReveal(0);
}

function buildDiyaSteppers() {
  revealDiyaSteppers.innerHTML = '';
  PHOTO_REVEAL_ITEMS.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = `diya-step-btn ${idx === 0 ? 'active' : ''}`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Reveal photo ${idx + 1}`);
    btn.innerHTML = `
      <div class="step-flame"></div>
      <div class="step-diya-body"></div>
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhotoReveal(idx, true);
    });
    revealDiyaSteppers.appendChild(btn);
  });
}

function showPhotoReveal(index, manualTrigger = false) {
  // Seamless continuous loop across all photographs
  if (index >= PHOTO_REVEAL_ITEMS.length) {
    index = 0;
  }
  if (index < 0) {
    index = PHOTO_REVEAL_ITEMS.length - 1;
  }

  state.activeRevealIndex = index;
  const item = PHOTO_REVEAL_ITEMS[index];

  // 1. Trigger Diya Ignition Burst
  revealInitiatorDiya.classList.add('igniting');
  setTimeout(() => {
    revealInitiatorDiya.classList.remove('igniting');
  }, 600);

  // 2. Trigger Light Sweep Animation
  lightSweepOverlay.classList.remove('sweeping');
  void lightSweepOverlay.offsetWidth;
  lightSweepOverlay.classList.add('sweeping');

  // 3. Stardust particles around the frame
  triggerStardustBurstAround(revealPhotoFrame);

  // 4. Update and animate the centerpiece photograph
  revealCurrentImg.style.opacity = '0';
  setTimeout(() => {
    revealCurrentImg.src = item.src;
    revealCurrentImg.alt = item.quote;
    // Re-trigger Ken Burns animation
    revealCurrentImg.style.animation = 'none';
    void revealCurrentImg.offsetWidth;
    revealCurrentImg.style.animation = 'cinematicKenBurns 7s ease-out forwards';
    revealCurrentImg.style.opacity = '1';
  }, 150);

  // 5. Update Poetic Line Reveal Banner
  revealRomanticLine.style.opacity = '0';
  revealRomanticLine.style.transform = 'translateY(8px)';
  revealRomanticSubline.style.opacity = '0';
  revealRomanticSubline.style.transform = 'translateY(8px)';

  setTimeout(() => {
    revealRomanticLine.textContent = `"${item.quote}"`;
    revealRomanticSubline.textContent = item.subline;
    revealRomanticLine.style.opacity = '1';
    revealRomanticLine.style.transform = 'translateY(0)';
    revealRomanticSubline.style.opacity = '1';
    revealRomanticSubline.style.transform = 'translateY(0)';
  }, 250);

  // 6. Update Stepper Diyas
  const stepperBtns = revealDiyaSteppers.querySelectorAll('.diya-step-btn');
  stepperBtns.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  // 7. Restart Timeline Progress & Schedule next slide
  if (state.isRevealPlaying) {
    startRevealAutoplay();
  } else {
    revealTimelineBar.style.width = '0%';
  }
}

function navigatePhotoReveal(direction) {
  const nextIndex = (state.activeRevealIndex + direction + PHOTO_REVEAL_ITEMS.length) % PHOTO_REVEAL_ITEMS.length;
  showPhotoReveal(nextIndex, true);
}

function startRevealAutoplay() {
  clearTimeout(state.revealTimer);
  clearInterval(state.revealProgressInterval);

  state.revealStartTime = Date.now();
  revealTimelineBar.style.width = '0%';

  // Smooth progress bar update
  state.revealProgressInterval = setInterval(() => {
    if (!state.isRevealPlaying) return;
    const elapsed = Date.now() - state.revealStartTime;
    const progress = Math.min(100, (elapsed / state.revealDuration) * 100);
    revealTimelineBar.style.width = `${progress}%`;
  }, 50);

  state.revealTimer = setTimeout(() => {
    if (state.isRevealPlaying) {
      const nextIdx = (state.activeRevealIndex + 1) % PHOTO_REVEAL_ITEMS.length;
      showPhotoReveal(nextIdx);
    }
  }, state.revealDuration);
}

function pauseRevealAutoplay() {
  clearTimeout(state.revealTimer);
  clearInterval(state.revealProgressInterval);
  revealTimelineBar.style.width = '0%';
}

function toggleRevealAutoplay() {
  state.isRevealPlaying = !state.isRevealPlaying;
  if (state.isRevealPlaying) {
    revealPlayIcon.className = 'fa-solid fa-pause';
    revealPlayPauseBtn.setAttribute('aria-label', 'Pause slideshow');
    startRevealAutoplay();
  } else {
    revealPlayIcon.className = 'fa-solid fa-play';
    revealPlayPauseBtn.setAttribute('aria-label', 'Play slideshow');
    pauseRevealAutoplay();
  }
}

function triggerStardustBurstAround(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement('span');
    sparkle.textContent = ['✨', '✧', '✦', '⭐', '🪔'][Math.floor(Math.random() * 5)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${centerX}px`;
    sparkle.style.top = `${centerY}px`;
    sparkle.style.fontSize = `${Math.random() * 12 + 14}px`;
    sparkle.style.color = '#f6c445';
    sparkle.style.textShadow = '0 0 10px #ffd700';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.transition = 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
    sparkle.style.transform = 'translate(-50%, -50%) scale(0.4)';
    sparkle.style.opacity = '1';

    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 / 12) * i;
    const distance = Math.random() * 120 + 80;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1.1)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 1150);
  }
}

/* ============================================================================
   LIGHTBOX FOR REVEALED PHOTOGRAPHS
   ============================================================================ */
function openLightbox(index) {
  state.activeLightboxIndex = index;
  updateLightboxContent();
  lightboxModal.classList.add('active');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const item = PHOTO_REVEAL_ITEMS[state.activeLightboxIndex];
  if (!item) return;

  lightboxImg.src = item.src;
  lightboxImg.alt = item.quote;
  lightboxTitle.textContent = `"${item.quote}"`;
  lightboxDesc.textContent = item.subline;
  lightboxCounter.textContent = `Diwali Reveal ${state.activeLightboxIndex + 1} of ${PHOTO_REVEAL_ITEMS.length}`;

  // Image load fallback in lightbox
  lightboxImg.onerror = function() {
    this.onerror = null;
    this.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23120722'/%3E%3Ccircle cx='400' cy='450' r='180' fill='%23ff9e2c' opacity='0.2'/%3E%3Ccircle cx='400' cy='450' r='90' fill='%23ffd700' opacity='0.35'/%3E%3Ctext x='400' y='460' font-family='serif' font-size='42' fill='%23f6c445' text-anchor='middle'%3E🪔%3C/text%3E%3Ctext x='400' y='530' font-family='serif' font-size='28' fill='%23fff' text-anchor='middle'%3EMy Beautiful Universe%3C/text%3E%3Ctext x='400' y='580' font-family='sans-serif' font-size='18' fill='%23f6c445' text-anchor='middle'%3EPlace her picture at " + item.src + "%3C/text%3E%3C/svg%3E";
  };
}

function showNextLightboxImage() {
  state.activeLightboxIndex = (state.activeLightboxIndex + 1) % PHOTO_REVEAL_ITEMS.length;
  updateLightboxContent();
}

function showPrevLightboxImage() {
  state.activeLightboxIndex = (state.activeLightboxIndex - 1 + PHOTO_REVEAL_ITEMS.length) % PHOTO_REVEAL_ITEMS.length;
  updateLightboxContent();
}

/* ============================================================================
   8. INTERACTIVE ROMANTIC LETTER & 3D ENVELOPE
   ============================================================================ */
function initLetter() {
  envelopeWrapper.addEventListener('click', toggleEnvelope);
  envelopeWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleEnvelope();
    }
  });
}

function toggleEnvelope() {
  if (envelopeWrapper.classList.contains('open')) {
    envelopeWrapper.classList.remove('open');
    envelopeWrapper.setAttribute('aria-expanded', 'false');
  } else {
    envelopeWrapper.classList.add('open');
    envelopeWrapper.setAttribute('aria-expanded', 'true');
    
    // Trigger little heart burst
    triggerHeartBurstAround(envelopeWrapper);

    if (!state.isLetterTyped) {
      renderLetterContent();
      state.isLetterTyped = true;
    }
  }
}

function renderLetterContent() {
  letterContentTarget.innerHTML = '';

  ROMANTIC_LETTER_PARAGRAPHS.forEach((para, index) => {
    const p = document.createElement('p');
    
    if (index === 0) {
      p.className = 'letter-salutation';
    } else if (para.includes('You ARE my world.')) {
      p.className = 'letter-highlight';
    }

    p.textContent = para;
    p.style.opacity = '0';
    p.style.transform = 'translateY(10px)';
    p.style.transition = `opacity 0.6s ease ${index * 0.18}s, transform 0.6s ease ${index * 0.18}s`;
    
    letterContentTarget.appendChild(p);

    setTimeout(() => {
      p.style.opacity = '1';
      p.style.transform = 'translateY(0)';
    }, 100);
  });
}

function triggerHeartBurstAround(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height * 0.4;

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('span');
    heart.textContent = ['❤️', '✨', '💖', '🪔'][Math.floor(Math.random() * 4)];
    heart.style.position = 'fixed';
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.fontSize = `${Math.random() * 14 + 16}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '99999';
    heart.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    heart.style.transform = 'translate(-50%, -50%) scale(0.5)';
    heart.style.opacity = '1';

    document.body.appendChild(heart);

    const angle = (Math.PI * 2 / 8) * i;
    const distance = Math.random() * 90 + 50;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      heart.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1.2)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1300);
  }
}

/* ============================================================================
   9. CELEBRATION SECTION INTERACTIONS & SKY LANTERNS
   ============================================================================ */
function initCelebrationControls() {
  // Burst Multiple Fireworks
  burstFireworksBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const startX = Math.random() * window.innerWidth;
        const targetX = Math.random() * (window.innerWidth - 100) + 50;
        const targetY = Math.random() * (window.innerHeight * 0.5) + 60;
        celestialSky.addFirework(startX, window.innerHeight, targetX, targetY);
      }, i * 180);
    }
  });

  // Release Sky Lantern
  releaseLanternBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    spawnSkyLantern();
    spawnSkyLantern();
  });

  // Light All Diyas
  lightAllDiyasBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const altarDiyas = document.querySelectorAll('.altar-diya');
    altarDiyas.forEach((diya, i) => {
      setTimeout(() => {
        diya.classList.add('active');
        triggerHeartBurstAround(diya);
      }, i * 150);
    });
  });

  // Tap anywhere on celebration arena to trigger custom fireworks
  const celebrationSection = document.getElementById('celebration');
  celebrationSection.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    const rect = celebrationSection.getBoundingClientRect();
    const targetX = e.clientX;
    const targetY = e.clientY;
    celestialSky.addFirework(targetX + (Math.random() - 0.5) * 80, window.innerHeight, targetX, targetY);
  });
}

function spawnSkyLantern() {
  const lantern = document.createElement('div');
  lantern.className = 'floating-lantern';

  const randomLeft = Math.random() * 85 + 5; // 5% to 90%
  const randomDuration = Math.random() * 8 + 10; // 10s to 18s
  const randomDrift = (Math.random() - 0.5) * 120; // drift x in px

  lantern.style.left = `${randomLeft}%`;
  lantern.style.animationDuration = `${randomDuration}s`;
  lantern.style.setProperty('--drift-x', `${randomDrift}px`);

  skyLanternsLayer.appendChild(lantern);

  setTimeout(() => {
    lantern.remove();
  }, randomDuration * 1000);
}

/* ============================================================================
   10. INTERACTIVE STARDUST CURSOR SPARKLES
   ============================================================================ */
let lastSparkleTime = 0;

function initCursorSparkles() {
  window.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime < 50) return; // Throttle 20fps for silky smooth performance
    lastSparkleTime = now;

    createSparkle(e.clientX, e.clientY);
  }, { passive: true });
}

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'cursor-sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  const dx = (Math.random() - 0.5) * 25;
  const dy = Math.random() * 25 + 10;
  sparkle.style.setProperty('--dx', `${dx}px`);
  sparkle.style.setProperty('--dy', `${dy}px`);

  sparkleContainer.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 750);
}

/* ============================================================================
   11. ROMANTIC QUESTION & ANSWER REVEAL
   ============================================================================ */
function initRomanticSurpriseQuestion() {
  tellMeBtn.addEventListener('click', () => {
    tellMeBtn.style.display = 'none';
    surpriseAnswerBox.classList.add('revealed');
    surpriseAnswerBox.setAttribute('aria-hidden', 'false');

    // Launch celebratory fireworks
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.4;
    celestialSky.addFirework(cx, window.innerHeight, cx, cy);
    setTimeout(() => {
      celestialSky.addFirework(cx - 150, window.innerHeight, cx - 150, cy - 50);
      celestialSky.addFirework(cx + 150, window.innerHeight, cx + 150, cy - 50);
    }, 250);

    triggerHeartBurstAround(surpriseAnswerBox);
  });
}

/* ============================================================================
   12. EXPERIENCE AGAIN (REPLAY SURPRISE)
   ============================================================================ */
function initExperienceAgain() {
  experienceAgainBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    clearTimeout(state.autoScrollTimer);

    setTimeout(() => {
      state.isSurpriseOpened = false;
      mainExperience.classList.remove('main-experience-visible');
      mainExperience.classList.add('main-experience-hidden');
      audioControl.classList.add('audio-control-hidden');
      openingScene.classList.remove('opening-scene-exiting');

      // Reset question box
      tellMeBtn.style.display = 'inline-flex';
      surpriseAnswerBox.classList.remove('revealed');
      surpriseAnswerBox.setAttribute('aria-hidden', 'true');

      // Reset letter
      envelopeWrapper.classList.remove('open');
      state.isLetterTyped = false;

      // Reset photo reveal stage
      showPhotoReveal(0);
      startRevealAutoplay();
    }, 600);
  });
}

/* ============================================================================
   13. SCROLL REVEALS & NAVIGATION CONTROLS
   ============================================================================ */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

function initNavigation() {
  // Mobile drawer toggle
  mobileNavToggle.addEventListener('click', () => {
    const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
    mobileDrawer.classList.toggle('active');
  });

  // Close drawer on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Highlight active nav item on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((sec) => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 150;
      const secId = sec.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${secId}"]`);

      if (scrollY > secTop && scrollY <= secTop + secHeight) {
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ============================================================================
   14. GLOBAL KEYBOARD & LIGHTBOX LISTENERS
   ============================================================================ */
function initGlobalListeners() {
  // Lightbox Close & Navigation
  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxNextBtn.addEventListener('click', showNextLightboxImage);
  lightboxPrevBtn.addEventListener('click', showPrevLightboxImage);

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextLightboxImage();
    if (e.key === 'ArrowLeft') showPrevLightboxImage();
  });

  // Touch Swipe for Lightbox on Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      showNextLightboxImage();
    } else if (touchEndX - touchStartX > 50) {
      showPrevLightboxImage();
    }
  }, { passive: true });
}

/* ============================================================================
   15. INITIALIZATION DISPATCHER
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  startOpeningSequence();
  initPhotoReveal();
  initLetter();
  initCelebrationControls();
  initCursorSparkles();
  initRomanticSurpriseQuestion();
  initExperienceAgain();
  initScrollObserver();
  initNavigation();
  initGlobalListeners();

  openSurpriseBtn.addEventListener('click', handleOpenSurprise);
  musicToggleBtn.addEventListener('click', toggleMusic);

  // Periodically release subtle background sky lanterns
  setInterval(() => {
    if (!document.hidden && state.isSurpriseOpened) {
      spawnSkyLantern();
    }
  }, 7000);
});
