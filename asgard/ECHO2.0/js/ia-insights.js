/* ─────────────────────────────────────────
   ECHO IA – ia-insights.js
   Chat integrado à API da Anthropic (Claude)
───────────────────────────────────────── */

const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');
const quickBtns    = document.getElementById('quickBtns');

// Contexto do sistema para o Claude
const SYSTEM_PROMPT = `Você é a ECHO IA, assistente inteligente da plataforma ECHO.
Seu papel é analisar feedbacks e relatórios organizacionais e ajudar gestores a tomar decisões estratégicas.

Contexto atual da empresa (últimos 30 dias):
- 408 feedbacks recebidos
- Satisfação geral: 72% (↑8% vs mês anterior)
- Principais temas: Demora no retorno (128 menções), Comunicação entre departamentos (96), Processos burocráticos (72), Treinamento e capacitação (64), Reconhecimento da equipe (48)
- Áreas em destaque positivo: RH e Cultura
- Áreas críticas: Operações e TI

Responda sempre em português brasileiro, de forma objetiva, empática e estratégica.
Use dados concretos do contexto acima quando relevante.
Seja direto e prático, com no máximo 3 parágrafos por resposta.`;

let conversationHistory = [];

/* ─── RENDERIZA MENSAGEM ─── */
function appendMessage(text, type) {
  // Esconde quick buttons após primeira interação
  if (type === 'user' && quickBtns) {
    quickBtns.style.display = 'none';
  }

  const div = document.createElement('div');
  div.classList.add(type === 'user' ? 'msg-user' : 'msg-ia');
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

/* ─── INDICADOR DE DIGITANDO ─── */
function showTyping() {
  const div = document.createElement('div');
  div.classList.add('msg-typing');
  div.id = 'typingIndicator';
  div.textContent = '●●●';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

/* ─── ENVIAR MENSAGEM ─── */
async function sendMessage(text) {
  const message = text || chatInput.value.trim();
  if (!message) return;

  chatInput.value = '';
  chatSend.disabled = true;

  // Mensagem do usuário
  appendMessage(message, 'user');

  // Adiciona ao histórico
  conversationHistory.push({ role: 'user', content: message });

  // Indicador de digitando
  showTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ─── ATENÇÃO ───────────────────────────────────────────────
        // NÃO exponha sua chave de API no front-end em produção!
        // Em produção, faça a chamada pelo seu back-end (server.js).
        // Para testes locais, substitua abaixo pela sua chave:
        // 'x-api-key': 'sk-ant-...',
        // ──────────────────────────────────────────────────────────
        'x-api-key': 'COLOQUE_SUA_CHAVE_AQUI',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: conversationHistory,
      }),
    });

    const data = await response.json();
    hideTyping();

    if (response.ok && data.content?.[0]?.text) {
      const reply = data.content[0].text;
      appendMessage(reply, 'ia');
      conversationHistory.push({ role: 'assistant', content: reply });
    } else {
      const errMsg = data.error?.message || 'Erro ao conectar com a IA.';
      appendMessage(`⚠️ ${errMsg}`, 'ia');
    }

  } catch (err) {
    hideTyping();
    appendMessage('⚠️ Não foi possível conectar com a IA. Verifique sua conexão ou a chave da API.', 'ia');
    console.error('ECHO IA erro:', err);
  }

  chatSend.disabled = false;
  chatInput.focus();
}

/* ─── QUICK BUTTONS ─── */
function sendQuick(text) {
  sendMessage(text);
}

/* ─── EVENTOS ─── */
chatSend.addEventListener('click', () => sendMessage());

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});