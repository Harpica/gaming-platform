import { observer } from 'mobx-react-lite';
import { ViewChildProps } from '../utils/types';
import { GameVM } from '../viewModels/Game.VM';

const TsoroYematatu: React.FC<ViewChildProps<GameVM>> = observer(({ vm }) => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='flex flex-col gap-3 bg-white text-black rounded shadow-md max-w-[600px] w-[70%] p-4'>
                {vm.game?.winner ? (
                    <p className='font-bold text-center text-lg'>
                        {vm.game?.winner} win!
                    </p>
                ) : (
                    <p className='font-bold text-center text-lg'>
                        {vm.game?.currentTurn === vm.game?.userTurn
                            ? 'Your turn'
                            : "Opponent's turn"}
                    </p>
                )}
                <p className='font-bold text-center text-lg'>
                    You are {vm.game?.userTurn}
                </p>
                <button
                    disabled={!(vm.session.isHost && vm.game?.winner)}
                    type='button'
                    onClick={() => {
                        vm.startNewGame();
                    }}
                    className='disabled:opacity-0 bg-gradient-to-r from-sky-500 to-indigo-500 p-2 pr-9 pl-9 self-center text-white uppercase  shadow-md rounded outline-none transition-all hover:opacity-80 '
                >
                    New game
                </button>
                <div className='self-center relative'>
                    <div className=' grid grid-cols-[repeat(3,_100px)] grid-rows-[repeat(3,_100px)] relative z-[1]'>
                        <button
                            type='button'
                            className='rounded-full w-8 h-8 col-start-1 col-end-4 self-center justify-self-center bg-blue-500'
                        ></button>
                        <button
                            type='button'
                            className='rounded-full  w-8 h-8 self-center justify-self-end bg-blue-500'
                        ></button>
                        <button
                            type='button'
                            className='rounded-full w-8 h-8 self-center justify-self-center bg-blue-500'
                        ></button>
                        <button
                            type='button'
                            className='rounded-full  w-8 h-8 self-center justify-self-start bg-blue-500'
                        ></button>
                        <button
                            type='button'
                            className='rounded-full  w-8 h-8 self-center justify-self-start bg-blue-500'
                        ></button>
                        <button
                            type='button'
                            className='rounded-full  w-8 h-8 self-center justify-self-center bg-blue-500'
                        ></button>
                        <button
                            type='button'
                            className='rounded-full  w-8 h-8 self-center justify-self-end bg-blue-500'
                        ></button>
                    </div>
                    <div className='absolute top-0 left-0 z-0'>
                        <svg
                            width='300'
                            height='300'
                            viewBox='-8 -50 360 360'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M23.9096 257.5L172 1L320.09 257.5H23.9096Z'
                                stroke='black'
                            />
                            <line
                                x1='172.5'
                                y1='2'
                                x2='172.5'
                                y2='257'
                                stroke='black'
                            />
                            <line
                                x1='98'
                                y1='130.5'
                                x2='247'
                                y2='130.5'
                                stroke='black'
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default TsoroYematatu;
