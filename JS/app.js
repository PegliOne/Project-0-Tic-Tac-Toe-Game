//Player Objects
const players = [
  {
    symbol: "X",
    winCount: 0,
  },
  {
    symbol: "O",
    winCount: 0,
  }
]

// Global Variables
let gameOver = false;
let currentSymbol = players[0].symbol;

// These functions sets the player's counters. This should maybe be done in a loop
const setPlayerOneSymbol = function() {
  players[0].symbol = $(this).val();
  currentSymbol = players[0].symbol;
  $('#game-info span').text(currentSymbol);
}

const setPlayerTwoSymbol = function() {
  players[1].symbol = $(this).val();
}

// This function ends the game. I might use it to add more "end game" effects later on.
const endGame = function() {
  gameOver = true;
  $('body, h1, button, td, #game-info').addClass("finish");
  $('#player-one-wins span').text(players[0].winCount);
  $('#player-two-wins span').text(players[1].winCount);
}

// This function restars the game.
const restartGame = function() {
  gameOver = false;
  $('body, h1, button, td, #game-info').removeClass("finish");
  $('#game-info').html(`Next Symbol: <span>${ players[0].symbol }</span>`);
  $('td').text("");
  $('input').removeAttr("disabled");
  currentSymbol = $('#player-one-symbol').val();
}

// This function checks if either player has won the game
const checkWin = function() {
      const winCombos = [$('.top').text(), $('.middle').text(), $('.bottom').text(), $('.left').text(), $('.center').text(), $('.right').text(), $('.up-slope').text(), $('.down-slope').text()];
      for ( let i = 0; i < winCombos.length; i++) {
        if ( winCombos[i] === `${players[0].symbol}${players[0].symbol}${players[0].symbol}` ) {
          players[0].winCount++;
          $('#game-info').text(`Player One Wins!`).addClass("finish");
          endGame();
        } else if ( winCombos[i] === `${players[1].symbol}${players[1].symbol}${players[1].symbol}` ) {
          players[1].winCount++;
          endGame();
          $('#game-info').text(`Player Two Wins!`).addClass("finish");
        }
    }
}

// This function checks if all the squares are filled, signalling the game is over
const checkTie = function() {
  $('td').each(function() {
    gameOver = true;
    if ($(this).text() === "") {
      gameOver = false;
      return false;
    }
  })
  if (gameOver) {
    endGame();
  // This line can be overriden by the checkWin function in the event that a player wins on the last turn
    $('#game-info').text("Tie!").addClass("finish");
  }
}

// Alternatives between adding Xs and Os to the game board
const addSymbol = function() {
  if ($(this).text() === "" && gameOver === false) {
      $(this).text(currentSymbol).addClass("finish");
      // Disables the inputs, so player symbols can't be changed mid-game
      $('input').attr("disabled", "disabled");
      if (currentSymbol === players[0].symbol) {
        currentSymbol = players[1].symbol;
      } else {
        currentSymbol = players[0].symbol;
      }
      $('#game-info span').text(currentSymbol);
      checkTie();
      checkWin();
    }
}

// Adds functionality to every cell on the page
$( document ).ready( function() {
  $('#player-one-symbol').on("keyup", setPlayerOneSymbol)
  $('#player-two-symbol').on("keyup", setPlayerTwoSymbol)
  $('td').on("click", addSymbol);
  $('#restart').on("click", restartGame);
})
