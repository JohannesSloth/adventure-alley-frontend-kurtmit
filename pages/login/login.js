import { employeeURL } from "../../util.js";


const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password-field');

/*loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const employee = await fetch(employeeURL).then(e => e.json())
    const employees = []
    employee.map(employee => employees[employee])

    for (let i = 0; i < employees.length; i++){
        if (employees[i].username === username && employees[i].password === password) {
            alert("You have successfully logged in.");
            location.reload();
        } else {
            loginErrorMsg.style.opacity = 1;
        }
    }
})*/


//Dette er login-formen med predefineret værdier indtil videre
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "1" && password === "2") {
        alert("Du har logget ind");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

// Dette er vis/skjul funktionen til password
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
})
