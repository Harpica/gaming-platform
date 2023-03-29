import { BASE_URL } from '../utils/constants';
import { Message } from './types';
import { makeAutoObservable } from 'mobx';

export class WS {
    ws: WebSocket | null = null;
    constructor() {
        makeAutoObservable(this);
    }
    setWSConnection(name: string) {
        this.ws = new WebSocket(`ws://${BASE_URL}`);
        this.sendInitMessage(name);
    }
    closeWSConnection() {
        this.ws!.close();
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
    listenToMessages(messageHandler: Function) {
        this.ws!.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.error) {
                console.log(data.error);
            } else {
                messageHandler(data);
            }
        };
    }
    sendMessage(message: Message) {
        const data = JSON.stringify(message);
        this.ws!.send(data);
    }
}

export const ws = new WS();
