const btnApostar = document.getElementById("btn-apostar"); const mensagem = document.getElementById("mensagem-alerta"); const demoJogo = document.getElementById("demo-jogo"); const siteProjeto = document.getElementById("site-projeto"); const somSpin = document.getElementById("som-spin"); const somCoin = document.getElementById("som-coin"); const symbols = ["🐯", "💰", "🍀", "🍒", "⭐", "💎"]; btnApostar.addEventListener("click", () => { somSpin.currentTime = 0; somSpin.play(); const reelRows = document.querySelectorAll(".reel-row"); reelRows.forEach((row) => { let count = 0; const spin = setInterval(() => { const symbol = symbols[Math.floor(Math.random() * symbols.length)]; row.querySelectorAll(".reel").forEach((reel) => { reel.textContent = symbol; }); count++; if (count > 15) clearInterval(spin); }, 100); }); setTimeout(() => { somCoin.play(); mensagem.style.display = "block"; }, 2000); setTimeout(() => { demoJogo.style.display = "none"; mensagem.style.display = "none"; siteProjeto.style.display = "block"; siteProjeto.setAttribute('aria-hidden','false'); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 4000); });


// ================================
// Inicializações e utilidades
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // AOS (animações ao rolar)
  if (window.AOS) AOS.init({ duration: 900, once: true });

  // CTA -> rolar até produtos
  const cta = document.querySelector(".cta");
  if (cta) cta.addEventListener("click", () => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }));

  // Interações sobre
  prepararInteracoesSobre();
});

// Animação 3D nos cards
document.querySelectorAll(".case-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 30;
    const rotateX = ((y / rect.height) - 0.5) * -30;

    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0) scale(1)";
  });
});



// ================================
// Interações seção sobre
// ================================
function prepararInteracoesSobre() {
  const btnHistoria = document.getElementById("btn-historia");
  const btnValores = document.getElementById("btn-valores");
  const sobreExtra = document.getElementById("sobre-extra");

  if (btnHistoria) {
    btnHistoria.addEventListener("click", () => {
      mostrarSobreExtra(`
        <strong>Nossa história</strong>
        <p>Fundada em 2000, a Etesc cresceu a partir de um pequeno núcleo técnico até se tornar uma fábrica com linhas automatizadas e cultura de inovação. Crescemos investindo em P&D, parcerias acadêmicas e práticas sustentáveis.</p>
      `);
    });
  }

  if (btnValores) {
    btnValores.addEventListener("click", () => {
      mostrarSobreExtra(`
        <strong>Valores & Metas ESG</strong>
        <ul>
          <li>Reduzir 50% do desperdício no próximo ciclo produtivo</li>
          <li>Chegar a 70% de materiais reciclados até 2027</li>
          <li>Programas de segurança e qualificação para funcionários</li>
        </ul>
      `);
    });
  }

  // fechar extra ao clicar fora
  document.addEventListener("click", (e) => {
    const extra = document.getElementById("sobre-extra");
    const btns = document.querySelectorAll(".sobre-actions, .s-card");
    if (!extra) return;
    const within = e.target.closest(".sobre") || e.target.closest(".s-card");
    if (!within && extra.style.display === "block") {
      extra.style.display = "none";
      extra.innerHTML = "";
    }
  });

  // cards também mostram info
  document.querySelectorAll(".s-card").forEach(card => {
    card.addEventListener("click", () => {
      const titulo = card.querySelector("h3")?.textContent || "Info";
      const texto = card.querySelector("p")?.innerHTML || "";
      mostrarSobreExtra(`<strong>${titulo}</strong><p>${texto}</p>`);
    });
  });

  function mostrarSobreExtra(html) {
    if (!sobreExtra) return;
    sobreExtra.innerHTML = html;
    sobreExtra.style.display = "block";
    sobreExtra.scrollIntoView({behavior: "smooth", block: "nearest"});
  }
}
const quizData = [
  { question: "A maioria das pessoas começa a jogar antes dos 25 anos.", answer: true },
  { question: "Jogos de azar virtuais não causam prejuízo financeiro.", answer: false },
  { question: "O vício em apostas online é reconhecido como transtorno mental pela OMS.", answer: true },
  { question: "Perder dinheiro em apostas online não afeta a vida familiar.", answer: false },
  { question: "O uso de limites de apostas pode ajudar a controlar o vício.", answer: true },
  { question: "Todos os sites de apostas são completamente seguros e justos.", answer: false }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("quiz-question");
const trueBtn = document.getElementById("true-btn");
const falseBtn = document.getElementById("false-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("quiz-result");

function loadQuestion() {
  nextBtn.style.display = "none";
  questionEl.textContent = quizData[currentQuestion].question;
  trueBtn.disabled = false;
  falseBtn.disabled = false;
  trueBtn.style.background = varDefault(trueBtn);
  falseBtn.style.background = varDefault(falseBtn);
}

function varDefault(btn) {
  return "var(--verde-claro)";
}

function selectOption(isTrue) {
  const correct = quizData[currentQuestion].answer;
  trueBtn.disabled = true;
  falseBtn.disabled = true;

  if (isTrue === correct) {
    score++;
    if (isTrue) trueBtn.style.background = "#00c267";
    else falseBtn.style.background = "#00c267";
  } else {
    if (isTrue) trueBtn.style.background = "#ff004f";
    else falseBtn.style.background = "#ff004f";
  }

  nextBtn.style.display = "inline-block";
}

trueBtn.addEventListener("click", () => selectOption(true));
falseBtn.addEventListener("click", () => selectOption(false));

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) loadQuestion();
  else showResult();
});

function showResult() {
  questionEl.style.display = "none";
  trueBtn.style.display = "none";
  falseBtn.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.style.display = "block";
  resultEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

loadQuestion();
// Botão voltar ao topo
const btnTopo = document.getElementById("btn-topo");
if (btnTopo) {
  const toggleBtnTopo = () => {
    if (window.scrollY > 200) {
      btnTopo.classList.add("mostrar");
    } else {
      btnTopo.classList.remove("mostrar");
    }
  };

  window.addEventListener("scroll", toggleBtnTopo);

  btnTopo.addEventListener("click", () => {
    // compatibilidade com navegadores antigos
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  });
}
const btnHamburger = document.getElementById('btn-hamburger');
const menu = document.getElementById('menu');
btnHamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});