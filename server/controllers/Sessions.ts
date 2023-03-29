import { Request, Response } from 'express';
import { Session } from '../services/WsServer';

export const sessions = new Map<string, Session>();

export const getSessions = (req: Request, res: Response) => {
    const sessionsTupleArray = Array.from(sessions);
    const sessionsArray = sessionsTupleArray.map((session) => {
        let newSession = { ...session[1] } as FrontSession;
        newSession.sessionID = session[0];
        return newSession;
    });
    res.status(200).send(sessionsArray);
};

interface FrontSession extends Session {
    sessionID: string;
}
