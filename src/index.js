let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const createNewToyBtn = toyForm.querySelector('input.submit')
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


  function fetchToys(){
    return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => displayToys(json))
  }

  function displayToys(toys){
    for(const toy in toys){

      //takes the response data and makes a child <div class="card"> for each toy in #toy-collection
      const toyCollection = document.querySelector("div#toy-collection")
      const createDiv = document.createElement("div")
      createDiv.className = "card"
      toyCollection.appendChild(createDiv)

      //creates child element h2 with toy name
      const h2ForName = document.createElement("h2")
      h2ForName.innerText = toys[toy]['name']
      createDiv.appendChild(h2ForName)

      //creates img child element
      const toyImg = document.createElement("img")
      toyImg.src = toys[toy]['image']
      toyImg.className = "toy-avatar"
      createDiv.appendChild(toyImg)

      //creates p tag for likes
      const likes = document.createElement("p")
      likes.innerText = `${toys[toy]['likes']} likes`
      createDiv.appendChild(likes)

      //creates button tag with class "like-btn"
      const likeButton = document.createElement("button")
      likeButton.innerText = "Like ♥️"
      likeButton.className = "like-btn"
      likeButton.id = toys[toy]['id']
      likeButton.addEventListener('click', e => {
        e.preventDefault()
        addLikes(e.currentTarget)
      })
      createDiv.appendChild(likeButton)
    }
  }

  //creates function to increase Toy's Likes

  function addLikes(toy){
    let newCount = parseInt(toy.parentElement.querySelector('p').innerText)

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"likes": newCount + 1})
    };
    return fetch(`http://localhost:3000/toys/${toy['id']}`, configObj)
      .then(resp => resp.json())
      .then(json => {toy.parentElement.querySelector('p').innerText = `${json.likes} Likes`});
  }

  //Adds new toy
  const newToy = document.querySelector(".add-toy-form")
  newToy.addEventListener('submit', e => {
    e.preventDefault()
    addNewToy(e)
  })

  function addNewToy(toy){
    event.preventDefault();
    let newToyData = {
      name: newToy.querySelector('input[name]').value,
      image: newToy.querySelector('input[name="image"]').value,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToyData)
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(resp => resp.json)
      .then(json => displayToys(json));

  }

})
