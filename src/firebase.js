import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import dotenv from 'dotenv'

dotenv.config()

const firebaseConfig = {
    apiKey: "AIzaSyA8vgRF4vbiurQoeZ_fNrv5_7JKTxmcHjE",
    authDomain: "cargar-imagenes-horizons.firebaseapp.com",
    projectId: "cargar-imagenes-horizons",
    storageBucket: "cargar-imagenes-horizons.appspot.com",
    messagingSenderId: "98256147001",
    appId: "1:98256147001:web:68b33fe62660dc11dfb3e8"
  };

const firebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp)