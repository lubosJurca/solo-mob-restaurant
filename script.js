import { itemsMenu } from "./data.js"


// ------ Get items from array
function getFeedHtml() {
    let feedHtml = ""

    itemsMenu.forEach(function (item) {
        feedHtml += `
        <div id="item-${item.id}" class="item">
            <h4 class="name">${item.name}</h4>
            <img src="${item.picture}" alt= id="${item.name}" class="image">
            <p class="item-description" >${item.ingredients}</p>
            <p class="price">$${item.price}</p>
            <a href="#" class="add-btn" id="add-btn">+</a>
        </div>
        `
    })

    return feedHtml
}


// ------- Render items 
function render() {
    document.getElementById("items-menu").innerHTML = getFeedHtml()
}

render()




