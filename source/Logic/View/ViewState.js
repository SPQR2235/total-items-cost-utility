export default class ViewState {
    constructor() { 
        this.DOM = Object.freeze({
            addButton: document.getElementById("add-item-button"),
            deleteButton: document.getElementById("delete-item-button"),
            resetButton: document.getElementById("reset-button"),
            totalCost: document.getElementById("total-cost"),
            totalCostWithoutCommission: document.getElementById("total-cost-without-commission"),
            commissionInput: document.getElementById("commission-input")
        })

        this.tags = Object.freeze({
            div: "div",
            input: "input",
        })

        this.classes = Object.freeze({
            item: "item",
            innerWrap: "inner-wrap",
            itemTag: "item-tag",
            label: "label",
            nameLabel: "name-labgel",
            input: "input",
            name: "name-input",
            count: "count-input",
            price: "price-input",
            commission: "commission-input"
        })

        this.content = Object.freeze({
            itemName: "Name",
            count: "Count",
            price: "Price"
        })
    }
}
