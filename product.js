let searchInput = document.getElementById("search-input");
let searchBox = document.getElementById("search-box");

searchInput.onkeydown = function (event) {
  if (event.key === "Enter") {
    searchInput.value = "";
  }
};
searchInput.onmouseleave = function () {
  searchInput.value = "";
};

let productColor = document.querySelectorAll(".product_color");
let productColorImg = document.querySelectorAll(".product-color-img");
let productImg = document.getElementsByClassName("product-img");

let greenColor = new Array(
  "images/back_view_green.webp",
  "images/side_view_green.webp",
  "images/side_view2_green.webp",
  "images/front_view_green.webp",
  "images/zoom_green.webp",
  "images/zoom_green2.webp"
);

let blackColor = new Array(
  "images/shirt_back_side.webp",
  "images/shirt_right_side.webp",
  "images/shirt_front_side.webp",
  "images/shirt_front_side2.webp",
  "images/shirt_zoom_back.webp",
  "images/shirt_zoom_front.webp"
);

productColorImg[0].onmousedown = function () {
  productColor[0].innerHTML = "Black/Charcoal Grey";
  
  if (productColorImg[0].classList.contains("selectedColor")) {
  }
  else {
      productColorImg[0].classList.add("selectedColor")
  }
  if (productColorImg[1].classList.contains('selectedColor')) {
    productColorImg[1].classList.remove('selectedColor');
}
  productColorImg[0].style.border = "solid 1px black";
  productColorImg[1].style.border = "solid 0px black";

  for (let i = 0; i < productImg.length; i++) {
    productImg[i].attributes[1].nodeValue = blackColor[i];
  }
}

productColorImg[1].onmousedown = function () {
  productColor[0].innerHTML = "Bali Green/White";

if (productColorImg[1].classList.contains("selectedColor")) {
}
else {
    productColorImg[1].classList.add("selectedColor")
}
if (productColorImg[0].classList.contains('selectedColor')) {
  productColorImg[0].classList.remove('selectedColor');
}

  productColorImg[1].style.border = "solid 1px black";
  productColorImg[0].style.border = "solid 0px black";

  for (let i = 0; i < productImg.length; i++) {
    productImg[i].attributes[1].nodeValue = greenColor[i];
  }
};

let addToBag = document.getElementById("add-to-bag");
let numberOfProducts = document.getElementById("product-counter");
let sizes = document.getElementsByClassName("size");

for (let i = 0; i < sizes.length; i++) {
  sizes[i].addEventListener("mousedown", function () {
    for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].classList.contains("selectedSize")) {
            sizes[i].classList.remove("selectedSize")
        }
    }
        sizes[i].classList.add("selectedSize")
    
  }); 
}

function newProductNumber(currentNumber) {
  number = Number(currentNumber);

  number += 1;

  newNumber = number.toString();

  return newNumber;
}


addToBag.addEventListener("click", function (event) {

    event.preventDefault();

  productCharacteristics = {};
  
  let selectedDetails = new Array();
   
  for (let i = 0; i < productColorImg.length; i++) {
      if (productColorImg[i].classList.contains("selectedColor")) {
        selectedDetails.push(true)
          for (let j = 0; j < sizes.length; j++) {
              if (sizes[j].classList.contains("selectedSize")) {
                selectedDetails.push(true)
                numberOfProducts.innerHTML = newProductNumber(
                  numberOfProducts.innerHTML
                );
                productCharacteristics.image = productColorImg[i].attributes[1].nodeValue;
                productCharacteristics.name =
                  productColorImg[
                    i
                  ].parentElement.parentElement.children[7].innerHTML.replace("\n","");
                productCharacteristics.size = sizes[j].innerHTML;
                productCharacteristics.price =
                  productColorImg[
                    i
                  ].parentElement.parentElement.children[6].innerHTML;
              }
              else {
                selectedDetails.push(false)
              }
           
          }
        
      }
      else {
      selectedDetails.push(false)
    }
    
  }
   if (selectedDetails.filter(x => x === true).length == 2) {
     if (addToBag.parentElement.children.length == 3) {
      addToBag.parentElement.removeChild(addToBag.parentElement.children[1])
      localStorage.setItem("aboutProduct",JSON.stringify(productCharacteristics));
     }
     localStorage.setItem("aboutProduct",JSON.stringify(productCharacteristics));

   }
   else {
    if (addToBag.parentElement.children.length == 3) {
    }
    else {
     addToBag.insertAdjacentHTML("afterend", `<p class="errorMessage">* Please select a color and a size to add to cart</p>`)
    }
   }
});

let shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
console.log(shoppingCart)
/*
numberOfProducts.innerHTML = shoppingCart.length
*/