document.addEventListener("DOMContentLoaded", () => {

  /* ===================== TYPEWRITER ===================== */
  const namesText = "Md Enamul  &   Zarin Sharmin";
  const namesElement = document.getElementById("names");
  let typeIndex = 0;

  function typeNames() {
    if (!namesElement) return;
    if (typeIndex < namesText.length) {
      namesElement.textContent += namesText.charAt(typeIndex++);
      setTimeout(typeNames, 120);
    }
  }
  typeNames();


  /* ===================== BACKGROUND MUSIC ===================== */
  const music = document.getElementById("bgMusic");
  let musicStarted = false;

  function startMusic() {
    if (!music || musicStarted) return;

    music.volume = 0.4;
    music.play()
      .then(() => musicStarted = true)
      .catch(() => {});
  }

  ["click", "scroll", "touchstart"].forEach(evt =>
    document.addEventListener(evt, startMusic, { once: true })
  );


  /* ===================== SCROLL REVEAL ===================== */
  const reveals = document.querySelectorAll(".reveal");
  const venue = document.querySelector(".venue-container");

  function revealOnScroll() {
    const windowH = window.innerHeight;

    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < windowH - 120) {
        el.classList.add("visible");
      }
    });

    if (venue && venue.getBoundingClientRect().top < windowH - 120) {
      venue.classList.add("visible");
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  /* ===================== ACTIVE NAV ===================== */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - 140) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });

  /* ===================== BUTTERFLY CANVAS ===================== */
  const canvas = document.getElementById("butterflyCanvas");
  const engagement = document.getElementById("engagement");
 

  const ctx = canvas.getContext("2d");
  const butterflyImg = new Image();
  butterflyImg.src = "butterfly.png";

  let cw = 0, ch = 0;

  function resizeCanvas() {
    cw = canvas.width = engagement.clientWidth;
    ch = canvas.height = engagement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);


  function createButterfly() {
    return {
      x: Math.random() * cw,
      y: Math.random() * ch,
      targetX: Math.random() * cw,
      targetY: Math.random() * ch,
      speed: 0.4 + Math.random() * 0.4,
      flap: Math.random() * Math.PI * 2
    };
  }

  const butterflies = [createButterfly(), createButterfly()];

  function updateButterfly(b) {
    const dx = b.targetX - b.x;
    const dy = b.targetY - b.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (dist < 20) {
      b.targetX = Math.random() * (cw - 60) + 30;
      b.targetY = Math.random() * (ch - 60) + 30;
    }

    b.x += (dx / dist) * b.speed;
    b.y += (dy / dist) * b.speed;

    b.flap += 0.1;
    b.y += Math.sin(b.flap) * 0.3;
  }

  function drawButterfly(b) {
    const size = 50;
    const flapScale = 0.92 + Math.sin(b.flap) * 0.08;

    ctx.save();
    ctx.translate(b.x, b.y);

    ctx.shadowColor = "rgba(255, 215, 150, 0.9)";
    ctx.shadowBlur = 18;

    ctx.scale(flapScale, 1);
    ctx.drawImage(butterflyImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, cw, ch);
    butterflies.forEach(b => {
      updateButterfly(b);
      drawButterfly(b);
    });
    requestAnimationFrame(animate);
  }

  butterflyImg.onload = animate;

});

// ================= ROSE PETAL FALL EFFECT =================

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // horizontal start position
  petal.style.left = Math.random() * 100 + "vw";

  // random sideways drift
  petal.style.transform = `translateX(${Math.random() * 100 - 50}px)
    rotateX(${Math.random() * 360}deg)
    rotateY(${Math.random() * 360}deg)
    rotateZ(${Math.random() * 360}deg)`;

  // speed
  petal.style.animationDuration = 6 + Math.random() * 6 + "s";

  // size
  petal.style.width = 40 + Math.random() * 40 + "px";
  petal.style.height = petal.style.width;

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 12000);
}

// Create petals continuously
setInterval(createPetal, 400);

// ===== REAL TWINKLE STARS =====

function spawnStar() {
  const star = document.createElement("div");
  star.className = "star";

  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1500);
}

setInterval(spawnStar, 100);

const size = 10 + Math.random() * 10;
star.style.width = size + "px";
star.style.height = size + "px";
