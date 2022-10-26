import React, {useState, useEffect} from "react";
import { getAuth } from "firebase/auth";
import Router from "./Router";
import firebase, {firebaseApp} from "../firebase";

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
      <footer style={{width: 'fit-content', margin: '40px auto'}}>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
