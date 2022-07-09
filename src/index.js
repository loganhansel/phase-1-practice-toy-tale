let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



// CARD GENERATOR
function generateToy(toyData) {
  let toyElement = document.createElement('div')
  toyElement.className = "card"
  let toyName = document.createElement('h2')
  toyName.innerText = toyData.name
  toyElement.appendChild(toyName)
  let toyImg = document.createElement('img')
  toyImg.setAttribute('src', toyData.image)
  toyImg.className = "toy-avatar"
  toyElement.appendChild(toyImg)
  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toyData.likes} Likes`
  toyElement.appendChild(toyLikes)
  let likeBtn = document.createElement('btn')
  likeBtn.className = "like-btn"
  likeBtn.id = toyData.id
  likeBtn.innerText = 'Like ❤️'
  toyElement.appendChild(likeBtn)
  likeBtn.likeCount = toyData.likes
  likeBtn.addEventListener('click', likeEvent)
  document.getElementById("toy-collection").appendChild(toyElement)
}



// FETCH TOY DATA FROM SERVER AND GENERATE CARDS ON DOM
function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(data => data.json())
  .then(function(data) {
    data.forEach(toyData => {
      generateToy(toyData)})
  })
}



// HANDLE USER INPUT AND SAVE NEW TOY DATA TO SERVER
document.querySelector("form").addEventListener('submit', (event) => {
  event.preventDefault()
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    "name": event.target.name.value,
    "image": event.target.image.value,
    "likes": 0
  })
  })
  .then(response => response.json())
  .then(toyData => {
    generateToy(toyData)})
  document.querySelector('form').reset()
})



// HANDLE LIKE EVENTS TO UPDATE DB.JSON AND DOM
function likeEvent(event) {
  event.target.likeCount ++
  event.preventDefault()
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "likes": event.target.likeCount
    })
  })
  .then(response => response.json())
  .then(data => {
    event.target.parentNode.querySelector('p').innerText = `${data.likes} Likes`
    })
  }
