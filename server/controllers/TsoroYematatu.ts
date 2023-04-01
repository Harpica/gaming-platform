import { Game, SensitiveData } from './Game';
import { Turn } from './TicTacToe';

export interface TsoroYematatuData {
    stage?: string;
    turn?: Turn;
    newPositionIndex?: number;
    prevPositionIndex?: number;
    isWinner?: boolean;
    winIndexes?: Array<Array<number>>;
}

export class TsoroYematatu extends Game {
    elements: { col: number; row: number; value: Turn | '' }[];
    winIndexes: Array<Array<number>>;
    constructor() {
        super();
        this.elements = this.setInitialValues();
        this.winIndexes = this.setWinIndexes();
    }

    playGame(data: TsoroYematatuData, stage: string) {
        if (stage === 'start') {
            return this.startGame(stage);
        } else if (stage === 'setting') {
            return this.handleSetting(
                data.newPositionIndex as number,
                data.turn as Turn
            );
        } else if (stage === 'moving') {
            return this.handleMoving(
                data.newPositionIndex as number,
                data.prevPositionIndex as number,
                data.turn as Turn
            );
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

    private handleSetting(index: number, turn: Turn) {
        if (this.elements[index].value === '') {
            this.elements[index].value = turn;
            const { winIndexes, isWinner } = this.checkIsWinner(turn);
            return {
                stage: 'setting',
                turn: turn,
                newPositionIndex: index,
                isWinner: isWinner,
                winIndexes: winIndexes,
            };
        }
    }

    private handleMoving(newIndex: number, prevIndex: number, turn: Turn) {
        if (this.checkIsMovePossible(newIndex, prevIndex)) {
            this.elements[newIndex].value = turn;
            this.elements[prevIndex].value = '';
            const { winIndexes, isWinner } = this.checkIsWinner(turn);
            return {
                stage: 'moving',
                turn: turn,
                newPositionIndex: newIndex,
                prevPositionIndex: prevIndex,
                isWinner: isWinner,
                winIndexes: winIndexes,
            };
        }
    }

    private checkIsMovePossible(newIndex: number, prevIndex: number) {
        if (this.elements[newIndex].value === '') {
            if (
                (this.elements[newIndex].col === 0 &&
                    this.elements[newIndex].row === 0) ||
                this.elements[newIndex].col === this.elements[prevIndex].col ||
                this.elements[newIndex].row === this.elements[prevIndex].row
            ) {
                return true;
            }
        } else {
            return false;
        }
    }

    private checkIsWinner(turn: Turn) {
        const winIndexes = this.winIndexes.filter((indexesArray) => {
            let counter = 0;
            for (let i = 0; i < 3; i++) {
                if (this.elements[indexesArray[i]].value === turn) {
                    counter++;
                } else {
                    break;
                }
            }
            return counter === 3;
        });
        if (winIndexes.length === 1) {
            return { winIndexes: winIndexes, isWinner: true };
        } else {
            return { isWinner: false, winIndexes: winIndexes };
        }
    }

    private setInitialValues() {
        let elements = [];
        elements.push({ col: 0, row: 0, value: '' as const });
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 3; j++) {
                elements.push({ col: i, row: j, value: '' as const });
            }
        }
        return elements;
    }

    private setWinIndexes() {
        return [
            [0, 1, 4],
            [0, 2, 5],
            [0, 3, 6],
            [1, 2, 3],
            [4, 5, 6],
        ];
    }
}
