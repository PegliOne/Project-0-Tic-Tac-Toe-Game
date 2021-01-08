console.log("This is the very newest version");

//Player Objects
const players = [
  {
    symbol: "X",
    winCount: 0,
    hasWon: false
  },
  {
    symbol: "O",
    winCount: 0,
    hasWon: false
  }
]

// Global Variables
let currentSymbol = players[0].symbol;
let gameOver = false;
let gameRunning = false;

// Functions for ending and restarting the game

// Ends the game, changes the display and resets some localStorage data
const endGame = function() {
    for ( let i=0 ;i < players.length; i++ ) {
      if (players[i].hasWon) {
        players[i].winCount++;
        players[i].hasWon = false;
      }
    }
    gameRunning = false;
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
  storeGame();
}

const resetCounter = function() {
  for (let i = 0; i <players.length; i++) {
    localStorage.setItem("playerOneWins", 0);
    localStorage.setItem("playerTwoWins", 0);
    players[i].winCount = 0;
    $('.win-count').text(players[i].winCount);
    storeGame();
  }
}

// Functions for checking game outcome

// Checks for ties and wins and stores changes to the game
const checkOutcome = function() {
  storeGame();
  checkTie();
  checkWin();
}

// Checks if either player has won the game and updates winCount and #game-info text
const checkWin = function() {
    const board = storeBoard()
    const winCombos = [$('.top').text(), $('.middle').text(), $('.bottom').text(), $('.left').text(), $('.center').text(), $('.right').text(), $('.up-slope').text(), $('.down-slope').text()];
    for ( let i = 0; i < winCombos.length; i++) {
      if ( winCombos[i] === `${players[0].symbol}${players[0].symbol}${players[0].symbol}` && gameOver === false) {
          players[0].hasWon = true;
          $('#game-info').text(`Player One Wins!`).addClass("finish");
          gameOver = true;
          endGame();
      } else if ( winCombos[i] === `${players[1].symbol}${players[1].symbol}${players[1].symbol}` && gameOver === false) {
          players[1].hasWon = true;
          $('#game-info').text(`Player Two Wins!`).addClass("finish");
          gameOver = true;
          endGame();
      }
    }
}

