const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const fetchTrainers = () => {
    return fetch(`${TRAINERS_URL}`)
    .then(response => response.json())
    .then(data => renderTrainers(data))
}

const fetchPokemon = () => {
    return fetch(`${POKEMONS_URL}`)
    .then(response => response.json())
    .then(data => filterPokemons(data))
}

const addPokemon = (id) => {
    return fetch(`${POKEMONS_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({trainer_id: id})
    }).then(response => response.json())
    .then(data => {
        id = data.trainer_id;
        renderPokemon(data, id);
    })
}

const releasePokemon = (id) => {
    return fetch(`${POKEMONS_URL}/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => removePokemon(id))
}

const renderTrainer = (trainer) => {
    const trainerCard = document.createElement('div')
    trainerCard.className = 'card'
    trainerCard.dataset.id = trainer.id
    const header = document.createElement('p')
    header.innerText = trainer.name
    const addBtn = document.createElement('button')
    addBtn.dataset.trainerId = trainer.id
    addBtn.innerText = 'Add Pokemon'
    const listItem = document.createElement('ul')
    trainerCard.appendChild(header)
    trainerCard.appendChild(addBtn)
    trainerCard.appendChild(listItem)
    document.querySelector('main').appendChild(trainerCard)
}

const filterPokemons = (pokemons) => {
    let idArray = pokemons.map(pokemon => pokemon.trainer_id)
    idArray = Array.from(new Set(idArray))
    idArray.forEach(id => {
        renderPokeArray(pokemons.filter(pokemon => pokemon.trainer_id === id))
    })
}

const renderPokeArray = (pokeArray) => {
    let id = pokeArray[0].trainer_id

    pokeArray.forEach((pokemon) => {
        renderPokemon(pokemon, id)
    })
}

const renderPokemon = (pokemon, trainer_id) => {
    let card = document.querySelector(`*[data-id='${trainer_id}']`)
    let ul = card.querySelector('ul')

    let li = document.createElement('li')
    let button = document.createElement('button')
    button.className = 'release'
    button.dataset.pokemonId = pokemon.id
    button.innerText = 'Release'
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    li.appendChild(button)
    ul.appendChild(li)
}

const removePokemon = (pokemon_id) => {
    let li = document.querySelector(`*[data-pokemon-id='${pokemon_id}']`).parentElement
    li.remove();
}

const renderTrainers = (trainers) => {
    trainers.forEach(trainer => {
        renderTrainer(trainer)
    });
}

const addPokemonButton = (button) => {
    let id = button.parentElement.dataset.id
    if (button.parentElement.getElementsByTagName('li').length < 6) {
        addPokemon(id)
    } else {
        console.log('too many pokemon')
    }
}

const releasePokemonButton = (button) => {
    let pokemonId = button.dataset.pokemonId
    releasePokemon(pokemonId)
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
    window.setTimeout(fetchPokemon, 500)
})

document.addEventListener('click', (e) => {
    if (e.target.innerText === 'Add Pokemon'){
        addPokemonButton(e.target)
    }
    else if (e.target.innerText === "Release"){
        releasePokemonButton(e.target)
    }
})
