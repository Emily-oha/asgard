/* ─────────────────────────────────────────
   ECHO – feedback-cliente.js
───────────────────────────────────────── */

/* ─── TOAST ─── */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ─── IDENTIDADE (Anônimo / Identificado) ─── */
const identityCards = document.querySelectorAll('.identity-card');
const contactSection = document.getElementById('contactSection');

identityCards.forEach(card => {
  card.addEventListener('click', () => {
    identityCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const val = card.querySelector('input').value;
    // Mostra contato só se identificado
    contactSection.style.display = val === 'identificado' ? 'block' : 'none';
  });
});

/* ─── ESTRELAS ─── */
const stars = document.querySelectorAll('.star');
const starLabel = document.getElementById('starLabel');
let selectedStar = 0;

const starTexts = {
  1: { emoji: '😞', label: 'Ruim',         color: '#DC2626', bg: '#FEF2F2' },
  2: { emoji: '😐', label: 'Regular',      color: '#D97706', bg: '#FEF3C7' },
  3: { emoji: '🙂', label: 'Bom',          color: '#2563EB', bg: '#EFF6FF' },
  4: { emoji: '😊', label: 'Ótimo',        color: '#16A34A', bg: '#F0FDF4' },
  5: { emoji: '🤩', label: 'Excelente!',   color: '#7C3AED', bg: '#F5F3FF' },
};

function updateStars(val) {
  stars.forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.val) <= val);
  });

  if (val > 0 && starTexts[val]) {
    const info = starTexts[val];
    starLabel.innerHTML = `<span>${info.emoji}</span><span>${info.label}</span>`;
    starLabel.style.background = info.bg;
    starLabel.style.color      = info.color;
    starLabel.classList.add('show');
  } else {
    starLabel.innerHTML = '';
    starLabel.classList.remove('show');
  }
}

stars.forEach(star => {
  star.addEventListener('mouseenter', () => updateStars(parseInt(star.dataset.val)));
  star.addEventListener('mouseleave', () => updateStars(selectedStar));
  star.addEventListener('click', () => {
    selectedStar = parseInt(star.dataset.val);
    updateStars(selectedStar);
  });
});

/* ─── CONTADOR DE CARACTERES ─── */
const textarea  = document.getElementById('detalhes');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', () => {
  const len = textarea.value.length;
  charCount.textContent = `${len}/1000 caracteres`;
  charCount.style.color = len >= 900 ? '#DC2626' : '#9CA3AF';
});

/* ─── LIMPAR ─── */
document.getElementById('btnLimpar').addEventListener('click', () => {
  // Reseta identidade
  identityCards.forEach((c, i) => c.classList.toggle('active', i === 0));
  contactSection.style.display = 'none';

  // Reseta estrelas
  selectedStar = 0;
  updateStars(0);

  // Reseta select
  document.getElementById('categoria').value = '';

  // Reseta textarea
  textarea.value = '';
  charCount.textContent = '0/1000 caracteres';

  // Reseta contato
  const contato = document.getElementById('contato');
  if (contato) contato.value = '';

  showToast('Formulário limpo.');
});

/* ─── ENVIAR ─── */
document.getElementById('feedbackForm').addEventListener('submit', async () => {
  const identity  = document.querySelector('.identity-card.active input').value;
  const categoria = document.getElementById('categoria').value;
  const detalhes  = textarea.value.trim();
  const contato   = document.getElementById('contato')?.value.trim() || '';

  if (!selectedStar) {
    showToast('Por favor, avalie sua experiência com as estrelas.');
    return;
  }
  if (!categoria) {
    showToast('Selecione uma categoria.');
    return;
  }
  if (!detalhes) {
    showToast('Descreva seu feedback antes de enviar.');
    textarea.focus();
    return;
  }

  const payload = {
    identidade: identity,
    avaliacao:  selectedStar,
    categoria,
    detalhes,
    contato,
  };

  /*
   * ─── INTEGRAÇÃO BACK-END ───────────────────────────────────────
   * Substitua o alert() abaixo pela chamada à sua API:
   *
   * const res = await fetch('http://localhost:3000/api/feedbacks', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify(payload),
   * });
   * const data = await res.json();
   * if (res.ok) { showToast('Feedback enviado com sucesso! ✓'); }
   * else        { showToast(data.error || 'Erro ao enviar.'); }
   * ──────────────────────────────────────────────────────────────
   */
  console.log('Payload:', payload);
  showToast('Feedback enviado com sucesso! ✓');

  // Limpa após envio
  document.getElementById('btnLimpar').click();
});