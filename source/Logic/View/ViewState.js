export default class ViewState {
    constructor() { 
        this.DOM = Object.freeze({
            addButton: document.getElementById("add-item-button"),
            deleteButton: document.getElementById("delete-item-button"),
            resetButton: document.getElementById("reset-button"),
            totalCost: document.getElementById("total-cost"),
            totalCostWithCommission: document.getElementById("total-cost-with-commission"),
            commissionInput: document.getElementById("commission-input"),
            loadButton: document.getElementById("load-button"),
            loadFileButton: document.getElementById("load-file-button"),
            saveButton: document.getElementById("save-button"),
            downloadButton: document.getElementById("download-button")
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
