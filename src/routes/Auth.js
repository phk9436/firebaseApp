import React, {useState} from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const ChangeMail = (e) => {
    setEmail(e.target.value);
  }
  const ChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      let data;
      if(newAccount) {
        data = await createUserWithEmailAndPassword( getAuth(), email, password )
      } else {
        data = await signInWithEmailAndPassword( getAuth(), email, password)
      }
      console.log(data);
    } catch(err) {
      setError(err.message);
    }
  }

  const toggleAccount = () => {
    setNewAccount(prev => !prev)
    setError(false);
  }

  const onSocialClick = async(e) => {
    let provider;
    try{
      if(e.target.name === "google") {
        provider = new GoogleAuthProvider();
      } else if(e.target.name === "github")  {
        provider = new GithubAuthProvider();
      }
      const data = await signInWithPopup(getAuth(), provider);
      console.log(data);
    } catch(err) {
      setError(err.message);
    }
    
  }

  return (
    <div style={{margin:'auto', width: 'fit-content'}}>
      <h1>{newAccount ? "회원가입" : "로그인"}</h1>
      <form action="" onSubmit={onSubmit}>
        <input type="text" placeholder='Email' required value={email} onChange={ChangeMail}/>
        <input type="password" placeholder='Password' required value={password} onChange={ChangePassword}/>
        <button type="submit">{newAccount ? 'Create Account' : 'LogIn'}</button>
      </form>
      <div>
        <button name="github" onClick={onSocialClick}>{newAccount ? 'SignUp' : 'Continue'} with Github</button>
        <button name="google" onClick={onSocialClick}>{newAccount ? 'SignUp' : 'Continue'} with Google</button>
      </div>
      <button onClick={toggleAccount}>{newAccount ? "로그인창으로" : "회원가입창으로"}</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}

export default Auth