let addToy = false

// On page load /////////////////////////////////////
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // Add toy
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
    fetchToys()
  })

  // GET fetch() /////////////////////////////////
  function fetchToys() {
    return fetch('https:localhost:3000/toys') 
      .then(resp => resp.json)
      .then(json => renderToys(json))
  }

  // Form ////////////////////////////////////
  function sendDataForToys(form) {
    fetch('https:localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      name: form.name.value, image: form.image.value, likes: 0
    })
  })
  .then(resp => resp(json))
  .then(newToy => {
    const toyContainer = document.querySelector('#toy-collection')
    toyContainer.insertAdjacentElement('beforeend', 
    `<div class="card">
    <h2>${newToy.name}</h2>
    <img src=${newToy.image} class="toy-avatar" />
    <p><span class="counter" data-id="${newToy.id}" > ${newToy.likes = 0}</span>Likes</p>
    <button class="like-btn" data-id="${newToy.id}" > Like <3</button>
    </div`)
    form.reset()
  })
}

// Render toy cards ////////////////////////////////////////////
function renderToys(json) {
  const toyContainer = document.querySelector('#toy-collection')
  json.forEach(toy => {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class='#toy-avatar' />
    <p><span class='counter' data-id='${toy.id}' > ${toy.likes} = 0</span>Likes</p>
    <button class="like-btn" data-id="${toy.id}" > Like<3</button>`
    toyContainer.append(div)

  })
}

// Increment Likes //////////////////////////////////////////////
let toyContainer = document.querySelector("#toy-collection")

toyContainer.addEventListener("click", function(e){
  if (e.target.className === "like-btn"){

    let id = e.target.dataset.id
    let targetSpan;

    document.querySelectorAll("span.counter").forEach(function(span){
      if (span.dataset.id === e.target.dataset.id)
        targetSpan = span 
    })
    targetSpan.innerText++

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        likes: parseInt(targetSpan.innerText)
      })
    })
    .then(response => response.json())
    }
  })
})