const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector('main');
    
    //console.log(divs);
    
    const getTrainers = () => {
        fetch(`${TRAINERS_URL}`)
        .then(response => response.json())
        .then(trainers => {
            //console.log(trainers);
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
            pokemons.forEach(pokemon => {
                renderPokemon(pokemon);
            })
        })
    }

    function renderPokemon(pokemon) {
        const trainerID = parseInt(pokemon.trainer_id, 10);
        const trainerDivs = document.querySelectorAll('.card');
        const div = trainerDivs[trainerID-1]
        const ul = div.lastElementChild
        const li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
        ul.appendChild(li)
        if (ul.children.length === 6){
            div.children[1].disabled = true;
        }
    }

    function clickHandler(){
        document.addEventListener("click", function(e) {
            if (e.target.hasAttribute('data-trainer-id')){
                const id = e.target.getAttribute('data-trainer-id')
                addNewPokemon(id)
            } else if (e.target.hasAttribute('data-pokemon-id')){
                const id = e.target.getAttribute('data-pokemon-id');
                const parent = e.target.parentNode;
                const ul = parent.parentNode;
                releasePokemon(id)
                parent.remove();
                if (ul.children.length === 5) {
                    ul.parentNode.children[1].disabled = false;
                }
            }

        })

    }

    function releasePokemon(id) {
        fetch(`${POKEMONS_URL}/${id}`, {
            method: 'DELETE',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({id: id})
        })
    }


    const addNewPokemon = (id) => {
        fetch(`${POKEMONS_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }, 
            body: JSON.stringify({
                'pokemon': {
                    'trainer_id': `${id}`
                }
            })
        })
        .then(response => response.json())
        .then(pokemon => {
            //console.log(pokemon)
            renderPokemon(pokemon)
        })
    }
    
    
    getTrainers();
    getPokemon();
    clickHandler();
})