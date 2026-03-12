document.addEventListener('DOMContentLoaded', () => {
    // Game Elements
    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const restartBtn = document.getElementById('restart-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    const attemptCountEl = document.getElementById('attempt-count');
    const previousGuessesEl = document.getElementById('previous-guesses');

    // Game State
    let targetNumber = generateRandomNumber();
    let attempts = 0;
    let previousGuesses = [];
    let isGameOver = false;

    // Event Listeners
    guessBtn.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });
    restartBtn.addEventListener('click', restartGame);

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function handleGuess() {
        if (isGameOver) return;

        const guessValue = guessInput.value;
        const guess = parseInt(guessValue);

        // Validation
        if (!guessValue || isNaN(guess) || guess < 1 || guess > 100) {
            showFeedback("Please enter a valid number (1-100).", "error");
            shakeInput();
            return;
        }

        if (previousGuesses.includes(guess)) {
            showFeedback(`You already guessed ${guess}!`, "error");
            shakeInput();
            guessInput.value = '';
            return;
        }

        // Process valid guess
        attempts++;
        previousGuesses.push(guess);
        updateStats();
        
        if (guess === targetNumber) {
            handleWin();
        } else if (guess < targetNumber) {
            showFeedback("Too Low! Go higher.", "low");
            guessInput.value = '';
            guessInput.focus();
        } else {
            showFeedback("Too High! Go lower.", "high");
            guessInput.value = '';
            guessInput.focus();
        }
    }

    function handleWin() {
        isGameOver = true;
        showFeedback(`Correct! It was ${targetNumber}! 🎉`, "success");
        guessInput.disabled = true;
        guessBtn.disabled = true;
        restartBtn.classList.remove('hidden');
    }

    function restartGame() {
        targetNumber = generateRandomNumber();
        attempts = 0;
        previousGuesses = [];
        isGameOver = false;

        guessInput.disabled = false;
        guessBtn.disabled = false;
        guessInput.value = '';
        
        updateStats();
        showFeedback("Awaiting your guess...", "");
        restartBtn.classList.add('hidden');
        guessInput.focus();
    }

    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = ''; // Reset classes
        if (type) {
            feedbackMessage.classList.add(`message-${type}`);
        }
    }

    function updateStats() {
        attemptCountEl.textContent = attempts;
        previousGuessesEl.textContent = previousGuesses.length > 0 ? previousGuesses.join(', ') : '-';
    }

    function shakeInput() {
        guessInput.classList.remove('shake');
        // Trigger reflow to restart animation
        void guessInput.offsetWidth;
        guessInput.classList.add('shake');
    }

    // Focus input on load
    guessInput.focus();
});
