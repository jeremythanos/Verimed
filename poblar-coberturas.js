// 📂 poblar-coberturas.js
import { db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const segurosEjemplo = {
    humana: {
        Doctores: [
            "Dr. Pérez 👨⚕️ (Cardiólogo)", 
            "Dra. García 👩⚕️ (Pediatra)",
            "Dr. Rodríguez 🧑⚕️ (Dermatólogo)",
            "Dra. Martínez 👩⚕️ (Ginecóloga)",
            "Dr. López 👨⚕️ (Ortopedista)"
        ],
        Medicamentos: [
            "Paracetamol 💊 (Analgésico)", 
            "Ibuprofeno 🌡️ (Antiinflamatorio)",
            "Omeprazol 🧪 (Gastroprotector)",
            "Loratadina 🌼 (Antialérgico)",
            "Amoxicilina 🦠 (Antibiótico)"
        ],
        Examenes: [
            "Ultrasonido abdominal 🩺", 
            "Analítica sanguínea completa 💉",
            "Radiografía de tórax 📷",
            "Colonoscopía virtual 🔍",
            "Prueba de esfuerzo cardiaco ❤️"
        ]
    },
    banreservas: {
        Doctores: [
            "Dr. Sánchez 👨⚕️ (Neurólogo)", 
            "Dra. Vargas 👩⚕️ (Endocrinóloga)",
            "Dr. Herrera 🧑⚕️ (Oftalmólogo)",
            "Dra. Peña 👩⚕️ (Reumatóloga)",
            "Dr. Jiménez 👨⚕️ (Urólogo)"
        ],
        Medicamentos: [
            "Losartán ❤️ (Hipertensión)", 
            "Metformina 🩸 (Diabetes)",
            "Atorvastatina 💊 (Colesterol)",
            "Diclofenaco 🦴 (Antiinflamatorio)",
            "Salbutamol 🌬️ (Asma)"
        ],
        Examenes: [
            "Resonancia magnética 🧲", 
            "Electroencefalograma 🧠",
            "Prueba de alergias 🌸",
            "Ecocardiograma Doppler ❤️",
            "Densitometría ósea 🦴"
        ]
    },
    mapfre: {
        Doctores: [
            "Dra. Gómez 👩⚕️ (Oncóloga)", 
            "Dr. Santana 👨⚕️ (Traumatólogo)",
            "Dra. Díaz 👩⚕️ (Neumóloga)",
            "Dr. Cruz 👨⚕️ (Nefrólogo)",
            "Dra. Ortega 👩⚕️ (Hematóloga)"
        ],
        Medicamentos: [
            "Insulina 💉 (Diabetes)", 
            "Warfarina 🩸 (Anticoagulante)",
            "Levotiroxina 🦋 (Tiroides)",
            "Sertralina 🧠 (Antidepresivo)",
            "Tamsulosina 🚹 (Próstata)"
        ],
        Examenes: [
            "Tomografía PET/CT 🧪", 
            "Endoscopía digestiva 🔍",
            "Prueba de función pulmonar 🌬️",
            "Mamografía digital 📷",
            "Artroscopia 🦵"
        ]
    },
    ARS: {
        Doctores: [
            "Dr. Mesa 👨⚕️ (Infectólogo)", 
            "Dra. Rojas 👩⚕️ (Psiquiatra)",
            "Dr. Nuñez 👨⚕️ (Cirujano plástico)",
            "Dra. Castro 👩⚕️ (Nutrióloga)",
            "Dr. Medina 👨⚕️ (Medicina interna)"
        ],
        Medicamentos: [
            "Dexametasona 💉 (Antiinflamatorio)", 
            "Clopidogrel ❤️ (Anticoagulante)",
            "Esomeprazol 🧪 (Gástrico)",
            "Venlafaxina 🧠 (Ansiolítico)",
            "Finasterida 🚹 (Cabello)"
        ],
        Examenes: [
            "Prueba COVID-19 PCR 🦠", 
            "Perfil tiroideo completo 🦋",
            "Colonoscopía tradicional 🔍",
            "Ecografía obstétrica 🤰",
            "Prueba de VIH 🩸"
        ]
    }
};

async function cargarCoberturas() {
    try {
        for (const [nombreSeguro, datos] of Object.entries(segurosEjemplo)) {
            await setDoc(doc(db, "coberturas", nombreSeguro), datos);
        }
        console.log("✅ ¡Datos cargados con éxito!");
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

cargarCoberturas();

// 📌 Función para agregar un nuevo seguro
async function agregarSeguro(nombreSeguro, datos) {
    try {
        await setDoc(doc(db, "coberturas", nombreSeguro), datos);
        console.log(`🆕 ${nombreSeguro} agregado!`);
    } catch (error) {
        console.error("💥 Error agregando:", error);
    }
}

// Ejemplo de uso:
agregarSeguro("seguro-nuevo", {
    Doctores: ["Dr. Ejemplo 👨⚕️"],
    Medicamentos: ["Medicina Nueva 💊"],
    Examenes: ["Prueba Innovadora 🧪"]
});