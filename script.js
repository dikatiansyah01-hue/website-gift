/**
 * ==========================================================================
 * ROMANTIC GIFT WEBSITE FOR FAZIDA SAILA RIZQINA
 * ==========================================================================
 * 
 * PENGATURAN UTAMA (Silakan ubah jika diperlukan):
 */

// Nomor WhatsApp tujuan (Format internasional tanpa '+' atau '0', contoh: 628xxxxxxxxxx)
const WHATSAPP_NUMBER = "6285198215250";

// Teks template pesan otomatis ke WhatsApp
const WHATSAPP_MESSAGE_TEMPLATE = 
`Assalamu'alaikum ❤️

Aku sudah lihat website-nya...

Jawabanku: [MAU / NGGAK]

😊`;


/* ==========================================================================
   1. INISIALISASI & NAVIGASI SLIDE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSlideNavigation();
  initBackgroundCanvas();
  initAudioPlayer();
  initLightbox();
});

let currentSlide = 1;

/**
 * Berpindah slide dengan transisi smooth tanpa reload halaman
 * @param {number} targetSlideNumber 
 */
function goToSlide(targetSlideNumber) {
  const currentEl = document.querySelector(`.slide-section[data-slide="${currentSlide}"]`);
  const targetEl = document.querySelector(`.slide-section[data-slide="${targetSlideNumber}"]`);

  if (!currentEl || !targetEl || currentSlide === targetSlideNumber) return;

  // Animasi keluar
  currentEl.classList.add('fade-out');

  setTimeout(() => {
    currentEl.classList.remove('active', 'fade-out');
    currentEl.style.display = 'none';

    // Animasi masuk
    targetEl.style.display = 'block';
    // Force reflow
    void targetEl.offsetWidth;
    targetEl.classList.add('active');

    currentSlide = targetSlideNumber;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 400);
}

/**
 * Event Listener Tombol Navigasi
 */
function initSlideNavigation() {
  const btnMau = document.getElementById('btnMau');
  const btnNggak = document.getElementById('btnNggak');
  const btnLanjut = document.getElementById('btnLanjut');
  const btnWhatsapp = document.getElementById('btnWhatsapp');
  const btnBack = document.getElementById('btnBack');

  // --- TOMBOL "MAU ❤️" ---
  if (btnMau) {
    btnMau.addEventListener('click', () => {
      // 1. Jalankan efek confetti dan ledakan hati
      fireRomanticConfetti();

      // 2. Mainkan nada manis jika audio diizinkan
      playSweetChime();

      // 3. Pindah smooth ke SLIDE 2 setelah 1.2 detik
      setTimeout(() => {
        goToSlide(2);
      }, 1200);
    });
  }

  // --- TOMBOL "NGGAK 🥺" ---
  if (btnNggak) {
    btnNggak.addEventListener('click', () => {
      showSadFeedbackOverlay(() => {
        // Setelah popup sedih selesai, lanjut ke SLIDE 3
        goToSlide(3);
      });
    });
  }

  // --- TOMBOL "LANJUT ❤️" (Dari Slide 2 ke Slide 3) ---
  if (btnLanjut) {
    btnLanjut.addEventListener('click', () => {
      goToSlide(3);
    });
  }

  // --- TOMBOL "← Kembali" (Dari Slide 3 ke Slide 2) ---
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      goToSlide(2);
    });
  }

  // --- TOMBOL "KIRIM PESAN KE AKU" (WhatsApp) ---
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
      openWhatsApp();
    });
  }
}

/**
 * Membuka WhatsApp dengan pesan otomatis yang rapi
 */
function openWhatsApp() {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE_TEMPLATE);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Tampilkan pesan sedih yang sopan ketika menekan "NGGAK"
 */
function showSadFeedbackOverlay(callback) {
  const overlay = document.getElementById('feedbackOverlay');
  if (!overlay) {
    if (callback) callback();
    return;
  }

  overlay.classList.remove('hidden');

  // Buat beberapa emoji sedih kecil yang melayang
  createSadRain();

  setTimeout(() => {
    overlay.classList.add('hidden');
    if (callback) callback();
  }, 1800);
}


/* ==========================================================================
   2. EFEK VISUAL: CONFETTI & EMOJI
   ========================================================================== */

/**
 * Efek Confetti & Hati Bertebaran saat memilih "MAU"
 */
function fireRomanticConfetti() {
  if (typeof confetti === 'function') {
    // Ledakan pertama
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ff4e78', '#ff7eb3', '#ffd1dc', '#ffffff', '#ff1493']
    });

    // Ledakan hati samping kiri & kanan
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff758c', '#ff7eb3', '#ffffff']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff758c', '#ff7eb3', '#ffffff']
      });
    }, 250);
  }
}

/**
 * Animasi rintik emoji sedih halus
 */
