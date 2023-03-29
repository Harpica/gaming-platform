import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { DEFAULT_SESSION } from './utils/constants';
import { Session } from './utils/types';
import GameView from './views/GameView';
import MainView from './views/MainView';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(true);
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
                            <GameView />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
