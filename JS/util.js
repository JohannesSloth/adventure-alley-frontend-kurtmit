export const reservationURL = "https://adventure-alley-kurtmit.azurewebsites.net/api/reservations/"
export const customerURL = "https://adventure-alley-kurtmit.azurewebsites.net/api/customers/"
export const activityURL = "https://adventure-alley-kurtmit.azurewebsites.net/api/activities/"
export const employeeURL = "https://adventure-alley-kurtmit.azurewebsites.net/api/api/employees/"


export function handleButtonClick(evt) {

  let lastVisibleContent = document.getElementById("div-info");
  document.getElementById("btns").onclick = handleButtonClick 

    const target = evt.target
    const isMenuBtn = target.tagName === "BUTTON" && target.id.startsWith("mbtn-")
    if (!isMenuBtn) {
      return
    }
    lastVisibleContent.style.display = "none"
    const idForNewVisibleContent = target.id.replace("mbtn", "div")
    lastVisibleContent = document.getElementById(idForNewVisibleContent);
    lastVisibleContent.style.display = "block"

    //Now handle JavaScript for the buttom clicked
    switch (target.id) {
      case "mbtn-info": break 
      case "mbtn-find-one":  break
      case "mbtn-add-one": break
      case "mbtn-edit-one": break
    }
  }


  export async function handleHttpErrors(res) {
    if (!res.ok) {
      const errorResponse = await res.json();
      const error = new Error(errorResponse.message)
      error.apiError = errorResponse
      throw error
    }
    return res.json()
  }

