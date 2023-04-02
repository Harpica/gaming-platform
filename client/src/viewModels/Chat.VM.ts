import { ChatMessage, ChatMessageData } from '../utils/types';
import { WS } from '../utils/WS';
import { makeAutoObservable } from 'mobx';

export class ChatVM {
    currentUser: string;
    opponent: string;
    ws: WS;
    messages: Array<ChatMessageData>;
    constructor(currentUser: string, opponent: string, ws: WS) {
        this.currentUser = currentUser;
        this.opponent = opponent;
        this.ws = ws;
        this.messages = [];
        makeAutoObservable(this);
    }

    send(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.opponent !== '') {
            const chatMessageBody = (
                e.currentTarget.elements.namedItem('chat') as HTMLInputElement
            ).value;
            const message: ChatMessage = {
                type: 'chat',
                repicientName: this.opponent,
                data: { sender: this.currentUser, body: chatMessageBody },
            };
            this.ws.sendMessage(message);
        }
    }
    listenToMessages() {
        this.ws.addFunctionToMessageHandler('chat', (data: ChatMessage) => {
            this.messages.push({
                sender: data.data.sender,
                body: data.data.body,
            });
        });
    }
    set addMessage(message: ChatMessageData) {
        this.messages.push(message);
    }
}
