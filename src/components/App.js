import React, {useState, useEffect} from "react";
import firebase, {firebaseApp} from "../firebase";
import { getAuth } from "firebase/auth";
import Router from "./Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const auth= getAuth();
  
  useEffect(() => {
    auth.onAuthStateChanged(user => { //user값이 변화하는 것을 감지
      user ? setIsLogged(true) : setIsLogged(false);
      setInit(true);
    });
  }, [])
  
  return (
    <>
      {init && <Router isLogged={isLogged}/>}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
