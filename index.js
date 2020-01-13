document.addEventListener("DOMContentLoaded", function() {
  // document.querySelector('form').addEventListener('submit', function(e){
    // debugger;
    e.preventDefault();
    // submitData(e.currentTarget.elements[0].value,e.currentTarget.elements[1].value )
    submitData();
  })


 fetch("http://localhost:3000/toys")
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      let toyCollection = document.getElementById("toy-collection");

      for (const key in object) {
        let div = document.createElement("div");
        // div.textContent = object;
        div.setAttribute('class', 'card');
       
        let h = document.createElement("h2");
        h.innerHTML = object["name"];
        let i = document.createElement("image");
        i.innerHTML = object["image"];
        let p = document.createElement("p");
        p.innerHTML = object["likes"] + "Likes";
        let b = document.createElement('button');
        b.setAttribute('class', 'like-btn');
        b.textContent = "Like <3";

        div.appendChild(h);
        div.appendChild(i);
        div.appendChild(p);
        div.appendChild(b);
        toyCollection.appendChild(div);

      }  
    });


    function submitData (name, image,likes){
  
      let formData = {
        name:  name,
        image: image,
        likes: likes
      }
      
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
    
    };

PATCH http://localhost:3000/toys/:id
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}
 
body: JSON.stringify({
  "likes": <new number>
})