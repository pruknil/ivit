import Firebase from 'firebase';
let config = {
  apiKey: "AIzaSyCSpTT9R7BNVZisDm4TFmMZbuBeYh1tX6w",
  authDomain: "ivit-223602.firebaseapp.com",
  databaseURL: "https://ivit-223602.firebaseio.com",
  projectId: "ivit-223602",
  storageBucket: "ivit-223602.appspot.com",
  messagingSenderId: "624305427095"
};
let app = Firebase.initializeApp(config);
export const firebase = app;