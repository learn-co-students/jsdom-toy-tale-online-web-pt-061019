let addToy = false
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  getAllToys()
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', e => {
        e.preventDefault()
        toyForm.reset(e);
        addNewToy(e.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
})

function getAllToys() {
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  return fetch('http://localhost:3000/toys', configObj)
    .then(function (response) {
    return response.json();
  })
    .then(function (json) {
      json.forEach(object =>
        createToyCard(object)
      )
    })
}

function createToyCard(obj) {
  let allToys = document.querySelector('#toy-collection')
  let cardDiv = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let pTag = document.createElement('p')
  let button = document.createElement('button')

  cardDiv.className = 'card'
  h2.textContent = obj['name']
  img.src = obj['image']
  img.className = 'toy-avatar'
  pTag.textContent = `${obj['likes']} Likes`
  button.className = 'like-btn'
  button.textContent = 'Like <3'

  cardDiv.append(h2, img, pTag, button)
  allToys.appendChild(cardDiv)

  button.addEventListener('click', e => {
    e.preventDefault()
    const toyNode = e.target.parentNode.children
    findToy(toyNode[0].textContent, toyNode[1].src, e)
  })
}

function addNewToy(target) {
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(
      {"name": target.name.value,
      "image": target.image.value,
      "likes": 0
    })
  };

  return fetch('http://localhost:3000/toys', configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      createToyCard(json)
    })
}

function findToy(name, image, e) {
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  return fetch('http://localhost:3000/toys', configObj)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const toyCard = json.filter(function(obj) {
        return obj.name === name && obj.image === image
      })
      addToyLike(toyCard[0], e)
    })
}

function addToyLike(json, e) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        "likes": json.likes + 1
      })
  }
  return fetch(`http://localhost:3000/toys/${json.id}`, configObj).then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      e.target.previousElementSibling.innerHTML = `${data.likes} Likes`
    })
}
