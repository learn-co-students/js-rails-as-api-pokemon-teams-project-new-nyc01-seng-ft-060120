const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const fetchTrainers = () => {
    return fetch(`${TRAINERS_URL}`)
    .then(response => response.json())
    .then(data => console.log(data))
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