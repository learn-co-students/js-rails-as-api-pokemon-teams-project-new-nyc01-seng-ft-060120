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
    .then(data => console.log(data))
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

const renderTrainers = (trainers) => {
    trainers.forEach(trainer => {
        renderTrainer(trainer)
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})