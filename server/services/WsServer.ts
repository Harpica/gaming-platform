import { IncomingMessage, ServerResponse, Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { isSensitiveData } from '../controllers/Game';
import { TicTacToe, TicTacToeData } from '../controllers/TicTacToe';
import { Clients } from '../utils/Clients';
import { uid } from '../utils/utils';

type Message =
    | InitMessage
    | SessionMessage
    | ChatMessage
    | ReadinessMessage
    | GameMessage;

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

interface ReadinessMessage {
    type: 'ready';
    sessionID: string;
    name: string;
    isReady: boolean;
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

export interface Session {
    host: string;
    guest: string;
    game: GameObject;
    config: GameData;
    isReady: { [key: string]: boolean };
}

export class WsServer {
    private wss: WebSocketServer;
    private clients: Clients;
    private sessions: Map<string, Session>;

    constructor(
        server: Server<typeof IncomingMessage, typeof ServerResponse>,
        sessions: Map<string, Session>
    ) {
        this.wss = new WebSocketServer({ server });
        this.clients = new Clients();
        this.sessions = sessions;
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
            case 'ready':
                this.handleReadinessMessage(data, client);
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
                const game = this.setNewGame(data.game, data.data as GameData);
                const id = uid();
                if (!game) {
                    sender.send(
                        JSON.stringify({ error: 'Game parameters are wrong' })
                    );
                } else {
                    this.sessions.set(id, {
                        host: host,
                        game: game,
                        guest: 'none',
                        config: data.data as GameData,
                        isReady: { [host]: false },
                    });
                    sender.send('New session starts');
                }
            } else if (data.sessionID) {
                const session = this.sessions.get(data.sessionID)!;
                session.guest = this.clients.getName(sender) as string;
                this.sessions.set(data.sessionID, session);
                sender.send(
                    JSON.stringify({
                        data: session,
                    })
                );
                this.clients.getWs(session.host)?.send(
                    JSON.stringify({
                        data: session,
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

    private handleReadinessMessage(data: ReadinessMessage, sender: WebSocket) {
        const session = this.sessions.get(data.sessionID);
        if (session) {
            session.isReady[data.name] = data.isReady;
            const opponent = this.findOpponent(data, sender)?.ws;
            sender.send(
                JSON.stringify({
                    data: {
                        name: data.name,
                        isReady: data.isReady,
                    },
                })
            );
            if (opponent)
                opponent.send(
                    JSON.stringify({
                        data: {
                            name: data.name,
                            isReady: data.isReady,
                        },
                    })
                );
        }
    }

    private handleGameMessage(data: GameMessage, sender: WebSocket) {
        const opponent = this.findOpponent(data, sender)?.ws;
        if (data.stage === 'new game') {
            const session = this.sessions.get(data.sessionID);
            const game = this.setNewGame(
                data.game,
                session?.config as GameData
            );
            if (session && game && opponent) {
                session.game = game;
                sender.send('new game is initialized');
                opponent.send('new game is initialized');
            }
        }
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

    private setNewGame(game: Game, config: GameData) {
        switch (game) {
            case 'TicTacToe':
                return new TicTacToe(config.gridSize as number);

            default:
                break;
        }
    }

    private checkSender(sender: WebSocket) {
        return this.clients.getName(sender) !== undefined;
    }

    private findOpponent(
        data: GameMessage | ReadinessMessage,
        sender: WebSocket
    ) {
        const session = this.sessions.get(data.sessionID);
        if (session) {
            return this.clients.getWs(session.guest) === sender
                ? { type: 'host', ws: this.clients.getWs(session.host) }
                : { type: 'guest', ws: this.clients.getWs(session.guest) };
        }
    }
}
