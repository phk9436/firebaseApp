import { async } from '@firebase/util';
import { addDoc, collection, serverTimestamp, getDocs, query,  onSnapshot, orderBy} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { dbService } from '../firebase';
import Nweet from '../components/Nweet';

function Home({userObj}) {
  const [nweet, setNweet] = useState("");
  const [nweetLi, setNweetLi] = useState([]);
  const [attach, setAttach] = useState(null);

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
  }, []);

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

  const onChange = (e) => setNweet(e.target.value);

  const FileChange = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = (result) => setAttach(result.currentTarget.result);
  }
  
  const ClearFile = () => setAttach(null)
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} value={nweet}/><br/>
        <input type="file" accept='image/*' onChange={FileChange}/><br/>
        {attach && 
        <div>
          <img src={attach} alt="" style={{width: '100px', height: '100px', objectFit: 'cover'}}/><br/>
          <button type='button' onClick={ClearFile}>Clear</button>
        </div>}
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