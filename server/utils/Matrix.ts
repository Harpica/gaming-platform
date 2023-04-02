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
        if (this.checkIsValidPosition(row, col)) {
            const index = this.getIndex(row, col);
            return this.elements[index];
        } else return null;
    }

    setElement(row: number, col: number, element: unknown) {
        this.elements[row * this.size + col] = element;
    }

    private checkIsValidPosition(row: number, col: number) {
        if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
            return true;
        }
        return false;
    }
}
