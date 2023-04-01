import { makeAutoObservable } from 'mobx';
import {
    GameMessage,
    GameMessageResponse,
    TsoroYematatuData,
    Turn,
} from './types';
import { WS } from './WS';

export class TsoroYematatu {
    stage: 'start' | 'setting' | 'moving' | 'end' | 'new game' = 'start';
    elements: { col: number; row: number; value: Turn | '' }[];
    winner: string = '';
    winIndexes?: Array<Array<number>>;
    currentTurn: Turn;
    prevIndex: number = -1;
    userTurn: Turn;
    sessionID: string;
    ws: WS;
    constructor(userTurn: Turn, sessionID: string, ws: WS) {
        this.currentTurn = 'x';
        this.userTurn = userTurn;
        this.ws = ws;
        this.sessionID = sessionID;
        this.elements = this.setInitialValues();
        makeAutoObservable(this);
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

    private setTurnValue(value: Turn | '', index: number) {
        console.log('setting value', this.elements[index].value, index);
        this.elements[index].value = value;
    }
    private changeCurrentTurn() {
        this.currentTurn = this.currentTurn === 'x' ? 'o' : 'x';
    }

    handleWsGameMessage(
        message: GameMessageResponse,
        currentUser: string,
        opponent: string
    ) {
        const data = message.data as TsoroYematatuData;
        this.setTurnValue(data.turn!, data.newPositionIndex!);
        console.log('hanlseMes prev index', data.prevPositionIndex);
        if (data.prevPositionIndex !== undefined) {
            console.log(data.prevPositionIndex);
            this.setTurnValue('', data.prevPositionIndex);
        }
        if (data.isWinner) {
            console.log('winner!', data.isWinner, data.winIndexes);
            this.winner = this.userTurn === data.turn ? currentUser : opponent;
            this.winIndexes = data.winIndexes!;
            this.stage = 'end';
        }
        if (data.turn !== this.userTurn) {
            this.changeCurrentTurn();
        }
    }

    handleUserTurn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.setStage();
        console.log(this.stage);
        const index = parseInt(e.currentTarget.value);
        if (this.stage === 'setting') {
            if (this.elements[index].value === '') {
                this.setTurnValue(this.userTurn, index);
                const message: GameMessage = {
                    type: 'game',
                    stage: this.stage,
                    game: 'Tsoro Yematatu',
                    sessionID: this.sessionID,
                    data: {
                        turn: this.currentTurn,
                        newPositionIndex: index,
                    } as TsoroYematatuData,
                };
                this.ws.sendMessage(message);
                this.changeCurrentTurn();
            }
        } else if (this.stage === 'moving') {
            if (this.prevIndex === -1 && this.elements[index].value !== '') {
                this.prevIndex = index;
                return;
            } else if (this.prevIndex !== -1) {
                if (this.checkIsMovePossible(index, this.prevIndex)) {
                    const message: GameMessage = {
                        type: 'game',
                        stage: this.stage,
                        game: 'Tsoro Yematatu',
                        sessionID: this.sessionID,
                        data: {
                            turn: this.currentTurn,
                            newPositionIndex: index,
                            prevPositionIndex: this.prevIndex,
                        } as TsoroYematatuData,
                    };
                    this.ws.sendMessage(message);
                    this.changeCurrentTurn();
                }
                this.prevIndex = -1;
            }
        }
    }

    checkIfIndexIsInWinArray(index: number) {
        return this.winIndexes?.find((element) => {
            return element.includes(index);
        }) !== undefined
            ? true
            : false;
    }

    private setStage() {
        if (this.stage === 'start') {
            this.stage = 'setting';
        } else if (
            this.stage === 'setting' &&
            this.elements.filter((element) => {
                return element.value === '';
            }).length === 1
        ) {
            this.stage = 'moving';
        }
    }

    private checkIsMovePossible(newIndex: number, prevIndex: number) {
        if (this.elements[newIndex].value === '') {
            if (
                (this.elements[newIndex].col === 0 &&
                    this.elements[newIndex].row === 0) ||
                (this.elements[prevIndex].col === 0 &&
                    this.elements[prevIndex].row === 0) ||
                this.elements[newIndex].col === this.elements[prevIndex].col ||
                this.elements[newIndex].row === this.elements[prevIndex].row
            ) {
                return true;
            }
        } else {
            return false;
        }
    }
}
