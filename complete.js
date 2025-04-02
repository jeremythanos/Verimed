// Inicialización de Firebase (asegúrate de tener tus configuraciones)
import { auth, db } from './firebase-config.js';
import { 
    doc,
    setDoc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

document.getElementById('formVerificacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado");
        console.log("[DEBUG] Usuario autenticado:", user); // ✔️ Verifica si el usuario existe

        // Obtener valores del formulario
        const usuarioData = {
            nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            cedula: document.getElementById('cedula').value.trim(),
            seguro: document.getElementById('seguro').value,
            idSeguro: document.getElementById('idSeguro').value.trim(),
            fechaVencimiento: Timestamp.fromDate(new Date(document.getElementById('fechaVencimiento').value)),
            datosCompletos: true,
            fechaActualizacion: Timestamp.now()
        };
        console.log("[DEBUG] Datos del formulario:", usuarioData); // ✔️ ¿Los datos se capturan bien?

        // Validación básica
        if (!usuarioData.idSeguro || !usuarioData.nombreCompleto) {
            throw new Error("Por favor complete todos los campos requeridos");
        }

        // Guardar en Firestore
        await setDoc(doc(db, "verificacion", user.uid), usuarioData);
        console.log("[DEBUG] Datos guardados exitosamente"); // ✔️ Confirma que llega aquí
        
        // Redirigir a Mi Perfil
        window.location.href = 'miperfil-test.html';
        
    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Error: " + error.message);
    }

});

// Cargar seguros disponibles (opcional)
async function cargarSeguros() {
    // Puedes implementar esto si los seguros vienen de Firestore
}