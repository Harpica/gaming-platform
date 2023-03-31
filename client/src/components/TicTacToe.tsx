import { observer } from 'mobx-react-lite';
import { ViewChildProps } from '../utils/types';
import { GameVM } from '../viewModels/Game.VM';

const TicTacToe: React.FC<ViewChildProps<GameVM>> = observer(({ vm }) => {
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
                <div
                    className={`grid ${
                        vm.game?.matrix.size === 3 && ' grid-cols-3 grid-rows-3'
                    } ${
                        vm.game?.matrix.size === 5 && ' grid-cols-5 grid-rows-5'
                    } ${
                        vm.game?.matrix.size === 7 && ' grid-cols-7 grid-rows-7'
                    } self-center gap-[2px] bg-indigo-500`}
                >
                    {vm.game?.matrix.elements.map((element, i) => (
                        <button
                            disabled={
                                vm.game?.currentTurn !== vm.game?.userTurn ||
                                vm.game?.stage === 'end'
                            }
                            type='button'
                            value={i}
                            key={'TicTacToe' + i}
                            onClick={(e) => {
                                vm.game!.handleUserTurn(e);
                            }}
                            className={
                                'enabled:hover:opacity-60 enabled:cursor-pointer w-12 h-12 bg-white '
                            }
                        >
                            {element}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default TicTacToe;
