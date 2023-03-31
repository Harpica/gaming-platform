export class Matrix<T> {
    size: number;
    elements: Array<T>;
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

    setElement(row: number, col: number, element: T) {
        this.elements[row * this.size + col] = element;
    }

    getPosition(index: number) {
        return { row: Math.floor(index / this.size), col: index % this.size };
    }

    private checkIsValidIndex(index: number) {
        return index > 0 && index < this.size ** 2;
    }
}
