import {reservationURL} from "../../util.js"
import { handleHttpErrors } from "../../util.js"
import {customerURL} from "../../util.js"



document.getElementById("outer").style.display = "none"

document.getElementById("btn-activity-sumo").onclick = checkAvailability
document.getElementById("btn-activity-minigolf").onclick = checkAvailability
document.getElementById("btn-activity-paintball").onclick = checkAvailability
document.getElementById("btn-activity-gokart").onclick = checkAvailability

let activityName = ''
let listOfReservedTimeslots = []

export async function checkAvailability(activity){
    const date = document.getElementById("input-date").value
    if (date !== "") {
        document.getElementById("outer").style.display = "block"
    }

    activityName = activity.target.value
    const url = reservationURL + activityName + '/' + date

    console.log(date);
    
    const dayReservations = await fetch(url).then(r => r.json())
    listOfReservedTimeslots = dayReservations.map(res => res.startTime)
    
    for (let i = 10; i < 22; i++){
        changecolor('black',1, i + '')
        if (listOfReservedTimeslots.includes(i + '')){
            changecolor('grey',0.5, i + '')
        }
    }
}

function changecolor(color, opacity ,elementId){
    document.getElementById(elementId).style.borderColor = color
    document.getElementById(elementId).style.textcolor = color
    document.getElementById(elementId).style.opacity = opacity
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
    
        options.body = JSON.stringify(reservationDetails)
        const addedReservation = await fetch(reservationURL, options).then(handleHttpErrors)
        } else {
            document.getElementById("error-msg").style.display = "block"
    }
}