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

export const RULES = {
    'Tsoro Yematatu':
        'Players "drop" a token on an empty point in an attempt to make three in a row, similar to tic-tactoe.\n After all tokens have been dropped the move phase begins. Player one moves one of his tokens to an empty adjacent point according to the following guidelines: \n 1. A move must be along a straight line. No turning the corner. \n 2. You may jump one of your opponent\'s tokens to land in an empty point, as long as you still land in a straight line.',
    'Tic-Tac-Toe':
        'You must match-up three symbols in 3x3 field or four symbols in 5x5 and 7x7 layouts',
    none: '',
};
