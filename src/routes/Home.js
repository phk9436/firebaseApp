import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, {useState} from 'react';
import { dbService } from '../firebase';

function Home() {
  const [nweet, setNweet] = useState("");
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
  }
  const onChange = (e) => {
    setNweet(e.target.value)
  }
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} value={nweet}/>
        <button type='submit'>Nweet</button>
      </form>
    </div>
  );
}

export default Home