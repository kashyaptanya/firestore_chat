import { useEffect, useState } from 'react';
import '../src/App.css';
import { storage } from "./firebase";
import { ref as ref_storage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { dbstore } from './firebase';

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const [setShow] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    const chatref = collection(dbstore, "chatuser")
    onSnapshot(chatref, docSnap => {
      let messages = []
      docSnap.forEach(doc => {
        messages.push(doc.data())
      })
      setChats(messages)
      setMsg("")
    })
  }, [])

  const search = () => {
    setShow(true)
  }

  const sendimg = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handle = () => {
    if (!file) {
      alert("Please upload an image first!");
      return false
    }
    const storageRef = ref_storage(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (err) => console.log(err),
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url)
          const docRef = addDoc(collection(dbstore, "chatuser"), {
            name, url: url
          }); console.log("Document written with ID: ", docRef.id);
        });
      }
    );
  }

  const sendChat = async (e) => {
    if (msg.includes(".jpg")) {
      const docRef = await addDoc(collection(dbstore, "chatuser"), {
        name, img: msg
      });
      console.log("Document written with ID: ", docRef.id);
    }
    else if (!msg) {
      alert("type msg!!")
    }
    else {
      const docRef = await addDoc(collection(dbstore, "chatuser"), {
        name, message: msg
      });
      console.log("Document written with ID: ", docRef.id)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
      sendChat()
      // if (msg.includes(".jpg")) {
      //   const docRef =  addDoc(collection(dbstore, "chatuser"), {
      //     name, img: msg
      //   });
      //   // console.log("Document written with ID: ", docRef.id);
      // }
      // else if (!msg) {
      //   alert("type msg!!")
      // }
      // else {
      //   const docRef =  addDoc(collection(dbstore, "chatuser"), {
      //     name, message: msg
      //   });
      //   // console.log("Document written with ID: ", docRef.id)
      // }

    }
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
      {name ? 
      <div className='full-box'>
        <div className='full'>
        <h1 className=' text-center'>User: {name}</h1>
        <div className='chat-container'>
          <div className='box'>
          {chats.map((c, i) =>
            <div key={i} className={`container ${c.name === name ? 'me' : ""}`}>
              <p className='chatbox'>
                <strong>{c.name} : </strong>
                <span>{c.message}</span>
                <img className='img' src={c.img}></img>
                <img className='img'
                  src={c.url}></img>
              </p>
              </div>
          )} </div>
          <div className='container'>
            <div className="input-group mb-3 container btm">
              <input type="text"
                className="form-control"
                placeholder="Type message"
                onChange={msgHandle}
                onKeyDown={handleKeyDown}
                value={msg} />

              <div className="input-group-append">
                <button onClick={e => sendChat()}
            
                className="btn btn-outline-secondary" type="button">send</button>
              </div>

              <div className='right'>
                <label className='label' htmlFor='file'>choose</label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id='file'
                  onChange={sendimg}
                />
                <button onClick={handle}>upload</button>
              </div>
            </div>
          </div>
        </div>
      </div></div>
        : null
      }
    </div>
  );
}

export default App;
