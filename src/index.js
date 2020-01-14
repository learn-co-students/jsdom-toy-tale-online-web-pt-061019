let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCont = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded",init)

function init() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(res => {

    let toys = res.map(t => {
      return (`<div data-id="${t.id}" class="card">
        <h2>${t.name}</h2>
        <img src="${t.image}" class="toy-avatar" />
        <p>${t.likes} likes</p>
        <button class="like-btn">Like <3</button>
      </div>`)
    }).join(" ")

    toyCont.innerHTML += toys

})

 
  
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', (e) => {
      // e.preventDefault()
      let toyName = e.target.name.value
      let toyUrl = e.target.image.value

      fetch('http://localhost:3000/toys', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: toyName,
        image: toyUrl,
        likes: 0
      })}).then(res => res.json())
        .then(res => {
          toyCont.innerHTML += `<div data-id="${t.id}" class="card">
            <h2>${t.name}</h2>
            <img src="${t.image}" class="toy-avatar" />
            <p>${t.likes}</p>
            <button class="like-btn">Like <3</button>
          </div>`
        })

    })
  } else {
    toyForm.style.display = 'none'
  }
})

//Adds Likes Counter
document.body.addEventListener('click', (e) => {

  if (event.target.className === 'like-btn') {
  
        let id = e.target.parentElement.dataset.id
        let textBox = e.target.previousElementSibling
        let num = parseInt(e.target.previousElementSibling.innerText)
  
        textBox.innerHTML = `${++num} likes`
  
        fetch("http://localhost:3000/toys/" + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            likes: num
        })
      }).then(res => res.json())
   }
  
  })
}