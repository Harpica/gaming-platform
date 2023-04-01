import { observer } from 'mobx-react-lite';
import { TsoroYematatu } from '../utils/TsoroYematatu';
import { ViewChildProps } from '../utils/types';
import { GameVM } from '../viewModels/Game.VM';
import { useMemo } from 'react';
import TsoroYematatuField from './gameFields/TsoroYematatuField';

const TsoroYematatuView: React.FC<ViewChildProps<GameVM>> = observer(
    ({ vm }) => {
        const game = useMemo(() => vm.game as TsoroYematatu, []);
        return (
            <div className='w-full flex items-center justify-center'>
                <div className='flex flex-col gap-3 bg-white text-black rounded shadow-md max-w-[600px] w-[70%] p-4'>
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
                    <TsoroYematatuField vm={vm} />
                </div>
            </div>
        );
    }
);

export default TsoroYematatuView;
