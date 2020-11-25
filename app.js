let userScore = 0
let computerScore = 0

const userScore_span = document.getElementById("user-score")
const computerScore_span = document.getElementById("computer-score")
const scoreBoard_div = document.querySelector(".score-board")
const result_p = document.querySelector(".result > p")
const rock_div = document.getElementById("rock")
const paper_div = document.getElementById("paper")
const scissors_div = document.getElementById("scissors")

function computerChoice(){
    const choices = ['rock', 'paper', 'scissors']
    const randomNumber = Math.floor(Math.random() * choices.length)

    return choices[randomNumber]
}

function win(userChoice, computerChoice){
    userScore_span.innerHTML = ++userScore
    result_p.innerHTML = `${userChoice}${"(you)".fontsize(3).sub()} beats ${computerChoice}${"(comp)".fontsize(3).sub()}. You win! 😎`
    document.getElementById(userChoice).classList.add('green-glow')
    setTimeout(() => {
        document.getElementById(userChoice).classList.remove('green-glow')
    }, 300);
}

function lose(userChoice, computerChoice){
    computerScore_span.innerHTML = ++computerScore
    result_p.innerHTML = `${computerChoice}${"(comp)".fontsize(3).sub()} beats ${userChoice}${"(you)".fontsize(3).sub()}. You lose! 😈`
    document.getElementById(userChoice).classList.add('red-glow')
    setTimeout(() => {
        document.getElementById(userChoice).classList.remove('red-glow')
    }, 300);
}

function draw(userChoice, computerChoice){
    result_p.innerHTML = `${computerChoice}${"(comp)".fontsize(3).sub()} and ${userChoice}${"(you)".fontsize(3).sub()}. Wow, it's a draw! 🤝`
    document.getElementById(userChoice).classList.add('gray-glow')
    setTimeout(() => {
        document.getElementById(userChoice).classList.remove('gray-glow')
    }, 300);
}

function game(userChoice){
    const computerChoose = computerChoice()

    switch(userChoice+computerChoose){
        case "paperrock":
        case "scissorspaper":
        case "rockscissors":
            win(userChoice, computerChoose)
            break
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
            lose(userChoice, computerChoose)
            break
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draw(userChoice, computerChoose)
            break
    }
}

function main(){
    rock_div.addEventListener('click', () => {
        game("rock")
    })
    
    paper_div.addEventListener('click', () => {
        game("paper")
    })
    
    scissors_div.addEventListener('click', () => {
        game("scissors")
    })
}

main()




