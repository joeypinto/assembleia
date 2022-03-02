import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC0RI1dag6LQrIzsHF0l8GSMH321G3CEU4",
    authDomain: "assembleia-st.firebaseapp.com",
    databaseURL: "https://assembleia-st-default-rtdb.firebaseio.com",
    projectId: "assembleia-st",
    storageBucket: "assembleia-st.appspot.com",
    messagingSenderId: "202400716766",
    appId: "1:202400716766:web:e4b35a80d124cabcdaef4f",
    measurementId: "G-5KN7PH4FY0"
  };


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default app