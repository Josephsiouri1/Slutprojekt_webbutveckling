
let searchInput = document.getElementById("search-input");
let searchBox = document.getElementById("search-box");

searchInput.onkeydown = function(event) {
    if (event.key === "Enter") {
        searchInput.value = ""
    }
}
searchInput.onmouseleave = function() {
        searchInput.value = ""    
}

let cart = new Array();

let aboutProduct = JSON.parse(localStorage.getItem("aboutProduct"));

cart.push(aboutProduct);

console.log(cart[0]);

let table = document.getElementById("cart-container"); 

let totalPrice = 0

cart.forEach(function (aboutProduct) {
    
  table.insertAdjacentHTML(
    "beforeend",
    `<tr class="product-info">
    <td><a href=""><i class="fa-solid fa-circle-x"></i></a></td>
      <td><img class="product-image" src="${aboutProduct.image}"></td>
      <td>${aboutProduct.name}</td>
      <td>${aboutProduct.size}</td>
      <td>${aboutProduct.price}</td> 
      <td><form>
      <input type="number" class="quantity" name="quantity" min="1" value="1">
    </form></td>
    </tr> 
    `)

})
let quantity = document.getElementsByClassName("quantity");
let productInfo = document.getElementsByClassName("product-info");

function stringToNumber(str) {
    return (Number(str.replace("SEK", "")));
}

let i = 0

cart.forEach(function(aboutProduct) {
    
    price = stringToNumber(aboutProduct.price)*Number(quantity[i].value)

    productInfo[i].insertAdjacentHTML("beforeend", `<td>${price}kr</td>`)
    totalPrice = totalPrice + price
    i+=1
})


table.insertAdjacentHTML(
  "beforeend",
  `<tr id="total-price">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><strong>Total pris:</strong> ${totalPrice} kr</td>
    <td></td>
  </tr>`
)
table.insertAdjacentHTML(
    "beforeend",
    `<tr id="delete-all">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><a href="">Delete All</a></td>
      <td></td>
    </tr>`
)

let newTotalPrice = document.getElementById("total-price");

function removeById(id) {
    var element = document.getElementById(id);
  
    // A bit of robustness helps...
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

for (let i = 0; i < quantity.length; i++) {
    quantity[i].onkeydown = function(event) {
        event.preventDefault();
        if (event.key === "Enter") {
            price = stringToNumber(aboutProduct.price)*Number(quantity[i].value)
            productInfo[i].removeChild(productInfo[i].children[6]);
            productInfo[i].insertAdjacentHTML("beforeend", `<td>${price}kr</td>`)
            
            removeById("total-price")
            removeById("delete-all")
            totalPrice = 0
            cart.forEach(function() {
                totalPrice = totalPrice + price
            })
            table.insertAdjacentHTML(
                "beforeend",
                `<tr id="total-price">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Total pris:</strong> ${totalPrice} kr</td>
                  <td></td>
                </tr>`)
                table.insertAdjacentHTML(
                    "beforeend",
                    `<tr id="delete-all">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><a href="">Delete All</a></td>
                      <td></td>
                    </tr>`
                )
        }
    }
}





let deleteAll = document.getElementById("delete-all");

deleteAll.addEventListener("click", function(event) {
    event.preventDefault();
    cart = cart.splice(0, 1);
})
deleteAll.addEventListener("ontouchstart", function(event) {
    event.preventDefault();
    cart = cart.splice(0, 1);
})
  



let numberOfProducts = document.getElementById("product-counter");

numberOfProducts.innerHTML = cart.length

JSON.stringify(localStorage.setItem("shopping-cart", cart));

console.log(cart);