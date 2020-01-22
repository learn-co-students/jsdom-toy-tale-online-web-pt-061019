let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  //toggle add toy button
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
  })

  //display toys on page
  let memoizedToys = [];
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      memoizedToys = json;
      console.log(memoizedToys);
      memoizedToys.forEach(toy => {
        addToyCard(toy);
      });
    })

  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    //get values from form
    //set values as variables
    let name = document.querySelector(".add-toy-form .input-text:first-of-type");
    let image = document.querySelector(".add-toy-form .input-text:nth-of-type(2)");
    fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name.value,
      "image": image.value,
      "likes": 0
    })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      addToyCard(object);
      name.value = "";
      image.value = "";
    })
  })

  // //likes button
  // //use bubbling, you need to do the select target thing
  // const likeButton =


  // const ul = document.querySelector("ul#dog-breeds");
  // ul.addEventListener("click", (e, li) => {
  //   if (e.target.style.color == "black") {
  //     e.target.style.color = "teal"
  //   } else {
  //     e.target.style.color = "black"
  //   };
  // });

})

//helper functions
function addToyCard(toy) {
  let div = document.createElement("div");
  div.setAttribute("class", "card");

  let h2 = document.createElement("h2");
  h2.innerText = toy["name"];

  let img = document.createElement("img");
  img.setAttribute("src", toy["image"]);
  img.setAttribute("class", "toy-avatar");


  let p = document.createElement("p");
  setLikes(toy, p);

  let button = document.createElement("button");
  button.setAttribute("class", "like-btn");
  button.innerHTML = "Like <3";
  button.addEventListener("click", function(e) {
    let updatedLikes = ++toy["likes"]
    console.log(toy["id"]);
    likesFetch(toy, p, updatedLikes);
  });

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
  const collection = document.querySelector("#toy-collection");
  collection.appendChild(div);

};

//separate function to setLikes so it can be called multiple times
function setLikes(toy, p) {
  let likes = "Likes"
  if(toy["likes"] == 1) {
    likes = "Like"
  }
  p.innerText = `${toy["likes"]} ${likes}`
};

//separate function for the PATCH for updating likes
function likesFetch(toy, p, updatedLikes) {
  fetch(`http://localhost:3000/toys/${toy["id"]}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": updatedLikes
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
    setLikes(object, p);
  })
};
