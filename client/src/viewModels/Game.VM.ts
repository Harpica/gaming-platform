import { makeAutoObservable } from 'mobx';
import { TicTacToe } from '../utils/TicTacToe';
import {
    GameMessage,
    GameMessageResponse,
    GameObject,
    ReadinessMessage,
    ReadinessMessageResponse,
    Session,
    SessionMessageResponse,
} from '../utils/types';
import { WS } from '../utils/WS';
import { NavigateFunction } from 'react-router';
import { DEFAULT_SESSION } from '../utils/constants';

export class GameVM {
    currentUser: string;
    session: Session;
    isAllReady: boolean = false;
    isStarted: boolean = false;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
    setSession: React.Dispatch<React.SetStateAction<Session>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    ws: WS;
    navigate: NavigateFunction;
    opponent: string = '';
    game: GameObject | null = null;
    constructor(
        currentUser: string,
        setCurrentUser: React.Dispatch<React.SetStateAction<string>>,
        session: Session,
        setSession: React.Dispatch<React.SetStateAction<Session>>,
        setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
        ws: WS,
        navigate: NavigateFunction
    ) {
        this.currentUser = currentUser;
        this.setCurrentUser = setCurrentUser;
        this.session = session;
        this.setSession = setSession.bind(this);
        this.setIsAuth = setIsAuth;
        this.ws = ws;
        this.navigate = navigate;
        this.setOpponent();
        this.listenToGuestConnection();
        makeAutoObservable(this);
    }

    listenToGuestConnection() {
        this.ws.addFunctionToMessageHandler(
            'session',
            (data: SessionMessageResponse) => this.sessionMessageHandler(data)
        );
        this.ws.addFunctionToMessageHandler(
            'ready',
            (data: ReadinessMessageResponse) => this.readyMessageHandler(data)
        );
        this.ws.addFunctionToMessageHandler(
            'game',
            (data: GameMessageResponse) => this.gameMessageHandler(data)
        );
    }
    private sessionMessageHandler(message: SessionMessageResponse) {
        this.setSession({
            ...this.session,
            sessionID: message.data.sessionID as string,
            game: message.data.game,
            config: message.data.config,
            guest: message.data.guest,
        });
        this.session = {
            ...this.session,
            sessionID: message.data.sessionID as string,
            game: message.data.game,
            config: message.data.config,
            guest: message.data.guest,
        };
        this.setOpponent();
    }

    private readyMessageHandler(message: ReadinessMessageResponse) {
        this.setSession({
            ...this.session,
            isReady: {
                ...this.session.isReady,
                [message.data.name]: message.data.isReady,
            },
        });
        this.session = {
            ...this.session,
            isReady: {
                ...this.session.isReady,
                [message.data.name]: message.data.isReady,
            },
        };
        this.checkIfReady();
    }

    private gameMessageHandler(message: GameMessageResponse) {
        if (message.data.stage === 'start') {
            if ((this.session.game = 'Tic-Tac-Toe')) {
                this.game = new TicTacToe(
                    this.session.config.gridSize!,
                    message.data.turn!,
                    this.session.sessionID,
                    this.ws
                );
            }
            this.isStarted = true;
        } else if (message.data.stage === 'game') {
            if ((this.session.game = 'Tic-Tac-Toe')) {
                this.game!.handleWsGameMessage(
                    message,
                    this.currentUser,
                    this.opponent
                );
            }
        } else if (message.data.stage === 'new game') {
            this.game = null;
            this.isAllReady = false;
            this.isStarted = false;
            this.session.isReady = {};
        }
    }

    sendIsReady() {
        const message: ReadinessMessage = {
            type: 'ready',
            sessionID: this.session.sessionID,
            name: this.currentUser,
            isReady: true,
        };
        this.ws.sendMessage(message);
    }

    private checkIfReady() {
        if (
            this.session.isReady[this.currentUser] &&
            this.session.isReady[this.opponent]
        ) {
            this.isAllReady = true;
            console.log('ready', this.isAllReady);
        }
    }

    private setOpponent() {
        this.opponent = this.session.isHost
            ? this.session.guest
            : this.session.host;
    }

    startGame() {
        const message: GameMessage = {
            type: 'game',
            stage: 'start',
            game: this.session.game,
            sessionID: this.session.sessionID,
            data: {
                gridSize: this.session.config.gridSize,
            },
        };
        this.ws.sendMessage(message);
    }

    startNewGame() {
        const message: GameMessage = {
            type: 'game',
            stage: 'new game',
            sessionID: this.session.sessionID,
            game: 'Tic-Tac-Toe',
            data: {},
        };
        this.ws.sendMessage(message);
    }

    logOut() {
        this.ws.closeWSConnection();
        this.setCurrentUser('default');
        this.setSession(DEFAULT_SESSION);
        this.setIsAuth(false);
        this.navigate('/', { replace: true });
    }
}
