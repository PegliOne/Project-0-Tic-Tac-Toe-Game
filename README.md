# Project-0-Tic-Tac-Toe-Game
A tic-tac-toe game made for the first project of the GA Software Engineering Course

Play the game [here](https://pams-tic-tac-toe.web.app/)

## Outstanding issues

* Game-info text does not transition gradually
* Game can't distinguish different users, so the same computer can be used to play multiple moves. Please play honestly!

## Technologies Used
* HTML, CSS and JavaScript
* jQuery (used to shorten the code)
* Firebase (for multiplayer networking and as a hosting platform)

## Sites Used For Styling
* [Coolers](https://coolors.co/palettes/popular)
* [Google fonts](https://fonts.google.com/specimen/Open+Sans?preview.text=XOXOXOX&preview.text_type=custom&sidebar.open=true&selection.family=Open+Sans:wght@400;700)

## Game Production Updates

### 08/01/21 12:00pm

Step Four complete. Major issues with multiplayer networking solved using a MutationObserver. Redundant code deleted. Comments added to improve clarity.

### 08/01/21 10:50am

Step Three complete. Firebase installed and running. Game deployed on Firebase with online networking enabled, but with some glitches. The game only displays when it has ended (and enables a game restart) on the computer that makes the game ending move. This create issue with the win counter. No other functionality will be added. The next step is to attempt to resolve these issues and complete a final review of my code.

### 07/01/21 2:15pm

Step Three in progress. Local Storage, win counter reset added and comments added to JavaScript. I'll look into networked play next. I should also re-organise and add comments to the CSS file. It's getting pretty messy.

### 06/01/21 6:00pm

Step Three in progress. Win counters, restart button and symbol selection added. Some text removed (hopefully no one needs tic tac toe explained to them). Player objects created to enable new functionality. Next step will be to add local storage and enable networked play. The rest of the desired functionality (enabling players to choose images, multiple board sizes and AI opponents), seems challenging to include, so these functions will be left until later.

### 05/01/21 11:00pm

Step Two complete. Nicer looking game with added colors, transitions and hover effects. Replacing the light blue color with pink shows clearly when the game has ended. I couldn't figure out how to making the game-info text transition gradually. I might come back to it later. The checkWin function is much neater and more logical, but I might look into whether it's possible to loop through all classes on a page to further optimise it. Next step is to add the bonus functionality.

### 05/01/21 11:50am

Step One complete. Basic looking game with basic functionality achieved. Next step will be to style the page to make it look for attractive and more dramatically show the outcome (so far the outcome is only presented in the display-info paragraph). The checkWin function will need to be optimised (probably with loops), since it's currently very repetitive. I may also remove the "top", "middle" and "bottom" ids and use classes exclusively.

## Game Production Plan

### Step One
* Create an HTML file that displays the title, game board (either a table or a set of divs) and some instructions
* Create a CSS sheet that makes the page look decent (more attractive styles can be added later). Flexbox properties can be used to position elements (not covered in the course, I know)
* Import jQuery
* Create a JavaScript file that programs basic game logic such as tracking who's turn it is, adding Xs and Os, checking for wins (I'll start by writing down and testing against every win state, then see if I can think of an easier way to test for wins) and changing display to match outcome
* Commit initial version to GitHub and edit readme file

### Step Two
* Add more styling to make the page attractive (colors, fonts, animations, hover effects, etc.)
* Optimise JavaScript to make it simpler and dryer
* Host game on GitHub pages and add the link on GitHub
* Commit updated version to GitHub and edit readme file

### Step Three - features included
* Add bonus functionality to JavaScript files (keeping tracking of rounds, letting players choose counters)
* Add local storage and networked multipler
* Commit updated version to GitHub, deploy on Firebase and edit readme file

### Step Three - intended features not included
* The option to use images as counters (current version only allows the use of text)
* The option to select different board sizes (this seemed like it would require too many changes to the current code)
* AI opponents (I honestly didn't think I'd be able to pull that off)

### Step Four
* Re-read all code and remove deleted code
* Attempt to fix problems encountered in previous steps
* Commit updated version to GitHub and edit readme file
