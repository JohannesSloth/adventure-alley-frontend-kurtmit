import {reservationURL} from "../../util.js"
import { handleHttpErrors } from "../../util.js"
import {customerURL} from "../../util.js"



document.getElementById("outer").style.display = "none"

document.getElementById("activities").onclick = checkAvailability

let activityName = ''
let listOfReservedTimeslots = []

export async function checkAvailability(activity){
    listOfReservedTimeslots = []
    const date = document.getElementById("input-date").value
    if (date !== "") {
        document.getElementById("outer").style.display = "block"
    }

    activityName = activity.target.value
    const url = reservationURL + activityName + '/' + date

    const dayReservations = await fetch(url).then(r => r.json())
    listOfReservedTimeslots = dayReservations.map(res => res.startTime)
    
    for (let i = 10; i < 22; i++){
        changecolor("rgb(119, 255, 51)", i + '')
        if (listOfReservedTimeslots.includes(i + '')){
            changecolor("rgb(255, 102, 102)", i + '')
        }
    }
}

function changecolor(color ,elementId){
    document.getElementById(elementId).style.backgroundColor = color
    
}

document.getElementById("outer").onclick = openForm
document.getElementById("btn-close-form").onclick = closeForm

let time = ""

document.getElementById("error-msg").innerText = "Der er fejl i reservationen. Prøv igen."
document.getElementById("error-msg").style.display = "none"

function openForm(evt) {
    document.getElementById("error-msg").style.display = "none"
    console.log(evt.target.id);
    time = evt.target.id
    if (time !== "outer" && !listOfReservedTimeslots.includes(time)){
        document.getElementById("popupForm").style.display = "block";
    }
    if (!listOfReservedTimeslots.includes(time)){
        document.getElementById("reservation-activity").innerText = "Aktivitet: " + activityName + "\n Tidspunkt: Kl. " + time
    } else if (time === "outer") {
        document.getElementById("reservation-activity").innerText = "Aktivitet: " + activityName + "\n Vælg venligst et tidspunkt"
        time = "invalid"
        } else {
            document.getElementById("reservation-activity").innerText = "Aktivitet: " + activityName + "\n Kl. " + time + " er booket"
            time = "invalid"
        }
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
  }

document.getElementById('submitReservation').onclick = makeReservation

async function makeReservation(){
    const custName = document.getElementById('custName').value
    const custEmail = document.getElementById('custEmail').value
    const custPhone = document.getElementById('custPhone').value
    const numberOfParticipants = document.getElementById('custParticipants').value
    const compName = document.getElementById('compName').value
    const compCVR = document.getElementById('compCVR').value

    const customerDetails = {
        customerName: custName,
        customerEmail: custEmail,
        phoneNumber: custPhone,
        companyName: compName,
        cvrNumber: compCVR
    }

    const reservationDetails = {
        numberOfParticipants: numberOfParticipants,
        date: document.getElementById("input-date").value,
        startTime: time,
        customerEmail: custEmail,
        activityName: activityName
    }
    
    if (time != "invalid") {
        const options = {}
        options.method = "POST"
        options.headers = { "Content-type": "application/json" }
        options.body = JSON.stringify(customerDetails)
        const addedCustomer = await fetch(customerURL, options).then(handleHttpErrors)
    
        
        const options1 = {}
        options1.method = "POST"
        options1.headers = { "Content-type": "application/json" }
        options1.body = JSON.stringify(reservationDetails)
    
        const addedReservation = await fetch(reservationURL, options1).then(handleHttpErrors).catch(err => console.log(err))
        } else {
            document.getElementById("error-msg").style.display = "block"
    }
}