import { getPost } from "@/app/(api)/guestBoardApi";
import Detail from "./components/Detail";

interface props {
    params: {
    id: string;
    };
}

const Read = async ({ params }: props) => {
    const { id } = await Promise.resolve(params);
    const response = await getPost(id);
    console.log(response);

    return (
    <div>
        <Detail detail={response} />
    </div>
    );
};

export default Read;
