import {reservationURL} from "../../util.js"
import { handleHttpErrors } from "../../util.js";
//console.log("hey");

document.getElementById("outer").onclick = bookTime

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

function bookTime(event){
    const targetId = event.target.id
    console.log(targetId);
    document.getElementById('outer').onclick = openForm()
    //document.getElementById('btn-close-form').onclick = closeForm()
}

 async function openForm() {
    document.getElementById("popupForm").style.display = "block";
  }
  async function closeForm() {
    document.getElementById("popupForm").style.display = "none";
  }



