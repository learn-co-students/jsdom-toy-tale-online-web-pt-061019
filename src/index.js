const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = document.querySelector('.add-toy-form')
const toyContainer = document.querySelector('#toy-collection')
const toysUrl = 'http://localhost:3000/toys'
const toyUrl = `http://localhost:3000/toys/`

let addToy = false

if (addToy) {
  toyForm.style.display = 'block'
  toyForm.addEventListener('submit', e =>{
  e.preventDefault()
  let name = form[0].value
  let url = form[1].value

  fetch(toysUrl, {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
  },
  body: JSON.stringify({
        "name": name,
        "image": url,
        "likes": 0
      })

  }).then(r => r.json())
  .then(newToy => {
    toyContainer.innerHTML = ''
    fetchtoys(toysUrl)
  })// end of fetch


})

} else {
  toyForm.style.display = 'none'
}
})

function fetchToys(toysUrl){
  fetch(toysUrl)
  .then(r => r.json())
  .then(toysData => {
    toysData.forEach(toyObj => {
      renderToy(toyObj)
    })
  })
}

function renderToy(toyObj){
  toyContainer.innerHTML += `
  <div class="card">
    <h2>${toyObj.name}</h2>
      <img src=${toyObj.image} class="toy-avatar" />
        <p>${toyObj.likes} Likes </p>
          <button data-id= ${toyObj.id} class="like-btn">Like <3</button>
  </div>
  `
}

toyContainer.addEventListener("click", e => {
    console.log(e.target)
  if(e.target.innerText === "Like <3"){
    const likeTag = e.target.previousElementSibling
    let likesNum = parseInt(likeTag.innerText)
    const likedToy = e.target.dataset.id
    fetch(toyUrl+likedToy, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": ++likesNum
        }),
    })
    .then(response => response.json())
    .then(toy => likeTag.innerText = `${toy.likes} Likes`)


  }
})
fetchToys(toysUrl)