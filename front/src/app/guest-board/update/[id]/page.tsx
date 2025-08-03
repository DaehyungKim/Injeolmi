import Tiptap from "./components/Tiptap";

interface props {
    params: {
    id: string;
    };
}

const Update = async ({ params } : props) => {

    const { id } = await Promise.resolve(params);

    return (
        <Tiptap id={id}/>
    )
}

export default Update;