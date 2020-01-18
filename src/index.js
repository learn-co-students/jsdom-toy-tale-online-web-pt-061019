let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  //was already here:
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
   // helper for fetching Andy's toys
  fetchToys()

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

//Fetch Andy's toy
function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => showToys(json))
};

function showToys(toys) {
  for(const toy in toys) {
    // for...in statement iterates over the properties in an object, but it doesn't pass the entire property into the block. Instead, it only passes in the keys.

    const divCollection = document.querySelector("div#toy-collection")
    const createdDiv = document.createElement("div")
    // createdDiv.id = toys[toy]['id']
    createdDiv.className = "card"
       // className property sets or returns the class name of an element
    divCollection.appendChild(createdDiv)

    //h2 tag with the toy's name
    const h2 = document.createElement("h2")
    h2.innerText = toys[toy]['name']
    createdDiv.appendChild(h2)
   
    // img tag with the src of the toy's image attribute and the class name "toy-avatar"
    const image = document.createElement("img")
    image.src = toys[toy]['image']
    image.className = "toy-avatar"
    createdDiv.appendChild(image)

    //p tag with how many likes that toy has
    const p = document.createElement("p")
    p.innerText = `${toys[toy]['likes']} likes`
    createdDiv.appendChild(p)

    // button tag with a class "like-btn"
    const likebtn = document.createElement("button")
    likebtn.innerText = "Like ♥️"
    likebtn.className = "like-btn"
    likebtn.id = toys[toy]['id']
    likebtn.addEventListener('click', e => {
      e.preventDefault()
      addLikes(e.currentTarget)
  })
    createdDiv.appendChild(likebtn)
  } //END for(const toy in toys)
} //END function showToys

//Increase Toy's Likes
    function addLikes(toy) {
      let newCount = parseInt(toy.parentElement.querySelector('p').innerText)      
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: newCount + 1})
      };
      // debugger
      fetch(`http://localhost:3000/toys/${toy['id']}`, configObj)
      .then(response => console.log(response.json()))
      .then(json => {}); 
      // debugger
        // return toy.likes + 1
    }

 // Add a New Toy
    const newToyForm = document.querySelector(".add-toy-form");
    newToyForm.addEventListener('submit', e => {
      e.preventDefault();
      addNewToy(e)
    })
    
    function addNewToy(newToy) {
      event.preventDefault();
      let toyData = {
        name: newToyForm.querySelector('input[name]').value,
        image: newToyForm.querySelector('input[name="image"]').value,
        likes: 0
      }
    
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(toyData)
      };

      fetch("http://localhost:3000/toys", configObj)
        .then(response => console.log(response.json()))
        .then(json => showToys(json));
    } //END of addNewToy(newToy)

}) //end of DOM CONTENT Loaded
