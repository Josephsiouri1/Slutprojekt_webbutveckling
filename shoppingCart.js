
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

let productInfo = localStorage.getItem("aboutProduct")


let cart = new Array();

cart.push(productInfo);
console.log(cart[0]);
