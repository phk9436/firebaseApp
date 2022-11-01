import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { dbService } from '../firebase';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';

function Profile({ userObj, refreshUser }) {
  const [nweetLi, setNweetLi] = useState([]);
  const [isupdate, setIsupdate] = useState(false);
  const [changeName, setChangeName] = useState('');

  useEffect(() => {
    getMyNweets();
  }, []);

  const getMyNweets = async() => {
    setNweetLi([]);
    const nweets = query(collection(dbService, 'nweets'), where('userId', "==", userObj.uid), orderBy('createAt')); //전자 중에서 후자와 일치하는 것을 골라라
    const queryDocs = await getDocs(nweets); //쿼리 안의 데이터들을 가져옴
    queryDocs.forEach( doc =>{
      const nweetObj = {...doc.data(), id:doc.id}
      setNweetLi(prev => [nweetObj, ...prev])
    });
  }
  
  const onSubmit = async(e) => {
    e.preventDefault();
    if(!isupdate) {
      if(userObj.displayName !== changeName){
        await updateProfile(getAuth().currentUser, {displayName : changeName});
        refreshUser();
      }
    setChangeName('');
    }
  }

  const onButtonClick = () => setIsupdate(!isupdate);

  const onchangeName = (e) => setChangeName(e.target.value);
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <h3>{`${userObj.displayName}님, 안녕하세요`}</h3>
        {isupdate && <input type="text" value={changeName} onChange={onchangeName} />}
        <button type='submit' onClick={onButtonClick}>닉네임 변경</button>
      </form>
      
      
      {nweetLi.map((el)=> {
        return (
          <div key={el.id}>
          <h4>{el.text}</h4>
          {el.attachmentUrl && <img src={el.attachmentUrl} alt="" style={{width: '100px', height: '100px', objectFit: 'cover'}}/>}
          </div>
        )
      })}
    </div>
  );
}

export default Profile