(function () {
  const STYLE_ID = 'anim-keyframes';

  // ---- 1. Inject all keyframes + base classes once ----
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const css = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes blurReveal {
        from { opacity: 0; filter: blur(12px); transform: scale(1.05); }
        to   { opacity: 1; filter: blur(0px);  transform: scale(1); }
      }
      @keyframes floatHeart {
        0%   { opacity: 0; transform: translateY(0) translateX(0) rotate(0deg); }
        10%  { opacity: 1; }
        50%  { transform: translateY(-160px) translateX(20px) rotate(15deg); }
        100% { opacity: 0; transform: translateY(-320px) translateX(-10px) rotate(-10deg); }
      }
      @keyframes giftWiggle {
        0%, 100% { transform: rotate(0deg) scale(1); }
        15% { transform: rotate(-8deg) scale(1.03); }
        30% { transform: rotate(6deg) scale(1.03); }
        45% { transform: rotate(-4deg) scale(1); }
        60% { transform: rotate(3deg) scale(1); }
        75% { transform: rotate(-1deg) scale(1); }
      }
      @keyframes confettiFall {
        0%   { opacity: 1; transform: translateY(-20px) rotate(0deg); }
        100% { opacity: 0; transform: translateY(500px) rotate(360deg); }
      }
      @keyframes shimmerSweep {
        0%   { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 0px rgba(255,105,180,0.4); }
        50%      { box-shadow: 0 0 24px rgba(255,105,180,0.8); }
      }
      @keyframes sparkleTwinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50%      { opacity: 1; transform: scale(1); }
      }

      .anim-shimmer-text {
        background: linear-gradient(
          90deg,
          currentColor 40%,
          #fff 50%,
          currentColor 60%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: shimmerSweep 2.2s ease-in-out 1;
      }

      .anim-press-scale {
        transition: transform 0.12s ease;
      }
      .anim-press-scale:active {
        transform: scale(0.94);
      }

      .anim-sparkle-dot {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: white;
        pointer-events: none;
      }
    `;

    const styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  }

  // ---- 2. Individual animation functions ----

  function fadeInUp(el, { duration = 700, delay = 0, easing = 'ease-out' } = {}) {
    if (!el) return;
    el.style.animation = `fadeInUp ${duration}ms ${easing} ${delay}ms both`;
  }

  function blurReveal(el, { duration = 1000, delay = 0, easing = 'ease-out' } = {}) {
    if (!el) return;
    el.style.animation = `blurReveal ${duration}ms ${easing} ${delay}ms both`;
  }

  function giftWiggle(el, { duration = 900, delay = 0, loop = false } = {}) {
    if (!el) return;
    el.style.animation = `giftWiggle ${duration}ms ease-in-out ${delay}ms ${loop ? 'infinite' : '1'}`;
  }

  function pulseGlow(el, { duration = 1800 } = {}) {
    if (!el) return;
    el.style.animation = `pulseGlow ${duration}ms ease-in-out infinite`;
  }

  function shimmerText(el) {
    if (!el) return;
    el.classList.add('anim-shimmer-text');
  }

  function pressScale(el) {
    if (!el) return;
    el.classList.add('anim-press-scale');
  }

  // Reveals a NodeList/array of elements one after another
  function staggerReveal(elements, { stepMs = 120, animation = fadeInUp, startDelay = 0 } = {}) {
    const list = Array.from(elements || []);
    list.forEach((el, i) => {
      animation(el, { delay: startDelay + i * stepMs });
    });
  }

  // Spawns floating heart emojis rising from the bottom of a container
  function floatHeart(container, { count = 6, emoji = '❤️', durationRange = [3000, 5000] } = {}) {
    if (!container) return;
    const rect = container.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span');
      heart.textContent = emoji;
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * rect.width + 'px';
      heart.style.bottom = '0px';
      heart.style.fontSize = 14 + Math.random() * 14 + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.willChange = 'transform, opacity';

      const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
      heart.style.animation = `floatHeart ${duration}ms ease-in ${Math.random() * 800}ms forwards`;

      container.appendChild(heart);
      setTimeout(() => heart.remove(), duration + 1000);
    }
  }

  // Spawns falling confetti pieces inside a container
  function confettiBurst(container, { count = 40, colors } = {}) {
    if (!container) return;
    const palette = colors || ['#ff6fa5', '#ffd166', '#06d6a0', '#118ab2', '#c77dff', '#ff9f1c'];
    const rect = container.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.style.position = 'absolute';
      piece.style.left = Math.random() * rect.width + 'px';
      piece.style.top = '-10px';
      piece.style.width = 6 + Math.random() * 6 + 'px';
      piece.style.height = 10 + Math.random() * 8 + 'px';
      piece.style.background = palette[Math.floor(Math.random() * palette.length)];
      piece.style.opacity = '0.9';
      piece.style.pointerEvents = 'none';
      piece.style.borderRadius = '2px';

      const duration = 1800 + Math.random() * 1600;
      piece.style.animation = `confettiFall ${duration}ms ease-in ${Math.random() * 600}ms forwards`;

      container.appendChild(piece);
      setTimeout(() => piece.remove(), duration + 1000);
    }
  }

  // Spawns twinkling sparkle dots across a container (good for the starry background in image 3)
  function sparkleTwinkle(container, { count = 25 } = {}) {
    if (!container) return;
    const rect = container.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.className = 'anim-sparkle-dot';
      dot.style.left = Math.random() * rect.width + 'px';
      dot.style.top = Math.random() * rect.height + 'px';
      const duration = 1500 + Math.random() * 2000;
      dot.style.animation = `sparkleTwinkle ${duration}ms ease-in-out ${Math.random() * 2000}ms infinite`;
      container.appendChild(dot);
    }
  }

  // ---- 3. Init + expose ----
  injectStyles();

  const Anim = {
    fadeInUp,
    blurReveal,
    giftWiggle,
    pulseGlow,
    shimmerText,
    pressScale,
    staggerReveal,
    floatHeart,
    confettiBurst,
    sparkleTwinkle,
  };

  window.Anim = Anim;
})();
