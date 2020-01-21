let addToy = false
const Url = 'http://localhost:3000/toys'


function getToys(){
  return fetch(Url)
    .then(resp => resp.json())
    .then(json => renderToys(json))
};

function newToy(){
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', function(event) {
    let name = event.target.name.value
    let image = event.target.image.value
    let toyObject = {
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
  };

    fetch(Url, toyObject)
    .then(resp => resp.json())
    .then(json => renderToys(json))
  })
};

function renderToys(json){
  json.forEach(toy => {
    const toyCollection = document.getElementById("toy-collection")
    let cardDiv = document.createElement('div')
    let button = document.createElement('button')
    button.className = "like-btn"
    button.innerHTML = "Like <3"
    cardDiv.className = "card"
    cardDiv.innerHTML =
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p>${toy.likes}</p>`
    toyCollection.appendChild(cardDiv)
    cardDiv.appendChild(button)

    button.addEventListener('click', function(event){
     let likeCount = cardDiv.querySelector('p');
     likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1;
    })
  })
};

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  getToys();
  newToy();
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
})
