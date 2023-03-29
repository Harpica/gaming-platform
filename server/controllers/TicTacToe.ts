import { Matrix } from '../utils/Matrix';
import { Game, SensitiveData } from './Game';

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

export class TicTacToe extends Game {
    matrix: Matrix;
    winSequence: number;
    constructor(gridSize: number = 3) {
        super();
        this.matrix = new Matrix(gridSize);
        this.winSequence = this.setWinSequence(gridSize);
    }

    playGame(data: TicTacToeData, stage: string) {
        if (stage === 'start') {
            return this.startGame();
        } else {
            return this.continueGame(data);
        }
    }
    private startGame() {
        const sender = Math.floor(Math.random()) === 1 ? 'x' : 'o';
        const rest = sender === 'x' ? 'o' : 'x';
        return { sender: sender, rest: rest } as SensitiveData;
    }

    private continueGame(data: TicTacToeData) {
        if (data.turn && data.position) {
            const { turn, position } = data;
            return this.handleTurn(turn, position);
        }
    }
    private handleTurn(turn: Turn, { row, col }: Position) {
        this.matrix.setElement(row, col, turn);
        const winPossible =
            this.matrix.elements.length >= this.winSequence * 2 - 1;
        if (winPossible) {
            return {
                turn: turn,
                isWinner: this.checkIsWinner(turn, { row, col }),
            };
        }
        return { turn: turn, isWinner: false };
    }

    private checkIsWinner(turn: Turn, { row, col }: Position) {
        return (
            this.checkColumn(turn, { row, col }) ||
            this.checkRow(turn, { row, col }) ||
            this.checkRisingDiagonal(turn, { row, col }) ||
            this.checkDescendingDiagonal(turn, { row, col })
        );
    }
    private checkColumn(turn: Turn, { row, col }: Position) {
        let counter = 0;
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row + i, col) === turn) {
                counter++;
            } else break;
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row - i, col) === turn) {
                counter++;
            } else break;
        }
        return counter === this.winSequence ? true : false;
    }
    private checkRow(turn: Turn, { row, col }: Position) {
        let counter = 0;
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row, col + i) === turn) {
                counter++;
            } else break;
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row, col - i) === turn) {
                counter++;
            } else break;
        }
        return counter === this.winSequence ? true : false;
    }
    private checkRisingDiagonal(turn: Turn, { row, col }: Position) {
        let counter = 0;
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row + i, col + i) === turn) {
                counter++;
            } else break;
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row - i, col - i) === turn) {
                counter++;
            } else break;
        }
        return counter === this.winSequence ? true : false;
    }
    private checkDescendingDiagonal(turn: Turn, { row, col }: Position) {
        let counter = 0;
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row + i, col - i) === turn) {
                counter++;
            } else break;
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row - i, col + i) === turn) {
                counter++;
            } else break;
        }
        return counter === this.winSequence ? true : false;
    }

    private setWinSequence(gridSize: number | undefined) {
        switch (gridSize) {
            case 3:
                return 3;
            case 5:
                return 4;
            case 7:
                return 4;
            default:
                return 3;
        }
    }
}
