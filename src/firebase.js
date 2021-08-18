import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBbwFzFy_usd3fiNAxbmQB_0r1m3uTaHoI",
  authDomain: "simplechat-f849a.firebaseapp.com",
  projectId: "simplechat-f849a",
  storageBucket: "simplechat-f849a.appspot.com",
  messagingSenderId: "134544972039",
  appId: "1:134544972039:web:e76a4d260b9c905c5f4da2",
};

firebase.initializeApp(firebaseConfig);
const { database } = firebase;

const readMessages = (cb) =>
  database()
    .ref("messages")
    .on("value", (data) => cb(data.val()));

const send = (alias, message) =>
  database().ref(`messages/${new Date().getTime()}`).set({
    alias,
    message,
  });

export { readMessages, send };
