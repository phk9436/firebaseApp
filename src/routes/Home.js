import { async } from '@firebase/util';
import { addDoc, collection, serverTimestamp, getDocs, query,  onSnapshot, orderBy} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { dbService } from '../firebase';
import Nweet from '../components/Nweet';

function Home({userObj}) {
  const [nweet, setNweet] = useState("");
  const [nweetLi, setNweetLi] = useState([]);
  const getNweets = () => {
    const queryList = query(collection(dbService, "nweets"), orderBy("createAt"));
    onSnapshot(queryList, (snapshot) => { //query로 받은 데이터리스트에 변화가 생길 시 작동
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
    if(nweet){
      try{
        await addDoc(collection(dbService, "nweets"), {
          text : nweet,
          createAt : serverTimestamp(),
          userId : userObj.uid
        });
        setNweet("");
      } catch(err) {
        console.log(err.message);
      }
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
            return <Nweet key = {el.id} nweetObj = {el} isOwner = {el.userId === userObj.uid}/>
          })}
        </div>
      </form>
    </div>
  );
}

export default Home