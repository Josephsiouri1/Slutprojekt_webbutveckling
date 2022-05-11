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

let numberOfProducts = document.getElementById("product-counter");

function renderCart() {
  //körs varje gång sidan laddas och när man trycker på delete all knappen för att ändra ifall produkter i tabellen togs bort.
  let shoppingCart = JSON.parse(localStorage.getItem("aboutProducts"));

  let table = document.getElementById("cart-container");

  for (let i = table.children.length - 1; i > 0; i--) {
    //tar bort tabelens innehåll förutom rubrikerna och totala priset sätts till 0kr.
    table.children[i].remove();
  }

  table.classList.add("cart");

  let totalPrice = 0;

  shoppingCart.forEach(function (aboutProduct) {
    table.insertAdjacentHTML(
      "beforeend",
      `<tr class="product-info">
      <td><img class="product-image" src="${aboutProduct.image}"></td>
      <td>${aboutProduct.name}</td>
      <td>${aboutProduct.size}</td>
      <td>${aboutProduct.price}</td> 
      <td><form>
      <input type="number" class="quantity" name="quantity" min="1" value="1">
    </form></td>
    </tr> 
    `
    );
  });
  let quantity = document.getElementsByClassName("quantity");
  let productInfo = document.getElementsByClassName("product-info");

  function stringToNumber(str) {
    //tar emot texten på priset och byter ut till bara siffran.
    return Number(str.replace("SEK", ""));
  }

  let i = 0;

  shoppingCart.forEach(function (aboutProduct) {
    //beräkna priset på enskild produkt beroende på antal kvantitet på produkten.
    price = stringToNumber(aboutProduct.price) * Number(quantity[i].value);

    productInfo[i].insertAdjacentHTML("beforeend", `<td>${price}kr</td>`); //adderar till det totala priset på produkterna.
    totalPrice = totalPrice + price;
    i += 1;
  });

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
  );
  function removeById(id) {
    var element = document.getElementById(id);

    // A bit of robustness helps...
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
  for (let i = 0; i < quantity.length; i++) {
    //vid ändring av kvantitet av produkterna så tas bort de gamla värderna och nya värden skrivs ut.
    quantity[i].onkeydown = function (event) {
      event.preventDefault();
      if (event.key === "Enter") {
        shoppingCart.forEach(function (aboutProduct) {
          newprice =
            stringToNumber(aboutProduct.price) * Number(quantity[i].value);
          productInfo[i].removeChild(productInfo[i].children[5]); //tar bort det sista barnet vilket är det gamla priset.
          productInfo[i].insertAdjacentHTML(
            "beforeend",
            `<td>${newprice} kr</td>`
          );
        });

        removeById("total-price"); //tar bort gamla värdet

        let prices = [];

        for (let i = 0; i < productInfo.length; i++) {
          prices.push(
            Number(productInfo[i].children[5].innerHTML.replace("kr", ""))
          ); //lägger till alla priser till en lista genom att omvanda tabell innehållet till en siffra.
        }

        totalPrice = 0;

        for (let i = 0; i < prices.length; i++) {
          totalPrice = totalPrice + prices[i];
        }

        table.insertAdjacentHTML(
          //skriver ut det nya värdet
          "beforeend",
          `<tr id="total-price">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Total pris:</strong> ${totalPrice} kr</td>
                  <td></td>
                </tr>`
        );
      }
    };
  }
  numberOfProducts.innerHTML = shoppingCart.length;
}

renderCart();

let deleteAll = document.getElementById("delete-all");
deleteAll.addEventListener("click", function (event) {
  event.preventDefault();

  localStorage.setItem("aboutProducts", "[]"); //allt i produkt listan tas bort då man trycker på delete all.
  renderCart();
});
