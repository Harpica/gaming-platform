export interface SessionData {
    id: string;
    isHost: boolean;
    game: Game;
}

export type Message = InitMessage | SessionMessage | ChatMessage | GameMessage;

export interface InitMessage {
    type: 'init';
    name: string;
}

export interface SessionMessage {
    type: 'session';
    isHost: boolean;
    sessionID?: string;
    game: Game;
    data?: GameData;
}

export interface ChatMessage {
    type: 'chat';
    repicientName: string;
    body: string;
}

export interface GameMessage {
    type: 'game';
    stage: string;
    game: Game;
    sessionID: string;
    data: GameData;
}

export type Game = 'TicTacToe' | 'none';

export type GameData = TicTacToeData;

interface Position {
    row: number;
    col: number;
}
type Turn = 'x' | 'o';

export interface TicTacToeData {
    gridSize?: number;
    position?: Position;
    turn?: Turn;
}
