import { makeAutoObservable } from 'mobx';
import { LOGIN_STEPS } from '../utils/constants';
import { Game, GameData, Session, SessionMessage } from '../utils/types';
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
    sessions: Array<Session>;
    ws: WS;
    api: Api;
    navigate: NavigateFunction;
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
        this.setCurrentUser = setCurrentUser;
        this.activeStep = 0;
        this.steps = LOGIN_STEPS;
        this.session = session;
        this.setSession = setSession.bind(this);
        this.setIsAuth = setIsAuth;
        this.sessions = [];
        this.ws = ws;
        this.api = api;
        this.navigate = navigate.bind(this);
        this.handleNext = this.handleNext.bind(this);
        console.log('rendr');
        makeAutoObservable(this);
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
            .then((response) => {
                console.log(response.data);
                this.sessions = response.data;
            })
            .catch((err) => console.log(err));
    }

    loginUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.ws.setWSConnection(
            (e.currentTarget.elements.namedItem('name') as HTMLInputElement)
                .value
        );
        this.ws.listenToMessages(() => {
            console.log('listening');
            this.handleNext();
        });
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
        this.ws.sendMessage(message);
        this.ws.listenToMessages((data: SessionMessage) => {
            console.log(data);
            this.setSession({
                ...this.session,
                sessionID: data.sessionID as string,
                game: data.game,
                config: data.data ?? {},
                host: this.currentUser,
            });
            this.navigate('/game', { replace: true });
        });
    }

    handleSessionChoice(session: Session) {
        const message: SessionMessage = {
            type: 'session',
            isHost: this.session.isHost as boolean,
            game: session.game,
            data: session.config,
            sessionID: session.sessionID,
        };
        this.ws.sendMessage(message);
        this.ws.listenToMessages((data: SessionMessage) => {
            console.log(data);
            this.setSession({
                ...this.session,
                sessionID: data.sessionID as string,
                game: data.game,
                config: data.data ?? {},
                host: session.host,
            });
            this.navigate('/game', { replace: true });
        });
    }
}
