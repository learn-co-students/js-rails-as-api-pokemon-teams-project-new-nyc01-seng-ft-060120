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

const addPokemon = (pokeObject) => {
    return fetch(`${POKEMONS_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(pokeObject)
    }).then(response => response.json())
    .then(data => console.log(data))
}

const releasePokemon = (id) => {
    return fetch(`${POKEMONS_URL}/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => console.log(data))
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
    id = pokeArray[0].trainer_id
    let card = document.querySelector(`*[data-id='${id}']`)
    let ul = card.querySelector('ul')

    pokeArray.forEach(pokemon => {
        let li = document.createElement('li')
        let button = document.createElement('button')
        button.className = 'release'
        button.dataset.pokemonId = pokemon.id
        button.innerText = 'Release'
        li.innerText = `${pokemon.nickname} (${pokemon.name})`
        li.appendChild(button)
        ul.appendChild(li)
    })
}

const renderTrainers = (trainers) => {
    trainers.forEach(trainer => {
        renderTrainer(trainer)
    });
}


// const addPokemonButton = (button) => {

//     const pokemonObject  = {
//         nickname: faker.name,
//         species:  faker.species,
//         trainer_id:
//     }


//     addPokemon()
// }

const releasePokemonButton = (button) => {
    console.log(button)
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
    fetchPokemon()
})



document.addEventListener('click', (e) => {
   if (e.target.innerText === 'Add Pokemon'){
       addPokemonButton(e.target)
   }
   else if (e.target.innerText === "Release"){
        releasePokemonButton(e.target)
   }
})




