import { Matrix } from '../utils/Matrix';
import { Game, SensitiveData } from './Game';

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
            return this.startGame(stage);
        } else {
            return this.continueGame(data);
        }
    }
    private startGame(stage: string) {
        const sender = Math.floor(Math.random() * 2) === 1 ? 'x' : 'o';
        const rest = sender === 'x' ? 'o' : 'x';
        return {
            sender: { turn: sender, stage: stage },
            rest: { turn: rest, stage: stage },
        } as SensitiveData;
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
            console.log('win is possible', this.winSequence);

            const { isWinner, winPositions } = this.checkIsWinner(turn, {
                row,
                col,
            });
            return {
                stage: 'game',
                turn: turn,
                position: { row, col },
                isWinner: isWinner,
                winPositions: winPositions,
            } as TicTacToeData;
        }
        return {
            stage: 'game',
            turn: turn,
            position: { row, col },
            isWinner: false,
        };
    }

    private checkIsWinner(turn: Turn, { row, col }: Position) {
        const checkingFunctions = [
            this.checkColumn.bind(this),
            this.checkRow.bind(this),
            this.checkRisingDiagonal.bind(this),
            this.checkDescendingDiagonal.bind(this),
        ];
        let result;
        for (let i = 0; i < checkingFunctions.length; i++) {
            result = checkingFunctions[i](turn, { row, col });
            console.log('result', result);
            if (result.isWinner) {
                console.log('winner', result.winPositions);
                break;
            }
        }
        return result ? result : { isWinner: false, winPositions: [] };
    }
    private checkColumn(turn: Turn, { row, col }: Position) {
        let winPositions = [{ row, col }];
        console.log(this.winSequence);
        for (let i = 1; i <= this.winSequence; i++) {
            console.log('element', this.matrix.getElement(row + i, col));
            if (this.matrix.getElement(row + i, col) === turn) {
                winPositions.push({ row: row + i, col });
                console.log('win positions', winPositions);
            } else {
                break;
            }
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row - i, col) === turn) {
                winPositions.push({ row: row - i, col });
            } else {
                break;
            }
        }
        return winPositions.length === this.winSequence
            ? { isWinner: true, winPositions: winPositions }
            : { isWinner: false };
    }
    private checkRow(turn: Turn, { row, col }: Position) {
        let winPositions = [{ row, col }];
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row, col + i) === turn) {
                winPositions.push({ row, col: col + i });
            } else {
                break;
            }
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row, col - i) === turn) {
                winPositions.push({ row, col: col - i });
            } else {
                break;
            }
        }
        return winPositions.length === this.winSequence
            ? { isWinner: true, winPositions: winPositions }
            : { isWinner: false };
    }
    private checkRisingDiagonal(turn: Turn, { row, col }: Position) {
        let winPositions = [{ row, col }];
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row + i, col + i) === turn) {
                winPositions.push({ row: row + i, col: col + i });
            } else {
                break;
            }
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row - i, col - i) === turn) {
                winPositions.push({ row: row - i, col: col - i });
            } else {
                break;
            }
        }
        return winPositions.length === this.winSequence
            ? { isWinner: true, winPositions: winPositions }
            : { isWinner: false };
    }
    private checkDescendingDiagonal(turn: Turn, { row, col }: Position) {
        let winPositions = [{ row, col }];
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row + i, col - i) === turn) {
                winPositions.push({ row: row + i, col: col - i });
            } else {
                break;
            }
        }
        for (let i = 1; i <= this.winSequence; i++) {
            if (this.matrix.getElement(row - i, col + i) === turn) {
                winPositions.push({ row: row - i, col: col + i });
            } else {
                break;
            }
        }
        return winPositions.length === this.winSequence
            ? { isWinner: true, winPositions: winPositions }
            : { isWinner: false };
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
