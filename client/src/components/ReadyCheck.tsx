const ReadyCheck = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='flex flex-col gap-3 bg-white text-black rounded shadow-md max-w-[600px] w-[70%] p-4'>
                <h1 className='font-bold text-center text-lg'>Tic-Tac-Toe</h1>
                <p>Some rules</p>
                <ul>
                    <li>
                        Host name: <span className='font-bold'>Ready</span>
                    </li>
                    <li>
                        Guest name: <span className='font-bold'>Ready</span>
                    </li>
                </ul>
                <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90 shrink-0 self-center '>
                    <button
                        type='button'
                        aria-label='ready'
                        className=' box-border p-1 pr-8 pl-8 self-center bg-white text-indigo-500
         shadow-md rounded outline-none transition-all hover:opacity-80 uppercase'
                    >
                        Ready
                    </button>
                </div>
                <button
                    // disabled
                    type='button'
                    className='disabled:opacity-40 bg-gradient-to-r from-sky-500 to-indigo-500 p-2 pr-9 pl-9 self-center text-white uppercase  shadow-md rounded outline-none transition-all hover:opacity-80 '
                >
                    Start
                </button>
            </div>
        </div>
    );
};

export default ReadyCheck;
