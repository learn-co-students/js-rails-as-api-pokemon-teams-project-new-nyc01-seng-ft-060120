document.addEventListener("DOMContentLoaded", () => {

    const BASE_URL = "http://localhost:3000"
    const TRINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    const trainerGrid = document.querySelector('main')


    function fetchTrainers() {
        fetch(TRINERS_URL)
        .then(resp => resp.json())
        .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
    }

    function renderTrainer(trainer){
        const trainerCard = document.createElement('div')
        trainerCard.classList.add('card')
        trainerCard.dataset.id = trainer.id
        trainerCard.innerHTML = `
        <p>${trainer.name}</p>
        <button>Add Pokemon</button>
        `
        for(const pokemon of trainer.pokemons){
            const pokemonLi = document.createElement('li')
            pokemonLi.innerHTML = `
            ${pokemon.nickname} (${pokemon.species})
            <button class="release">Release</button>
            `
            pokemonLi.dataset.id = pokemon.id
            trainerCard.append(pokemonLi)
        }

        trainerGrid.append(trainerCard)
    }

    function releasePoke(pokemon){
       fetch(`${POKEMONS_URL}/${pokemon.dataset.id}`, {method: "DELETE"})
    }

    function newPoke(trainerCard){
        const trainer_id = trainerCard.dataset.id
        let formData = {
            trainer_id
        }
       let configObj = {
           method: "POST", 
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
           },
           body: JSON.stringify(formData)
       } 
       fetch(`${POKEMONS_URL}`, configObj)
       .then(resp => resp.json())
       .then(pokemon => renderNewPoke(pokemon, trainerCard))
    }

    function renderNewPoke(pokemon, trainerCard){
        const pokemonLi = document.createElement('li')
            pokemonLi.innerHTML = `
            ${pokemon.nickname} (${pokemon.species})
            <button class="release">Release</button>
            `
            pokemonLi.dataset.id = pokemon.id
            trainerCard.append(pokemonLi)
    }

    fetchTrainers()

    //listners

    trainerGrid.addEventListener("click", function(e){
        if (e.target.matches('.release')){
            releasePoke(e.target.parentElement)
            e.target.parentElement.remove()
        }
        else if (e.target.matches('button')){
            newPoke(e.target.parentElement)
        }
    })

})