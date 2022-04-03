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
    }
    else {
        textError.innerHTML = "Please Enter Valid Email Adress";
        textError.style.color = "red";
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
    }

    else {
        textError.innerHTML = "Your Password is Valid.";
        textError.style.color = "green";
    }

}

function validationSubmit() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let textError = document.getElementById("text-error");
    let submit = document.getElementById("submit");
    
    submit.addEventListener("mousedown", function(e) {
        if (email === "" || password === "" || textError.style.color === "red") {
            e.preventDefault();
        }
    })
}
