import { BASE_URL } from '../utils/constants';
import { Message, MessageHandler } from './types';
import { makeAutoObservable } from 'mobx';

export class WS {
    ws: WebSocket | null = null;
    messageHandler: MessageHandler = {};
    constructor() {
        makeAutoObservable(this);
    }
    setWSConnection(name: string) {
        this.ws = new WebSocket(`ws://${BASE_URL}`);
        this.sendInitMessage(name);
    }
    closeWSConnection() {
        if (this.ws !== null) {
            this.ws!.close();
        }
    }
    sendInitMessage(name: string) {
        this.ws!.onopen = () => {
            console.log('connected');
            const data = JSON.stringify({
                type: 'init',
                name: name,
            });
            this.ws!.send(data);
        };
    }
    listenToMessages() {
        this.ws!.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.error) {
                console.log(data.error);
            } else {
                console.log();
                console.log(this.messageHandler[data.type]);
                this.messageHandler[data.type](data);
            }
        };
    }
    addFunctionToMessageHandler(type: string, func: (data: any) => void) {
        this.messageHandler[type] = func;
    }
    sendMessage(message: Message) {
        const data = JSON.stringify(message);
        this.ws!.send(data);
    }
}

export const ws = new WS();
