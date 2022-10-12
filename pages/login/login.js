import {employeeURL} from "../../util.js";


const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const employeeLogin = await fetch(employeeURL).then(e => e.json())


    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})