import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!getApps().length && serviceAccountString) {
  try {
    const serviceAccount = JSON.parse(serviceAccountString) as ServiceAccount;
    initializeApp({
      credential: cert(serviceAccount),
    });
    console.log(
      "Firebase Admin SDK inicializado com sucesso usando variável de ambiente."
    );
  } catch (error) {
    console.error(
      "Erro ao inicializar o Firebase Admin SDK com variável de ambiente:",
      error
    );
  }
} else if (!getApps().length) {
  console.warn(
    "Firebase Admin SDK não inicializado. Variável de ambiente FIREBASE_SERVICE_ACCOUNT_KEY não encontrada."
  );
}

const db = getFirestore();
export { db };
