const searchForm = document.querySelector('.search-form')
const pokemonInput = document.querySelector('.pokemonInput')

const searchBtn = document.querySelector('.searchBtn')
const randomBtn = document.querySelector('.randomBtn')
const message = document.querySelector('.message')

const pokemonImage = document.querySelector('.pokemon-img')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonId = document.querySelector('.pokemon-id')

const height = document.querySelector('.height')
const weight = document.querySelector('.weight')
const pokemonType = document.querySelector('.type')

const abilityList = document.querySelector('.ability-list')
const pokemonDisplay = document.querySelector('.pokemon-display')



const getPokemon = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    const response = await fetch(url)

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('⚠ Pokémon not found.')
        }

        throw new Error('Unable to fetch Pokémon.')
    }

    const data = await response.json()

    return data
}



const displayPokemon = (pokeData) => {

    pokemonImage.src = pokeData.sprites.front_default

    pokemonName.innerText = pokeData.name

    pokemonId.innerText = `#${pokeData.id}`

    height.innerText = `${pokeData.height / 10} m`

    weight.innerText = `${pokeData.weight / 10} kg`


    const types = pokeData.types.map((item) => {
        return item.type.name[0].toUpperCase() +
            item.type.name.slice(1)
    })

    pokemonType.innerText = types.join(' / ')


    abilityList.innerHTML = ''


    pokeData.abilities.forEach((ability) => {

        const li = document.createElement('li')

        li.innerText = ability.ability.name

        abilityList.append(li)

    })


    pokemonDisplay.style.display = 'block'

    message.innerText = ''
}




const clearPokemon = () => {

    pokemonDisplay.style.display = 'none'

    pokemonImage.src = ''
    pokemonName.innerText = ''
    pokemonId.innerText = ''

    pokemonType.innerText = ''
    height.innerText = ''
    weight.innerText = ''

    abilityList.innerHTML = ''
}


searchForm.addEventListener('submit', async (e) => {

    e.preventDefault()

    const pokemon = pokemonInput.value.trim()

    if (!pokemon) {
        message.innerText =
            '⚠️ Please enter a Pokémon name or ID.'

        return
    }


    
    searchBtn.innerText = 'Loading...'
    searchBtn.disabled = true

    message.innerText = 'Loading Pokémon...'

    clearPokemon()


    try {

        const pokeData = await getPokemon(pokemon)

        displayPokemon(pokeData)

    }

    catch (error) {

        clearPokemon()

        message.innerText = error.message

    }

    finally {

        searchBtn.disabled = false

        searchBtn.innerText = 'Search'

    }

})

randomBtn.addEventListener('click', async () => {

  
    const randomId =
        Math.floor(Math.random() * 1025) + 1

    randomBtn.innerText = 'Loading...'

    randomBtn.disabled = true

    message.innerText = 'Loading Pokémon...'

    clearPokemon()


    try {

        const pokeData =
            await getPokemon(randomId)

        displayPokemon(pokeData)

    }

    catch (error) {

        clearPokemon()

        message.innerText = error.message

    }

    finally {

        randomBtn.disabled = false

        randomBtn.innerText =
            'Random Pokémon'

    }

})