import { async } from '@firebase/util';
import { addDoc, collection, serverTimestamp, getDocs, query } from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { dbService } from '../firebase';

function Home() {
  const [nweet, setNweet] = useState("");
  const [nweetLi, setNweetLi] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const getNweets = async() => {
    setNweetLi([]);
    const queryList = await getDocs(query(collection(dbService, "nweets")));
    queryList.forEach((docs) => {
      const nweetObj = {...docs.data() , id:docs.id}
      setNweetLi(prev => [nweetObj, ...prev])
    })
  }
  useEffect(()=> {
    getNweets();
  }, [isSubmit])
  const onSubmit = async(e) => {
    e.preventDefault();
    try{
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createAt : serverTimestamp()
      });
      setNweet("");
      console.log(docRef)
    } catch(err) {
      console.log(err.message);
    }
    setIsSubmit((prev) => !prev);
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
            <h4 key={el.id}>{el.nweet}</h4>
            )
          })}
        </div>
      </form>
    </div>
  );
}

export default Home