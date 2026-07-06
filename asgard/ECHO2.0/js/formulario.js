/* ─────────────────────────────────────────
   ECHO – formulario.js
───────────────────────────────────────── */

const API_URL = 'http://localhost:3000/api';
let formQuestions = [];

/* ─── UTILS ─── */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function typeLabel(type) {
  const map = {
    text: 'Texto',
    radio: 'Sim/Não',
    multiple: 'Múltipla escolha',
    rating: 'Avaliação (estrelas)'
  };
  return map[type] || type;
}

/* ─── RENDERIZA PERGUNTAS NO PAINEL DIREITO ─── */
function renderFormQuestions() {
  const container = document.getElementById('formQuestions');

  if (formQuestions.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        <p>Selecione perguntas ao lado ou adicione uma personalizada.</p>
      </div>`;
    return;
  }

  container.innerHTML = formQuestions.map((q, i) => `
    <div class="form-q-item" data-index="${i}">
      <span class="form-q-text">${q.text}</span>
      <span class="form-q-type">${typeLabel(q.type)}</span>
      <button class="form-q-remove" data-index="${i}" title="Remover">✕</button>
    </div>
  `).join('');

  container.querySelectorAll('.form-q-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const removed = formQuestions[idx];
      formQuestions.splice(idx, 1);

      document.querySelectorAll('#presetList input[type="checkbox"]').forEach(cb => {
        if (cb.value === removed.text) cb.checked = false;
      });

      renderFormQuestions();
    });
  });
}

/* ─── CHECKBOXES PRONTAS ─── */
document.querySelectorAll('#presetList input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) {
      if (!formQuestions.find(q => q.text === cb.value)) {
        formQuestions.push({ text: cb.value, type: cb.dataset.type });
        renderFormQuestions();
      }
    } else {
      formQuestions = formQuestions.filter(q => q.text !== cb.value);
      renderFormQuestions();
    }
  });
});

/* ─── ADICIONAR PERSONALIZADA ─── */
document.getElementById('btnAdd').addEventListener('click', () => {
  const input = document.getElementById('customQuestion');
  const type  = document.getElementById('customType').value;
  const text  = input.value.trim();

  if (!text) { showToast('Digite o texto da pergunta.'); input.focus(); return; }
  if (formQuestions.find(q => q.text === text)) { showToast('Essa pergunta já foi adicionada.'); return; }

  formQuestions.push({ text, type });
  renderFormQuestions();
  input.value = '';
  input.focus();
});

document.getElementById('customQuestion').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('btnAdd').click();
});

/* ─── PREVIEW ─── */
document.getElementById('btnPreview').addEventListener('click', () => {
  if (formQuestions.length === 0) {
    showToast('Adicione pelo menos uma pergunta antes de visualizar.');
    return;
  }

  const name = document.getElementById('formName').value.trim() || 'Formulário';
  document.getElementById('modalTitle').textContent = name;

  const body = document.getElementById('modalBody');
  body.innerHTML = formQuestions.map((q, i) => {
    let input = '';

    if (q.type === 'text') {
      input = `<input type="text" placeholder="Responder aqui..." />`;
    } else if (q.type === 'radio') {
      input = `
        <label><input type="radio" name="q${i}" /> Sim</label>
        <label><input type="radio" name="q${i}" /> Não</label>`;
    } else if (q.type === 'multiple') {
      input = `
        <label><input type="checkbox" /> Opção 1</label>
        <label><input type="checkbox" /> Opção 2</label>
        <label><input type="checkbox" /> Opção 3</label>`;
    } else if (q.type === 'rating') {
      // Estrelas interativas (CSS trick com flex-direction: row-reverse)
      input = `
        <div class="star-group">
          <input type="radio" name="star${i}" id="s${i}5" value="5"><label for="s${i}5">★</label>
          <input type="radio" name="star${i}" id="s${i}4" value="4"><label for="s${i}4">★</label>
          <input type="radio" name="star${i}" id="s${i}3" value="3"><label for="s${i}3">★</label>
          <input type="radio" name="star${i}" id="s${i}2" value="2"><label for="s${i}2">★</label>
          <input type="radio" name="star${i}" id="s${i}1" value="1"><label for="s${i}1">★</label>
        </div>`;
    }

    return `
      <div class="modal-question">
        <strong>${q.text}</strong>
        ${input}
      </div>`;
  }).join('');

  document.getElementById('modalOverlay').classList.add('show');
});

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('show');
});

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('show');
  }
});

document.getElementById('btnSubmit').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('show');
  showToast('Respostas enviadas! ✓');
});

/* ─── SALVAR (API) ─── */
document.getElementById('btnSave').addEventListener('click', async () => {
  const name = document.getElementById('formName').value.trim();

  if (!name) { showToast('Dê um nome ao formulário antes de salvar.'); document.getElementById('formName').focus(); return; }
  if (formQuestions.length === 0) { showToast('Adicione pelo menos uma pergunta antes de salvar.'); return; }

  try {
    const res = await fetch(`${API_URL}/formularios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: name, perguntas: formQuestions }),
    });

    const data = await res.json();

    if (res.ok) {
      showToast(`Formulário "${name}" salvo com sucesso! ✓`);
      formQuestions = [];
      renderFormQuestions();
      document.getElementById('formName').value = '';
      document.querySelectorAll('#presetList input[type="checkbox"]').forEach(cb => cb.checked = false);
    } else {
      showToast(data.error || 'Erro ao salvar. Tente novamente.');
    }
  } catch (err) {
    showToast('Servidor offline. Verifique se o back-end está rodando.');
    console.error(err);
  }
});