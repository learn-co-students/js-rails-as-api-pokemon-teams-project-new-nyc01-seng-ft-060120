const BASE_URL = "http://localhost:3000/api/v1"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const init = () => {
  fetch(TRAINERS_URL)
    .then((resp) => resp.json())
    .then((trainers) => trainers.forEach(trainer => renderTrainer(trainer)))
}

const renderTrainer = (trainer) =>{
  let main = document.querySelector('main')
  const trainerContainer = document.createElement('div')
  const trainerName = document.createElement('h3')
  const addPokeBtn = document.createElement('button')

  addPokeBtn.dataset.trainerId = trainer.id
  trainerContainer.dataset.id = trainer.id
  trainerName.innerHTML = trainer.name
  addPokeBtn.innerText = 'Add Pokemon'
  trainerContainer.classList.add("card");

  trainerContainer.appendChild(addPokeBtn)
  trainerContainer.appendChild(trainerName)
  main.appendChild(trainerContainer)
  addPokeBtn.addEventListener("click", (e) => {addPokemon(addPokeBtn)});
  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
  const trainerContainer = document.querySelector(`[data-id="${pokemon.trainer_id}"]`);
  const pokeDiv = document.createElement('ul')
  const pokeName = document.createElement('li')
  const pokeSpecies = document.createElement('li')
  const removeBtn = document.createElement('button')
  removeBtn.classList.add('release')
  removeBtn.dataset.pokemonId = pokemon.id
  removeBtn.innerText = 'Release Me'
  pokeName.innerHTML = `name: ${pokemon.nickname}`
  pokeSpecies.innerHTML = `species: ${pokemon.species}`
  pokeDiv.appendChild(removeBtn)
  pokeDiv.appendChild(pokeName)
  pokeDiv.appendChild(pokeSpecies)
  trainerContainer.appendChild(pokeDiv)
  removeBtn.addEventListener('click', (e) => {removePokemon(removeBtn)} )
}

const removePokemon = (button) => {
  fetch(POKEMONS_URL + `/${button.dataset.pokemonId}`, {
    method: 'DELETE'
  })
  button.parentNode.remove()
}

const addPokemon = (button) => {
  if(button.parentNode.querySelectorAll('ul').length < 6) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ trainer_id: button.dataset.trainerId }),
    })
    .then((resp) => resp.json())
    .then((pokemon) => {renderPokemon(pokemon)}); 
  } else {alert('you can\'t have any more pokemon')}
}

document.addEventListener('DOMContentLoaded', (e) => {
  init()
})