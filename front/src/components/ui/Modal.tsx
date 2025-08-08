// components/Modal.tsx (파일 경로 예시)

import React from "react";

interface ModalProps {
    password: string;
    setPassword: (pw: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ password, setPassword, onConfirm, onCancel }) => {
    return (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            
            <div className="bg-white p-8 rounded-lg shadow-md min-w-[300px] w-full max-w-sm">
                
                <h2 className="text-xl font-bold mb-4">비밀번호 입력</h2>
                
                
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full mb-6 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="비밀번호"
                />

                
                <div className="flex justify-end space-x-3">
                    
                    <button
                        className="py-2 px-4 rounded-md text-white font-semibold bg-gray-500 hover:bg-gray-600 transition-colors"
                        onClick={onCancel}
                    >
                        취소
                    </button>
                    
                    <button
                        className="py-2 px-4 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600 transition-colors"
                        onClick={onConfirm}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;