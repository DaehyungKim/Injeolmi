'use client';

const Error = ({error, reset} : {error: Error, reset: () => void}) => {
    

    return (
        <div>
            <h1>오류가 발생했습니다!</h1>
            <p>{error.message}</p>
            
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}

export default Error;