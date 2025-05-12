import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "@/lib/serviceAccountKey.json";
import type { ServiceAccount } from "firebase-admin";

console.log("Conteúdo da conta de serviço:", serviceAccount); // Adicione este log

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
    console.log("Firebase Admin SDK inicializado com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar o Firebase Admin SDK:", error);
  }
}

const db = getFirestore();
export { db };
