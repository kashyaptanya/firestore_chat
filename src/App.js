import { useEffect, useState } from 'react';
import '../src/App.css';
import { database, db, storage } from "./firebase";
import { ref, push, set, onChildAdded } from "firebase/database";
import { ref as ref_storage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc,getDocs,doc, onSnapshot } from "firebase/firestore"; 
import { dbstore } from './firebase';
import { async } from '@firebase/util';

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const [setShow] = useState(false)
  const [file, setFile] = useState("")
  const [url, setUrl] = useState("")

  // const chatListRef = ref(db, 'chat');

  // useEffect(() => {
  //   onChildAdded(chatListRef, (data) => {
  //     setChats(chats => [...chats, data.val()]);
  //     setMsg("");
  //   });
  // }, [])

  useEffect(()=>{
   fetch()
  },[])
const  fetch = async ()=>{
  const chatref =  collection(dbstore,"chatuser")
  const docsnap = await getDocs(chatref)
  docsnap.forEach(doc=>{
    console.log(doc.data())
    setChats(chats=>[...chats,doc.data()])
  })
}
  const search = () => {
    setShow(true)
  }

  // const sendimg = (e) => {
  //   if (e.target.files[0]) {
  //     setFile(e.target.files[0])
  //   }
  // }

  // const handle = () => {
  //   if (!file) {
  //     alert("Please upload an image first!");
  //     return false
  //   }
  //   const storageRef = ref_storage(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //     },
  //     (err) => console.log(err),
  //     () => {

  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         const chatRef = push(chatListRef);
  //         set(chatRef, {
  //           name, url: url
  //         });
  //       });
  //     }
  //   );
  // }
  const  sendimg = () => {

  }
  const  handle = () => {
    
  }


  const sendChat = async(e) => {
    const docRef = await addDoc(collection(dbstore, "chatuser"), {
      name,message:msg
    });
    console.log("Document written with ID: ", docRef.id);
    
    // if (msg.includes(".jpg")) {
    //   const chatRef = push(chatListRef);
    //   set(chatRef, {
    //     name, img: msg
    //   });
    // }
    // else if (!msg){
    //   alert("type msg!!")
    // }
    // else {
    //   const chatRef = push(chatListRef);
    //   set(chatRef, {
    //     name, message: msg
    //   });
    // }
    // console.log("msggg", msg)
  }

  const msgHandle = (e) => {
    setMsg(e.target.value)
  }

  return (
    <div>
      {name ? null :
        <div className='text-center p-5 '>
          <h1 className='text-primary'>Chat App</h1>
          <div className='input-group d-flex justify-content-center'>
            <input
              type="text"
              placeholder="enter name to chat..."
              onBlur={e => setName(e.target.value)}
            />
            <div className='input-group-append'>
              <button onClick={search}
                className="btn btn-outline-secondary"
                type="button">Search</button>
            </div></div>
        </div>
      }
      {name ? <div>
        <h1 className=' text-center'>User: {name}</h1>
        <div className='chat-container'>
          {
          chats.map(({c, i}) =>
            <div key={i}>
              <p className='chatbox'>
                <p>{c}</p>
                {/* <strong>{c.name} : </strong> */}
                {/* <span>{c.message}</span> */}
                {/* <img className='img' src={c.img}></img> */}
                {/* <img className='img' */}
                {/* src={c.url}></img> */}

              </p>
            </div>
          )}
          <div className='container'>
          <div class="input-group mb-3 container btm">
            <input type="text"
              className="form-control"
              placeholder="Type message"
              onChange={msgHandle}
              value={msg} />

            <div class="input-group-append">
              <button onClick={e => sendChat()} className="btn btn-outline-secondary" type="button">send</button>
            </div>
         
            <div className='right'>
            
            <label className='label' htmlFor='file'>choose</label>
            <input
            style={{display: "none"}}
              type="file"
              id='file'
              onChange={sendimg}
            />
            <button onClick={handle}>upload</button>
          </div>
        </div>
        </div>
        </div>
      </div>
        : null}
    </div>
  );
}

export default App;
