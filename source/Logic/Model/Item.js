export default class Item {
    constructor(defaultCount) {
        this.count = defaultCount
        this.price = 0
    }

    calculateTotal() {
        return this.count * this.price
    }
}