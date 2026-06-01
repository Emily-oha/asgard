document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("lista-elogios");

    const feedbacks =
        JSON.parse(localStorage.getItem("feedbacks")) || [];

    const elogios = feedbacks.filter(
        item => item.categoria === "elogios"
    );

    if(elogios.length === 0){

        lista.innerHTML = `
            <p class="sem-feedback">
                Nenhum elogio encontrado.
            </p>
        `;

        return;
    }

    elogios.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("comentario-card");

        card.innerHTML = `
            <p>${item.comentario}</p>
            <small>${item.data}</small>
        `;

        lista.appendChild(card);

    });
    function limparFeedbacks() {

    if(confirm("Deseja apagar todos os feedbacks?")){

        localStorage.removeItem("feedbacks");

        alert("Feedbacks apagados!");

        location.reload();
    }
}

});