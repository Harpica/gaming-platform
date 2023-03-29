import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export class Api {
    constructor() {}
    getSessions() {
        return axios.get(`http://${BASE_URL}/sessions`);
    }
}

export const api = new Api();
