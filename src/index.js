// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  document.querySelector('.detail-image').src = `${ramen.image}`;
  document.querySelector('.name').innerText = `${ramen.name}`;
  document.querySelector('.restaurant').innerText = `${ramen.restaurant}`;
  document.querySelector('p').innerHTML = `${ramen.rating} / 10`;
  document.querySelector('#comment-display').innerText = `${ramen.comment}`;
};

const addSubmitListener = (e) => {
  // Add code
  e.preventDefault();
  let ramenObj = {
    name: e.target.querySelector('#new-name').value,
    restaurant: e.target.querySelector('#new-restaurant').value,
    image: e.target.querySelector('#new-image').value,
    rating: e.target.querySelector('#new-rating').value,
    comment: e.target.querySelector('#new-comment').value
  }
  fetch('http://localhost:3000/ramens/',{
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
   },
    body:JSON.stringify(ramenObj)
  })
  .then(res => res.json())
  .then(ramen => console.log(ramen))
  
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens') 
        .then(res => res.json())
        .then(ramenData => 
          ramenData.forEach(ramen => {
            let nav = document.createElement('nav');
            nav.innerHTML = `<img src="${ramen.image}"><hr>`;
            nav.addEventListener('click', () => handleClick(ramen))
            document.getElementById('ramen-menu').appendChild(nav);
          })
        );
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  document.querySelector('form').addEventListener('submit', addSubmitListener);
}

document.addEventListener("DOMContentLoaded", () => {
main();
});
// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
