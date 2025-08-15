'use server';


import { revalidatePath } from 'next/cache'
import { deletePost } from '../api/boardApi'


export const deletePostAction = async(id: number, password: string) => {
    try {
        await deletePost(id, password)

        // 캐시 무효화
        revalidatePath('/guest-board/list')
        revalidatePath(`/guest-board/read/${id}`)

        

        
    } catch (error) {
        throw error;
        
    }
}