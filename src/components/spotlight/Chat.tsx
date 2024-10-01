
import React, { useEffect, useRef, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Input } from '../catalyst/input';
import { Button } from '../catalyst/button';
import '../../styles/common.css';

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://192.168.0.117:8080/chat');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('-----------Connected: ' + frame);
            stompClient.subscribe('/topic/messages', (message) => {
                console.log('--------Message received:', message);
                const msg = JSON.parse(message.body);
                setMessages((prev) => [...prev, msg]);
            });
        }, (error) => {
            console.error('---------Connection error:', error);
        });

        setStompClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (stompClient) {
            stompClient.send('/send', {}, JSON.stringify({ from: localStorage.getItem('username'), content: newMessage }));
            setNewMessage('');
        } else {
            console.error('-------STOMP client is not initialized');
        }
    };

    return (
        <div>
            <br />
            
            <form onSubmit={sendMessage}>
                <div className='flex'>
                    <Input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <Button type='submit'>Send</Button>
                </div>
            </form>
        
            <br />
            <div>
                {messages.map((msg, index) => (
                    localStorage.getItem('username') == msg.from
                    ? <div key={index} className='p-2'><strong>{msg.from}:</strong> {msg.content}</div>
                    : <div key={index} className='text-right p-2'><strong>{msg.from}:</strong> {msg.content}</div>

                ))}
            </div>
        </div>
    );
}
  //

export default Chat;