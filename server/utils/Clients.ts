import { WebSocket } from 'ws';

export class Clients {
    private socketsByClient: Map<String, WebSocket>;
    private clientsBySocket: Map<WebSocket, String>;
    constructor() {
        this.socketsByClient = new Map<String, WebSocket>();
        this.clientsBySocket = new Map<WebSocket, String>();
    }

    getName(ws: WebSocket) {
        return this.clientsBySocket.get(ws);
    }

    getWs(name: string) {
        return this.socketsByClient.get(name);
    }

    setClient(name: string, ws: WebSocket) {
        this.clientsBySocket.set(ws, name);
        this.socketsByClient.set(name, ws);
    }

    deleteClientByWs(ws: WebSocket) {
        this.clientsBySocket.delete(ws);
        this.socketsByClient.delete(this.getName(ws)!);
    }
}
