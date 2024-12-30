// Initialize scores
let wins = 0;
let losses = 0;
let ties = 0;

// Choices array
const choices = ['rock', 'paper', 'scissors'];
const choiceImages = {
    rock: 'rock.png',
    paper: 'paper.png',
    scissors: 'scissors.png'
};

// Function to get random choice for the computer
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

// Function to handle the game logic
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateScores(result);

    // Update displayed images for choices
    document.getElementById('playerChoiceDisplay').src = choiceImages[playerChoice];
    document.getElementById('computerChoiceDisplay').src = choiceImages[computerChoice];

    // Show the result
    document.getElementById('result').innerText = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
}

// Function to update the scoreboard
function updateScores(result) {
    if (result === "You win!") {
        wins++;
        document.getElementById('wins').innerText = wins;
    } else if (result === "You lose!") {
        losses++;
        document.getElementById('losses').innerText = losses;
    } else if (result === "It's a tie!") {
        ties++;
        document.getElementById('ties').innerText = ties;
    }
}

// Reset game scores
function resetGame() {
    wins = 0;
    losses = 0;
    ties = 0;
    document.getElementById('wins').innerText = wins;
    document.getElementById('losses').innerText = losses;
    document.getElementById('ties').innerText = ties;
    document.getElementById('result').innerText = '';
    document.getElementById('playerChoiceDisplay').src = 'hand.jpg';
    document.getElementById('computerChoiceDisplay').src = 'hand.jpg';
}

// Event listeners for the choices
document.getElementById('rock').addEventListener('click', function() {
    playGame("rock");
});
document.getElementById('paper').addEventListener('click', function() {
    playGame("paper");
});
document.getElementById('scissors').addEventListener('click', function() {
    playGame("scissors");
});