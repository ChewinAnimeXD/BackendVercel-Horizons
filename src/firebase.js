import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyAxnePsOIrBj1JbVZAJBOaKtaemHeDTf7Y",
  authDomain: "cargar-imagenes-horizons-88e0f.firebaseapp.com",
  projectId: "cargar-imagenes-horizons-88e0f",
  storageBucket: "cargar-imagenes-horizons-88e0f.appspot.com",
  messagingSenderId: "530735236465",
  appId: "1:530735236465:web:16a9794b4dab66367fa2d0",
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
