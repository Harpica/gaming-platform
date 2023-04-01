import { observer } from 'mobx-react-lite';
import { TsoroYematatu } from '../../utils/TsoroYematatu';
import { ViewChildProps } from '../../utils/types';
import { GameVM } from '../../viewModels/Game.VM';
import { useMemo } from 'react';

const buttonsStyles = [
    'col-start-1 col-end-4 justify-self-center',
    'justify-self-end',
    'justify-self-center',
    'justify-self-start',
    'justify-self-start',
    'justify-self-center',
    'justify-self-end',
];

const TsoroYematatuField: React.FC<ViewChildProps<GameVM>> = observer(
    ({ vm }) => {
        const game = useMemo(() => vm.game as TsoroYematatu, []);
        return (
            <div className='self-center relative'>
                <div className=' grid grid-cols-[repeat(3,_100px)] grid-rows-[repeat(3,_100px)] relative z-[1]'>
                    {game.elements.map((element, i) => (
                        <button
                            disabled={
                                game.currentTurn !== game.userTurn ||
                                (element.value !== '' &&
                                    element.value !== game.userTurn) ||
                                game.stage === 'end'
                            }
                            type='button'
                            key={'Tsoro' + i}
                            value={i}
                            onClick={(e) => {
                                game.handleUserTurn(e);
                                console.log(game.elements.slice());
                            }}
                            className={`rounded-full w-8 h-8 self-center text-white enabled:hover:bg-violet-500 text-center pb-[3px] border-black border-[1px]
                                ${buttonsStyles[i]}
                                ${
                                    game.checkIfIndexIsInWinArray(i)
                                        ? 'bg-green-600'
                                        : element.value === 'x'
                                        ? 'bg-blue-600'
                                        : element.value === 'o'
                                        ? 'bg-indigo-600'
                                        : 'bg-white '
                                }
                            `}
                        >
                            {element.value}
                        </button>
                    ))}
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
        );
    }
);

export default TsoroYematatuField;
