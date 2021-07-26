import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDcju2bEZTSIwj6ZzsItgA36a3kvXpVdOs",
  authDomain: "doandanganh-68058.firebaseapp.com",
  databaseURL: "https://doandanganh-68058-default-rtdb.firebaseio.com",
  projectId: "doandanganh-68058",
  storageBucket: "doandanganh-68058.appspot.com",
  messagingSenderId: "798898998810",
  appId: "1:798898998810:web:167f51838cbb893d638ba3",
  measurementId: "G-E41MDVQDE6",
};
// Initialize Firebase
const FirebaseConfig = firebase.initializeApp(firebaseConfig);
export const db = FirebaseConfig.database();
