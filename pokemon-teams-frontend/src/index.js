const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector('main')
    
    const getTrainers = () => {
        fetch(`${TRAINERS_URL}`)
        .then(response => response.json())
        .then(trainers => {
            console.log(trainers);
            trainers.forEach(trainer => {
                const div = document.createElement('div');
                div.className = 'card';
                div.setAttribute('data-id', trainer.id);
                div.innerHTML = `<p>${trainer.name}</p>`;
                main.appendChild(div);
                const button = document.createElement('button');
                button.setAttribute('data-trainer-id', trainer.id);
                button.innerText = 'Add Pokemon';
                div.appendChild(button);
                const ul = document.createElement('ul');
                div.appendChild(ul);
            });
        })
    }

    const getPokemon = () => {
        fetch(`${POKEMONS_URL}`)
        .then(response => response.json())
        .then(pokemons => {
            //console.log(pokemon);
            pokemons.forEach(pokemon => {
                //console.log(pokemon)
                const trainerID = parseInt(pokemon.trainer_id, 10);
                //console.log(trainerID)
                const trainerDivs = document.querySelectorAll('div.card')
                const div = trainerDivs[trainerID-1]
                const ul = div.lastElementChild
                //console.log(ul)
                const li = document.createElement('li')
                li.innerHTML = `${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
                //console.log(li)
                ul.appendChild(li)
            })
        })
    }

    getTrainers();
    getPokemon();
})