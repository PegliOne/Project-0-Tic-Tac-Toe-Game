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

// These functions sets the player's counters. This could perhaps be achieved with a loop
const setPlayerOneSymbol = function() {
  players[0].symbol = $(this).val();
  currentSymbol = players[0].symbol;
  $('#game-info span').text(currentSymbol);
  storeGame();
}

const setPlayerTwoSymbol = function() {
  players[1].symbol = $(this).val();
  storeGame();
}

// Ends the game, changes the display and resets some localStorage data
const endGame = function() {
  gameOver = true;
  localStorage.setItem("boardState", "         ");
  localStorage.setItem("currentTurn", players[0].symbol);
  // These lines should perhaps be moved to a render function
  $('body, h1, button, td, #game-info').addClass("finish");
  $('#player-one-wins span').text(players[0].winCount);
  $('#player-two-wins span').text(players[1].winCount);
}

// Restarts the game, when the restart button is clicked
const restartGame = function() {
  gameOver = false;
  $('body, h1, button, td, #game-info').removeClass("finish");
  $('#game-info').html(`Next Symbol: <span>${ players[0].symbol }</span>`);
  $('td').text("");
  $('input').removeAttr("disabled");
  currentSymbol = $('#player-one-symbol').val();
}

const resetCounter = function() {
  for (let i = 0; i <players.length; i++) {
    localStorage.setItem("playerOneWins", 0);
    localStorage.setItem("playerTwoWins", 0);
    players[i].winCount = 0;
    $('.win-count').text(players[i].winCount);
  }
}

// Checks if either player has won the game and updates winCount and #game-info text
const checkWin = function() {
      const winCombos = [$('.top').text(), $('.middle').text(), $('.bottom').text(), $('.left').text(), $('.center').text(), $('.right').text(), $('.up-slope').text(), $('.down-slope').text()];
      for ( let i = 0; i < winCombos.length; i++) {
        // The following code is a bit repetitive and might need to be DRYied up
        if ( winCombos[i] === `${players[0].symbol}${players[0].symbol}${players[0].symbol}` ) {
          players[0].winCount++;
          storeGame();
          $('#game-info').text(`Player One Wins!`).addClass("finish");
          endGame();
        } else if ( winCombos[i] === `${players[1].symbol}${players[1].symbol}${players[1].symbol}` ) {
          players[1].winCount++;
          storeGame()
          $('#game-info').text(`Player Two Wins!`).addClass("finish");
          endGame();
        }
    }
}

// Checks if all the squares are filled, meaing the game is over
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

// Stores the state of the board and is used by the storeGame function to save the game
const storeBoard = function() {
  let moveString = "";
  $('td').each(function() {
    if ($(this).text() === players[0].symbol) {
      // Indicates Player One has placed their symbol in the square
      moveString+="1";
    } else if ($(this).text() === players[1].symbol) {
      // Indicates Player Two has placed their symbol in the square
      moveString+="2";
    } else {
      // Spaces are used to indicate blank squares, so that symbols are retrieved in the correct positions
      moveString+=" ";
    }
  })
  return moveString;
}

// Saves the state of the game to local storage
const storeGame = function() {
  localStorage.setItem("playerOneSymbol" , players[0].symbol)
  localStorage.setItem("playerTwoSymbol" , players[1].symbol)
  localStorage.setItem("currentTurn", currentSymbol);
  localStorage.setItem("boardState", storeBoard());
  localStorage.setItem("playerOneWins", players[0].winCount);
  localStorage.setItem("playerTneWins", players[1].winCount);
}

// Retrieves a saved game from localStorage
// This function could probably be DRYer, I'll see if there's a way to loop through localStorage
const retrieveGame = function() {
  players[0].symbol = localStorage.getItem("playerOneSymbol");
  // I could use a render function to update the visuals
  $('#player-one-symbol').val(players[0].symbol);
  players[1].symbol = localStorage.getItem("playerTwoSymbol");
  $('#player-two-symbol').val(players[1].symbol);
  currentSymbol = localStorage.getItem("currentTurn");
  $('#game-info span').text(currentSymbol);
  // Retrieves Player One's Win Count
  if (localStorage.getItem("playerOneWins") !== null) {
    players[0].winCount = localStorage.getItem("playerOneWins");
    $('#player-one-wins span').text(players[0].winCount);
  }
  // Retrieves Player Two's Win Count
  if (localStorage.getItem("playerTwoWins") !== null) {
    players[1].winCount = localStorage.getItem("playerTwoWins");
    $('#player-two-wins span').text(players[1].winCount);
  }
  // Checks if a board has been saved to storage
  if (localStorage.getItem("boardState") !== "         ") {
    const board = localStorage.getItem("boardState");
    // Disables the inputs, so player symbols can't be changed mid-game
    $('input').attr("disabled", "disabled");
    // Adds moves to the board
    $('td').each(function(index) {
      if (board[index] === "1") {
        $(this).text(players[0].symbol).addClass("finish");
      } else if (board[index] === "2") {
        $(this).text(players[1].symbol).addClass("finish");
      }
    })
  }
 }

// Adds the player's counters to the board
const addSymbol = function() {
  // Makes sure the square is blank and the game hasn't already been won
  if ($(this).text() === "" && gameOver === false) {
      $(this).text(currentSymbol).addClass("finish");
      // Disables the inputs, so player symbols can't be changed mid-game
      $('input').attr("disabled", "disabled");
      // Alternatives between adding Player One and Player Two's counters to the game board
      if (currentSymbol === players[0].symbol) {
        currentSymbol = players[1].symbol;
      } else {
        currentSymbol = players[0].symbol;
      }
      $('#game-info span').text(currentSymbol);
      storeGame();
      checkTie();
      checkWin();
    }
}

// Adds functionality to the buttons, inputs and all the board's squares
$( document ).ready( function() {
  // Checks if data has been saved in localStorage and retrieves it
  if (localStorage.length !== 0) {
    retrieveGame();
  }
  $('#player-one-symbol').on("keyup", setPlayerOneSymbol);
  $('#player-two-symbol').on("keyup", setPlayerTwoSymbol);
  $('td').on("click", addSymbol);
  $('#restart').on("click", restartGame);
  $('#reset').on("click", resetCounter);
})
