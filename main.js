console.log("Ur a wizard, Harry!")

//target all elements of the DOM
const sortingHatContainer = document.querySelector("#sorting-hat-container")
const mainPageContainer = document.querySelector("#main-page-container")
const getSortedButton = document.querySelector("#get-sorted-button")
const sortMeButton = document.querySelector("#sort-me-button")
const hogwartsStudents = document.querySelector("#hogwarts-students")
const voldysArmy = document.querySelector("#voldys-army")
const form = document.querySelector("form")
const sortingButtonsContainer = document.querySelector("#sorting-buttons-container")

//function that hides the Sorting Hat card and displays the main page
const startApp = () => {
  sortingHatContainer.toggleAttribute("hidden")
  mainPageContainer.toggleAttribute("hidden")
  renderCards(studentArray, hogwartsStudents)
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
    house: "Slytherin"
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

// function that generates a random House
const randomHouse = () => {
  let randomNumber = Math.ceil((Math.random() * 4))
  let house = ""

  switch (randomNumber) {
    case 1:
      house = "Gryffindor";
      break
    case 2:
      house = "Hufflepuff";
      break
    case 3:
      house = "Ravenclaw";
      break
    case 4:
      house = "Slytherin";
      break
  }
  return house
}

//function that creates a new card and adds it to the hogwartsStudents array
const createNewCard = (e) => {
  e.preventDefault()

  const newStudentObj = 
    {
      id: studentArray.length + 1,
      name: document.querySelector("#nameInput").value,
      house: randomHouse(),
    }
  
  studentArray.push(newStudentObj)
  form.reset()
  renderCards(studentArray, hogwartsStudents)
}

//event listener on the Sort Me button that calls the renderCards function
form.addEventListener("submit", createNewCard)

//function that filters the cards in the hogwartsStudents div
const filterCards = (e) => {
  [, buttonHouse] = e.target.id.split("-")
  
  const filteredArray = []

  studentArray.forEach(student => {
    if (buttonHouse === "all") {
      filteredArray.push(student)
    } else if (student.house.toLowerCase() === buttonHouse) {
      filteredArray.push(student)
    }
  })

  renderCards(filteredArray, hogwartsStudents)
}

//event listener for the sorting-buttons-container div that calls the filterCards function
sortingButtonsContainer.addEventListener("click", filterCards)
