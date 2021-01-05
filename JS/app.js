// Global Variables
let symbol = "X";
let gameOver = false;


// This function ends the game. I can use it to add more "end game" effects later on
const endGame = function() {
  gameOver = true;
  $('body').addClass("finish");
  $('h1').addClass("finish");
  $('#game-info').addClass("finish");
}

// This function checks if either player has won the game
const checkWin = function() {
      const winCombos = [$('.top').text(), $('.middle').text(), $('.bottom').text(), $('.left').text(), $('.center').text(), $('.right').text(), $('.up-slope').text(), $('.down-slope').text()];
      for ( let i = 0; i < winCombos.length; i++) {
        if ( winCombos[i] === "XXX" ) {
          endGame();
          $('#game-info').text(`Player ${ symbol } Wins!`).addClass("finish");
        } else if ( winCombos[i] === "OOO" ) {
          endGame();
          $('#game-info').text(`Player ${ symbol } Wins!`).addClass("finish");
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
      $(this).text(symbol).addClass("finish");
      checkTie();
      checkWin();
      if (symbol === "X") {
        symbol = "O";
        } else {
        symbol = "X";
        }
      $('span').text(symbol);
    }
}

// Adds functionality to every cell on the page
$( document ).ready( function() {
  $('td').on('click', addSymbol);
})
