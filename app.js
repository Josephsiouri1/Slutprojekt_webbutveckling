let intro_bild = document.getElementById("intro_image");
let text_bild = document.getElementById("text_image");

intro_bild.addEventListener("mouseover", function(){
    intro_bild.style.width = "100vw";
})
intro_bild.addEventListener("mouseleave", function(){
    intro_bild.style.width = "90vw";
})
text_bild.addEventListener("mouseover", function() {
    intro_bild.style.width = "100vw";
})
text_bild.addEventListener("mouseleave", function() {
    intro_bild.style.width = "90vw";
})

let searchInput = document.getElementById("search-input");

searchInput.onkeydown = function(event) {
    if (event.key === "Enter") {
        searchInput.value = ""
    }
}
searchInput.onmouseleave = function() {
        searchInput.value = ""    
}

let numberOfProducts = document.getElementById("product-counter").innerHTML;


function newProductNumber(currentNumber) {

   let number = Number(currentNumber);
  
   number += 1

   number = number.toString()

   currentNumber = number

   console.log(currentNumber)

}
  
newProductNumber(numberOfProducts);