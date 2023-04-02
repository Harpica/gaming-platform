import { action, makeAutoObservable } from 'mobx';
import { LOGIN_STEPS } from '../utils/constants';
import {
    Game,
    GameData,
    Session,
    SessionMessage,
    SessionMessageResponse,
} from '../utils/types';
import { WS } from '../utils/WS';
import { NavigateFunction } from 'react-router';
import { Api } from '../utils/API';

export class MainVM {
    activeStep: number;
    steps: Array<string>;
    currentUser: string;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
    session: Session;
    setSession: React.Dispatch<React.SetStateAction<Session>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    sessions: Array<Session> = [];
    ws: WS;
    api: Api;
    navigate: NavigateFunction;
    isNameUnique: boolean;
    constructor(
        currentUser: string,
        setCurrentUser: React.Dispatch<React.SetStateAction<string>>,
        session: Session,
        setSession: React.Dispatch<React.SetStateAction<Session>>,
        setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
        ws: WS,
        api: Api,
        navigate: NavigateFunction
    ) {
        this.currentUser = currentUser;
        this.setCurrentUser = setCurrentUser.bind(this);
        this.activeStep = 0;
        this.steps = LOGIN_STEPS;
        this.session = session;
        this.setSession = setSession.bind(this);
        this.setIsAuth = setIsAuth;
        this.ws = ws;
        this.api = api;
        this.navigate = navigate.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.isNameUnique = this.checkIfNameUnique('default') ?? true;
        this.getSessions();
        makeAutoObservable(this);
    }

    private checkIfNameUnique(name: string) {
        if (this.sessions !== undefined) {
            return this.sessions.find((session) => {
                return session.guest === name || session.host === name;
            })
                ? false
                : true;
        }
    }

    handleNext() {
        if (this.activeStep === this.steps.length - 1) {
            return;
        }
        this.activeStep += 1;
    }
    handleBack() {
        this.activeStep -= 1;
    }

    getSessions() {
        this.api
            .getSessions()
            .then(
                action((response) => {
                    this.sessions = response.data;
                })
            )
            .catch(action((err) => console.log(err)));
    }

    setConfig(game: Game, config: GameData) {
        if (game === 'Tic-Tac-Toe') {
            this.session.config = config;
        }
    }

    loginUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const name = (
            e.currentTarget.elements.namedItem('name') as HTMLInputElement
        ).value;
        this.checkIfNameUnique(name);
        console.log(this.sessions, this.checkIfNameUnique(name));
        if (this.isNameUnique === true) {
            this.ws.setWSConnection(name);
            this.ws.addFunctionToMessageHandler('init', () => {
                console.log('connected');
            });
            this.ws.listenToMessages();
            this.currentUser = name;
            this.setCurrentUser(name);
            this.handleNext();
        }
    }

    handleCreateOrJoinChoice(value: boolean) {
        this.setSession({ ...this.session, isHost: value });
        this.session = { ...this.session, isHost: value };
        this.handleNext();
    }

    handleGameChoice(game: Game, options: GameData) {
        this.session = { ...this.session, game: game, config: options };
        console.log(this.session.config);
        const message: SessionMessage = {
            type: 'session',
            isHost: this.session.isHost as boolean,
            game: game,
            data: options,
        };
        this.ws.addFunctionToMessageHandler(
            'session',
            (data: SessionMessageResponse) => {
                // this.setSession(data.data);
                this.setSession({
                    ...this.session,
                    sessionID: data.data.sessionID as string,
                    game: data.data.game,
                    config: data.data.config ?? {},
                    host: this.currentUser,
                });
                this.setIsAuth(true);
                this.navigate('/game', { replace: true });
            }
        );
        this.ws.sendMessage(message);
    }

    handleSessionChoice(session: Session) {
        const message: SessionMessage = {
            type: 'session',
            isHost: this.session.isHost as boolean,
            game: session.game,
            data: session.config,
            sessionID: session.sessionID,
        };
        this.ws.addFunctionToMessageHandler(
            'session',
            (data: SessionMessageResponse) => {
                this.setSession({
                    ...this.session,
                    isReady: data.data.isReady,
                    sessionID: data.data.sessionID as string,
                    game: data.data.game,
                    config: data.data.config ?? {},
                    host: session.host,
                    guest: session.guest,
                });
                this.setIsAuth(true);
                this.navigate('/game', { replace: true });
            }
        );
        this.ws.sendMessage(message);
    }
}
