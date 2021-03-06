import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
class Firebase{
    FIREBASE_CONFIG = {
      apiKey: "AIzaSyDVuj1mQXiQq0AVkMdS-wXiXt3Zmp6WHWo",
      authDomain: "fir-chat-ae8e1.firebaseapp.com",
      projectId: "fir-chat-ae8e1",
      storageBucket: "fir-chat-ae8e1.appspot.com",
      messagingSenderId: "41929320737",
      appId: "1:41929320737:web:c4636dd13f5041f3bfb660"
    };

    firebase = firebase
    auth:firebase.auth.Auth
    database:firebase.database.Database
    storage:firebase.storage.Storage

    constructor(){
      firebase.initializeApp( this.FIREBASE_CONFIG );
      firebase.analytics();
      this.auth = this.firebase.auth();
      this.database = this.firebase.database();
      this.storage = this.firebase.storage();
    }
}

const myFirebase = new Firebase();

export default myFirebase;