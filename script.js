// Number Guessing Game Logic

// Function to start the game
function startGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let guess = 0;

    console.log('Welcome to the Number Guessing Game!');
    console.log('Guess a number between 1 and 100.');

    while (guess !== randomNumber) {
        guess = parseInt(prompt('Enter your guess:'));
        attempts++;

        if (guess < randomNumber) {
            console.log('Too low! Try again.');
        } else if (guess > randomNumber) {
            console.log('Too high! Try again.');
        } else {
            console.log(`Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`);
        }
    }
}

// Start the game
startGame();