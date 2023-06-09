import ReadyCheck from '../components/ReadyCheck';
import TicTacToeView from '../components/TicTacToe';
import { useNavigate } from 'react-router';
import Chat from './ChatView';
import { observer } from 'mobx-react-lite';
import { Session } from '../utils/types';
import { ws } from '../utils/WS';
import { GameVM } from '../viewModels/Game.VM';
import { useMemo } from 'react';
import TsoroYematatuView from '../components/TsoroYematatu';

interface GameViewProps {
    currentUser: string;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
    session: Session;
    setSession: React.Dispatch<React.SetStateAction<Session>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameView: React.FC<GameViewProps> = observer(
    ({ currentUser, setCurrentUser, session, setSession, setIsAuth }) => {
        const navigate = useNavigate();
        const vm = useMemo(() => {
            return new GameVM(
                currentUser,
                setCurrentUser,
                session,
                setSession,
                setIsAuth,
                ws,
                navigate
            );
        }, []);

        return (
            <div className='flex flex-col-reverse gap-5 justify-center md:grid md:grid-cols-[400px_1fr] w-full  h-full min-h-screen text-white bg-gradient-to-r from-sky-500 to-indigo-500 overflow-auto'>
                <Chat currentUser={currentUser} opponent={vm.opponent} />
                <div className='grid grid-rows-[50px_1fr] grid-cols-[1fr] justify-center w-full'>
                    <button
                        type='button'
                        aria-label='exit'
                        className='justify-self-end pr-4 hover:opacity-60'
                        onClick={() => {
                            vm.logOut();
                        }}
                    >
                        Exit
                    </button>
                    {!vm.isStarted && <ReadyCheck vm={vm} />}
                    {vm.isStarted && vm.session.game === 'Tic-Tac-Toe' && (
                        <TicTacToeView vm={vm} />
                    )}
                    {vm.isStarted && vm.session.game === 'Tsoro Yematatu' && (
                        <TsoroYematatuView vm={vm} />
                    )}
                </div>
            </div>
        );
    }
);

export default GameView;
