import { TicTacToe } from './TicTacToe';
import { TsoroYematatu } from './TsoroYematatu';

export type Message =
    | InitMessage
    | SessionMessage
    | ChatMessage
    | ReadinessMessage
    | GameMessage
    | SessionMessageResponse;

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
export interface SessionMessageResponse {
    type: 'session';
    data: {
        sessionID: string;
        host: string;
        guest: string;
        game: Game;
        config: GameData;
        isReady: { [key: string]: boolean };
        isHost?: boolean;
    };
}

export interface ChatMessage {
    type: 'chat';
    repicientName: string;
    data: ChatMessageData;
}

export interface ReadinessMessage {
    type: 'ready';
    sessionID: string;
    name: string;
    isReady: boolean;
}
export interface ReadinessMessageResponse {
    type: 'ready';
    data: {
        name: string;
        isReady: boolean;
    };
}

export interface GameMessage {
    type: 'game';
    stage: string;
    game: Game;
    sessionID: string;
    data: GameData;
}
export interface GameMessageResponse {
    type: 'game';
    data: GameData;
}

export interface Session {
    sessionID: string;
    host: string;
    guest: string;
    game: Game;
    config: GameData;
    isReady: { [key: string]: boolean };
    isHost?: boolean;
}

export type Game = 'Tic-Tac-Toe' | 'Tsoro Yematatu' | 'none';

export type GameObject = TicTacToe | TsoroYematatu;

export type GameData = TicTacToeData | TsoroYematatuData;

export interface Position {
    row: number;
    col: number;
}
export type Turn = 'x' | 'o';

export interface TicTacToeData {
    stage?: string;
    gridSize?: number;
    position?: Position;
    turn?: Turn;
    isWinner?: boolean;
    winPositions?: Array<Position>;
}

export interface TsoroYematatuData {
    stage?: string;
    turn?: Turn;
    newPositionIndex?: number;
    prevPositionIndex?: number;
    isWinner?: boolean;
    winIndexes?: Array<Array<number>>;
}

export interface ViewChildProps<T> {
    vm: T;
}

export interface ChatMessageData {
    sender: string;
    body: string;
}

export type MessageHandler = { [key: string]: (data: any) => void };
