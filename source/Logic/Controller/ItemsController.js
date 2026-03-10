import Item from "../Model/Item.js"
import ItemView from "../View/ItemView.js"
import { calculateWithCommission } from "../Lib/math.js"

export default class ItemsController {
    constructor(container, viewState) {
        this.container = container
        this.viewState = viewState
        this.items = []
        this.defaultCount = 1
        this.commission = 20
        this.eventListener = (event) => {
            if (event.target.tagName !== "INPUT") return

            const inputClass = event.target.className

            if (
                inputClass !== viewState.classes.count
                && inputClass !== viewState.classes.price
                && inputClass !== viewState.classes.commission
            ) return

            const newValue = event.target.value

            if (newValue === "") {
                event.target.dataset.lastValue = ""
                return
            }

            if (!/^\d+$/.test(newValue)) {
                event.target.value = event.target.dataset.lastValue || ""
                return
            }

            event.target.dataset.lastValue = newValue

            if (inputClass === viewState.classes.commission) {
                this.commission = Number(event.target.value)
                this.render()
                return
            }

            for (const item of this.items) {
                if (item.view.element.contains(event.target)) {
                    switch (inputClass) {
                        case viewState.classes.count:
                            item.model.count = Number(newValue)
                            break
                        case viewState.classes.price:
                            item.model.price = Number(newValue)
                            break
                    }
                    this.render()
                    break
                }
            }
        }

        window.addEventListener("input", this.eventListener)

        viewState.DOM.addButton.addEventListener("click", () => this.add())
        viewState.DOM.deleteButton.addEventListener("click", () => this.delete())
        viewState.DOM.resetButton.addEventListener("click", () => this.reset())
        this.init()
    }

    init() {
        this.add()
    }

    add() {
        const model = new Item(this.defaultCount)
        const view = new ItemView(
            this.container,
            {
                DOM: this.viewState.DOM,
                tags: this.viewState.tags,
                classes: this.viewState.classes,
                content: this.viewState.content,
                inputTypes: this.viewState.inputTypes
            },
            this.defaultCount)
        const item = { model, view }

        this.items.push(item)
    }

    delete() {
        const item = this.items.pop()
        if (!item) return
        item.view.remove()
        item.model = null
        item.view = null
    }

    reset() {
        while (this.items.length) this.delete()
        this.commission = 0
        this.add()
    }

    render() {
        let totalCostWithoutCommission = 0

        for (const item of this.items) {
            totalCostWithoutCommission += item.model.calculateTotal()
        }

        const totalCost = calculateWithCommission(totalCostWithoutCommission, this.commission)


        this.viewState.DOM.totalCost.textContent = `Total Cost: ${totalCost > 0 ? totalCost.toFixed(2) : `0.00`}`
        this.viewState.DOM.totalCostWithoutCommission.textContent = `Without Commission: ${totalCostWithoutCommission > 0 ? totalCostWithoutCommission.toFixed(2) : `0.00`}`
    }
}