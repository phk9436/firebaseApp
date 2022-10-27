import { async } from '@firebase/util';
import { addDoc, collection, serverTimestamp, getDocs, query,  onSnapshot, orderBy} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { dbService } from '../firebase';

function Home({userObj}) {
  const [nweet, setNweet] = useState("");
  const [nweetLi, setNweetLi] = useState([]);
  const getNweets = () => {
    const queryList = query(collection(dbService, "nweets"), orderBy("createAt"));
    onSnapshot(queryList, (snapshot) => {
      const nweetObj = snapshot.docs.map((docs) => ({
          ...docs.data(),
          id : docs.id
      }));
      setNweetLi(nweetObj)
    });
  }
  useEffect(()=> {
    getNweets();
  }, [])
  const onSubmit = async(e) => {
    e.preventDefault();
    try{
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text : nweet,
        createAt : serverTimestamp(),
        userId : userObj.uid
      });
      setNweet("");
    } catch(err) {
      console.log(err.message);
    }
  }
  const onChange = (e) => {
    setNweet(e.target.value)
  }
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} value={nweet}/>
        <button type='submit'>Nweet</button>
        <div>
          {nweetLi.map((el) => {
            return (
            <h4 key={el.id}>{el.text}</h4>
            )
          })}
        </div>
      </form>
    </div>
  );
}

export default Home