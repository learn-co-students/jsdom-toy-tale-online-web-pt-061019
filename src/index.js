let addToy = false 
const toys_url = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoad", () => {
  loadToys(toys_url);
  setTimeout(() => likeButtons, 1000) 
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  addBtn.addEventListener('click', ()=> {
    addToy = !addToy 
      if (addToy) {
        toyForm.style.display = 'block'
      } else {
        toyForm.style.display = 'none'
      }
  })

  const input = document.querySelectorAll('input.input-text')

  toyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formValues = []
    input.forEach(val => {
      formValues.push(val.value)
    })
    newToy(formValues);
  })
})

function likeButtons(){
  const likeBtns = document.querySelectorAll('button.like-btn')
    likeBtns.forEach(btn=> {
      btn.addEventListener('click', function(event) {
        const toyId = btn.parentElement.getAttribute("toy-id")
        const toyLikes = btn.previousElementSibling.getAttribute("likes")
        addLikes(toyId, toyLikes);
      });
    })
};

function addLikes(toyId, toyLikes) {
  toyLikes++ 
  const likeData = {
    likes: `${toyLikes}`
  }

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(likeData)
  };
  fetch('http://localhost:3000/toys/${toyId}', options)
  .then(response => console.log(response))
  .then(object => console.log(object));
  document.location.reload();
};

function loadToys(toys_url) {
  fetch(toys_url)
    .then(response => response.json())
    .then(json => toyDetails(json));
}

function toyDetails(json) {
  const toyCollection = document.getElementById("toy-collection");

  json.forEach(toy => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("toy-id", `${toy.id}`);

    toyCollection.appendChild(card);

    const h2 = document.createElement("h2");
    h2.innerHTML = `${toy.name}`;
    card.appendChild(h2);

    const img = document.createElement("img");
    img.classList.add("toy-avatar");
    img.setAttribute("src", `${toy.image}`);
    card.appendChild(img);

    const p = document.createElement("p");
    p.setAttribute("likes", `${toy.likes}`);
    p.innerHTML = `${toy.likes} Likes`;
    card.appendChild(p);

    const btn = document.createElement("btn");
    btn.classList.add("like-btn");
    btn.innerHTML = "Like <3";
    card.appendChild(btn);
  });
}

function addToy(){
  const toyData = {
    name: `${formValues[0]}`,
    image: `${formValues[1]}`,
    likes: "0"
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };

  fetch(toys_url, options)
    .then(response => console.log(response))
    .then(object => console.log(object));
    document.location.reload();
};