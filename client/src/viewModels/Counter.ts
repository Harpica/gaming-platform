import { makeAutoObservable } from 'mobx';

export class Counter {
    counter: number = 0;
    constructor() {
        makeAutoObservable(this);
    }
    increase() {
        this.counter += 1;
    }
}
