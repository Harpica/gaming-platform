import { observer } from 'mobx-react-lite';
import { TicTacToe } from '../utils/TicTacToe';
import { ViewChildProps } from '../utils/types';
import { GameVM } from '../viewModels/Game.VM';

const TicTacToeView: React.FC<ViewChildProps<GameVM>> = observer(({ vm }) => {
    const game = vm.game as TicTacToe;
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='flex flex-col gap-3 bg-white text-black rounded shadow-md max-w-[600px] w-full lg:w-[70%] p-4'>
                {game.winner ? (
                    <p className='font-bold text-center text-lg'>
                        {game.winner} win!
                    </p>
                ) : (
                    <p className='font-bold text-center text-lg'>
                        {game.currentTurn === game.userTurn
                            ? 'Your turn'
                            : "Opponent's turn"}
                    </p>
                )}
                <p className='font-bold text-center text-lg'>
                    You are {game.userTurn}
                </p>
                <button
                    disabled={!(vm.session.isHost && game.winner)}
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
                        game.matrix.size === 3 && ' grid-cols-3 grid-rows-3'
                    } ${game.matrix.size === 5 && ' grid-cols-5 grid-rows-5'} ${
                        game.matrix.size === 7 && ' grid-cols-7 grid-rows-7'
                    } self-center gap-[2px] bg-indigo-500 min-w-320`}
                >
                    {game.matrix.elements.map((element, i) => (
                        <button
                            disabled={
                                game.currentTurn !== game.userTurn ||
                                game.stage === 'end'
                            }
                            type='button'
                            value={i}
                            key={'TicTacToe' + i}
                            onClick={(e) => {
                                game.handleUserTurn(e);
                            }}
                            className={`enabled:hover:opacity-60 enabled:cursor-pointer w-10 h-10 lg:w-12 lg:h-12  ${
                                game.checkIfIndexIsInWinArray(i)
                                    ? 'bg-blue-200'
                                    : 'bg-white'
                            }`}
                        >
                            {element}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default TicTacToeView;
