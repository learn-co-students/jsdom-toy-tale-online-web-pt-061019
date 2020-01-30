let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
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

  function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => addToys(json))
  }

  function addToys(toys) {
    for(const toy in toys) {
      const toyCollection = document.querySelector("div#toy-collection")
      
      const cardDiv = document.createElement("div")
      cardDiv.className = "card"
      toyCollection.appendChild(cardDiv)

      const h2 = document.createElement("h2")
      h2.innerText = toys[toy]['name']
      cardDiv.appendChild(h2)
    
      const img = document.createElement("img")
      img.src = toys[toy]['img']
      img.className = "toy-avatar"
      cardDiv.appendChild(img)

      const p = document.createElement("p")
      p.innerText = `${toys[toy]['likes']} likes`
      cardDiv.appendChild(p)

      const likeBtn = document.createElement("button")
      likeBtn.innerText = "Like <3"
      likeBtn.className = "like-btn"
      likeBtn.id = toys[toy]['id']

      likeBtn.addEventListener('click', e => {
        e.preventDefault()
        addLikes(e.currentTarget)
      })
      
      cardDiv.appendChild(likeBtn)
    }
  }

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
    }
    fetch(`http://localhost:3000/toys/${toy['id']}`, configObj)
    .then(response => console.log(response.json()))
    .then(json => {}) 
  }

  // ADD NEW TOY
  const newToyForm = document.querySelector(".add-toy-form")
  newToyForm.addEventListener('submit', e => {
    e.preventDefault()
    addNewToy(e)
  })
    
  function addNewToy(newToy) {
    let toyData = {
      name: newToyForm.querySelector('input[name]').value,
      img: newToyForm.querySelector('input[name="img"]').value,
      likes: 0
    }
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    }

    fetch("http://localhost:3000/toys", configObj)
      .then(response => console.log(response.json()))
      .then(json => addToys(json))
  }

})