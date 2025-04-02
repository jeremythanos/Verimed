import { app } from './firebase-config.js';
import { 
    getAuth, 
    signOut,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";



const auth = getAuth(app);
const db = getFirestore(app);



// Elementos del formulario de LOGIN
const emailLoginInput = document.querySelector(".formulario__login input[type='email']");
const passwordLoginInput = document.querySelector(".formulario__login input[type='password']");
const loginButton = document.querySelector(".formulario__login button");

// Elementos del formulario de REGISTRO
const fullNameRegisterInput = document.querySelector(".formulario__register input:nth-child(2)");
const emailRegisterInput = document.querySelector(".formulario__register input[type='email']");
const usernameRegisterInput = document.querySelector(".formulario__register input:nth-child(4)");
const passwordRegisterInput = document.querySelector(".formulario__register input[type='password']");
const registerButton = document.querySelector(".formulario__register button");

// ========== LOGIN ==========
loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const email = emailLoginInput.value;
    const password = passwordLoginInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Usuario autenticado:", userCredential.user);
            window.location.href = "index-test.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            switch (errorCode) {
                case "auth/user-not-found":
                    alert("Usuario no encontrado. Verifica tu correo electrónico.");
                    break;
                case "auth/wrong-password":
                    alert("Contraseña incorrecta. Inténtalo de nuevo.");
                    break;
                case "auth/too-many-requests":
                    alert("Demasiados intentos fallidos. Inténtalo más tarde.");
                    break;
                default:
                    alert("Error de inicio de sesión: " + errorMessage);
            }
            console.error("Error de login:", error);
        });
});

// ========== REGISTRO ==========
registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    // 1. Crear usuario en Firebase Auth
    const email = emailRegisterInput.value;
    const password = passwordRegisterInput.value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            console.log("Usuario registrado:", userCredential.user);
            
            // 2. Guardar datos adicionales en Firestore
            try {
                await setDoc(doc(db, "usuarios", userCredential.user.uid), {
                    nombreCompleto: fullNameRegisterInput.value,
                    usuario: usernameRegisterInput.value,
                    email: email,
                    fechaRegistro: new Date(),
                    telefono: "",
                    seguro: "Básico", // Valor por defecto
                    plan: "Individual",
                    poliza: "VM-" + Math.floor(1000 + Math.random() * 9000) // Ejemplo: VM-1234
                });
                
                // 3. Redirigir solo si todo sale bien
                window.location.href = "index-test.html";
                
            } catch (firestoreError) {
                console.error("Error en Firestore:", firestoreError);
                alert("Error al guardar datos adicionales");
            }
        })
        .catch((authError) => {
            const errorCode = authError.code;
            const errorMessage = authError.message;
            
            switch (errorCode) {
                case "auth/email-already-in-use":
                    alert("Este correo electrónico ya está en uso.");
                    break;
                case "auth/weak-password":
                    alert("La contraseña debe tener al menos 6 caracteres.");
                    break;
                case "auth/invalid-email":
                    alert("Correo electrónico inválido.");
                    break;
                default:
                    alert("Error de registro: " + errorMessage);
            }
            console.error("Error de registro:", authError);
        });
});

// ==================== CERRAR SESIÓN ====================
    document.getElementById('btnCerrarSesion').addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                alert('Sesión cerrada correctamente');
                window.location.href = 'login-test.html'; // Redirigir al login
            })
            .catch((error) => {
                alert(`Error al cerrar sesión: ${error.message}`);
                console.error("Error:", error);
            });
    });