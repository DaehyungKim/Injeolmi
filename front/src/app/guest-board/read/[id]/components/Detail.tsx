"use client";

import { iBoardItem } from "@/app/(type)/guest-board/board";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import Modal from "@/app/(common)/components/ui/Modal";
import styles from "./Detail.module.css";
import { deletePost } from "@/app/(api)/guestBoardApi";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Detail = ({ detail }: { detail: iBoardItem }) => {
    const [sanitizedContent, setSanitizedContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        setSanitizedContent(DOMPurify.sanitize(detail.content));
    }, [detail.content]);

    const handleDelete = async () => {
        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        try {
            await deletePost(detail.id, password);
            alert("게시글이 삭제되었습니다.");
            router.push("/guest-board/list");
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert(error instanceof Error ? error.message : '게시글을 삭제하는데 실패했습니다.');
        } finally {
            setPassword("");
        }
    }

    const handleUpdate = async () => {
        router.push(`/guest-board/update/${detail.id}`);
        
    }
    return (
        <div className={styles['detail-wrapper']}>
            <div>
                <h1 className={styles['detail-title']}>{detail.title}</h1>
                <p className={styles['detail-meta']}>
                    작성자: {detail.author} | 작성일:{" "} 
                    {new Date(detail.createdAt).toLocaleString()}  {detail.createdAt != detail.updatedAt ? `| 수정일:${" "}
                    ${new Date(detail.updatedAt).toLocaleString()}` : ""} 
                </p>
            </div>
            <div className={`${styles['detail-content']} tiptap`}>
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
            <div className={styles['detail-actions']}>
                <Link href="/guest-board/list">
                    <button className={styles.btn + ' ' + styles['btn-list']}>목록으로</button>
                </Link>
                <Link href={`/guest-board/update/${detail.id}`}>
                    <button className={styles.btn + ' ' + styles['btn-update']}>수정</button>
                </Link>
                <button className={styles.btn + ' ' + styles['btn-delete']} onClick={() => {
                    setShowModal(true)}}>
                    삭제
                </button>
            </div>
            {showModal && (
                <Modal
                    password={password}
                    setPassword={setPassword}
                    onConfirm={() =>{
                            handleDelete();
                    }
                }
                    onCancel={() => {
                        setPassword("");
                        setShowModal(false)}}
                />
            )}
        </div>
    );
};

export default Detail;
