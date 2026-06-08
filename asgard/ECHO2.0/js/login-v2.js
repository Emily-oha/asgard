const togglePassword =
document.getElementById("togglePassword");

const senha =
document.getElementById("senha");

togglePassword.addEventListener("click",()=>{

if(senha.type==="password"){

senha.type="text";
togglePassword.classList.replace(
"fa-eye",
"fa-eye-slash"
);

}else{

senha.type="password";
togglePassword.classList.replace(
"fa-eye-slash",
"fa-eye"
);

}

});