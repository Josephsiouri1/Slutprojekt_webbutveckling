
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

    console.log(aboutProduct.name)
    
  table.insertAdjacentHTML(
    "beforeend",
    `<tr>
    <td><a href=""><i class="fa-solid fa-circle-x"></i></a></td>
      <td><img class="product-image" src="${aboutProduct.image}"></td>
      <td>${aboutProduct.name}</td>
      <td>${aboutProduct.price} kr</td> 
      <td>${aboutProduct.size}</td>
      <td>${aboutProduct.quantity}</td>
      <td>${aboutProduct.totalPrice} kr</td>
    </tr>`
  )

  totalPrice = totalPrice + aboutProduct.totalPrice
})

console.log("Totalt pris", totalPrice)
table.insertAdjacentHTML(
  "beforeend",
  `<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>${totalPrice} kr</td>
    <td><a href="">Delete All</a></td>
    <td></td>
  </tr>`
)

