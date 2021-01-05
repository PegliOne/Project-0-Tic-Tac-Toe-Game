// This sets the symbol which will be placed next
let symbol = "X";
let gameOver = false;

// This code needs to be DRYer. I should find a way to do this with loops.
const checkWin = function() {
     const topRow = $('#top td').text();
     const middleRow = $('#middle td').text();
     const bottomRow = $('#bottom td').text();
     const leftCol = $('.left').text();
     const centerCol = $('.center').text();
     const rightCol = $('.right').text();
     const upSlope = $('.up-slope').text();
     const downSlope = $('.down-slope').text();
     if (topRow === "XXX" || middleRow === "XXX" || bottomRow === "XXX" || leftCol === "XXX" || centerCol === "XXX" || rightCol === "XXX" || upSlope === "XXX" || downSlope === "XXX") {
       gameOver = true;
       $('#display-info').text("X Wins!");
     } else if (topRow === "OOO" || middleRow === "OOO" || bottomRow === "OOO" || leftCol === "OOO" || centerCol === "OOO" || rightCol === "OOO" || upSlope === "OOO" || downSlope === "OOO") {
       gameOver = true;
       $('#display-info').text("O Wins!");
     }
}

const checkTie = function() {
  $('td').each(function() {
    gameOver = true;
    if ($(this).text() === "") {
      gameOver = false;
      return false;
    }
  })
  if (gameOver) {
    $('#display-info').text("Tie!");
  }
}

const addSymbol = function() {
    console.log(gameOver);
    if ($(this).text() === "" && gameOver === false) {
      $(this).text(symbol);
      if (symbol === "X") {
        symbol = "O";
      } else {
        symbol = "X";
      }
    $('span').text(symbol);
    checkTie();
    checkWin();
    }
}

$( document ).ready( function() {
  $('td').on('click', addSymbol);
})
