let productColor = document.querySelectorAll(".product_color");
let productColorImg = document.querySelectorAll(".product-color-img");
let productImg = document.getElementsByClassName("product-img");

let greenColor = new Array("images/back_view_green.webp", "images/side_view_green.webp", "images/side_view2_green.webp", "images/front_view_green.webp", "images/zoom_green.webp", "images/zoom_green2.webp");

let blackColor = new Array("images/shirt_back_side.webp", "images/shirt_right_side.webp", "images/shirt_front_side.webp", "images/shirt_front_side2.webp", "images/shirt_zoom_back.webp", "images/shirt_zoom_front.webp");

productColorImg[0].onmousedown = function() {
    productColor[0].innerHTML = "Black/Charcoal Grey";
    for (let i = 0; i < productImg.length; i++) {
        productImg[i].attributes[1].nodeValue = blackColor[i]
    }
}
productColorImg[1].onmousedown = function() {
    productColor[0].innerHTML = "Bali Green/White";
    for (let i = 0; i < productImg.length; i++) {
        productImg[i].attributes[1].nodeValue = greenColor[i]
    }
}

let addToBag = document.getElementById("add-to-bag");
let numberOfProducts = document.getElementById("product-counter");
let sizes = document.getElementsByClassName("size");

for (let i = 0; i < sizes.length; i++) {

    
sizes[0].addEventListener("click", function(){
    sizes[0].style.backgroundColor = "black"
    sizes[0].style.color = "white";
})

    

function newProductNumber(currentNumber) {
    
    number = Number(currentNumber)
       
    number += 1

    newNumber = number.toString()

    return (newNumber)
  
}

addToBag.addEventListener("click", function(e) {
    e.preventDefault();
    numberOfProducts.innerHTML = newProductNumber(numberOfProducts.innerHTML)
})}
