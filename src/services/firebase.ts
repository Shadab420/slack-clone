import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Chat } from "@/types/chat";

export const firebaseConfig = {
  apiKey: "AIzaSyDYhTdZrDQJN0hS5-FC6tfmotkaUUj48Ng",
  authDomain: "slack-clone-16885.firebaseapp.com",
  projectId: "slack-clone-16885",
  storageBucket: "slack-clone-16885.appspot.com",
  messagingSenderId: "134740551111",
  appId: "1:134740551111:web:603383b42b1bfc73b0a5e2",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
