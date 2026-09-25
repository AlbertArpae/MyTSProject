import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChrN6BuRKnjjepVVmCl_Ija0b60U5QhC4",
  authDomain: "fir-test-38656.firebaseapp.com",
  projectId: "fir-test-38656",
  storageBucket: "fir-test-38656.firebasestorage.app",
  messagingSenderId: "489799959490",
  appId: "1:489799959490:web:1c8826f3e4eeae57140c5b",
  measurementId: "G-8ESBRL3D9W"
};

// Inizializzazione
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collegamento agli elementi dell'interfaccia HTML
const inputNota = document.getElementById("notaInput") as HTMLInputElement;
const btnSalva = document.getElementById("salvaBtn") as HTMLButtonElement;
const listaNote = document.getElementById("listaNote") as HTMLUListElement;

// 1. Scrittura: invia un nuovo documento a Firestore
btnSalva.addEventListener("click", async () => {
  const testo = inputNota.value;
  if (testo.trim() === "") return;

  try {
    await addDoc(collection(db, "note"), {
      testo: testo,
      creatoIl: new Date()
    });
    inputNota.value = "";
  } catch (errore) {
    console.error("Errore durante il salvataggio:", errore);
  }
});

// 2. Lettura in Tempo Reale: si attiva automaticamente quando i dati cambiano sul Cloud
onSnapshot(collection(db, "note"), (snapshot) => {
  listaNote.innerHTML = ""; // Pulisce la lista visibile
  snapshot.forEach((doc) => {
    const dato = doc.data();
    const li = document.createElement("li");
    li.textContent = dato.testo;
    listaNote.appendChild(li);
  });
});