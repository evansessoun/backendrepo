const pswdBtn = document.getElementById("pswdBtn");
pswdBtn.addEventListener("click", function(){
    console.log("I am pressed")
    const pswdInput = document.getElementById("pswdInput");
    const type = pswdInput.getAttribute("type");
    if(type == "password"){
        pswdInput.setAttribute("type", "text");
        pswdBtn.innerHTML = "Hide Password";
    } else {
        pswdInput.setAttribute("type", "password");
        pswdBtn.innerHTML = "Show Password";
    }
})