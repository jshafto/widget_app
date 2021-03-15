
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


const socket = io();
const Chat = ({ user }) => {
    const [messages, setMessages] = useState([])

    const [users, setUsers] = useState([]);

    const [chatInput, setChatInput] = useState("");


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/users/");
            if (response.ok) {
                const responseData = await response.json();
                setUsers(responseData.users);
            }
        }
        fetchUsers();
    }, []);


    useEffect(() => {
        // open socket connection
        socket.on("chat", (chat) => {
            console.log("chat")
            setMessages([...messages, chat])
        })
        return () => {
            console.log("disconnected")
            socket.disconnect()
        }
    }, [])

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('thing', chatInput);
        setChatInput('')
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    return (
        <div>
            <form onSubmit={sendChat}>
                <input
                    placeholder="chat"
                    value={chatInput}
                    onChange={updateChatInput}
                ></input>
            </form>
        </div>
    )
};

export default Chat;
