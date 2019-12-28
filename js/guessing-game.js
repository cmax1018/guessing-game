/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    return Math.floor(Math.random() * 100 + 1);
}

function shuffle(array) {
    let m = array.length;
    let t;
    let i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower() {
        return this.winningNumber > this.playersGuess;
    }
    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            return 'You Win!'
        }
        else if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.'
        }
        else {
            this.pastGuesses.push(this.playersGuess);
        }
        if (this.pastGuesses.length >= 5) {
            return 'You Lose.';
        }
        else if (this.difference() < 10) {
            return "You're burning up!"
        }
        else if (this.difference() < 25) {
            return "You're lukewarm."
        }
        else if (this.difference() < 50) {
            return "You're a bit chilly.";
        }
        else {
            return "You're ice cold!";
        }
    }
    playersGuessSubmission(num) {
        if (num > 100 || num < 1 || typeof num !== 'number') {
            throw 'That is an invalid guess.';
        }
        else {
            this.playersGuess = num;
            return this.checkGuess();
        }
    }
    provideHint() {
        let arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
        arr = shuffle(arr);
        return arr;
    }
}

function newGame() {
    return new Game();
}
let game = newGame();
let input = document.getElementById('input');
const hint = document.getElementById('hint');
const hints = document.getElementById('hints');
const submit = document.getElementById('submit');
const playAgain = document.getElementById('play-again');
const status = document.getElementById('status');
const guesses = document.getElementById('previous guesses')


hint.addEventListener('click', () => {
    let theseHints = game.provideHint();
    hints.innerHTML = '';
    for (var i = 0; i < theseHints.length; i++) {
        let currHint = theseHints[i] + ' ';

        var listItem = document.createElement('li');
        listItem.textContent = currHint;

        hints.appendChild(listItem);
    }

});

submit.addEventListener('click', () => {
    let value = parseInt(input.value, 10);
    status.innerHTML = game.playersGuessSubmission(value);
    guesses.innerHTML = '';
    for (var i = 0; i < game.pastGuesses.length; i++) {
        let currGuess = game.pastGuesses[i] + ' ';

        var listItem = document.createElement('li');
        listItem.textContent = currGuess;
        if (typeof value === 'number') {
            guesses.appendChild(listItem);
        }
    }

})

playAgain.addEventListener('click', () => {
    status.innerHTML = 'Let\s play!';
    hints.innerHTML = '';
    guesses.innerHTML = '';
    game = newGame();
})
