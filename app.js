/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice, prevDice, gamePlaying, startScore;

// Clear the board and start a new game
init();

function changePlayer() {

    prevDice = 0;
    dice = 0;
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById("current-" + activePlayer).textContent = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector(".prev-dice-box-0").style.display = "none";
    document.querySelector(".prev-dice-box-1").style.display = "none";
}


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

        // Get a random number
        prevDice = dice;
        dice = Math.floor(Math.random() * 6) + 1;

        // display the result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = 'block';
        diceDOM.src = "dice-" + dice + ".png";

        if (prevDice !== 0) {
            document.querySelector(".prev-dice-box-" + activePlayer).style.display = "block";
            document.querySelector(".prev-dice-" + activePlayer).src = "dice-" + prevDice + ".png";
        }
        
        

        // if player rolls two 6s in a row, their entire score is wiped out
        if(dice === 6 && prevDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
            changePlayer();
        }
        // update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            diceDOM.className += ' fadeout';
        } else {
            changePlayer();
        }

    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying) {
        // add current score to player total score
        scores[activePlayer] += roundScore;

        //update the UI for the game
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= startScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;

        } else {
            //next player
            changePlayer();
        }
    }
    
});

function getScore() {
    startScore = document.getElementById("start-score").value;
    console.log(startScore);        
    document.querySelector(".popup-container").style.display = "none";
    document.querySelector(".btn-score-to-win").innerHTML = "Playing to " + startScore;
}

// Listen on New Game button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    dice = 0;
    prevDice = 0;

    // Opens Starting Score popup
    document.querySelector(".popup-container").style.display = "block";
    
    // clears the dice image on initial page load
    document.querySelector('.dice').style.display = 'none';
    document.querySelector(".prev-dice-box-0").style.display = "none";
    document.querySelector(".prev-dice-box-1").style.display = "none";

    document.querySelector(".btn-score-to-win").innerHTML = "";

    document.getElementById('score-0').textContent = '0';
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");

}

/*

1. A Player looses his ENTIRE score when he rolls two 6s in a row.  After that, it's the next player's turn. (Hint: alwasy save the previous dice roll in a seperate variable) -- DONE!!!

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read the value with the .value property in JavaScript) -- DONE!!

3. Add another dice to the game, so that there are now two dice.  The player looses his current score when one of them is a 1.  (Hint: you will need CSS to position the second dice)

4. Figure out way to display a 1 roll (possibly slow fade out), or display message that indicates what what happened instead of just switching players.

5. Add instructions on game init.  Poss add dropdown tab.

*/
