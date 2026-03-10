import ItemsController from "./Controller/ItemsController.js"
import ViewState from "./View/ViewState.js"

window.addEventListener("DOMContentLoaded", () => {
    const VIEW_STATE = new ViewState()
    const controller = new ItemsController(
        document.getElementById("item-wrap"),
        VIEW_STATE
    )
})