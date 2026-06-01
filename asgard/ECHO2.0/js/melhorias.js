document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("lista-melhorias");

    const feedbacks =
        JSON.parse(localStorage.getItem("feedbacks")) || [];

    const melhorias = feedbacks.filter(
        item => item.categoria === "melhorias"
    );

    if(melhorias.length === 0){

        lista.innerHTML = `
            <p class="sem-feedback">
                Nenhuma sugestão de melhoria encontrada.
            </p>
        `;

        return;
    }

    melhorias.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("comentario-card");

        card.innerHTML = `
            <p>${item.comentario}</p>
            <small>${item.data}</small>
        `;

        lista.appendChild(card);

    });

});