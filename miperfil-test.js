// 📁 miperfil-test.js
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"; // Auth
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"; // Firestore

// 🎯 Objeto mágico de elementos del DOM
const elementosPerfil = {
    nombreUsuario: document.getElementById('nombreUsuario'),
    telefono: document.getElementById('telefono'),
    cedulaUsuario: document.getElementById('cedulaUsuario'),
    seguroUsuario: document.getElementById('seguroUsuario'),
    idSeguroUsuario: document.getElementById('idSeguroUsuario'),
    fechaVencimientoUsuario: document.getElementById('fechaVencimientoUsuario'),
    doctores: document.getElementById('doctores'),
    medicamentos: document.getElementById('medicamentos'),
    examenes: document.getElementById('examenes')
};

// 🌟 Función estrella: Carga los datos del perfil
const cargarPerfilDinamico = async () => {
    const usuario = auth.currentUser;
    
    if (!usuario) {
        window.location.href = 'login-test.html';
        return;
    }

    try {
        // 🔥 Paso 1: Obtener datos de verificación
        const docVerificacion = await getDoc(doc(db, "verificacion", usuario.uid));
        
        if (!docVerificacion.exists()) {
            alert("¡Primero completa tu información en el formulario! 📝");
            window.location.href = 'complete.html';
            return;
        }

        const datosUsuario = docVerificacion.data();
        
        // ✨ Paso 2: Pintar datos básicos
        elementosPerfil.nombreUsuario.textContent = datosUsuario.nombreCompleto || "👤 No disponible";
        elementosPerfil.telefono.textContent = datosUsuario.telefono || "📞 Sin registrar";
        elementosPerfil.cedulaUsuario.textContent = datosUsuario.cedula || "🆔 Sin especificar";
        elementosPerfil.seguroUsuario.textContent = datosUsuario.seguro.toUpperCase() + " 🛡️";
        elementosPerfil.idSeguroUsuario.textContent = datosUsuario.idSeguro || "🔢 N/A";

        // 📅 Fecha formateada (ej: "15 de Julio de 2024")
        elementosPerfil.fechaVencimientoUsuario.textContent = 
            datosUsuario.fechaVencimiento?.toDate().toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) || "📅 Sin fecha registrada";

        // 🏥 Paso 3: Cargar cobertura específica
        if (datosUsuario.seguro) {
            const docCobertura = await getDoc(doc(db, "coberturas", datosUsuario.seguro));
            
            if (docCobertura.exists()) {
                const cobertura = docCobertura.data();
                
                // 👨⚕️ Doctores (lista con viñetas)
                elementosPerfil.doctores.innerHTML = cobertura.Doctores?.map(doc => `• ${doc}`).join('<br>') || "👨⚕️ No hay doctores registrados";
                
                // 💊 Medicamentos (lista con viñetas)
                elementosPerfil.medicamentos.innerHTML = cobertura.Medicamentos?.map(med => `• ${med}`).join('<br>') || "💊 No hay medicamentos registrados";
                
                // 🩺 Exámenes (lista con viñetas)
                elementosPerfil.examenes.innerHTML = cobertura.Examenes?.map(ex => `• ${ex}`).join('<br>') || "🩺 No hay exámenes registrados";
            }
        }

    } catch (error) {
        console.error("💥 Error crítico:", error);
        alert(`¡Algo salió mal! 😱\n${error.message}`);
    }
};

// 👀 Vigilante de autenticación
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'login-test.html';
    } else {
        cargarPerfilDinamico();
    }
});

// 📁 miperfil-test.js (agrega esto al final del archivo, después de las funciones de Firebase)
document.getElementById('btnCompartir').addEventListener('click', compartirPerfil);

function compartirPerfil() {
    const nombreUsuario = document.getElementById('nombreUsuario').textContent;
    const telefono = document.getElementById('telefono').textContent;
    const seguro = document.getElementById('seguroUsuario').textContent;

    // Texto para compartir (personalízalo)
    const texto = `👤 ${nombreUsuario}\n📞 ${telefono}\n🛡️ ${seguro}\n\nMi perfil médico en VeriMed: ${window.location.href}`;

    // Verifica si el navegador soporta la Web Share API (móviles)
    if (navigator.share) {
        navigator.share({
            title: 'Mi Perfil Médico',
            text: texto,
            url: window.location.href,
        })
        .catch(err => {
            console.error('Error al compartir:', err);
            copiarAlPortapapeles(texto); // Fallback si falla
        });
    } else {
        copiarAlPortapeles(texto); // Fallback para navegadores sin soporte
    }
}

// Función fallback: Copiar al portapapeles
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert('✔ Perfil copiado al portapapeles. Pégalo donde lo necesites.');
        })
        .catch(err => {
            console.error('Error al copiar:', err);
            alert('No se pudo copiar el perfil. Intenta manualmente.');
        });
}

