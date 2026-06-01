const selectedQuestions = document.getElementById("selected-questions");
const previewQuestions = document.getElementById("preview-questions");
const previewModal = document.getElementById("preview-modal");
const previewClose = document.getElementById("preview-close");

// Lista de perguntas
let formQuestions = [];

// Adicionar perguntas prontas
document.querySelectorAll('.question-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", () => {

        const question = {
            text: checkbox.value,
            type: checkbox.dataset.type
        };

        if (checkbox.checked) {
            formQuestions.push(question);
        } else {
            formQuestions = formQuestions.filter(q => q.text !== question.text);
        }

        renderQuestions();
    });
});

// Adicionar pergunta personalizada
document.getElementById("add-custom-btn").addEventListener("click", () => {

    const text = document.getElementById("custom-question").value.trim();
    const type = document.getElementById("custom-type").value;

    if (!text) {
        alert("Digite uma pergunta.");
        return;
    }

    formQuestions.push({ text, type });

    document.getElementById("custom-question").value = "";

    renderQuestions();
});

// Renderizar perguntas selecionadas
function renderQuestions() {

    selectedQuestions.innerHTML = "";

    formQuestions.forEach((question, index) => {

        const div = document.createElement("div");
        div.classList.add("question-card");

        div.innerHTML = `
            <p>${question.text}</p>
            <small>Tipo: ${getTypeName(question.type)}</small>
            <button onclick="removeQuestion(${index})">
                Remover
            </button>
        `;

        selectedQuestions.appendChild(div);
    });
}

// Remover pergunta
function removeQuestion(index) {
    formQuestions.splice(index, 1);
    renderQuestions();
}

window.removeQuestion = removeQuestion;

// Traduzir tipos
function getTypeName(type) {
    switch (type) {
        case "text":
            return "Texto";
        case "yesno":
            return "Sim/Não";
        case "multiple":
            return "Múltipla escolha";
        case "rating":
            return "Avaliação";
        default:
            return type;
    }
}

// Salvar formulário
document.getElementById("save-btn").addEventListener("click", () => {

    if (formQuestions.length === 0) {
        alert("Adicione pelo menos uma pergunta.");
        return;
    }

    localStorage.setItem(
        "echoFormulario",
        JSON.stringify(formQuestions)
    );

    alert("Formulário salvo com sucesso!");
});

// Visualizar formulário
document.getElementById("preview-btn").addEventListener("click", () => {

    previewQuestions.innerHTML = "";

    formQuestions.forEach(question => {

        const div = document.createElement("div");
        div.classList.add("preview-question");

        let input = "";

        switch (question.type) {

            case "text":
                input = `<input type="text" placeholder="Sua resposta">`;
                break;

            case "yesno":
                input = `
                    <label><input type="radio" name="${question.text}"> Sim</label>
                    <label><input type="radio" name="${question.text}"> Não</label>
                `;
                break;

            case "multiple":
                input = `
                    <select>
                        <option>Selecione</option>
                        <option>Sim</option>
                        <option>Não</option>
                        <option>Parcialmente</option>
                    </select>
                `;
                break;

            case "rating":
                input = `
                    <div style="font-size:24px;">
                        ★ ★ ★ ★ ★
                    </div>
                `;
                break;
        }

        div.innerHTML = `
            <p>${question.text}</p>
            ${input}
        `;

        previewQuestions.appendChild(div);
    });

    previewModal.style.display = "flex";
});

// Fechar modal
previewClose.addEventListener("click", () => {
    previewModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === previewModal) {
        previewModal.style.display = "none";
    }
});

// Carregar formulário salvo
window.addEventListener("load", () => {

    const savedForm = localStorage.getItem("echoFormulario");

    if (savedForm) {
        formQuestions = JSON.parse(savedForm);
        renderQuestions();
    }
});