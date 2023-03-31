import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import { DEFAULT_SESSION } from './utils/constants';
import { Session } from './utils/types';
import GameView from './views/GameView';
import MainView from './views/MainView';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<string>('default');
    const [session, setSession] = useState<Session>(DEFAULT_SESSION);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <MainView
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            session={session}
                            setSession={setSession}
                            setIsAuth={setIsAuth}
                        />
                    }
                />
                <Route
                    path='/game'
                    element={
                        <ProtectedRoute authKey={isAuth}>
                            <GameView
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}
                                setIsAuth={setIsAuth}
                                session={session}
                                setSession={setSession}
                            />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
