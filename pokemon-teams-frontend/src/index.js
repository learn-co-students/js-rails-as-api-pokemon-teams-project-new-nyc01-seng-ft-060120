const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainElement = document.querySelector('main');

// Document loaded
document.addEventListener('DOMContentLoaded', () => {

  getTrainer(3).then(trainer => createTrainerCard(trainer))

  function getTrainer(id) {
    return fetch(`${TRAINERS_URL}/${id}`).then((response) => {return response.json()})
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
    trainer.pokemons.forEach((pokemon, i) => {
      const liElement = document.createElement('li');

      liElement.innerHTML =
      `${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id= ${pokemon.id}>Release</button>`

      ulList.appendChild(liElement);
    });

    cardElement.append(trainerNameElement, buttonElement, ulList);
    mainElement.appendChild(cardElement);
  }
})
