import React from "react";
import {firebaseApp} from "../firebase";
import Router from "./Router";
console.log(firebaseApp)

function App() {
  return (
    <Router/>
  );
}

export default App;
