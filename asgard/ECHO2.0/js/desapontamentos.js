document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("lista-desapontamentos");

    const feedbacks =
        JSON.parse(localStorage.getItem("feedbacks")) || [];

    const desapontamentos = feedbacks.filter(
        item => item.categoria === "desapontamentos"
    );

    if(desapontamentos.length === 0){

        lista.innerHTML = `
            <p class="sem-feedback">
                Nenhum desapontamento encontrado.
            </p>
        `;

        return;
    }

    desapontamentos.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("comentario-card");

        card.innerHTML = `
            <p>${item.comentario}</p>
            <small>${item.data}</small>
        `;

        lista.appendChild(card);

    });

});