let intro_bild = document.getElementById("intro_image");
let text_bild = document.getElementById("text_image");

intro_bild.addEventListener("mouseover", function(e){
    intro_bild.style.width = "100vw";
})
intro_bild.addEventListener("mouseleave", function(e){
    intro_bild.style.width = "90vw";
})
text_bild.addEventListener("mouseover", function(e) {
    intro_bild.style.width = "100vw";
})
text_bild.addEventListener("mouseleave", function(e) {
    intro_bild.style.width = "90vw";
})