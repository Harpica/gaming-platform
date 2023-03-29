import ReadyCheck from '../components/ReadyCheck';
import TicTacToe from '../components/TicTacToe';

const GameView = () => {
    return (
        <div className='grid justify-center grid-cols-[400px_1fr] w-full  h-screen text-white bg-gradient-to-r from-sky-500 to-indigo-500 overflow-hidden'>
            {/* Chat */}
            <div className='grid grid-rows-[1fr_60px] bg-white p-4'>
                <ul className='list-none flex flex-col justify-end gap-3 pb-4 overflow-auto'>
                    <li className='bg-indigo-400 rounded shadow-md p-3 ml-3'>
                        Some message
                    </li>
                    <li className='bg-blue-400 rounded shadow-md p-3 mr-3'>
                        Some message Very very very very big message it is
                    </li>
                </ul>
                <form className='self-center flex flex-row justify-between'>
                    <input
                        type={'text'}
                        name='chat'
                        placeholder='Start writting...'
                        className='text-black p-3 outline-none focus:outline-none'
                    />
                    <button type='submit' className='text-indigo-600'>
                        Send
                    </button>
                </form>
            </div>
            {/* Game */}
            <div className='grid grid-rows-[50px_1fr] grid-cols-[1fr] justify-center w-full'>
                <button
                    type='button'
                    aria-label='exit'
                    className='justify-self-end pr-4'
                >
                    Exit
                </button>
                <ReadyCheck />
                <TicTacToe />
            </div>
        </div>
    );
};

export default GameView;
