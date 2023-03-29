const TicTacToe = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='flex flex-col gap-3 bg-white text-black rounded shadow-md max-w-[600px] w-[70%] p-4'>
                <p className='font-bold text-center text-lg'>Your turn</p>
                <p className='font-bold text-center text-lg'>You are 'X'</p>
                <button
                    // disabled
                    type='button'
                    className='disabled:opacity-0 bg-gradient-to-r from-sky-500 to-indigo-500 p-2 pr-9 pl-9 self-center text-white uppercase  shadow-md rounded outline-none transition-all hover:opacity-80 '
                >
                    New game
                </button>
                <div className='grid grid-cols-5 grid-rows-5 self-center gap-[2px] bg-indigo-500'>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'hover:opacity-60 w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        value={'coordinates'}
                        className={'w-12 h-12 bg-white'}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
