import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyB0TyGv--fww70JVUkJbVyCDKb8P5wt_BU",
    authDomain: "payroll-app-7d0da.firebaseapp.com",
    projectId: "payroll-app-7d0da",
    storageBucket: "payroll-app-7d0da.appspot.com",
    messagingSenderId: "220089452019",
    appId: "1:220089452019:web:0cb43c32fbca9b58e4fe86",
    measurementId: "G-ZBLY1DHBRP"
};

const app = initializeApp(firebaseConfig)

export { app }