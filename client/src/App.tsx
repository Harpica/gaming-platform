import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { SessionData } from './utils/types';
import MainView from './views/MainView';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<string>('default');
    const [session, setSession] = useState<SessionData>({
        id: '',
        isHost: false,
        game: 'none',
    });
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainView />} />
                <Route
                    path='/:id'
                    element={
                        <ProtectedRoute authKey={isAuth}>
                            <div />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
