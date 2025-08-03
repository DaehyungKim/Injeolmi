'use client';

const Error = ({error, reset} : {error: Error, reset: () => void}) => {
    console.log("넌 뭐여" + error.name);    
    console.log("넌 뭐고" + error.message); 
    console.log("니는 뭔데" + error.stack);

    return (
        <div>
            <h1>오류가 발생했습니다!</h1>
            <p>{error.message}</p>
            
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}

export default Error;