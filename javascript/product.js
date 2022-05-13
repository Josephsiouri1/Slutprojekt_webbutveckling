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
    //kontrollerar om tagen redan har klassen "selectedColor" eller inte för att lägga till den när man klickar.
  } else {
    productColorImg[0].classList.add("selectedColor");
  }
  if (productColorImg[1].classList.contains("selectedColor")) {
    productColorImg[1].classList.remove("selectedColor");
  }
  productColorImg[0].style.border = "solid 1px black";
  productColorImg[1].style.border = "solid 0px black";

  for (let i = 0; i < productImg.length; i++) {
    //går igenom svart färg listan i ordning för att byta tagen för varje bild.
    productImg[i].attributes[1].nodeValue = blackColor[i];
  }
};

productColorImg[1].onmousedown = function () {
  productColor[0].innerHTML = "Bali Green/White";

  if (productColorImg[1].classList.contains("selectedColor")) {
  } else {
    productColorImg[1].classList.add("selectedColor");
  }
  if (productColorImg[0].classList.contains("selectedColor")) {
    productColorImg[0].classList.remove("selectedColor");
  }

  productColorImg[1].style.border = "solid 1px black";
  productColorImg[0].style.border = "solid 0px black";

  for (let i = 0; i < productImg.length; i++) {
    //går igenom svart färg listan i ordning för att byta tagen för varje bild.
    productImg[i].attributes[1].nodeValue = greenColor[i];
  }
};

let addToBag = document.getElementById("add-to-bag");
let numberOfProducts = document.getElementById("product-counter");
let sizes = document.getElementsByClassName("size");

for (let i = 0; i < sizes.length; i++) {
  //när en storlek tag är valt så tas bort klassen "size" från andra taggar.
  sizes[i].addEventListener("mousedown", function () {
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i].classList.contains("selectedSize")) {
        sizes[i].classList.remove("selectedSize");
      }
    }
    sizes[i].classList.add("selectedSize");
  });
}

function newProductNumber(currentNumber) {
  //ändrar på siffran på antalet produkter genom att först omvandla från string to number.
  number = Number(currentNumber);

  number += 1;

  newNumber = number.toString();

  return newNumber;
}

let cart = new Array(); //den första listan som skickas till shopping cart sidan.

addToBag.addEventListener("click", function (event) {
  event.preventDefault();

  productCharacteristics = {};
  //tom objekt som fylls med produkt egenskaper som färg, namn, storlek.. och sedan adderas till listan som i sin tur skickas till andra sidan.

  let selectedDetails = new Array(); //kontrollerar om alla altenativ som bör vara valda innan att lägga till är valda.

  for (let i = 0; i < productColorImg.length; i++) {
    if (productColorImg[i].classList.contains("selectedColor")) {
      selectedDetails.push(true);
      for (let j = 0; j < sizes.length; j++) {
        if (sizes[j].classList.contains("selectedSize")) {
          selectedDetails.push(true);
          numberOfProducts.innerHTML = newProductNumber(
            numberOfProducts.innerHTML
          );
          productCharacteristics.image =
            productColorImg[i].attributes[1].nodeValue;
          productCharacteristics.name = productColorImg[
            i
          ].parentElement.parentElement.children[7].innerHTML.replace("\n", ""); //utgå från föräldern som är gemensam för alla produkter, det ska alltså fungera om det fanns andra produkter.
          productCharacteristics.size = sizes[j].innerHTML;
          productCharacteristics.price =
            productColorImg[
              i
            ].parentElement.parentElement.children[6].innerHTML;
        } else {
          selectedDetails.push(false);
        }
      }
    } else {
      selectedDetails.push(false);
    }
  }
  if (selectedDetails.filter((x) => x === true).length == 2) {
    //om det två "true" betyder det att både färgen och storleken är valda vilken kan nu skicka vidare listan.
    removeErrorMessage();
    let cartInStorage = JSON.parse(localStorage.getItem("aboutProducts"));
    if (cartInStorage === null) {
      cart.push(productCharacteristics);
      cartInStorage = cart;
      localStorage.setItem("aboutProducts", JSON.stringify(cartInStorage));
    } else {
      let isAlreadyInCart = productInCart(
        cartInStorage,
        productCharacteristics
      ); //om det valda produkten finns redan i listan behövs den inte läggas till igen.
      if (!isAlreadyInCart) {
        cartInStorage.push(productCharacteristics);
        localStorage.setItem("aboutProducts", JSON.stringify(cartInStorage));
      }
    }
  } else {
    if (removeErrorMessage()) {
      //kontrollerar i funktionen om klassen errorMessage finns redan i sidan så den behövs inte läggas till igen.
    } else {
      addToBag.insertAdjacentHTML(
        "afterend",
        `<p class="errorMessage">* Please select a color and a size to add to cart</p>`
      );
    }
  }
});

function removeErrorMessage() {
  if (document.getElementsByClassName("errorMessage").length > 0) {
    document.getElementsByClassName("errorMessage")[0].remove();
  }
}

function productInCart(cartInStorage, productCharacteristics) {
  //den funktionen tar emot den ny skapade objekten och kontrollerar om den liknar en annan objekt som finns redan i listan så den behöver inte läggas till.
  let checkList = [];

  for (let i = 0; i < cartInStorage.length; i++) {
    if (
      cartInStorage[i].size === productCharacteristics.size &&
      cartInStorage[i].image === productCharacteristics.image
    ) {
      checkList.push(true);
    } else {
      checkList.push(false);
    }
  }
  if (checkList.includes(true)) {
    //om den if-satsen uppfylls betyder det att en objekt i listan matchar med den ny skapade objekten.
    return true;
  } else {
    return false;
  }
}

let shoppingCart = JSON.parse(localStorage.getItem("aboutProducts"));

numberOfProducts.innerHTML = shoppingCart.length;
//upptaderar alltid antalet produkter utifrån längen av produkt listan som finns i shopping cart sidan.