// Checks if all the squares are filled, meaing the game is over
const checkTie = function() {
  if (gameOver === false) {
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
}

// Functions for setting and placing counters

 // Sets the player's counters. This could perhaps be achieved with a loop.
 const setPlayerOneSymbol = function() {
   if (gameRunning === false) {
     players[0].symbol = $(this).val();
     currentSymbol = players[0].symbol;
     $('#game-info span').text(currentSymbol);
     storeGame();
   }
 }

 const setPlayerTwoSymbol = function() {
   if (gameRunning === false) {
     players[1].symbol = $(this).val();
     storeGame();
   }
 }

// Adds the player's counters to the board
const addSymbol = function() {
  // Makes sure the square is blank and the game hasn't already been won
  if ($(this).text() === "" && gameOver === false) {
      gameRunning = true;
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
    }
}

// Functions for storing and loading game data

// Local storage

// Stores the state of the board and is used by the storeGame function to save the game
const storeBoard = function() {
  let board = "";
//  if (gameOver === false) {
    $('td').each(function(index) {
      if ($(this).text() === players[0].symbol) {
        // Indicates Player One has placed their symbol in the square
        board+="1";
      } else if ($(this).text() === players[1].symbol) {
        // Indicates Player Two has placed their symbol in the square
        board+= "2";
      } else {
        // Spaces are used to indicate blank squares, so that symbols are retrieved in the correct positions
        board+=" ";
      }
    });
//  }
  renderBoard(board);
  return board;
}

// Saves the state of the game to local storage
const storeGame = function() {
      localStorage.setItem("playerOneSymbol" , players[0].symbol)
      localStorage.setItem("playerTwoSymbol" , players[1].symbol)
      localStorage.setItem("currentTurn", currentSymbol);
      localStorage.setItem("boardState", storeBoard());
      localStorage.setItem("playerOneWins", players[0].winCount);
      localStorage.setItem("playerTwoWins", players[1].winCount);
      storeBoard();
      sendOnline();
    }

const renderBoard = function(board) {
  // Checks if there is an active board
  if (board !== "         " && board !== null) {
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

// Retrieves a saved game from localStorage
// This function could probably be DRYer, I'll see if there's a way to loop through localStorage
// It could also be broken up
const retrieveGame = function() {
  players[0].symbol = localStorage.getItem("playerOneSymbol");
  // I could use a render function to update the visuals
  $('#player-one-symbol').val(players[0].symbol);
  players[1].symbol = localStorage.getItem("playerTwoSymbol");
  $('#player-two-symbol').val(players[1].symbol);
  currentSymbol = localStorage.getItem("currentTurn");
  $('#game-info span').text(currentSymbol);
  //Retrieves Player One's Win Count
  if (localStorage.getItem("playerOneWins") !== null) {
    players[0].winCount = localStorage.getItem("playerOneWins");
    $('#player-one-wins span').text(players[0].winCount);
  }
  //Retrieves Player Two's Win Count
  if (localStorage.getItem("playerTwoWins") !== null) {
    players[1].winCount = localStorage.getItem("playerTwoWins");
    $('#player-two-wins span').text(players[1].winCount);
  }
  renderBoard(localStorage.getItem("boardState"));
 }

 // Firebase

// Makes Firebase Works
const setUpFirebase = function() {
    const firebaseConfig = {
        apiKey: "AIzaSyDRyogisCxf1M53r81DVXztaEo4ln47nBI",
        authDomain: "pams-tic-tac-toe.firebaseapp.com",
        databaseURL: "https://pams-tic-tac-toe-default-rtdb.firebaseio.com",
        projectId: "pams-tic-tac-toe",
        storageBucket: "pams-tic-tac-toe.appspot.com",
        messagingSenderId: "865135854283",
        appId: "1:865135854283:web:ebecb34d0b1a2b6406914e",
        measurementId: "G-XGF8L9Q5BG"
     };
    firebase.initializeApp(firebaseConfig);

    //Get a reference to the database service
    const database = firebase.database().ref("test");
  }

// Sends data to the Firebase database
const sendOnline = function() {
  firebase.database().ref().set({
    playerOneSymbol: players[0].symbol,
    playerTwoSymbol: players[1].symbol,
    currentTurn: currentSymbol,
    gameOver: gameOver,
    gameRunning: gameRunning,
    boardState: storeBoard(),
    playerOneWins: players[0].winCount,
    playerTwoWins: players[1].winCount,
  })
}

// Receives data from the Firebase server
const readFromOnline = function() {
  firebase.database().ref().on("value", (snapshot) => {
    const data = snapshot.val();
    // This is heavily copied from the retrieveGame function. Maybe I'll find a way to combine them or use a render function
    players[0].symbol = data.playerOneSymbol;
    $('#player-one-symbol').val(players[0].symbol);
    players[1].symbol = data.playerTwoSymbol;
    $('#player-two-symbol').val(players[1].symbol);
    currentSymbol = data.currentTurn;
    $('#game-info span').text(currentSymbol);
    players[0].winCount = data.playerOneWins;
    $('#player-one-wins span').text(players[0].winCount);
    players[1].winCount = data.playerTwoWins;
    $('#player-two-wins span').text(players[1].winCount);
    renderBoard(data.boardState);
  })
}

// Setting Up the Game

// Adds functionality to the buttons, inputs and all the board's squares
$( document ).ready( function() {
  setUpFirebase();
  // Checks if data has been saved in localStorage and retrieves it, but only if it's not connected to the database
  if (localStorage.length > 2 && !firebase) {
    retrieveGame();
  }
  readFromOnline();
  $('#player-one-symbol').on("keyup", setPlayerOneSymbol);
  $('#player-two-symbol').on("keyup", setPlayerTwoSymbol);
  const cells = $('td');
  cells.on("click", addSymbol);
  // Sets up observation of changes in the cells and triggers the checkOutcome function for all changes
  for ( let i = 0; i < cells.length; i++) {
    const cellObserver = new MutationObserver(checkOutcome);
    cellObserver.observe(cells[i], {characterData: true, attributes: true})
  }
  $('#restart').on("click", restartGame);
  $('#reset').on("click", resetCounter);
})
