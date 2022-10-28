import React, {useState} from 'react';
import { dbService } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

function Nweet({nweetObj, isOwner}) {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetRef = doc(dbService, 'nweets', `${nweetObj.id}`); //지울 쿼리의 레퍼런스를 가져옴. 파이어스토어, 콜렉션, dbID
    const Delete = async() => {
        const ok = window.confirm('Are you sure to delete?');
        if(ok) await deleteDoc(NweetRef);
    }
    const Edit = async(e) => {
        e.preventDefault();
        const ok = window.confirm('Are you sute to edit?');
        if(ok) await updateDoc(NweetRef, {text : newNweet});
        setEditing(false);
    }
    const toggleEditing = () => setEditing(prev => !prev);
    const setNewVal = (e) => setNewNweet(e.target.value);
  return (
    <div>
        {editing ? isOwner &&
        <>
            <input type="text" value={newNweet} required onChange={setNewVal}/>
            <button type='button' onClick={toggleEditing}>Cancel</button>
            <button type='submit' onClick={Edit}>Update</button>
            <br/>
        </>
        : <h4>{nweetObj.text}</h4>
        }
        {isOwner && 
        <>
            <button onClick={Delete} type='button'>Delete</button>
            {editing || <button type='button' onClick={toggleEditing}>Edit</button>}
        </>
        }
        
    </div>
  )
}

export default Nweet