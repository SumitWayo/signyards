import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDROJgk8gZRHcY9QqZcw-Yk1GctJLU_yPc",
  authDomain: "signyard-b342c.firebaseapp.com",
  projectId: "signyard-b342c",
  storageBucket: "signyard-b342c.appspot.com",
  messagingSenderId: "176659539973",
  appId: "1:176659539973:web:ff2d24ac0c3314d93a546c",
  measurementId: "G-M3XQFJPTRV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
