import { observer } from 'mobx-react-lite';
import { RULES } from '../utils/constants';
import { ViewChildProps } from '../utils/types';
import { GameVM } from '../viewModels/Game.VM';

const ReadyCheck: React.FC<ViewChildProps<GameVM>> = observer(({ vm }) => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='flex flex-col gap-3 bg-white text-black rounded shadow-md max-w-[600px] w-full md:w-[70%] p-4'>
                <h1 className='font-bold text-center text-lg'>
                    {vm.session.game}
                </h1>
                <p className='whitespace-pre-line'>{RULES[vm.session.game]}</p>
                <ul>
                    <li>
                        {vm.currentUser}:{' '}
                        <span className='font-bold'>
                            {vm.session.isReady[vm.currentUser]
                                ? 'Ready'
                                : 'Not ready'}
                        </span>
                    </li>
                    <li>
                        {vm.opponent || 'Looking for opponent'}:{' '}
                        <span className='font-bold'>
                            {vm.session.isReady[vm.opponent]
                                ? 'Ready'
                                : 'Not ready'}
                        </span>
                    </li>
                </ul>
                <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90 shrink-0 self-center '>
                    <button
                        type='button'
                        aria-label='ready'
                        className=' box-border p-1 pr-8 pl-8 self-center bg-white text-indigo-500
         shadow-md rounded outline-none transition-all hover:opacity-80 uppercase'
                        onClick={() => {
                            vm.sendIsReady();
                        }}
                    >
                        Ready
                    </button>
                </div>
                {vm.session.isHost && (
                    <button
                        disabled={!vm.isAllReady}
                        type='button'
                        onClick={(e) => {
                            vm.startGame();
                        }}
                        className='disabled:opacity-40 bg-gradient-to-r from-sky-500 to-indigo-500 p-2 pr-9 pl-9 self-center text-white uppercase  shadow-md rounded outline-none transition-all hover:opacity-80 '
                    >
                        Start
                    </button>
                )}
            </div>
        </div>
    );
});

export default ReadyCheck;
