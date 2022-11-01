import React from "react";
import Router from "./Router";
import firebase, { firebaseApp } from "../firebase";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </>
  );
}

export default App;
