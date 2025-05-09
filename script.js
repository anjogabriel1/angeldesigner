// FADE-IN AO ROLAR (sempre que entrar ou sair)
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.2 });
faders.forEach(fader => appearOnScroll.observe(fader));

// SCROLLSPY MENU
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    if (pageYOffset >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').includes(current));
  });
});

// BOTÃO VOLTAR AO TOPO
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 500);
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// MOSTRAR MAIS FEEDBACKS
document.getElementById('mostrarMaisBtn').addEventListener('click', () => {
  document.querySelector('.feedback-hidden').style.display = 'block';
  document.getElementById('mostrarMaisBtn').style.display = 'none';
});

// FAQ ACORDEÃO
document.querySelectorAll('.faq-pergunta').forEach(pergunta => {
  pergunta.addEventListener('click', () => {
    pergunta.parentElement.classList.toggle('active');
  });
});

// CARROSSEL DE DEPOIMENTOS
const depoimentos = [
  "“Simplesmente incrível, super recomendo!”",
  "“A qualidade das camisetas é impecável.”",
  "“Melhor atendimento que já tive, nota 10!”",
  "“Design exclusivo, minha turma adorou!”"
];
let di = 0;
setInterval(() => {
  document.querySelector('.depoimento-texto').textContent = depoimentos[di];
  di = (di + 1) % depoimentos.length;
}, 4000);

// CONTADORES ANIMADOS
document.querySelectorAll('.contador').forEach(el => {
  const update = () => {
    const target = +el.dataset.num;
    const count = +el.innerText;
    const inc = Math.ceil(target / 100);
    if (count < target) {
      el.innerText = count + inc;
      setTimeout(update, 20);
    } else el.innerText = target;
  };
  update();
});

// PAGINAÇÃO E SELEÇÃO DE MODELOS (12 por página)
const TOTAL_MODELOS = 102;
const POR_PAGINA    = 12;
let paginaAtual     = 1;
const totalPaginas  = Math.ceil(TOTAL_MODELOS / POR_PAGINA);

const modelosGrid  = document.getElementById('modelosGrid');
const paginacaoDiv = document.getElementById('paginacao');

function renderizarPagina(page) {
  modelosGrid.innerHTML = '';
  const start = (page - 1) * POR_PAGINA + 1;
  const end   = Math.min(page * POR_PAGINA, TOTAL_MODELOS);

  for (let i = start; i <= end; i++) {
    const filename = `img/${i}.jpg`;
    const card = document.createElement('div');
    card.className = 'modelo-card';

    const img = document.createElement('img');
    img.src     = filename;
    img.alt     = `Modelo ${i}`;
    img.loading = 'lazy';

    const title = document.createElement('h4');
    title.innerText = `Modelo ${i}`;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    const btnSel = document.createElement('button');
    btnSel.innerText = 'Selecionar';
    btnSel.addEventListener('click', () => {
      const msg = encodeURIComponent(`Olá, quero o Modelo ${i}`);
      window.open(`https://wa.me/5573981851661?text=${msg}`, '_blank');
    });
    overlay.appendChild(btnSel);

    card.append(img, title, overlay);
    modelosGrid.appendChild(card);
  }

  renderizarPaginacao(page);
}

function renderizarPaginacao(activePage) {
  paginacaoDiv.innerHTML = '';
  for (let p = 1; p <= totalPaginas; p++) {
    const btn = document.createElement('button');
    btn.innerText = p;
    if (p === activePage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      paginaAtual = p;
      renderizarPagina(p);
      window.scrollTo({ top: document.getElementById('modelos').offsetTop, behavior: 'smooth' });
    });
    paginacaoDiv.appendChild(btn);
  }
}

renderizarPagina(paginaAtual);
