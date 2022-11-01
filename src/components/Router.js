import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
//  import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navi from "./Navi";
import { getAuth, updateProfile } from "firebase/auth";
import { useRecoilState } from "recoil";
import { nameUpdated } from "../atoms";

function Router() {
  const [userObj, setUserObj] = useState(null);
  const auth = getAuth();
  const [isNameUpdated, setIsNameUpdated] = useRecoilState(nameUpdated);
  const isLogged = Boolean(userObj);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //user값이 변화하는 것을 감지
      if (user) {
        if (user.displayName === null) {
          const ind = user.email.indexOf("@");
          const end = user.email.substring(0, ind);
          updateProfile(user, { displayName: end });
        }

        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
    });
  }, [isNameUpdated]);

  return (
    <BrowserRouter>
      {isLogged && <Navi userObj={userObj} />}
      <Routes>
        {isLogged ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
