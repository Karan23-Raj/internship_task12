
// Generate a random number between 1 and 20
let secretNumber = Math.floor(Math.random() * 20) + 1;

// Game variables
let attemptsLeft = 5;
let score = 0;
let gameOver = false;

// Get HTML elements
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");
const reward = document.getElementById("reward");
const checkBtn = document.getElementById("checkBtn");
const playAgainBtn = document.getElementById("playAgainBtn");


// Main function to check the user's guess
function checkGuess() {

    // Don't allow guesses after game ends
    if (gameOver) {
        return;
    }

    // Get user input
    let guess = Number(guessInput.value);

    // Check empty input
    if (guessInput.value.trim() === "") {
        showMessage("⚠️ Please enter a number first!", "error");
        return;
    }

    // Validate number
    if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
        showMessage("❌ Enter a valid number between 1 and 20!", "error");
        return;
    }

    // Reduce attempts
    attemptsLeft--;

    // Check if the guess is correct
    if (guess === secretNumber) {

        // Calculate score based on remaining attempts
        score = attemptsLeft === 4 ? 100 :
                attemptsLeft === 3 ? 80 :
                attemptsLeft === 2 ? 60 :
                attemptsLeft === 1 ? 40 : 20;

        scoreDisplay.textContent = score;

        showMessage(
            "🎉 Congratulations! You Won! You guessed it correctly!",
            "success"
        );

        // Show reward
        if (attemptsLeft >= 3) {
            reward.textContent = "🏆 AMAZING! You're a Number Master! Gold Medal!";
        } else if (attemptsLeft >= 1) {
            reward.textContent = "🥈 Great Job! You earned a Silver Medal!";
        } else {
            reward.textContent = "🥉 Well Played! You earned a Bronze Medal!";
        }

        endGame();

    }

    // Guess is too high
    else if (guess > secretNumber) {

        showMessage(
            "⬆️ Too High! Try a LOWER number. You can do it! 💪",
            "error"
        );

    }

    // Guess is too low
    else {

        showMessage(
            "⬇️ Too Low! Try a HIGHER number. Keep trying! 😊",
            "error"
        );

    }

    // Update attempts remaining
    attemptsDisplay.textContent = attemptsLeft;

    // If all attempts are finished
    if (attemptsLeft === 0 && !gameOver) {

        showMessage(
            "😢 Game Over! The correct number was " + secretNumber,
            "error"
        );

        reward.textContent = "💡 Don't give up! Practice makes perfect!";
        endGame();
    }

    // Clear input for next guess
    guessInput.value = "";
    guessInput.focus();
}


// Function to display messages
function showMessage(text, type) {

    message.textContent = text;

    message.className = "message " + type;
}


// Function to end the game
function endGame() {

    gameOver = true;

    checkBtn.disabled = true;
    guessInput.disabled = true;

    playAgainBtn.hidden = false;
}


// Function to restart the game
function restartGame() {

    // Generate a new random number
    secretNumber = Math.floor(Math.random() * 20) + 1;

    // Reset all game variables
    attemptsLeft = 5;
    score = 0;
    gameOver = false;

    // Reset HTML elements
    attemptsDisplay.textContent = attemptsLeft;
    scoreDisplay.textContent = score;

    guessInput.value = "";
    guessInput.disabled = false;

    checkBtn.disabled = false;

    playAgainBtn.hidden = true;

    reward.textContent = "🏆 Your rewards will appear here!";

    showMessage("New Game Started! Good Luck! 😊", "");

    guessInput.focus();
}


// Enter key functionality
guessInput.addEventListener("keydown", function(event) {

    // If user presses Enter, check the guess
    if (event.key === "Enter") {
        checkGuess();
    }

});
