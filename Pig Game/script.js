'use strict';
const score0el = document.querySelector('#score--0');
const score1el = document.querySelector('#score--1');
const current0el = document.querySelector('#current--0');
const current1el = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let current = 0;
let activeplayer = 0;
let score = [0, 0];
let playing = true;
const switchplayer = function () {
  current = 0;
  document.querySelector(`#current--${activeplayer}`).textContent = current;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

score0el.textContent = 0;
score1el.textContent = 0;

diceEl.classList.add('hidden');

const btnRollDice = document.querySelector('.btn--roll');
btnRollDice.addEventListener('click', function () {
  if (playing) {
    //generate random number
    const DiceNumber = Math.trunc(Math.random() * 6) + 1;
    //show dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${DiceNumber}.png`;
    if (DiceNumber !== 1) {
      //add to current
      current += DiceNumber;
      document.querySelector(`#current--${activeplayer}`).textContent = current;
    } else {
      //switch player
      switchplayer();
    }
  }
});
//hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activeplayer] += current;
    document.querySelector(`#score--${activeplayer}`).textContent =
      score[activeplayer];
    if (score[activeplayer] >= 50) {
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchplayer();
    }
  }
});

btnNewGame.addEventListener('click', function () {
  playing = true;
  current = 0;
  score = [0, 0];
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--winner');
  activeplayer = 0;

  score0el.textContent = 0;
  score1el.textContent = 0;

  diceEl.classList.add('hidden');
  current0el.textContent = current;
  current1el.textContent = current;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
});
