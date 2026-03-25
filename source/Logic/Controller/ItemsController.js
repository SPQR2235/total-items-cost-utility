import Item from "../Model/Item.js"
import ItemView from "../View/ItemView.js"
import DataManager from "../Model/DataManager.js"

export default class ItemsController {
    constructor(container, viewState) {
        this.container = container
        this.viewState = viewState
        this.itemViewState = {
            DOM: this.viewState.DOM,
            tags: this.viewState.tags,
            classes: this.viewState.classes,
            content: this.viewState.content,
            inputTypes: this.viewState.inputTypes
        }
        this.dataManager = new DataManager(this.viewState.DOM.commissionInput.value)
        this.items = { map: new Map(), count: 0 }
        this.loading = false
        this.eventListener = {
            input: async (event) => {
                if (this.loading) return
                const target = event.target
                if (target.tagName !== "INPUT") return

                const { count, price, commission, name } = this.viewState.classes
                const inputClass = target.className

                if (![name, count, price, commission].includes(inputClass)) return

                if (inputClass === name) {
                    this.handleNameInput(target)
                } else {
                    this.handleNumberInput(target, inputClass)
                }
            },
            load: async () => {
                this.loading = true
                this.reset({ add: false })
                this.items = await this.dataManager.load()
                let count = 1
                for (const item of this.items.map.values()) {
                    item.view = new ItemView({
                        container: this.container,
                        viewState: this.itemViewState,
                        defaultCount: this.dataManager.defaultCount,
                        itemsCount: count,
                        load: true,
                        ...item.model
                    })
                    count++
                }
                this.viewState.DOM.commissionInput.value = this.dataManager.commission
                this.render(false)
                this.loading = false
            },
            loadFile: async () => {
                this.loading = true
                try {
                    this.reset({ add: false })
                    this.items = await this.dataManager.loadFile()
                    let count = 1
                    for (const item of this.items.map.values()) {
                        item.view = new ItemView({
                            container: this.container,
                            viewState: this.itemViewState,
                            defaultCount: this.dataManager.defaultCount,
                            itemsCount: count,
                            load: true,
                            ...item.model
                        })
                        count++
                    }
                } catch (e) {
                    console.error("Ошибка загрузки файла:", e)
                }
                this.viewState.DOM.commissionInput.value = this.dataManager.commission
                this.render(false)
                this.loading = false
            }
        }

        window.addEventListener("input", this.eventListener.input.bind(this))

        viewState.DOM.addButton.addEventListener("click", () => this.add())
        viewState.DOM.deleteButton.addEventListener("click", () => this.delete())
        viewState.DOM.resetButton.addEventListener("click", () => this.reset())

        viewState.DOM.loadButton.addEventListener("click", () => this.eventListener.load())
        viewState.DOM.loadFileButton.addEventListener("click", () => this.eventListener.loadFile())
        viewState.DOM.saveButton.addEventListener("click", () => this.dataManager.save(this.items))
        viewState.DOM.downloadButton.addEventListener("click", () => this.dataManager.download(this.items))
        this.init()
    }

    init() {
        this.add()
    }

    add() {
        ++this.items.count
        const model = new Item(this.dataManager.defaultCount)
        const view = new ItemView({
            container: this.container,
            viewState: this.itemViewState,
            defaultCount: this.dataManager.defaultCount,
            itemsCount: this.items.count
        })
        const item = { model, view, ID: this.items.count }
        this.items.map.set(item.ID, item)

    }

    delete() {
        const item = this.items.map.get(this.items.count)
        if (!item) return
        item.view.remove()
        this.items.map.delete(this.items.count)
        --this.items.count
    }

    reset({ add = true } = {}) {
        while (this.items.map.size) this.delete()
        this.dataManager.commission = 0
        if (add) this.add()
    }

    render(commissionChanged) {
        this.dataManager.calcAll(this.items, commissionChanged)

        this.viewState.DOM.totalCost.textContent = `Total Cost: ${this.dataManager.totalCost.toFixed(2)}`
        this.viewState.DOM.totalCostWithCommission.textContent = `With Commission: ${this.dataManager.totalCostWithCommission.toFixed(2)}`
    }

    handleNameInput(target) {
        const newValue = target.value
        target.dataset.lastValue = newValue
        const itemElement = target.closest('[data-id]')
        if (!itemElement) return
        const id = Number(itemElement.dataset.id)
        const item = this.items.map.get(id)
        if (!item) return
        item.model.name = newValue
    }

    handleNumberInput(target, inputClass) {
        let newValue = target.value
        
        if (!newValue || newValue.trim() === "") {
            newValue = "0"
        }
        if (!/^\d*\.?\d*$/.test(newValue)) {
            target.value = target.dataset.lastValue || "0"
            return
        }

        target.dataset.lastValue = newValue

        const numericValue = Number(newValue)

        if (inputClass === this.viewState.classes.commission) {
            this.dataManager.commission = numericValue
        } else {
            const itemElement = target.closest('[data-id]')
            if (!itemElement) return
            const id = Number(itemElement.dataset.id)
            const item = this.items.map.get(id)
            if (!item) return

            if (inputClass === this.viewState.classes.count) {
                item.model.count = Number(newValue)
            } else if (inputClass === this.viewState.classes.price) {
                item.model.price = Number(newValue)
            }
        }

        this.render(inputClass === this.viewState.classes.commission)
    }
}

