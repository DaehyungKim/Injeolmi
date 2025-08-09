

import { EllipsisVertical, Heart, MessageCircleMore, Send, Bookmark } from 'lucide-react';


export const FeedItem = () => {

    return (
        <div className="mt-20">
            <div className="border h-[760px] w-[500px] mx-auto">
                <div className="flex">
                    <div className="w-14 h-14 m-2 bg-gray-600 rounded-full border-4 border-gray-100 left-1/2">
                    </div>
                    <div className="mt-3">
                        <div className="gap-2 flex">
                            <p className=" cursor-pointer">대형</p>
                            <p className="text-gray-400 cursor-default">5분</p>
                        </div>
                        <div>
                            <p className="text-sm cursor-pointer">방구석</p>
                        </div>

                    </div>
                    <div className="ml-auto m-3 cursor-pointer">
                        <EllipsisVertical />
                    </div>
                </div>
                <div className="border-0 h-[500px] bg-gray-500">

                </div>
                <div className="flex mt-2">
                    <div className="flex m-2 gap-2">
                        <Heart className="cursor-pointer"/>
                        <MessageCircleMore className="cursor-pointer"/>
                        <Send className="cursor-pointer"/>
                    </div>
                    <div className="ml-auto m-2">
                        <Bookmark className="cursor-pointer"/>
                    </div>
                </div>
                <div className="m-2">
                    좋아요 100개
                </div>
                <div className="flex gap-2 m-2">
                    <p>대형</p>
                    <p>삼겹살 먹으러 갑니다</p>
                </div>

                
            </div>
        </div>
    );
}