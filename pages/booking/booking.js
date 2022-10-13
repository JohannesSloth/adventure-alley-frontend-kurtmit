const time = document.getElementById("thead").onclick = findTargetId


function findTargetId(event){
    const targetId = event.target.id
}



document.getElementById("btn-activity-sumo").onclick = checkAvailability
document.getElementById("btn-activity-minigolf").onclick = checkAvailability
document.getElementById("btn-activity-paintball").onclick = checkAvailability
document.getElementById("btn-activity-gokart").onclick = checkAvailability

function checkAvailability(activity){
    const date = document.getElementById("input-date").value
    const activityName = activity.target.value
    
    

}