export default class Item {
    constructor(defaultCount) {
        this.count = defaultCount
        this.price = 0
    }

    calculateTotal(commission) {
        return (this.count * this.price) * (1 - (parseFloat(commission) / 100 || 0))
    }
}