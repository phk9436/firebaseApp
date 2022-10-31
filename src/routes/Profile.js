import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { dbService } from '../firebase';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';

function Profile({ userObj }) {
  const [nweetLi, setNweetLi] = useState([]);

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
  return (
    <div>
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