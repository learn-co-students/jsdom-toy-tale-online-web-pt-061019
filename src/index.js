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
    } else {
      toyForm.style.display = 'none'
    }
  })

  submit.addEventListener('click', (name, image) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({name,image})
    })
   })

  function getToys() {
      fetch("http://localhost:3000/toys")
      .then(function(response) {
        return response.json();
      }).then(function(json) {
         makeCard(json)
    })
  }

  function makeCard(json) {
    console.log("Making cards")
    console.log(json)

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

      div.classList.add("card");
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(button);

      button.classList.add("like-btn");

      toyCollection.appendChild(div);
      }
    }
})
