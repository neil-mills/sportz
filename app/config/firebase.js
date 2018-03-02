import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyAhauG8QmBdgQDg8K4Oi7-1AYdPNMKpUEw",
    authDomain: "sportz-932cd.firebaseapp.com",
    databaseURL: "https://sportz-932cd.firebaseio.com",
    projectId: "sportz-932cd",
    storageBucket: "sportz-932cd.appspot.com",
    messagingSenderId: "146515996646"
};
firebase.initializeApp(config)

export const ref = firebase.database().ref() //ref to firebase database
export const firebaseAuth = firebase.auth //firebath authentication object
