export default class DataManager {
    constructor(commissionInput) {
        this.defaultCount = 1
        this.totalCost = 0
        this.totalCostWithCommission = 0
        this.commission = commissionInput
    }

    calcAll(items, commissionChanged) {
        if (!commissionChanged) {
            this.totalCost = 0

            for (const item of items.map.values()) {
                this.totalCost += item.model.count * item.model.price
            }
        }

        this.calculateWithCommission()
    }

    calculateWithCommission() {
        this.totalCostWithCommission = Number(this.totalCost) * (1 - (Number(this.commission) / 100))
    }

    load() {
        const raw = localStorage.getItem('totalItemsCostUtilityData')
        if (!raw) return { map: new Map(), count: 0 }

        try {
            const data = JSON.parse(raw)
            const itemsMap = new Map()

            for (const itemData of data.items) {
                itemsMap.set(itemData.id, {
                    ID: itemData.id,
                    model: {
                        name: itemData.name,
                        count: Number(itemData.count),
                        price: Number(itemData.price)
                    },
                    view: null
                })
            }

            const count = itemsMap.size

            this.commission = data.commission || 0
            console.log(itemsMap, count)
            return { map: itemsMap, count: count }
        } catch (e) {
            console.error("Ошибка загрузки:", e)
            return { map: new Map(), count: 0 }
        }
    }

    save(items) {
        const data = {
            commission: Number(this.commission),
            items: Array.from(items.map.values()).map(item => ({
                name: item.model.name || "",
                count: Number(item.model.count),
                price: Number(item.model.price)
            }))
        }

        localStorage.setItem('totalItemsCostUtilityData', JSON.stringify(data))
    }

    loadFile() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.json'

            input.addEventListener('change', async (event) => {
                const file = event.target.files[0]
                if (!file) return reject('No file selected')

                const text = await file.text()
                try {
                    const data = JSON.parse(text)

                    this.defaultCount = data.defaultCount || 1
                    this.commission = data.commission || 0

                    const items = { map: new Map(), count: 0 }
                    data.items.forEach((model, index) => {
                        const id = index + 1
                        const item = {
                            model,
                            view: null,
                            ID: id
                        }
                        items.map.set(id, item)
                        items.count = id
                    })

                    resolve(items)
                } catch (e) {
                    reject(e)
                }
            })

            input.click()
        })
    }

    download(items) {
        const dataToSave = {
            commission: Number(this.commission),
            defaultCount: Number(this.defaultCount),
            items: Array.from(items.map.values()).map(item => ({
                name: item.model.name,
                count: Number(item.model.count),
                price: Number(item.model.price)
            }))
        }

        const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'items.json'
        a.click()
        URL.revokeObjectURL(a.href)
    }
}