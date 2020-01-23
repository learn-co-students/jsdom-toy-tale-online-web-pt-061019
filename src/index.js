let addToy = false

// On page load/////////////////////////////////////
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