function createSadRain() {
  const emojis = ['🥺', '💧', '🩹', '💭'];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = 'fixed';
    el.style.left = `${Math.random() * 90 + 5}vw`;
    el.style.top = `-30px`;
    el.style.fontSize = `${Math.random() * 16 + 18}px`;
    el.style.zIndex = '250';
    el.style.pointerEvents = 'none';
    el.style.transition = 'all 1.5s ease-in';
    el.style.opacity = '0.9';

    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 60 - 30}deg)`;
      el.style.opacity = '0';
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1600);
  }
}


/* ==========================================================================
   3. BACKGROUND CANVAS (Floating Hearts & Sparkles)
   ========================================================================== */

function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(35, Math.floor(width / 30));

  class HeartParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.7 + 0.3;
      this.speedX = Math.sin(Math.random() * 10) * 0.4;
      this.opacity = Math.random() * 0.45 + 0.15;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.color = Math.random() > 0.3 ? 'rgba(255, 117, 140,' : 'rgba(255, 182, 193,';
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.angle) * 0.5;
      this.angle += this.angularSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * 0.2);
      ctx.fillStyle = `${this.color}${this.opacity})`;
      
      // Menggambar bentuk hati yang halus
      const topCurveHeight = this.size * 0.3;
      ctx.beginPath();
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, (this.size + topCurveHeight) / 1.2, 0, this.size);
      ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 1.2, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new HeartParticle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(render);
  }

  render();
}


/* ==========================================================================
   4. PENANGANAN FOTO & PLACEHOLDER (Slot foto 1, 2, 3)
   ========================================================================== */

/**
 * Fallback jika path foto utama tidak ditemukan
 */
window.handleImageFallback = function (imgEl, fallbackSrc) {
  if (imgEl && fallbackSrc && imgEl.src !== fallbackSrc) {
    imgEl.src = fallbackSrc;
  }
};

/**
 * Menampilkan placeholder yang elegan untuk foto3.jpg jika file belum ada
 */
window.showPhoto3Placeholder = function (imgEl) {
  if (imgEl) {
    imgEl.style.display = 'none';
  }
  const placeholder = document.getElementById('photo3Placeholder');
  if (placeholder) {
    placeholder.style.display = 'flex';
  }
};


/* ==========================================================================
   5. LIGHTBOX MODAL (Preview Foto saat diklik)
   ========================================================================== */

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const backdrop = document.querySelector('.lightbox-backdrop');

  if (!modal || !modalImg) return;

  const photoItems = document.querySelectorAll('.photo-item');

  photoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.memory-photo');
      const placeholder = item.querySelector('.photo-placeholder');

      if (img && img.style.display !== 'none' && img.src && !img.src.includes('foto3.jpg')) {
        modalImg.src = img.src;
        modalCaption.textContent = index === 0 ? 'Momen Spesial 1 ❤️' : 'Momen Spesial 2 🌸';
        modal.classList.remove('hidden');
      } else if (placeholder && placeholder.style.display !== 'none') {
        modalImg.src = '';
        modalCaption.textContent = 'Slot ini disiapkan untuk foto kenangan kita berdua berikutnya ❤️';
        // Hanya beri feedback ringan atau jangan buka modal kosong
      }
    });
  });

  const closeModal = () => modal.classList.add('hidden');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}


/* ==========================================================================
   6. AMBIENT ROMANTIC MUSIC (Web Audio API Synthesizer)
   Memastikan musik dapat berbunyi merdu langsung tanpa ketergantungan file luar
   ========================================================================== */

let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function initAudioPlayer() {
  const audioToggle = document.getElementById('audioToggle');
  const audioLabel = document.getElementById('audioLabel');

  if (!audioToggle) return;

  audioToggle.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (isMusicPlaying) {
      stopRomanticMusic();
      audioToggle.classList.remove('playing');
      if (audioLabel) audioLabel.textContent = 'Putar Musik';
    } else {
      startRomanticMusic();
      audioToggle.classList.add('playing');
      if (audioLabel) audioLabel.textContent = 'Musik Nyala ✨';
    }

    isMusicPlaying = !isMusicPlaying;
  });
}

/**
 * Memainkan alunan melodi kotak musik romantis (Canon in D / Romantic Lullaby style)
 */
function startRomanticMusic() {
  if (!audioCtx) return;

  // Frekuensi nada melodi lembut (G4, D5, B4, C5, D5, G4, E5, D5...)
  const melody = [
    { note: 392.00, dur: 0.6 }, // G4
    { note: 493.88, dur: 0.6 }, // B4
    { note: 587.33, dur: 0.8 }, // D5
    { note: 523.25, dur: 0.6 }, // C5
    { note: 493.88, dur: 0.6 }, // B4
    { note: 440.00, dur: 0.8 }, // A4
    { note: 392.00, dur: 0.6 }, // G4
    { note: 329.63, dur: 0.6 }, // E4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 440.00, dur: 0.6 }, // A4
    { note: 493.88, dur: 0.6 }, // B4
    { note: 587.33, dur: 1.0 }  // D5
  ];

  let index = 0;

  function playNextNote() {
    if (!isMusicPlaying || !audioCtx) return;

    const item = melody[index];
    playMusicBoxTone(item.note, item.dur);

    index = (index + 1) % melody.length;
    musicInterval = setTimeout(playNextNote, item.dur * 850);
  }

  playNextNote();
}

function stopRomanticMusic() {
  if (musicInterval) {
    clearTimeout(musicInterval);
    musicInterval = null;
  }
}

/**
 * Sintesis suara kotak musik lembut (Sine oscillator dengan decay alami)
 */
function playMusicBoxTone(freq, duration = 0.5) {
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Envelope lembut
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // silent fail
  }
}

/**
 * Nada lonceng manis saat menekan "MAU"
 */
function playSweetChime() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const chords = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C octave
  chords.forEach((freq, idx) => {
    setTimeout(() => {
      playMusicBoxTone(freq, 0.7);
    }, idx * 120);
  });
}
