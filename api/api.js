const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const first_div = document.getElementById("first")
const second_div = document.getElementById("second")
const third_div = document.getElementById("third")
const userScore_span = document.getElementById("user-score")
const result_p = document.querySelector(".result > p")
const computerScore_span = document.getElementById("computer-score")


let userScore = 0
let computerScore = 0
var firstData

const getRandomNum = () => {
    return Math.floor(Math.random() * 91 + 1);
}

const getFirstPokemon = async () => {
    const firstPokemon = await fetch(`${baseUrl}/${getRandomNum()}`)
    .then(response => response.json())
    
    const firstPokemonImg = firstPokemon.sprites.front_default
    const firstPokemonName = firstPokemon.species.name
    const firstPokemonType = firstPokemon
    const firstStrongerThan = await fetch(firstPokemonType.types[0].type.url)
    .then(response => response.json())
    const doubleDamagingFromFirst = firstStrongerThan.damage_relations.double_damage_to

    firstData = {
        firstPokemonImg,
        firstPokemonName,
        firstPokemonType,
        doubleDamagingFromFirst
    }

    const first = document.getElementById('firstImg')
    first.src = firstPokemonImg
    first.alt = `${firstPokemonName} choice` 

    return firstData
}

const getSecondPokemon = async () => {
    const secondPokemon = await fetch(`${baseUrl}/${getRandomNum()}`)
    .then(response => response.json())
    
    const secondPokemonImg = secondPokemon.sprites.front_default
    const secondPokemonName = secondPokemon.species.name
    const secondPokemonType = secondPokemon.types[0].type
    const secondStrongerThan = await fetch(secondPokemonType.url)
    .then(response => response.json())
    const doubleDamagingFromSecond = secondStrongerThan.damage_relations.double_damage_to

    const second = document.getElementById('secondImg')
    second.src = secondPokemonImg
    second.alt = `${secondPokemonName} choice` 
}

const getThirdPokemon = async () => {
    const thirdPokemon = await fetch(`${baseUrl}/${getRandomNum()}`)
    .then(response => response.json())
    
    const thirdPokemonImg = thirdPokemon.sprites.front_default
    const thirdPokemonName = thirdPokemon.species.name
    const thirdPokemonType = thirdPokemon.types[0].type
    const thirdStrongerThan = await fetch(thirdPokemonType.url)
    .then(response => response.json())
    const thirdDamagingFromThird = thirdStrongerThan.damage_relations.double_damage_to

    const third = document.getElementById('thirdImg')
    third.src = thirdPokemonImg
    third.alt = `${thirdPokemonName} choice` 
}

const computerChoice = async () => {
    const choice = await fetch(`${baseUrl}/${getRandomNum()}`)
    .then(response => response.json())

    return choice
}

const game = async (userChoice) => {
    const computerChoose = await computerChoice()
    const comPokemonType = computerChoose.types
    const comStrongerThan = await fetch(comPokemonType[0].type.url)
    .then(response => response.json())
    const doubleDamagingFromComputer = comStrongerThan.damage_relations.double_damage_to
    let userChoose
    let userVictory = "false"
    let comVictory = "false"


    switch(userChoice){
        case "first":
            userChoose = firstData
            break
        case "second":
            lose(userChoice, computerChoose)
            break
        case "third":
            draw(userChoice, computerChoose)
            break
    }

    for (let i = 0; i < userChoose.doubleDamagingFromFirst.length; i++) {
        for (let j = 0; j < comPokemonType.length; j++) {
            if (userChoose.doubleDamagingFromFirst[i].name ==  comPokemonType[j].type.name){
                userVictory = "true"
            }
        }
    }

    for (let i = 0; i < doubleDamagingFromComputer.length; i++) {
        for (let j = 0; j < userChoose.firstPokemonType.types.length; j++) {
            if (doubleDamagingFromComputer[i].name ==  userChoose.firstPokemonType.types[j].type.name){
                comVictory = "true" 
            }
        }
    }

    function win(){
        userScore_span.innerHTML = ++userScore
        result_p.innerHTML = `${userChoose.firstPokemonName}${"(you)".fontsize(3).sub()} beats ${computerChoose.name}${"(comp)".fontsize(3).sub()}. You win! 😎`
    }

    function lose(userChoice, computerChoice){
        computerScore_span.innerHTML = ++computerScore
        result_p.innerHTML = `${computerChoose.name}${"(comp)".fontsize(3).sub()} beats ${userChoose.firstPokemonName}${"(you)".fontsize(3).sub()}. You lose! 😈`
    }
    
    function draw(userChoice, computerChoice){
        result_p.innerHTML = `${computerChoose.name}${"(comp)".fontsize(3).sub()} and ${userChoose.firstPokemonName}${"(you)".fontsize(3).sub()}. Wow, it's a draw! 🤝`
    }

    switch(userVictory+comVictory){
        case "truefalse":
            win()
            break
        case "falsetrue":
            lose()
            break
        case "truetrue":
        case "falsefalse":
            draw()
            break
    }
}

function main(){
    first_div.addEventListener('click', () => {
        game("first")
    })
    
    second_div.addEventListener('click', () => {
        game("second")
    })
    
    third_div.addEventListener('click', () => {
        game("third")
    })
}

const getPokemons = () => {
    
    getFirstPokemon()
    getSecondPokemon()
    getThirdPokemon()
    
}

getPokemons()

main()
