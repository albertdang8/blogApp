import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB77QYUf_6OcdviofBI3PGONF_nCtk9T0A",
    authDomain: "blogapp-248aa.firebaseapp.com",
    projectId: "blogapp-248aa",
    storageBucket: "blogapp-248aa.appspot.com",
    messagingSenderId: "229406200800",
    appId: "1:229406200800:web:a8166cfa52ae5b5714d185",
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);