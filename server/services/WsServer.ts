import { IncomingMessage, ServerResponse, Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { isSensitiveData } from '../controllers/Game';
import { TicTacToe, TicTacToeData } from '../controllers/TicTacToe';
import { Clients } from '../utils/Clients';
import { uid } from '../utils/utils';

type Message = InitMessage | SessionMessage | ChatMessage | GameMessage;

interface InitMessage {
    type: 'init';
    name: string;
}

interface SessionMessage {
    type: 'session';
    isHost: boolean;
    sessionID?: string;
    game: Game;
    data?: GameData;
}

interface ChatMessage {
    type: 'chat';
    repicientName: string;
    body: string;
}

interface GameMessage {
    type: 'game';
    stage: string;
    game: Game;
    sessionID: string;
    data: GameData;
}

type Game = 'TicTacToe';

type GameObject = TicTacToe;

type GameData = TicTacToeData;

export class WsServer {
    private wss: WebSocketServer;
    private clients: Clients;
    private sessions: Map<
        string,
        { host: string; guest: string; game: GameObject }
    >;

    constructor(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        this.wss = new WebSocketServer({ server });
        this.clients = new Clients();
        this.sessions = new Map<
            string,
            { host: string; guest: string; game: GameObject }
        >();
    }

    start() {
        this.wss.on('connection', (client: WebSocket) => {
            client.on('message', (message: Buffer) => {
                this.handleWsMessage(message, client);
            });
            client.on('close', () => {
                this.clients.deleteClientByWs(client);
                this.sessions.forEach((session, key) => {
                    if (this.clients.getWs(session.host) === client) {
                        this.sessions.delete(key);
                    }
                });
            });
        });
    }

    private handleWsMessage(message: Buffer, client: WebSocket) {
        const data = JSON.parse(message.toString()) as Message;
        switch (data.type) {
            case 'init':
                this.initClient(data, client);
                break;
            case 'session':
                this.handleSessionMessage(data, client);
                break;
            case 'chat':
                this.sendChatMessage(data, client);
                break;
            case 'game':
                this.handleGameMessage(data, client);
                break;
            default:
                break;
        }
    }

    private initClient(data: InitMessage, sender: WebSocket) {
        this.clients.setClient(data.name, sender);
        sender.send('Connected');
    }

    private handleSessionMessage(data: SessionMessage, sender: WebSocket) {
        if (this.checkSender(sender)) {
            if (data.isHost) {
                const host = this.clients.getName(sender) as string;
                const game = this.setNewGame(data.game, data.data);
                const id = uid();
                if (!game) {
                    sender.send(
                        JSON.stringify({ error: 'Game parameters are wrong' })
                    );
                } else
                    this.sessions.set(id, {
                        host: host,
                        game: game,
                        guest: 'none',
                    });
                sender.send('User connected to your session');
            } else if (data.sessionID) {
                const session = this.sessions.get(data.sessionID)!;
                session.guest = this.clients.getName(sender) as string;
                this.sessions.set(data.sessionID, session);
                sender.send(
                    JSON.stringify({
                        data: { sessionID: session },
                    })
                );
            }
        }
    }

    private sendChatMessage(data: ChatMessage, sender: WebSocket) {
        if (this.checkSender(sender)) {
            sender.send(JSON.stringify(data));
            const repicient = this.clients.getWs(data.repicientName);
            repicient?.send(JSON.stringify(data));
        }
    }

    private handleGameMessage(data: GameMessage, sender: WebSocket) {
        const opponent = this.findOpponent(data, sender);
        if (this.checkSender(sender) && opponent !== undefined) {
            const response = this.sessions
                .get(data.sessionID)
                ?.game.playGame(data.data, data.stage);
            if (isSensitiveData(response)) {
                sender.send(JSON.stringify({ data: response.sender }));
                opponent.send(JSON.stringify({ data: response.rest }));
            } else {
                sender.send(JSON.stringify({ data: response }));
                opponent.send(JSON.stringify({ data: response }));
            }
        }
    }

    private setNewGame(game: Game, config: unknown) {
        switch (game) {
            case 'TicTacToe':
                return new TicTacToe(config as number);

            default:
                break;
        }
    }

    private checkSender(sender: WebSocket) {
        return this.clients.getName(sender) !== undefined;
    }

    private findOpponent(data: GameMessage, sender: WebSocket) {
        const session = this.sessions.get(data.sessionID);
        if (session) {
            return this.clients.getWs(session.guest) === sender
                ? this.clients.getWs(session.guest)
                : this.clients.getWs(session.host);
        }
    }
}
