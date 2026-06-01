function enviarFeedback(){

    const categoria =
        document.getElementById("categoria").value;

    const comentario =
        document.getElementById("comentario").value.trim();

    if(!comentario){
        alert("Digite um comentário.");
        return;
    }

    let feedbacks =
        JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbacks.push({
        categoria,
        comentario,
        data: new Date().toLocaleString()
    });

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
    );

    alert("Feedback enviado!");

    document.getElementById("comentario").value = "";
    function enviarFeedback() {

    const categoria = document.getElementById("categoria").value;
    const comentario = document.getElementById("comentario").value;

    if(comentario.trim() === ""){
        alert("Digite um comentário.");
        return;
    }

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbacks.push({
        categoria: categoria,
        comentario: comentario,
        data: new Date().toLocaleString("pt-BR")
    });

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
    );

    alert("Feedback enviado com sucesso!");

    document.getElementById("comentario").value = "";
}
}