let addToy = false
const toyUrl = "http://localhost:3000/toys"

function fetchToy() {
  fetch(toyUrl)
  .then(response => response.json())
  .then(json => renderToy(json))
};
function newToy() {
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('click', function(e) {
    let name = e.target.name.value 
    let image = e.target.name.value 
    let toyObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    }
    return fetch(toyUrl, toyObj)
    .then(response => response.json())
    .then(json => renderToy(json))
  })
};
function renderToy(json) {
  json.forEach(toy => {
    const toyCollection = document.querySelector('#toy-collection')
    const cardDiv = document.createElement('div')
    const button = document.createElement('button')
    button.className = "like-btn"
    button.innerHTML = "Like <3"
    button.id = toy.id 
    cardDiv.className = "card" 
    cardDiv.innerHTML = 
      `<h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes} Likes</p>` 
    toyCollection.appendChild(cardDiv)
    cardDiv.appendChild(button)

    button.addEventListener('click', function(e) {
      likes(e)
    })
  })
};
function likes(e) {
  let likeCount = parseInt(e.target.previousElementSibling.innerText) + 1 + " Likes"
  fetch(toyUrl + `${e.target.id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes": likeCount})
  })
  .then(response => response.json)
  .then(response => e.target.previousElementSibling.innerText = `${likeCount}`)
};

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  });
  fetchToy();
  newToy();
})