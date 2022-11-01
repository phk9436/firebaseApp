import React, {useState, useEffect} from "react";
import { getAuth, updateProfile } from "firebase/auth";
import Router from "./Router";
import firebase, {firebaseApp} from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth= getAuth();
  console.log(auth.currentUser)
  useEffect(() => {
    auth.onAuthStateChanged(user => { //user값이 변화하는 것을 감지
      if(user) { 

        if(user.displayName === null){
          const ind = user.email.indexOf("@");
          const end = user.email.substring(0,ind);
          updateProfile(user, {displayName:end});
        }

        setUserObj({
          displayName : user.displayName,
          uid : user.uid
        });

      } else {
        setUserObj(null)
      };
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj({
      displayName : auth.currentUser.displayName,
      uid : auth.currentUser.uid
    })
  }
  
  return (
    <>
      {init ? 
      <Router isLogged={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/> : 
      <h1>Loadding...</h1>}
    </>
  );
}

export default App;
