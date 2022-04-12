
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

function validationEmail() {
    let email = document.getElementById("email").value;
    let textError = document.getElementById("text-error");
    let pattern =  /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email == "") {
        textError.innerHTML = "";
    }

    if (email.match(pattern)) {
        textError.innerHTML = "Your Email Adress is Valid.";
        textError.style.color = "green";
        return (false)
    }
    else {
        textError.innerHTML = "Please Enter Valid Email Adress";
        textError.style.color = "red";
        return (true)
    }

}


function validationPassword() {
    let password = document.getElementById("password").value;
    let textError = document.getElementById("text-error");
    if (password == "") {
        textError.innerHTML = "";
    }
    if (password.length < 6 || password.length > 20) {
        textError.innerHTML = "Your Password must be longer than 6 and shorter the 20 characters.";
        textError.style.color = "red";
        return (true)
    }

    else {
        textError.innerHTML = "Your Password is Valid.";
        textError.style.color = "green";
        return (false)
    }

}



function validationSubmit() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let textError = document.getElementById("text-error");
    let loginBox = document.getElementById("login-box");
    
    loginBox.addEventListener("click",function(event) {
        event.preventDefault()
        if (email === "" || password === "" || validationEmail() || validationPassword()) {
            textError.innerHTML = "You're data isn't complete!";
            textError.style.color = "red";
        }
        else {
            textError.innerHTML = "You have logged in successfully!";
            textError.style.color = "green";
        }
    })
}

let numberOfProducts = document.getElementById("product-counter");
let shoppingCart = localStorage.getItem("shopping-cart");
/*
numberOfProducts.innerHTML = shoppingCart.length
*/