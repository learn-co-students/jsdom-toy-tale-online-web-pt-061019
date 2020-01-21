let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  getToys();

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const submit = document.querySelector('.submit')

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault();
        submitData(event.target);
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  function submitData(data) {

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": data.name.value,
        "image": data.image.value,
        "likes": 0
      })
    })
    .then(function(response) {
      response.json();
    })
    .then(function(json) {
       makeCard(json)
    })

  }

  function getToys() {
      fetch("http://localhost:3000/toys")
      .then(function(response) {
        return response.json();
      }).then(function(json) {
         makeCard(json)
    })
  }

  function makeCard(json) {
    // console.log("Making cards")
    // console.log(json)

    const toyCollection = document.getElementById('toy-collection')

    // let toys = json.message;

    for (toy of json) {
      let div = document.createElement("div");
      let h2 = document.createElement("h2");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");

      h2.innerText = toy.name;
      img.src = toy.image;
      img.classList.add("toy-avatar")
      p.innerText = toy.likes;
      button.innerText = "Like <3"
      button.addEventListener('click', event => {
        // console.log("click");
        updateLikes(event);
      })

      div.classList.add("card");
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(button);

      button.classList.add("like-btn");
      button.id = toy.id;

      toyCollection.appendChild(div);
      }
    }

  function updateLikes(event) {
    let id = event.target.id;
    let currentLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
    
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": currentLikes
      })
    })
    event.target.previousElementSibling.innerText = currentLikes;

  }
})
