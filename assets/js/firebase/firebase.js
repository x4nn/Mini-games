// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFMRm76FrNOQ78pMB-rMcTDmWygs4wNDA",
    databaseURL: "https://mini-games-dbmn-default-rtdb.europe-west1.firebasedatabase.app/",
    authDomain: "mini-games-dbmn.firebaseapp.com",
    projectId: "mini-games-dbmn",
    storageBucket: "mini-games-dbmn.appspot.com",
    messagingSenderId: "622358331347",
    appId: "1:622358331347:web:2313abef35326ecced7926",
    measurementId: "G-WL5D0E751M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(app);
const db = firebase.database();
const pathData = db.ref('mini-games');

function logData() {
    pathData.on('value', (ss) => {
        console.log(ss.val());
    });
}

function test() {
    pathData.set("kyanobigdig");

}

function AddTerm() {
    firebase.database().ref("mini-games/data/test").set({
        
        test1: "1",
        test2: "2",
        test3: "3"
    });
}

AddTerm();


export { logData };
