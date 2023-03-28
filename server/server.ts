import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Session, WsServer } from './services/WsServer';

// Usage of .env file in the root dir
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 5003;

const corsOptions = {
    origin: '*',
};

const sessions = new Map<string, Session>();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/sessions', (req, res) => {
    res.status(200).send(Array.from(sessions));
});

const server = app.listen(PORT, () => {
    console.log('Listening to', PORT);
});

const wss = new WsServer(server, sessions);
wss.start();
