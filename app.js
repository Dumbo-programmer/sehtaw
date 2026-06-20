Splitting();

const audio = document.getElementById('bg-audio');

// --- Background deco animations ---

gsap.to('.flower', {
  y: -30,
  rotation: 'random(-22, 22)',
  duration: 'random(4, 6.5)',
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
  stagger: 0.4
});

gsap.to('.heart', {
  y: -48,
  opacity: 0.12,
  duration: 'random(4.5, 6.5)',
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
  stagger: 0.6
});

gsap.to('.sparkle', {
  scale: 'random(0.5, 1.8)',
  opacity: 'random(0.15, 1)',
  duration: 'random(2, 4.5)',
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  stagger: 0.25
});

gsap.to('.scribble', {
  rotation: 'random(-5, 5)',
  opacity: 'random(0.25, 0.5)',
  duration: 'random(3.5, 5.5)',
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
  stagger: 0.3
});

gsap.to('.bunny', {
  y: -10,
  rotation: 'random(-6, 6)',
  duration: 'random(1.5, 2.5)',
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
  stagger: 0.4
});

gsap.to('.seal', {
  rotation: 'random(-10, 10)',
  scale: 'random(0.85, 1.1)',
  duration: 'random(2, 3.5)',
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
  stagger: 0.5
});

gsap.to('.cloud', {
  x: 'random(-35, 35)',
  y: 'random(-15, 15)',
  opacity: 'random(0.15, 0.35)',
  duration: 'random(6, 10)',
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
  stagger: 0.8
});

gsap.to('.moon', {
  y: -12,
  rotation: 'random(-3, 3)',
  duration: 'random(4, 6)',
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut'
});

// --- Position heart ring in a circle ---

const HEART_RADIUS = 420;
const ringHearts = document.querySelectorAll('.ring-heart');
ringHearts.forEach((heart, i) => {
  const angle = (i / ringHearts.length) * 360;
  const rad = (angle * Math.PI) / 180;
  gsap.set(heart, {
    x: Math.cos(rad) * HEART_RADIUS,
    y: Math.sin(rad) * HEART_RADIUS,
    rotation: 0
  });
});

// --- Flower arrangement ---

const PETAL_R = 330;
const DECO_R = 160;

const FLOWER = [
  { sel: '.img-1', angle: 36,  radius: DECO_R, type: 'deco' },
  { sel: '.img-2', angle: 0,   radius: PETAL_R, type: 'petal' },
  { sel: '.img-3', angle: 72,  radius: PETAL_R, type: 'petal' },
  { sel: '.img-4', angle: 144, radius: PETAL_R, type: 'petal' },
  { sel: '.img-5', angle: 216, radius: PETAL_R, type: 'petal' },
  { sel: '.img-6', angle: 288, radius: PETAL_R, type: 'petal' },
  { sel: '.img-7', angle: 180, radius: DECO_R, type: 'deco' },
];

