import React, {useState, useEffect} from "react";
import { getAuth } from "firebase/auth";
import Router from "./Router";
import firebase, {firebaseApp} from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth= getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(user => { //user값이 변화하는 것을 감지
      if(user) setUserObj(user);
      setInit(true);
    });
  }, [])
  
  return (
    <>
      {init ? 
      <Router isLogged={Boolean(userObj)} userObj={userObj}/> : 
      <h1>Loadding...</h1>}
    </>
  );
}

export default App;
