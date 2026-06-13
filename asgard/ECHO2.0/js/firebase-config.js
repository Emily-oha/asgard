// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBs7JxlooAIcGb2toYFjPggIm5KYWKiRSU",
  authDomain: "echo-v2-7aa1c.firebaseapp.com",
  projectId: "echo-v2-7aa1c",
  storageBucket: "echo-v2-7aa1c.firebasestorage.app",
  messagingSenderId: "272119984997",
  appId: "1:272119984997:web:ac5db7048bed85e751678c"
};

const app = initializeApp(firebaseConfig);

export { app };