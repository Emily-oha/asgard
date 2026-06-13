/* ─────────────────────────────────────────
   ECHO Dashboard — Dashboard.js
   - Navegação entre seções (sidebar + cards)
   - Sidebar responsiva (mobile)
   - Chips de seleção (feedback)
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  const navItems    = document.querySelectorAll('.nav-item');
  const actionCards = document.querySelectorAll('.action-card');
  const pages       = document.querySelectorAll('.page');
  const pageTitle   = document.getElementById('page-title');
  const pageSubtitle= document.getElementById('page-subtitle');

  // Títulos de cada seção
  const titles = {
    home:        { title: 'Olá, João 👋',        subtitle: 'O que você precisa fazer hoje?' },
    feedback:    { title: 'Feedback da área',     subtitle: 'Sua opinião ajuda a melhorar o dia a dia do seu setor.' },
    atendimento: { title: 'Atendimento',          subtitle: 'Abra um chamado ou acompanhe solicitações.' },
    produtos:    { title: 'Produtos',             subtitle: 'Catálogo e status dos produtos disponíveis.' },
    processos:   { title: 'Processos',            subtitle: 'Fluxos e etapas dos processos internos.' },
    config:      { title: 'Configurações',        subtitle: 'Gerencie suas preferências de conta.' },
  };

  /**
   * Troca a seção ativa
   */
  function goToSection(section) {
    // Atualiza páginas
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${section}`);
    if (target) target.classList.add('active');

    // Atualiza itens da sidebar
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === section);
    });

    // Atualiza título/subtítulo
    if (titles[section]) {
      pageTitle.textContent    = titles[section].title;
      pageSubtitle.textContent = titles[section].subtitle;
    }

    // Fecha sidebar no mobile
    closeSidebar();

    // Volta ao topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Clique nos itens da sidebar
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      goToSection(item.dataset.section);
    });
  });

  // Clique nos cards de ação da Home
  actionCards.forEach(card => {
    card.addEventListener('click', () => {
      goToSection(card.dataset.section);
    });
  });

  /* ─── SIDEBAR MOBILE ─── */
  const sidebar    = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const overlay    = document.getElementById('overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  /* ─── CHIPS (Feedback) ─── */
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  /* ─── SUBMIT FORM FEEDBACK (placeholder) ─── */
  const feedbackForm = document.querySelector('#page-feedback .form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      /*
       * ─── INTEGRAÇÃO BACK-END ───────────────────────
       * Envie os dados do formulário para sua API aqui.
       * ────────────────────────────────────────────────
       */
      alert('Feedback enviado! (placeholder)');
    });
  }

});