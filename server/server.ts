import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { WsServer } from './services/WsServer';

// Usage of .env file in the root dir
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 5003;

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log('Listening to', PORT);
});

const wss = new WsServer(server);
wss.start();
