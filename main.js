console.log("Yer a wizard, Harry!")

//target all elements of the DOM
const sortingHatContainer = document.querySelector("#sorting-hat-container")
const mainPageContainer = document.querySelector("#main-page-container")
const getSortedButton = document.querySelector("#get-sorted-button")
const sortMeButton = document.querySelector("#sort-me-button")
const hogwartsStudents = document.querySelector("#hogwarts-students")
const voldysArmy = document.querySelector("#voldys-army")
const form = document.querySelector("form")
const sortingButtonsContainer = document.querySelector("#sorting-buttons-container")
const sortingHatImage = document.querySelector("#sorting-hat-div-img")
const formContainer = document.querySelector("#form-container")

//function that hides the Sorting Hat card and displays the main page
const startApp = () => {
  sortingHatContainer.toggleAttribute("hidden")
  mainPageContainer.toggleAttribute("hidden")
  renderCards(studentArray, hogwartsStudents)
}

//event listener for the Get Sorted button that calls the startApp function
getSortedButton.addEventListener("click", startApp)

//function that displays the form
const showForm = () => {
  // sortingHatImage.toggleAttribute("hidden")
  formContainer.toggleAttribute("hidden")
}

//event listener for the Sorting Hat image that calls the showForm function
sortingHatImage.addEventListener("click", showForm)

//function that returns a random id number
const randomId = () => {
  let randomNumber = Math.random() * 100000000000000000
  return randomNumber
}

//array of existing Hogwarts students
const studentArray = [
  {
    id: randomId(),
    name: "Harry",
    house: "Gryffindor"
  },
  {
    id: randomId(),
    name: "Hermione",
    house: "Gryffindor"
  },
  {
    id: randomId(),
    name: "Ron",
    house: "Gryffindor"
  },
  {
    id: randomId(),
    name: "Draco",
    house: "Slytherin"
  },
  {
    id: randomId(),
    name: "Cedric",
    house: "Hufflepuff"
  },
  {
    id: randomId(),
    name: "Luna",
    house: "Ravenclaw"
  },
  {
    id: randomId(),
    name: "Snape",
    house: "Slytherin"
  }
]

//function that renders cards to the dom, taking an argument of an array and a div id
const renderCards = (array, divId) => {
  let domString = ""

  if (divId === hogwartsStudents) {

    //got this double sort method from https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
    array.sort((a, b) => a.house.localeCompare(b.house) || a.name.localeCompare(b.name))

    array.forEach(item => {
      domString += `
      <div class="card student-card ${item.house}-card">
        <img src="images/${item.house}.png" class="card-img-top ${item.house}-img" alt="House Logo">
        <div class="card-header ${item.house}-header">${item.house}</div>
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <a href="#" class="btn btn-primary expel-btn" id="expel--${item.id}">Expel</a>
        </div>
      </div>
      `
    })
  } else if (divId === voldysArmy) {

    array.sort((a, b) => a.name.localeCompare(b.name))

    array.forEach(item => {
      domString += `
      <div class="card student-card deatheater-card">
        <img src="images/death-eater.png" class="card-img-top" alt="Death Eater">
        <div class="card-header deatheater-header">Death Eater</div>
        <div class="card-body deatheater-card-body">
          <p class="card-text">Sadly, <strong>${item.name}</strong> has gone over to the dark side!</p>
          <a href="#" class="btn btn-primary readmit-btn" id="readmit--${item.id}">Readmit</a>
        </div>
      </div>
      `
    })
  }
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
      id: randomId(),
      name: document.querySelector("#nameInput").value,
      house: randomHouse(),
    }
  
  studentArray.push(newStudentObj)
  form.reset()
  // renderCards(studentArray, hogwartsStudents)
  filterCards(currentFilter)
}

//event listener on the Sort Me button that calls the renderCards function
form.addEventListener("submit", createNewCard)

//variable to hold the current filter
let currentFilter = "all"

//function that filters the cards in the hogwartsStudents div
const filterCards = (buttonHouse) => {
  const filteredArray = []

  studentArray.forEach(student => {
    if (buttonHouse === "all") {
      filteredArray.push(student)
      currentFilter = "all"
    } else if (student.house.toLowerCase() === buttonHouse) {
      filteredArray.push(student)
      currentFilter = buttonHouse
    }
  })

  renderCards(filteredArray, hogwartsStudents)
}

//event listener for the sorting-buttons-container div that calls the filterCards function
sortingButtonsContainer.addEventListener("click", (e) => {
    [, buttonHouse] = e.target.id.split("-")
    filterCards(buttonHouse)
  })

//empty array for voldys army
const voldysArmyArray = []

//function to make Expel button delete card from the hogwartsStudents div and add it to the voldysArmy div
const expel = (e) => {

  if (e.target.id.includes("expel")) {
    e.preventDefault()
    
    const [, expelId] = e.target.id.split("--")
    const index = studentArray.findIndex((student) => student.id === Number(expelId))

    const newVoldyObj = studentArray[index]
    console.log(newVoldyObj)
    voldysArmyArray.push(newVoldyObj)
    
    studentArray.splice(index, 1)
    
    renderCards(voldysArmyArray, voldysArmy)
    filterCards(currentFilter)
  }
}

//function to make Readmit button delete card from voldysArmy div and add it to the hogwartsStudents div
const readmit = (e) => {

  if (e.target.id.includes("readmit")) {
    e.preventDefault()
    
    const [, readmitId] = e.target.id.split("--")
    const index = voldysArmyArray.findIndex((student) => student.id === Number(readmitId))

    const newStudentObj = voldysArmyArray[index]
    studentArray.push(newStudentObj)
    
    voldysArmyArray.splice(index, 1)
    
    renderCards(voldysArmyArray, voldysArmy)
    filterCards(currentFilter)
  }
}

//event listener for Expel buttons
mainPageContainer.addEventListener("click", expel)

//event listener for Readmit buttons
mainPageContainer.addEventListener("click", readmit)
