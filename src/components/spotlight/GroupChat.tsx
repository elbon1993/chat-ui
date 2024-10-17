import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Input } from '../catalyst/input';
import { Button } from '../catalyst/button';
import { error } from 'console';

const GroupChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [mongoMessages, setMongoMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [roomId, setRoomId] = useState(''); // Example room ID
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        clientRef.current?.deactivate();
        setMessages([]);
        clientRef.current = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/chat'),
            onConnect: () => {
                console.log('Connected to WebSocket');
                setIsConnected(true);
                clientRef.current?.subscribe(`/topic/${roomId}`, message => {
                    setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        clientRef.current.activate();

        return () => {
            clientRef.current?.deactivate();
        };
    }, [roomId]);

    const sendMessage = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!isConnected) {
            console.error('WebSocket is not connected.');
            return;
        }

        const chatMessage = { sender: localStorage.getItem('username'), content: newMessage, roomId };
        clientRef.current?.publish({
            destination: `/sendMessage/${roomId}`,
            body: JSON.stringify(chatMessage),
        });
        setNewMessage('');
    };

    const getRoomMessages = (roomId: string) => {
        if(roomId) {
            fetch(`http://localhost:8080/getMessages/${roomId}`).then(res => res.json())
            .then(data => setMessages(data))
            .catch(error => console.error(error));

            fetch(`http://localhost:8080/getMessagesMongo/${roomId}`).then(res => res.json())
            .then(data => setMongoMessages(data))
            .catch(error => console.error(error));
        }
    }

    return (
        <div>
            <br />
            <div>
                <Input type="text" value= {roomId} onChange={e => {
                    setRoomId(e.target.value);
                    getRoomMessages(e.target.value)} } placeholder='Type GroupId' />
            </div>
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
            <div>
                {
                    messages.map((msg, index) => (
                    localStorage.getItem('username') == msg.sender
                    ? <div key={index} className='p-2'><strong>{msg.sender}:</strong> {msg.content}</div>
                    : <div key={index} className='text-right p-2'><strong>{msg.sender}:</strong> {msg.content}</div>

                ))}
            </div>
                <h2>Messages from Mongo</h2>
            <div>
                {
                    mongoMessages.map((msg, index) => (
                    localStorage.getItem('username') == msg.sender
                    ? <div key={index} className='p-2'><strong>{msg.sender}:</strong> {msg.content}</div>
                    : <div key={index} className='text-right p-2'><strong>{msg.sender}:</strong> {msg.content}</div>

                ))}
            </div>
        </div>
    );
};

export default GroupChat;

interface ChatMessage {
    sender: string;
    content: string;
    roomId: string;
}