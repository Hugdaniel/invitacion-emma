





/*
document.addEventListener("DOMContentLoaded", () => {

  const audio = document.getElementById("sonidoTitulo");
   


  audio.volume = 0.3;

  // Ocultamos el título al inicio

});

const overlay = document.getElementById("intro-overlay");
const audio = document.getElementById("sonidoTitulo");
overlay.addEventListener("click", () => {
  overlay.classList.add("oculto");

  const escenaDia = document.getElementById("escena-dia");
  escenaDia.classList.add("visible");
  audio.currentTime = 0;
  audio.play();

});*/

document.addEventListener("DOMContentLoaded", () => {

  const titulo = document.querySelector(".titulo-img");
  const audio = document.getElementById("sonidoTitulo");

  // Ocultamos el título al inicio
  titulo.style.opacity = "0";
  titulo.style.transition = "opacity 1s ease";

  let sonidoReproducido = false;

  function activarTituloYSonido() {

    if (!sonidoReproducido) {

      setTimeout(() => {
        titulo.style.opacity = "1";

        audio.play().catch(() => {
          console.log("El navegador bloqueó el audio hasta interacción.");
        });

      }, 1000);

      sonidoReproducido = true;
    }
  }

  // Se activa con primer scroll

  // También por seguridad en primer toque (mobile)
  window.addEventListener("touchstart", activarTituloYSonido);

});

const overlay = document.getElementById("intro-overlay");
const audio = document.getElementById("sonidoTitulo"); // tu audio

overlay.addEventListener("click", () => {
  audio.play();
  overlay.classList.add("oculto");
});





/*animacion escenas al hacer scroll*/
const escenas = document.querySelectorAll(".escena");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, {
  threshold: 0.1
});

escenas.forEach((escena) => {
  observer.observe(escena);
});


/*Animacion galeria fotos*/
const slides = document.querySelectorAll(".slide");
const btnIzquierda = document.querySelector(".flecha-izquierda");
const btnDerecha = document.querySelector(".flecha-derecha");

let currentIndex = 0;

function mostrarSlide(index) {

  slides[currentIndex].classList.remove("activa");

  currentIndex = index;

  slides[currentIndex].classList.add("activa");
}

btnDerecha.addEventListener("click", () => {

  let nuevoIndex = currentIndex + 1;

  if (nuevoIndex >= slides.length) {
    nuevoIndex = 0;
  }

  mostrarSlide(nuevoIndex);
});

btnIzquierda.addEventListener("click", () => {

  let nuevoIndex = currentIndex - 1;

  if (nuevoIndex < 0) {
    nuevoIndex = slides.length - 1;
  }

  mostrarSlide(nuevoIndex);
});


// Revelacion invitacion
const btnRevelar = document.getElementById("btn-revelar");
const revelacion = document.getElementById("revelacion-final");
const audioMagico = document.getElementById("sonidoTitulo");

btnRevelar.addEventListener("click", () => {

  btnRevelar.style.opacity = "0";
  btnRevelar.style.pointerEvents = "none";

  setTimeout(() => {
    btnRevelar.style.display = "none";
  }, 500);

  revelacion.classList.add("visible");

  audioMagico.currentTime = 0;
  audioMagico.play();
});

// Particulas
const canvases = document.querySelectorAll(".particulas");

canvases.forEach(canvas => {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedY = Math.random() * 0.5 + 0.2;
      this.opacity = Math.random();
    }

    update() {
      this.y -= this.speedY;
      if (this.y < 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
});

