import { itemsMenu } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const order = document.getElementById("order")
const modalForm = document.getElementById("modal-pop")
const form = document.getElementById("modal-form")
const listOrderItems = document.getElementById("list-items")
const totalPrice = document.getElementById("total-number")
const nameInput = document.getElementById("name-input")
const cardInput = document.getElementById("card-input")
const cvvInput = document.getElementById("cvv-input")
const finalMsg = document.getElementById("final-msg")
let yourOrderItems = []
let fullName = ""

let sum = 0




// ----- Add event listener
document.addEventListener("click", function (event) {
    event.preventDefault()



    //  If add btn is clicked
    if (event.target.dataset.add) {
        order.classList.add("hidden")
        handleAddBtn(event.target.dataset.add)



    }
    // If Complete order btn is clicked
    if (event.target.id === "submit-order") {

        modalForm.style.display = "block"
    }


    // If the remove btn is clicked
    if (event.target.dataset.remove) {
        handleRemoveBtn(event.target.dataset.remove)
        if (yourOrderItems.length < 1) {
            order.classList.remove("hidden")
        }
    }

    if (event.target.id === "pay-btn") {

        if (nameInput.value && cardInput.value && cvvInput.value) {
            const modalFormData = new FormData(form)
            fullName = modalFormData.get("name")
            nameInput.value = ""
            cardInput.value = ""
            cvvInput.value = ""
            order.classList.remove("hidden")
            yourOrderItems = []
            modalForm.style.display = "none"
            finalMsg.style.display = "block"

            finalMsg.textContent = `Thanks, ${fullName}! Your order is on its way!`

        }




        renderFinalMessage()

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

// -----------------------Add button function
function handleAddBtn(item) {



    // find the clicked item
    let targetItem = itemsMenu.filter(function (itemId) {
        return itemId.id == item
    })[0]

    // push item to arr with unique id
    yourOrderItems.push({
        name: targetItem.name,
        price: targetItem.price,
        id: uuidv4()
    })


    // total price sum
    sum = yourOrderItems.reduce(function (total, itemPrice) {
        return total + itemPrice.price
    }, 0)



    renderOrderItems(yourOrderItems)
}






// ------- Render items 
function render() {
    document.getElementById("items-menu").innerHTML = getFeedHtml()
}






// ---------Remove btn function
function handleRemoveBtn(item) {
    let removeItem = yourOrderItems.filter(function (itemId) {
        return itemId.id == item
    })[0]


    if (removeItem) {
        // remove filtered item from arr
        yourOrderItems = yourOrderItems.filter((item) => item !== removeItem)
    }

    // total sum  
    sum = yourOrderItems.reduce(function (total, itemPrice) {
        return total + itemPrice.price
    }, 0)


    renderOrderItems(yourOrderItems)
}




// -----render Order items

function renderOrderItems(item) {
    let listItems = ""
    for (let i = 0; i < item.length; i++) {
        listItems += `<li class="order-item">${item[i].name} <a href="#" class="remove" data-remove="${item[i].id}">remove</a> <span class="order-price">$${item[i].price}</span>
        </li>`


    }

    listOrderItems.innerHTML = listItems
    totalPrice.textContent = `$${sum}`
}


function renderFinalMessage(name) {
    console.log(fullName)
}

render()
