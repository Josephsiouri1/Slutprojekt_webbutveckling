let productColor = document.querySelectorAll(".product_color");
let productColorImg = document.querySelectorAll(".product-color-img");

 
productColorImg[0].onmouseover = function() {
    productColor[0].innerHTML = "Black/Charcoal Grey";
}
productColorImg[1].onmouseover = function() {
    productColor[0].innerHTML = "Bali Green/White";
}

let addToBag = document.getElementById("add-to-bag");
let numberOfProducts = document.getElementById("product-counter");
let sizes = document.getElementsByClassName(".size");

sizes = Array.from(sizes);

for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener("click", function() {
        sizes[i].style.backgroundColor = "black";
    })
}

function newProductNumber(currentNumber) {
    
    number = Number(currentNumber)
       
    number += 1

    newNumber = number.toString()

    return (newNumber)
  
}

addToBag.addEventListener("click", function(e) {
    e.preventDefault()
    numberOfProducts.innerHTML = newProductNumber(numberOfProducts.innerHTML)
})
