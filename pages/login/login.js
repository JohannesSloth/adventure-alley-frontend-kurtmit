import { employeeURL } from "../../util.js";
let router;


const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password-field');


/*async function employeeLogin() {
    const loginInfo = {
        userName: document.getElementById("username-field").value,
        password: document.getElementById("password-field").value
    }

    const opts = {}
    opts.method = "POST"
    opts.headers = { "Content-type": "application/json" }
    opts.body = JSON.stringify(loginInfo)

    await fetch(employeeURL, opts).then(response => {
        
    })
}*/




loginButton.addEventListener("click", async(e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const loginInfo = await fetch(employeeURL).then(l => l.json())
    //listOfEmployees = loginInfo.map(emp => emp)
    console.log(loginInfo)

    if (username === employeeURL.username && password === employeeURL.password) {
        alert("Du har logget ind");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }

    /*if (username === "1" && password === "2") {
        alert("Du har logget ind");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }*/
})
















// Dette er vis/skjul funktionen til password
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
})
