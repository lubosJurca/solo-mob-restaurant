import { itemsMenu } from "./data.js"
const order = document.getElementById("order")
const modalForm = document.getElementById("modal-pop")



// ----- Add event listener
document.addEventListener("click", function (event) {

    order.classList.add("hidden")

    // ----Catch only when add button is clicked
    if (event.target.dataset.add) {
        handleAddBtn(event.target.dataset.add)

    } else if (event.target.id === "submit-order") {
        modalForm.style.display = "block"
    }





})



// ------ Get items from array
function getFeedHtml() {
    let feedHtml = ""

    itemsMenu.forEach(function (item) {
        feedHtml += `
        <div id="item-${item.id}" class="item">
            <h4 class="name">${item.name}</h4>
            <img src="${item.picture}" id="${item.name}" class="image">
            <p class="item-description" >${item.ingredients}</p>
            <p class="price">$${item.price}</p>
            <a href="#" class="add-btn" data-add="${item.id}">+</a>
        </div>
        `
    })

    return feedHtml
}


function handleAddBtn(item) {




    const targetItem = itemsMenu.filter(function (itemId) {
        itemId.id == item
    })[0]

    return targetItem

}






// ------- Render items 
function render() {
    document.getElementById("items-menu").innerHTML = getFeedHtml()
}

render()




