document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPagina);



//declarando las variables//

var contenedor_login_register = document.querySelector(".contenedor__login-register");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");


//---------------funciones para las variables --------------// 

function iniciarSesion() {
    if (window.innerWidth > 768) {
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "10px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } 
    
    else {
        formulario_register.style.display = "none";  // Asegura que registro esté oculto en móviles
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "block";  // Muestra login en móviles
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 768) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } 
    
    else {
        formulario_register.style.display = "block";  // Asegura que registro esté visible en móviles
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";  // Oculta login en móviles
        caja_trasera_register.style.display = "none";    
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

function anchoPagina(){
    if(window.innerWidth > 768){
        caja_trasera_login.style.display = "block";
        caja_trasera_register.style.display = "block";
    }
    else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "0px";
    }
}
anchoPagina();
