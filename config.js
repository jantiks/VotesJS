import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";  
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAL6ZRwfPrgVMo_rSvkIndc1gRp9z0sj3E",
    authDomain: "votingapp-42156.firebaseapp.com",
    projectId: "votingapp-42156",
    storageBucket: "votingapp-42156.appspot.com",
    messagingSenderId: "671671249502",
    appId: "1:671671249502:web:7258278fe4ddb21d6a62cf",
    measurementId: "G-YQZX6ZXJ5H"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);  
  export { db };