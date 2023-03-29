import { Session } from './types';

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'localhost:5003';

export const DEFAULT_SESSION: Session = {
    sessionID: '',
    host: '',
    guest: '',
    game: 'none',
    config: {},
    isReady: {},
    isHost: false,
};

export const LOGIN_STEPS = [
    'Enter your name for the game',
    'Choose either to create new game session or join one',
    'Choose game',
];
