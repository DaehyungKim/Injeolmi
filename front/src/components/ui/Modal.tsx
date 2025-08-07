import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    password: string;
    setPassword: (pw: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ password, setPassword, onConfirm, onCancel }) => {
    return (
        <div className={styles['modal-backdrop']}>
            <div className={styles['modal-box']}>
                <h2>비밀번호 입력</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles['modal-input']}
                    placeholder="비밀번호"
                />
                <div className={styles['modal-actions']}>
                    <button
                        className={`${styles.btn} ${styles['btn-modal-confirm']}`}
                        onClick={onConfirm}
                    >
                        확인
                    </button>
                    <button
                        className={`${styles.btn} ${styles['btn-modal-cancel']}`}
                        onClick={onCancel}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
