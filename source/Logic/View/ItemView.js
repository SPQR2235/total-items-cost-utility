export default class ItemView {
    constructor({ container, viewState, defaultCount, itemsCount, load, name, count, price }) {
        this.element = document.createElement(viewState.tags.div)
        this.element.className = viewState.classes.item
        this.element.dataset.id = itemsCount

        this.innerLayers = Object.freeze({
            innerWrap: document.createElement(viewState.tags.div),
            itemTag: document.createElement(viewState.tags.div),

            nameLabel: document.createElement(viewState.tags.div),
            nameInput: document.createElement(viewState.tags.input),

            countLabel: document.createElement(viewState.tags.div),
            countInput: document.createElement(viewState.tags.input),
            
            priceLabel: document.createElement(viewState.tags.div),
            priceInput: document.createElement(viewState.tags.input)
        })

        this.innerLayers.innerWrap.className = viewState.classes.innerWrap
        this.innerLayers.itemTag.className = viewState.classes.itemTag
        this.innerLayers.itemTag.textContent = `Item ${itemsCount}`

        this.innerLayers.nameLabel.classList.add(viewState.classes.nameLabel)
        this.innerLayers.countLabel.classList.add(viewState.classes.label)
        this.innerLayers.priceLabel.classList.add(viewState.classes.label)

        this.innerLayers.nameInput.classList.add(viewState.classes.name)
        this.innerLayers.countInput.classList.add(viewState.classes.count)
        this.innerLayers.priceInput.classList.add(viewState.classes.price)

        this.innerLayers.countInput.value = defaultCount

        this.innerLayers.nameLabel.textContent = viewState.content.itemName
        this.innerLayers.countLabel.textContent = viewState.content.count
        this.innerLayers.priceLabel.textContent = viewState.content.price
        
        this.innerLayers.innerWrap.appendChild(this.innerLayers.itemTag)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.nameLabel)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.nameInput)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.countLabel)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.countInput)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.priceLabel)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.priceInput)

        if (load) {
            this.innerLayers.nameInput.value = name
            this.innerLayers.countInput.value = count
            this.innerLayers.priceInput.value = price
        }

        this.element.appendChild(this.innerLayers.innerWrap)
        container.appendChild(this.element)
    }

    remove() {
        this.element.remove()
    }
}