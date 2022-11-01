import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Navi({ userObj }) {
  const navigate = useNavigate();
  const onLogOut = () => {
    getAuth().signOut();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}의 Profile</Link>
        </li>
        <li>
          <button onClick={onLogOut}>LogOut</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navi;
