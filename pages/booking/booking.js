import {reservationURL} from "../../util.js"
import { handleHttpErrors } from "../../util.js";
//console.log("hey");


/*function getTargetId(event) { 
    const targetId = event.target.id
    console.log(targetId)
    return targetId
}*/

document.getElementById("btn-activity-sumo").onclick = checkAvailability
document.getElementById("btn-activity-minigolf").onclick = checkAvailability
document.getElementById("btn-activity-paintball").onclick = checkAvailability
document.getElementById("btn-activity-gokart").onclick = checkAvailability

/*function greenDivs(){
    for (let i = 10; i < 23; i++){
        if (1 === 1){
            document.getElementById(i + '').style.backgroundColor = 'green'
        }
    }
}*/

export async function checkAvailability(activity){
    const date = document.getElementById("input-date").value
    const activityName = activity.target.value
    const url = reservationURL + activityName + '/' + date

    console.log(activityName);
    
    const dayReservations = await fetch(url).then(r => r.json())
    const listOfReservedTimeslots = dayReservations.map(res => res.startTime)
    
    for (let i = 10; i < 23; i++){
        changecolor('green', i + '')
        if (listOfReservedTimeslots.includes(i + '')){
            changecolor('red', i + '')
        }
    }
}

function changecolor(color, elementId){
    document.getElementById(elementId).style.backgroundColor = color
}

/*function bookTime(event){
    const targetStartTime = event.target.id
    console.log(targetStartTime);
    const custName = prompt("Indtast dit navn: ")
    const custEmail = prompt("Indtast din email: ")
    const custPhoneNumber = prompt("Indtast dit telefonnummer: ")
    const isCompany = prompt("Bestiller du for et firma? (ja/nej)")
    if (isCompany === "ja"){
        const compName = prompt("Indtast navnet på jeres firma: ")
        const compCVR = prompt("Indtast firmaets CVR-nummer: ")
    }
}

document.getElementById("outer").onclick = bookTime*/

//const startTime1 = document.getElementById("outer").onclick = getTargetId()

document.getElementById("outer").onclick = openForm
document.getElementById("btn-close-form").onclick = closeForm

let time = ""

function openForm(evt) {
    console.log(evt.target.id);
    time = evt.target.id
    document.getElementById("popupForm").style.display = "block";
    //const startTime = event.target.id
    //console.log(startTime);
  }
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
  }

document.getElementById('submitReservation').onclick = makeReservation

function makeReservation(){
    const custName = document.getElementById('custName').value
    const custEmail = document.getElementById('custEmail').value
    const custPhone = document.getElementById('custPhone').value
    const numberOfParticipants = document.getElementById('custParticipants').value
    const compName = document.getElementById('compName').value
    const compCVR = document.getElementById('compCVR').value

    const customerDetails = {
        Name: custName,
        Email: custEmail,
        Phone: custPhone,
        CompanyName: compName,
        CompanyCVR: compCVR
    }

    const reservationDetails = {
        numberOfParticipants: numberOfParticipants,
        date: document.getElementById("input-date").value,
        startTime: time
    }
    alert(reservationDetails.startTime)
}



