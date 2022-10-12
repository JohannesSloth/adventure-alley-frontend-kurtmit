import {employeeURL} from "../../util.js";


const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

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

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "1" && password === "2") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})