let addToy = false;
const url = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    };   
  });

  const toyCollection = document.querySelector('#toy-collection');

  // Add new toy
  function addNewToy(name, image) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: 0,
            name,
            image, 
            likes: 0
        })
    })
    .then((response) => {
      return response.json();
    })
    .then((element) => {      
      addInfoToCard(element);
    });
  };

  const addToyForm = document.querySelector('.add-toy-form');
  const inputs = document.querySelectorAll('.input-text');
  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewToy(e.target["0"].value, e.target["1"].value)
    inputs[0].value = "";
    inputs[1].value = "";
  });

  // Fetch toys
  function fetchToys() {
    return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((toyArray) => {    
      for (const element of toyArray) {
        addInfoToCard(element);
      };
    });
  };
  fetchToys();

  // Add info to card
  function addInfoToCard(element) {
    const div = document.createElement('div')
    div.setAttribute('class', 'card');
  
    const h2 = document.createElement('h2');
    const toyName = element.name;
    h2.innerHTML = toyName;
    toyCollection.appendChild(div);
    div.appendChild(h2);
  
    const img = document.createElement('img');
    const toyImgSrc = element.image;
    img.src = toyImgSrc;
    img.setAttribute('class', 'toy-avatar');
    div.appendChild(img);
  
    const p = document.createElement('p');
    const likes = element.likes;
    p.innerText = `${likes} likes`;
    div.appendChild(p);
  
    const likeBtn = document.createElement('button');
    likeBtn.setAttribute('class', 'like-btn');
    likeBtn.setAttribute('id', element.id);
    likeBtn.textContent = "Like <3";
    div.appendChild(likeBtn);
  };

  // Increase Likes
  function addLikes() {
    toyCollection.addEventListener('click', (e) => {
      if (e.target.innerText === "Like <3") {
        const btnId = e.target.id;
        const likeCount = parseInt(e.target.previousElementSibling.innerText);
        addLikeCount(btnId, likeCount, e);
      };
    });
  };
  addLikes();

  function addLikeCount(btnId, likeCount, e) {
    return fetch(`http://localhost:3000/toys/${btnId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likeCount += 1
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const updatedLikes = json.likes
        e.target.previousElementSibling.innerText = `${updatedLikes} likes`;
      })
    };
});