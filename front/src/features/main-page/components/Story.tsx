'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { StoryCard } from './StoryCard'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

export const Story = () => {

    const stories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <div className="mt-10 mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-1">
                <div className="prev-button p-2 bg-white rounded-full shadow cursor-pointer">
                    <ChevronLeft />
                </div>

                <Swiper 
                    navigation={{
                        nextEl: '.next-button',
                        prevEl: '.prev-button',
                    }}
                    modules={[Navigation]} 
                    slidesPerView={5}
                    slidesPerGroup={4} 
                    spaceBetween={30} 
                    className="bg-gray-100 p-4 rounded-lg h-[200px] w-full"
                >
                    {stories.map(story => (
                        <SwiperSlide key={story}>
                            <StoryCard />
                        </SwiperSlide>
                    ))}
                </Swiper>

                
                <div className="next-button p-2 bg-white rounded-full shadow cursor-pointer">
                    <ChevronRight />
                </div>
            </div>
        </div>
    )
}

