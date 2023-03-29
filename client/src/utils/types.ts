import { MainVM } from '../viewModels/Main.VM';

export interface SessionData {
    id: string;
    isHost: boolean;
    game: Game;
}

export type Message =
    | InitMessage
    | SessionMessage
    | ChatMessage
    | ReadinessMessage
    | GameMessage;

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

export interface ReadinessMessage {
    type: 'ready';
    sessionID: string;
    name: string;
    isReady: boolean;
}

export interface GameMessage {
    type: 'game';
    stage: string;
    game: Game;
    sessionID: string;
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

export type Game = 'Tic-Tac-Toe' | 'none';

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

export interface MainViewChildProps {
    vm: MainVM;
}
