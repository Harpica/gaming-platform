export class Matrix {
    size: number;
    elements: Array<unknown>;
    constructor(n: number) {
        this.size = n;
        this.elements = [];
    }
    getIndex(row: number, col: number) {
        return row * this.size + col;
    }

    getElement(row: number, col: number) {
        const index = this.getIndex(row, col);
        if (this.checkIsValidIndex(index)) {
            return this.elements[index];
        } else return null;
    }

    setElement(row: number, col: number, element: unknown) {
        this.elements[row * this.size + col] = element;
    }

    private checkIsValidIndex(index: number) {
        return index > 0 && index < this.size ** 2;
    }
}
