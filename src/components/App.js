import React, {useState, useEffect} from "react";
import firebase, {firebaseApp} from "../firebase";
import { getAuth } from "firebase/auth";
import Router from "./Router";

function App() {
  const auth= getAuth();
  console.log(auth.currentUser)
  const [isLogged, setIsLogged] = useState(auth.currentUser);
  return (
    <>
     <Router isLogged={isLogged}/>
     <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
