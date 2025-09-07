'use client';

import { useState, useEffect, useRef } from 'react';

export const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);



    useEffect(() => {

        console.log(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_HOST!);
        ws.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_HOST!);

        ws.current.onopen = () => {
            console.log('WebSocket 연결됨');
        };

        ws.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        ws.current.onclose = () => {
            console.log('WebSocket 연결 종료');
        };

        return () => {
            ws.current?.close();
        }
    }, []);

    const sendMessage = () => {
        if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(input);
            setMessages((prev) => [...prev, input]); 
            setInput('');
        }
    };

    return (
        <div className="p-5 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">실시간 채팅</h1>
        
            <div className="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto mb-4 flex flex-col space-y-2">
                {messages.map((msg, index) => (
                    
                    <div key={index} className="p-2 rounded-lg bg-gray-100 self-start">
                        {msg}
                    </div>
                ))}
            </div>

            <div className="flex space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-grow p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={sendMessage}
                    className="w-1/5 p-2 rounded-lg"
                >
                    전송
                </button>
            </div>
        </div>
    );
}