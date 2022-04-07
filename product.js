
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

let productColor = document.querySelectorAll(".product_color");
let productColorImg = document.querySelectorAll(".product-color-img");
let productImg = document.getElementsByClassName("product-img");

let greenColor = new Array("images/back_view_green.webp", "images/side_view_green.webp", "images/side_view2_green.webp", "images/front_view_green.webp", "images/zoom_green.webp", "images/zoom_green2.webp");

let blackColor = new Array("images/shirt_back_side.webp", "images/shirt_right_side.webp", "images/shirt_front_side.webp", "images/shirt_front_side2.webp", "images/shirt_zoom_back.webp", "images/shirt_zoom_front.webp");


productColorImg[0].onmousedown = function() {
    productColor[0].innerHTML = "Black/Charcoal Grey";
    productColorImg[0].style.border = "solid 1px black";
    productColorImg[1].style.border = "solid 0px black";
    for (let i = 0; i < productImg.length; i++) {
        productImg[i].attributes[1].nodeValue = blackColor[i]
    }
}

productColorImg[1].onmousedown = function() {
    productColor[0].innerHTML = "Bali Green/White";
    productColorImg[1].style.border = "solid 1px black";
    productColorImg[0].style.border = "solid 0px black";
    for (let i = 0; i < productImg.length; i++) {
        productImg[i].attributes[1].nodeValue = greenColor[i]
    }
}

let addToBag = document.getElementById("add-to-bag");
let numberOfProducts = document.getElementById("product-counter");
let sizes = document.getElementsByClassName("size");

for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener("click", function(){
        for (let j=0; j < sizes.length; j++) {
            if (sizes[j].style.backgroundColor == "black") {
                sizes[j].style.backgroundColor = "white"
                sizes[j].style.color = "black"
                sizes[i].style.backgroundColor = "black"
                sizes[i].style.color = "white"
            }
        }
        sizes[i].style.backgroundColor = "black"
        sizes[i].style.color = "white";
    }) //problem
}


    


    

function newProductNumber(currentNumber) {
    
    number = Number(currentNumber)
       
    number += 1

    newNumber = number.toString()

    return (newNumber)
  
}

function stringToNumber(str) {

    return(Number(str.replace("SEK", "")))

}

let errorMessage = document.createElement("p");

errorMessage.innerHTML = "* Please select a size and a color to add to cart";
errorMessage.style.color = "red";

addToBag.addEventListener("click", function(e) {
    productCharacteristics = {}
    productCharacteristics["quantity"] = 0
    e.preventDefault();
    for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].style.backgroundColor == "black") {
            for (let j = 0; j < productColorImg.length; j++) {
                if (productColorImg[j].style.border == "solid 1px black") {
                    numberOfProducts.innerHTML = newProductNumber(numberOfProducts.innerHTML);
                    productCharacteristics["productImg"] = productColorImg[j]
                    productCharacteristics["productName"] = productColorImg[j].parentElement.parentElement.children[7].innerHTML
                    productCharacteristics["size"] = sizes[i]       
                    productCharacteristics["prize"] = productColorImg[j].parentElement.parentElement.children[6].innerHTML   
                    productCharacteristics["quantity"] += 1
                    productCharacteristics["total"] = productCharacteristics["quantity"] * stringToNumber(productCharacteristics["prize"])
                }
            }
        }
    }
    addToBag.insertAdjacentHTML("afterend", errorMessage);

    localStorage.setItem("aboutProduct", productCharacteristics)
})
localStorage.setItem("error",errorMessage)