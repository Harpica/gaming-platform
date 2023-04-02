import LoginStepper from '../components/Stepper';
import { MainVM } from '../viewModels/Main.VM';
import { observer } from 'mobx-react-lite';
import { Session } from '../utils/types';
import { ws } from '../utils/WS';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../utils/API';

interface MainViewProps {
    currentUser: string;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
    session: Session;
    setSession: React.Dispatch<React.SetStateAction<Session>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainView: React.FC<MainViewProps> = observer(
    ({ currentUser, setCurrentUser, session, setSession, setIsAuth }) => {
        const navigate = useNavigate();
        const [vm] = useState(
            () =>
                new MainVM(
                    currentUser,
                    setCurrentUser,
                    session,
                    setSession,
                    setIsAuth,
                    ws,
                    api,
                    navigate
                )
        );

        return (
            <div className='grid justify-center grid-rows-[minmax(min-content,max-content)_1fr] grid-cols-[minmax(230px,_1280px)] w-full h-full min-h-screen text-white bg-gradient-to-r from-sky-500 to-indigo-500 overflow-hidden'>
                <h1 className='text-lg md:text-5xl p-4 md:p-7 uppercase self-center font-bold'>
                    Gaming platform
                </h1>

                <LoginStepper vm={vm} />
            </div>
        );
    }
);

export default MainView;
