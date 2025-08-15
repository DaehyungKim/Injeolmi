'use server';


import { revalidatePath } from 'next/cache'
import { updatePost } from '../api/boardApi'
import { Update } from '../types';


export const updatePostAction = async(formData: Update, ) => {
    try {
        const response = await updatePost(formData)

        // 캐시 무효화
        revalidatePath('/guest-board/list')
        revalidatePath(`/guest-board/read/${formData.id}`)

        return response

        

        
    } catch (error) {
        throw error;
        
    }
}