export class Game {
    constructor() {}
    playGame(data: Object, stage: string) {}
}

export interface SensitiveData {
    sender: unknown;
    rest?: unknown;
}

export function isSensitiveData(data: any): data is SensitiveData {
    return data.sender !== undefined;
}