const flowerPositions = {};
FLOWER.forEach(({ sel, angle, radius }) => {
  const rad = (angle * Math.PI) / 180;
  flowerPositions[sel] = {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
});

gsap.set('.orbit-img', { x: 0, y: 0, opacity: 0 });

// --- MAIN TIMELINE ---

const tl = gsap.timeline({ paused: true });

// ==========================================
// PHASE 1: INTRO (0s – 7s)
// ==========================================

tl.fromTo('.img-1', {
  opacity: 0, scale: 0, rotation: -18, filter: 'blur(0px)'
}, {
  opacity: 1, scale: 1, rotation: -2, filter: 'blur(0px)',
  duration: 2.8,
  ease: 'elastic.out(1, 0.45)'
}, 0);

tl.to('.img-1', {
  y: -8, rotation: -1,
  duration: 3,
  ease: 'sine.inOut',
  yoyo: true, repeat: 1
}, 3);

tl.fromTo('.sticker', {
  opacity: 0, scale: 0, rotation: -40
}, {
  opacity: 1, scale: 1, rotation: 0,
  duration: 1,
  ease: 'back.out(2.5)',
  stagger: 0.15
}, 2);

tl.to('.sticker', {
  rotation: 'random(-10, 10)',
  duration: 2,
  yoyo: true, repeat: 1,
  ease: 'sine.inOut'
}, 4);

// Intro squish exit
tl.to('.img-1', {
  scaleX: 0, scaleY: 0.4, rotation: 25, opacity: 0,
  duration: 1,
  ease: 'power3.in'
}, 6);

tl.to('.sticker', {
  opacity: 0, scale: 0.3,
  duration: 0.5,
  stagger: 0.05,
  ease: 'power2.in'
}, 6.3);

// ==========================================
// PHASE 2: FLOWER ORBIT (6.5s – 23.5s)
// ==========================================

// Pre-position into flower shape (overlaps with end of intro exit)
FLOWER.forEach(({ sel }) => {
  const pos = flowerPositions[sel];
  tl.set(sel, { x: pos.x, y: pos.y, rotation: 0 }, 6.5);
});

// Petals bloom — staggered unfurl
tl.to('.petal', {
  opacity: 1, scale: 1,
  duration: 1.2,
  ease: 'back.out(1.8)',
  stagger: 0.12
}, 7);

// Decorations bloom softly
tl.fromTo('.decoration', {
  opacity: 0, scale: 1, filter: 'blur(0px)'
}, {
  opacity: 0.5, scale: 0.7, filter: 'blur(6px)',
  duration: 1.5,
  ease: 'power3.out'
}, 7);

// Flower rotation — sine.inOut gives slow start & end
tl.to('.orbit-container', {
  rotation: 360,
  duration: 11.5,
  ease: 'sine.inOut'
}, 8.5);

tl.to('.orbit-img', {
  rotation: -360,
  duration: 11.5,
  ease: 'sine.inOut'
}, 8.5);

// Petals drift away — starts as rotation winds down
tl.to('.img-2', {
  x: -600, y: -380, rotation: -55, opacity: 0, scale: 0.3,
  duration: 1.2,
  ease: 'power3.in'
}, 20);

tl.to('.img-3', {
  x: 600, y: -380, rotation: 55, opacity: 0, scale: 0.3,
  duration: 1.2,
  ease: 'power3.in'
}, 20.15);

tl.to('.img-4', {
  x: -550, y: 480, rotation: 40, opacity: 0, scale: 0.3,
  duration: 1.2,
  ease: 'power3.in'
}, 20.3);

tl.to('.img-5', {
  x: 550, y: 480, rotation: -40, opacity: 0, scale: 0.3,
  duration: 1.2,
  ease: 'power3.in'
}, 20.45);

tl.to('.img-6', {
  x: 650, y: 0, rotation: 180, opacity: 0, scale: 0.3,
  duration: 1.2,
  ease: 'power3.in'
}, 20.6);

// Decorations fade
tl.to('.decoration', {
  opacity: 0, scale: 0.3, filter: 'blur(3px)',
  duration: 0.7,
  ease: 'power2.in'
}, 22);

// Clean reset for slideshow reuse
tl.set('.orbit-container', { rotation: 0 }, 23.5);
tl.set('.orbit-img', { rotation: 0, x: 0, y: 0, scale: 1, opacity: 0, skewX: 0, filter: 'none' }, 23.5);

// ==========================================
// PHASE 3: SLIDESHOW (23.5s – 37s)
// Overlapping transitions — next slide enters
// while the current one is still exiting
// ==========================================

// --- Slide 1: scene6 — drift from left ---
tl.fromTo('.img-6', {
  opacity: 0, x: -700, rotation: -12, scale: 0.85
}, {
  opacity: 1, x: 0, rotation: 1.5, scale: 1,
  duration: 1.6,
  ease: 'power3.out'
}, 23.5);

tl.to('.img-6', {
  opacity: 0, filter: 'blur(14px)', scale: 1.25,
  duration: 1,
  ease: 'power2.in'
}, 26);

// --- Slide 2: scene2 — zoom from center (overlaps slide1 exit) ---
tl.fromTo('.img-2', {
  opacity: 0, scale: 0, rotation: 200, filter: 'blur(8px)'
}, {
  opacity: 1, scale: 1, rotation: 0, filter: 'blur(0px)',
  duration: 1.5,
  ease: 'power4.out'
}, 26.4);

tl.to('.img-2', {
  rotation: -1.5,
  duration: 1.5,
  yoyo: true, repeat: 1,
  ease: 'sine.inOut'
}, 27.2);

tl.to('.img-2', {
  opacity: 0, skewX: 30, scale: 0.7,
  duration: 0.9,
  ease: 'power2.in'
}, 28.6);

// --- Slide 3: scene3 — drop from top (overlaps slide2 exit) ---
tl.fromTo('.img-3', {
  opacity: 0, y: -580, rotation: 15, scale: 0.75
}, {
  opacity: 1, y: 0, rotation: -2.5, scale: 1,
  duration: 1.6,
  ease: 'power3.out'
}, 28.8);

tl.to('.img-3', {
  y: -250, opacity: 0, rotation: -10,
  duration: 0.9,
  ease: 'power2.in'
}, 31.2);

// --- Slide 4: scene4 — drift from right (overlaps slide3 exit) ---
tl.fromTo('.img-4', {
  opacity: 0, x: 700, rotation: 20, scale: 0.85
}, {
  opacity: 1, x: 0, rotation: -1.5, scale: 1,
  duration: 1.6,
  ease: 'power3.out'
}, 31.4);

tl.to('.img-4', {
  scale: 0, rotation: 380, opacity: 0,
  duration: 1,
  ease: 'power2.in'
}, 33.8);

// --- Slide 5: scene5 — blur reveal (overlaps slide4 exit) ---
tl.fromTo('.img-5', {
  opacity: 0, scale: 2.8, filter: 'blur(20px)'
}, {
  opacity: 1, scale: 1, filter: 'blur(0px)',
  duration: 1.6,
  ease: 'power3.out'
}, 34);

tl.to('.img-5', {
  x: 450, y: 450, opacity: 0, rotation: 20, scale: 0.5,
  duration: 1,
  ease: 'power2.in'
}, 36.2);

// ==========================================
// PHASE 4: FINALE (36.5s+)
// ==========================================

// scene7 enters while scene5 is still exiting
tl.fromTo('.img-7', {
  opacity: 0, scale: 0.4, y: 60, filter: 'blur(25px)', rotation: -10
}, {
  opacity: 1, scale: 1.06, y: 0, filter: 'blur(0px)', rotation: 1.5,
  duration: 3.5,
  ease: 'power3.out'
}, 36.5);

tl.to('.img-7', {
  boxShadow: '0 0 70px rgba(255, 150, 200, 0.7), 0 0 140px rgba(255, 200, 230, 0.4)',
  duration: 4,
  ease: 'sine.inOut'
}, 38);

// Heart ring fades in and starts circling the image
tl.to('.heart-ring', {
  opacity: 1,
  duration: 1.5,
  ease: 'power3.out'
}, 38);

tl.to('.heart-ring', {
  rotation: '+=360',
  duration: 10,
  ease: 'none',
  repeat: -1
}, 39);

tl.to('.ring-heart', {
  rotation: '-=360',
  duration: 10,
  ease: 'none',
  repeat: -1
}, 39);

tl.to('.ring-heart', {
  scale: 1.4,
  duration: 1.8,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
  stagger: 0.1
}, 39);

tl.fromTo('.sparkle-burst', {
  opacity: 0, scale: 0.15, rotation: -30
}, {
  opacity: 1, scale: 1, rotation: 0,
  duration: 1.5,
  ease: 'power3.out'
}, 38.5);

tl.to('.sparkle-burst span', {
  y: -20,
  rotation: 'random(-16, 16)',
  duration: 2.5,
  ease: 'sine.inOut',
  yoyo: true, repeat: -1,
  stagger: 0.12
}, 39.5);

tl.to('.img-7', {
  y: -6, scale: 1.08, rotation: 1,
  duration: 4,
  ease: 'sine.inOut',
  yoyo: true, repeat: -1
}, 40);

// ==========================================
// YOUTUBE PLAYER
// ==========================================

let ytPlayer;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    videoId: 't2HBiJpdjlE',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: () => {
        ytReady = true;
        if (playQueued) {
          ytPlayer.playVideo();
          playQueued = false;
        }
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          gsap.ticker.add(syncYT);
        } else if (e.data === YT.PlayerState.PAUSED) {
          gsap.ticker.remove(syncYT);
        } else if (e.data === YT.PlayerState.ENDED) {
          gsap.ticker.remove(syncYT);
          tl.progress(1);
        }
      }
    }
  });
}

let ytReady = false;
let playQueued = false;

function syncYT() {
  if (ytPlayer && ytPlayer.getCurrentTime) {
    tl.time(ytPlayer.getCurrentTime());
  }
}

document.body.addEventListener('click', () => {
  if (ytReady && ytPlayer && ytPlayer.getPlayerState) {
    const state = ytPlayer.getPlayerState();
    if (state !== YT.PlayerState.PLAYING) {
      ytPlayer.playVideo();
    }
  } else {
    playQueued = true;
  }
}, { once: true });
