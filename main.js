console.log("Ur a wizard, Harry!")

//target all elements of the DOM
const sortingHatContainer = document.querySelector("#sorting-hat-container")
const mainPageContainer = document.querySelector("#main-page-container")
const getSortedButton = document.querySelector("#get-sorted-button")

//function that hides the Sorting Hat card and displays the main page
const startApp = () => {
  sortingHatContainer.toggleAttribute("hidden")
  mainPageContainer.toggleAttribute("hidden")
}

//event listener for the Get Sorted button that calls the startApp function
getSortedButton.addEventListener("click", startApp)
