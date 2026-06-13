import { app } from "./firebase-config.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);

/* ─────────────────────────────────────────
   ECHO Login — script.js
───────────────────────────────────────── */

/**
 * Alterna visibilidade do campo de senha
 */
function togglePw() {
  const input = document.getElementById("senha");
  const eyeOff = document.getElementById("icon-eye-off");
  const eyeOn = document.getElementById("icon-eye");

  if (input.type === "password") {
    input.type = "text";
    eyeOff.style.display = "none";
    eyeOn.style.display = "block";
  } else {
    input.type = "password";
    eyeOff.style.display = "block";
    eyeOn.style.display = "none";
  }
}

/**
 * Exibe mensagem de erro no card
 */
function showError(msg) {
  const el = document.getElementById("error-msg");
  el.textContent = msg;
  el.classList.add("show");
}

function hideError() {
  document.getElementById("error-msg").classList.remove("show");
}

/**
 * Handler de login com e-mail/senha
 */
async function handleLogin() {
  hideError();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!email) {
    showError("Por favor, informe seu e-mail ou usuário.");
    document.getElementById("email").focus();
    return;
  }

  if (!senha) {
    showError("Por favor, informe sua senha.");
    document.getElementById("senha").focus();
    return;
  }

  /*
   * ─── INTEGRAÇÃO BACK-END ───────────────────────────────────────
   * Substitua o alert() abaixo pela chamada à sua API:
   *
   * const res = await fetch('/api/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ email, senha }),
   * });
   * const data = await res.json();
   * if (!res.ok) { showError(data.message); return; }
   * window.location.href = '/dashboard';
   * ──────────────────────────────────────────────────────────────
   */
  try {
    await signInWithEmailAndPassword(auth, email, senha);

    alert("Login realizado com sucesso!");

    // depois vamos redirecionar para o dashboard
  } catch (error) {
    console.error(error);

    showError("E-mail ou senha inválidos.");
  }
}

/**
 * Handler de Login com Google
 *
 * Para integrar de verdade:
 *  1. Crie um projeto no Google Cloud Console
 *  2. Gere um OAuth 2.0 Client ID
 *  3. No index.html, descomente o script do Google Identity Services
 *  4. Substitua 'SEU_CLIENT_ID' abaixo e implemente o callback
 */
function handleGoogleLogin() {
  /*
   * ─── GOOGLE IDENTITY SERVICES ──────────────────────────────────
   *
   * google.accounts.id.initialize({
   *   client_id: 'SEU_CLIENT_ID.apps.googleusercontent.com',
   *   callback: (response) => {
   *     // response.credential = JWT do usuário Google
   *     fetch('/api/auth/google', {
   *       method: 'POST',
   *       headers: { 'Content-Type': 'application/json' },
   *       body: JSON.stringify({ token: response.credential }),
   *     })
   *     .then(res => res.json())
   *     .then(() => { window.location.href = '/dashboard'; });
   *   }
   * });
   *
   * google.accounts.id.prompt(); // abre o popup do Google
   * ──────────────────────────────────────────────────────────────
   */
  alert("Integre aqui o Google Identity Services com seu Client ID.");
}

/* Enter submete o formulário */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});

window.handleLogin = handleLogin;
window.togglePw = togglePw;
window.handleGoogleLogin = handleGoogleLogin;
