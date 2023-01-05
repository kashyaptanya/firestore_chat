import { useState } from "react"

function New() {
    const [value, setValue] = useState("tanya")
    const [user, setUuser] = useState({
        name: "",
        phone: "",
        age: ""
    })

    const model = [
        {
            type: "1",
            name: "tanya",
            email: "tanu@gmail.com",
            age: "20",
            description: "The Cloud Firestore SDK is initialized in different ways depending on your environment. Below are the most common methods."

        },
        {
            type:"2",
            name:"vanni",
            email:"vani@gmail.com",
            age :"21",
            description:"lorem and something wrong!!!"
        },
        {
            type :"3",
            name :"harshiee",
            email: "harhsie@gmail.com",
            description:"lorem and something wrong!!!"
        },
        {
            type:"4",
            name: "manii",
            email :"man@gmail.com",
            description: "lorem and something wrong!!!"
        },
        {
            type:"5",
            name:"shani",
            email: 'shanu@gmail.com',
            description:'lorem and something wrong!!!'
        }

    ]

    const send = () => {
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                console.log(element)
            }
        } if (!setValue)
            setTimeout(() => {
                setUuser(false)
            }, 2000);
    }
    chats.sort((a, b) => a.gettime - b.gettime)

    return (
        <>
            <div className="view">
                <h1>{c.user}</h1>
                <p>{c.meesage} </p>
                <input type="tel" placeholder="edit" />
                <span onClick={handleChange}> term & policy</span>

                <button onClick={send}
                    className=" btn btn-outline-secondary">
                    upload</button>
                {
                    chat.map((c, id) => {
                        <div key={id} className={`container ${c.name === name}?'me`}>
                            <div className="box_bar">
                                {value}+{user}
                                <img src="images.jpeg" alt="something error"></img>
                            </div>
                            {
                                chats.push(time)

                            }
                        </div>
                    })
                }

                <div className="sendimg">{`${time >= 1}? 'PM':"AM"`}</div>
            </div>
        </>
    )
}
export default New;
