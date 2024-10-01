"use client"

import React, { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Peer from 'peerjs';

const VideoChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [peerId, setPeerId] = useState('');
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const myVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    let stompClient = null;
    let peer = null;

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/chat');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe('/topic/messages', (message) => {
                setMessages((prev) => [...prev, JSON.parse(message.body)]);
            });
            stompClient.subscribe('/topic/webrtc', (message) => {
                handleSignaling(JSON.parse(message));
            });
        });

        // Set up PeerJS
        peer = new Peer();
        peer.on('open', id => {
            setPeerId(id);
            console.log('My peer ID is: ' + id);
        });

        peer.on('call', call => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    setLocalStream(stream);
                    myVideoRef.current.srcObject = stream;
                    call.answer(stream);
                    call.on('stream', remoteStream => {
                        remoteVideoRef.current.srcObject = remoteStream;
                        setRemoteStream(remoteStream);
                    });
                });
        });

        return () => {
            stompClient.disconnect();
            if (peer) peer.destroy();
        };
    }, []);

    const sendMessage = () => {
        stompClient.send('/send', {}, JSON.stringify({ content: input }));
        setInput('');
    };

    const handleSignaling = (message) => {
        if (message.type === 'offer') {
            const call = peer.call(message.to, localStream);
            call.on('stream', remoteStream => {
                remoteVideoRef.current.srcObject = remoteStream;
                setRemoteStream(remoteStream);
            });
        } else if (message.type === 'answer') {
            peer.call(message.to, localStream);
        }
    };

    const initiateCall = (remotePeerId) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setLocalStream(stream);
                myVideoRef.current.srcObject = stream;
                const call = peer.call(remotePeerId, stream);
                call.on('stream', remoteStream => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    setRemoteStream(remoteStream);
                });
                // Send signaling information
                stompClient.send('/webrtc', {}, JSON.stringify({ type: 'offer', to: remotePeerId }));
            });
    };

    const endCall = () => {
        
        if (peer) peer.destroy();
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        // Optionally, clear video elements
        myVideoRef.current.srcObject = null;
        remoteVideoRef.current.srcObject = null;
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.content}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={() => initiateCall('REMOTE_PEER_ID')}>Call</button> {/* Replace 'REMOTE_PEER_ID' with actual ID */}
            
            <h2>My Video</h2>
            <video ref={myVideoRef} autoPlay muted />
            <h2>Remote Video</h2>
            <video ref={remoteVideoRef} autoPlay />
            <button onClick={endCall}>End Call</button>
        </div>
    );
};

export default VideoChat;