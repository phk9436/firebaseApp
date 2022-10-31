import { addDoc, collection, serverTimestamp, query,  onSnapshot, orderBy} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { dbService, storageService } from '../firebase';
import Nweet from '../components/Nweet';
import { ref, uploadString, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

function Home({userObj}) {
  const [nweet, setNweet] = useState("");
  const [nweetLi, setNweetLi] = useState([]);
  const [attach, setAttach] = useState("");

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
    let attachmentUrl = "";
    if(nweet){
      
      try{
        if(attach !== ""){
          const fileRef = ref(storageService, `${userObj.uid}/${v4()}`); //올릴 스토리지, 올릴 경로 지정
          const res = await uploadString(fileRef, attach, "data_url"); //string형태로 post시킨 후 respond 반환
          attachmentUrl = await getDownloadURL(res.ref) //반환된 레퍼런스를 다운로드 가능한 url로 반환
        }

        await addDoc(collection(dbService, "nweets"), {
          text : nweet,
          createAt : serverTimestamp(),
          userId : userObj.uid,
          attachmentUrl
        });

        setNweet("");
        setAttach("");
        
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
  
  const ClearFile = () => setAttach("")
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