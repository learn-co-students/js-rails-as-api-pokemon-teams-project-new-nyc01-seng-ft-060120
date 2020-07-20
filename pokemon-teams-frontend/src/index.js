const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('main');

  mainElement.addEventListener('click', e => {
    if(e.target.nodeName === "BUTTON" && e.target.textContent == "Add Pokemon") {
      appendPokemon(e.target);
    }
    if(e.target.nodeName === "BUTTON" && e.target.textContent == "Release") {
     releasePokemon(e.target);
    }
  })

  // Get all the trainers for the database
  getTrainers().then(trainers => {
    trainers.forEach(trainer => {
      createTrainerCard(trainer)
    })
  })

  function releasePokemon(target) {
    fetch(`${POKEMONS_URL}/${target.dataset.pokemonId}`, {
      method: 'DELETE',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({id: target.dataset.pokemonId})
    })
    target.parentNode.remove();
  }

  function appendPokemon(target) {
    target.disabled = true;

    const ulElement = target.parentNode.querySelector('ul')
    if (ulElement.children.length < 6) {
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({trainer_id: target.dataset.id})

      }).then(response => {return response.json()})
        .then(pokemon => {ulElement.appendChild(createLiElement(pokemon)); target.disabled = false;})
    }
  }

  function getTrainers() {
    return fetch(TRAINERS_URL).then((response) => {return response.json()})
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
