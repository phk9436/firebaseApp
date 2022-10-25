import * as firebase from "firebase/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const {initializeApp} = firebase;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
  };

  export const firebaseApp = initializeApp(firebaseConfig);
  export default firebase;