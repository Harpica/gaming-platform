import { makeAutoObservable } from 'mobx';
import { Matrix } from './Matrix';
import { GameMessage, GameMessageResponse, Position, Turn } from './types';
import { WS } from './WS';

export class TicTacToe {
    stage: 'start' | 'game' | 'end' | 'new game' = 'start';
    winner: string = '';
    winPositions: Array<Position> = [];
    matrix: Matrix<'x' | 'o' | ''>;
    currentTurn: Turn;
    userTurn: Turn;
    sessionID: string;
    ws: WS;
    constructor(gridSize: number, userTurn: Turn, sessionID: string, ws: WS) {
        this.matrix = new Matrix(gridSize);
        this.currentTurn = 'x';
        this.userTurn = userTurn;
        this.ws = ws;
        this.sessionID = sessionID;
        this.fillMatrix();
        makeAutoObservable(this);
    }

    fillMatrix() {
        for (let i = 0; i < this.matrix.size ** 2; i++) {
            this.matrix.elements.push('');
        }
    }

    setTurnValue(value: Turn, { row, col }: Position) {
        this.matrix.setElement(row, col, value);
    }

    handleUserTurn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const position = this.matrix.getPosition(
            parseInt(e.currentTarget.value)
        );
        this.setTurnValue(this.userTurn, position);
        const message: GameMessage = {
            type: 'game',
            stage: 'game',
            game: 'Tic-Tac-Toe',
            sessionID: this.sessionID,
            data: {
                turn: this.currentTurn,
                position: position,
            },
        };
        this.ws.sendMessage(message);
        this.changeCurrentTurn();
    }

    changeCurrentTurn() {
        this.currentTurn = this.currentTurn === 'x' ? 'o' : 'x';
    }

    handleWsGameMessage(
        message: GameMessageResponse,
        currentUser: string,
        opponent: string
    ) {
        if (message.data.stage === 'game') {
            if (message.data.isWinner) {
                console.log(
                    'winner!',
                    message.data.isWinner,
                    message.data.winPositions
                );
                this.winner =
                    this.userTurn === message.data.turn
                        ? currentUser
                        : opponent;
                this.winPositions = message.data.winPositions!;
                this.stage = 'end';
            }
            this.setTurnValue(message.data.turn!, message.data.position!);
            if (message.data.turn !== this.userTurn) {
                this.changeCurrentTurn();
            }
        }
    }
}
