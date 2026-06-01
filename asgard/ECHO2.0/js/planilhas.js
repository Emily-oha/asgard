document.addEventListener("DOMContentLoaded", () => {

    const listaElogios = document.getElementById("lista-elogios");
    const listaMelhorias = document.getElementById("lista-melhorias");
    const listaDesapontamentos = document.getElementById("lista-desapontamentos");

    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    if (feedbacks.length === 0) {

        listaElogios.innerHTML =
            "<p class='sem-feedback'>Nenhum elogio encontrado.</p>";

        listaMelhorias.innerHTML =
            "<p class='sem-feedback'>Nenhuma melhoria encontrada.</p>";

        listaDesapontamentos.innerHTML =
            "<p class='sem-feedback'>Nenhum desapontamento encontrado.</p>";

        return;
    }

    feedbacks.forEach(feedback => {

        const comentario = document.createElement("div");
        comentario.classList.add("comentario-card");

        comentario.innerHTML = `
            <p>${feedback.comentario}</p>
            <small>${feedback.data}</small>
        `;

        switch(feedback.categoria){

            case "elogios":
                listaElogios.appendChild(comentario);
                break;

            case "melhorias":
                listaMelhorias.appendChild(comentario);
                break;

            case "desapontamentos":
                listaDesapontamentos.appendChild(comentario);
                break;
        }
    });

});