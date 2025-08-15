'use server';


import { revalidatePath } from 'next/cache'
import { createPost } from '../api/boardApi'
import { Create } from '../types';


export const createPostAction = async(formData: Create, ) => {
    try {
        const response = await createPost(formData)

        // 캐시 무효화
        revalidatePath('/guest-board/list')
        revalidatePath(`/guest-board/read/${response}`)

        return response

        

        
    } catch (error) {
        throw error;
        
    }
}