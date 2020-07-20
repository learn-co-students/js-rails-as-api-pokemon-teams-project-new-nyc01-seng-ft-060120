const BASE_URL = "http://localhost:3000/api/v1"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const fetchTrainers = () => {
  fetch(TRAINERS_URL)
    .then((resp) => resp.json())
    .then((trainers) => renderTrainers(trainers))
    .catch(error => console.log(error))
}

const fetchPokemons = () => {
  fetch(POKEMONS_URL)
    .then((resp) => resp.json())
    .then((pokemons) => renderPokemons(pokemons))
    .catch(error => console.log(error))
};

const renderTrainers = (trainers) => {
  trainers.forEach(trainer => renderTrainer(trainer))
}

const renderTrainer = (trainer) => {
  const newTrainerContainer = document.createElement('div')
  const container = document.getElementById('poke-container')
  const addPokeBtn = document.createElement('button')
  newTrainerContainer.classList.add('card')
  addPokeBtn.innerHTML = 'Add Pokemon'
  addPokeBtn.dataset.id = trainer.id
  newTrainerContainer.dataset.id = trainer.id 
  newTrainerContainer.innerHTML = trainer.name
  container.appendChild(newTrainerContainer)
  container.appendChild(addPokeBtn)
}

const renderPokemons = (pokemons) => {
  pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
  //let trainerDiv = document.querySelector(`[data-id='${pokemon.trainer_id}']`);
  const pokemonsUl = document.createElement("ul");

  console.log(pokemon.trainer_id)
  const pokeLi = document.createElement('li')
  const removePokeBtn = document.createElement("button");
  pokeLi.innerHTML = pokemon.name
  
  removePokeBtn.innerHTML = "Remove Pokemon";
  removePokeBtn.classList.add('release')
  removePokeBtn.dataset.pokemonid = pokemon.id
  pokemonsUl.appendChild(pokeLi)
  pokemonsUl.appendChild(removePokeBtn)
  //trainerDiv.appendChild(pokemonsUl)

};



document.addEventListener('DOMContentLoaded', (e) => {
  fetchTrainers()
  fetchPokemons()
})