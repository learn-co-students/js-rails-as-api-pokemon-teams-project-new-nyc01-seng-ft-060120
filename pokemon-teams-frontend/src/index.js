const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


// Document loaded
document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('main');
  mainElement.addEventListener('click', e => {
    console.log(e.target) 
    if(e.target.nodeName === "BUTTON" && e.target.textContent == "Add Pokemon") {
      console.log('We got the correct button') 
      appendPokemon(e.target);
    }
    if(e.target.nodeName === "BUTTON" && e.target.textContent == "Release") {
      console.log('We got the correct Release button') 
     releasePokemon(e.target);
    }

  })

  function releasePokemon(target) {
    target.parentNode.remove();
  
  }

  function appendPokemon(target) {
    getPokemon(Math.floor(Math.random() * 26) + 1)
    .then(pokemon => {
      const ulElement = target.parentNode.querySelector('ul')
      if (ulElement.children.length < 6) {
        return ulElement.appendChild(createLiElement(pokemon))
      
      }
      
    })
  }

  function getPokemon(id) {
    return fetch(`${POKEMONS_URL}/${id}`).then((response) => {return response.json()})
  }

  getTrainer(4).then(trainer => createTrainerCard(trainer))

  function getTrainer(id) {
    return fetch(`${TRAINERS_URL}/${id}`).then((response) => {return response.json()})
  }
  function createLiElement (pokemon) {
    const liElement = document.createElement('li');

    liElement.innerHTML =
    `${pokemon.nickname} (${pokemon.species})
    <button class="release" data-pokemon-id= ${pokemon.id}>Release</button>`
    return liElement
  }
  function createTrainerCard(trainer) {
    const cardElement = document.createElement('div');
    const buttonElement = document.createElement('button');
    const ulList = document.createElement('ul');
    const trainerNameElement = document.createElement('p');

    // Add card element properties
    cardElement.classList.add("card");
    cardElement.dataset.id = trainer.id;
    trainerNameElement.textContent = trainer.name;
    buttonElement.dataset.id = trainer.id;
    buttonElement.textContent= "Add Pokemon";

   

    // For every pokemon the trainer has create an li element and append to ul
    trainer.pokemons.forEach((pokemon) => {
      ulList.appendChild(createLiElement(pokemon));
    });

    cardElement.append(trainerNameElement, buttonElement, ulList);
    mainElement.appendChild(cardElement);
  }
})
