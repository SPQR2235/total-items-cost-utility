export default class ItemView {
    constructor(container, viewState, defaultCount) {
        this.element = document.createElement(viewState.tags.div)
        this.element.className = viewState.classes.item

        this.innerLayers = Object.freeze({
            innerWrap: document.createElement(viewState.tags.div),

            nameBlock: document.createElement(viewState.tags.div),
            nameInput: document.createElement(viewState.tags.input),

            countBlock: document.createElement(viewState.tags.div),
            countInput: document.createElement(viewState.tags.input),
            
            priceBlock: document.createElement(viewState.tags.div),
            priceInput: document.createElement(viewState.tags.input)
        })

        this.innerLayers.innerWrap.className = viewState.classes.innerWrap

        this.innerLayers.nameBlock.classList.add(viewState.classes.block)
        this.innerLayers.countBlock.classList.add(viewState.classes.block)
        this.innerLayers.priceBlock.classList.add(viewState.classes.block)

        this.innerLayers.nameInput.classList.add(viewState.classes.name)
        this.innerLayers.countInput.classList.add(viewState.classes.count)
        this.innerLayers.priceInput.classList.add(viewState.classes.price)

        this.innerLayers.countInput.value = defaultCount

        this.innerLayers.nameBlock.textContent = viewState.content.itemName
        this.innerLayers.countBlock.textContent = viewState.content.count
        this.innerLayers.priceBlock.textContent = viewState.content.price

        this.innerLayers.countInput.type = viewState.inputTypes.number
        this.innerLayers.priceInput.type = viewState.inputTypes.number
        
        this.innerLayers.innerWrap.appendChild(this.innerLayers.nameBlock)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.nameInput)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.countBlock)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.countInput)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.priceBlock)
        this.innerLayers.innerWrap.appendChild(this.innerLayers.priceInput)

        this.element.appendChild(this.innerLayers.innerWrap)
        container.appendChild(this.element)

    }

    remove() {
        this.element.remove()
    }
}