console.log("Ur a wizard, Harry!")

//target all elements of the DOM
const sortingHatContainer = document.querySelector("#sorting-hat-container")
const mainPageContainer = document.querySelector("#main-page-container")
const getSortedButton = document.querySelector("#get-sorted-button")
const sortMeButton = document.querySelector("#sort-me-button")
const hogwartsStudents = document.querySelector("#hogwarts-students")
const voldysArmy = document.querySelector("#voldys-army")

//function that hides the Sorting Hat card and displays the main page
const startApp = () => {
  sortingHatContainer.toggleAttribute("hidden")
  mainPageContainer.toggleAttribute("hidden")
  // renderCards(studentArray, hogwartsStudents)
}

//event listener for the Get Sorted button that calls the startApp function
getSortedButton.addEventListener("click", startApp)

//array of existing Hogwarts students
const studentArray = [
  {
    id: 1,
    name: "Harry",
    house: "Gryffindor"
  },
  {
    id: 2,
    name: "Hermione",
    house: "Gryffindor"
  },
  {
    id: 3,
    name: "Ron",
    house: "Gryffindor"
  },
  {
    id: 4,
    name: "Draco",
    house: "Syltherin"
  }
]

//function that renders cards to the dom, taking an argument of an array and a div id
const renderCards = (array, divId) => {
  let domString = ""

  array.forEach(item => {
    domString += `
    <div class="card">
      <div class="card-header">${item.house}</div>
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <a href="#" class="btn btn-primary" id="expel--${item.id}">Expel</a>
      </div>
    </div>
    `
  })

  divId.innerHTML = domString
}

//event listener on the Sort Me button that calls the renderCards function - function is getting called without clicking the button, need to figure that out
// sortMeButton.addEventListener("click", renderCards(studentArray, hogwartsStudents))
