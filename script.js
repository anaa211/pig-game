'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let currentScore, scores, activePlayer, playing;

//Starting conditions
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true; //state variable-containing the state(playing or not) of game

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    //Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled dice
    if (dice != 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the other player
      switchPlayer();
    }
  }
});

//Holding score functionality
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if player's score >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;

      //Hide the dice
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the other player
      switchPlayer();
    }
  }
});

//Loading new game functionality
btnNewEl.addEventListener('click', init);
