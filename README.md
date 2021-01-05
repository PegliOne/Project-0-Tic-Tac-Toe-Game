# Project-0-Tic-Tac-Toe-Game
A tic-tac-toe game made for the first project of the GA Software Engineering Course 

# Game Production Diary

# 05/01/21 11:50am

- Step One complete. Basic looking game with basic functionality achieved. Next step will be to style the page to make it look for attractive and more dramatically show the outcome (so far the outcome is only presented in the display-info paragraph). The checkWin function will need to be optimised (probably with loops), since it's currently very repetitive. I may also remove the "top", "middle" and "bottom" ids and use classes exclusively. 

# 05/01/21 11:00pm

- Step Two complete. Nicer looking game with added colors, transitions and hover effects. Replacing the light blue color with pink shows clearly when the game has ended. I couldn't figure out how to making the game-info text transition gradually. I might come back to it later. The checkWin function is much neater and more logical, but I might look into whether it's possible to loop through all classes on a page to further optimise it. Next step is to add the bonus functionality.

# Game Production Plan

# Technologies I'll Be Using
- HTML, CSS and JavaScript
- jQuery
- GitHub Pages (to host the site)
- Firebase (for the added functionality)

# Sites Used for Styling
- https://coolors.co/palettes/popular
- https://fonts.google.com/specimen/Open+Sans?preview.text=XOXOXOX&preview.text_type=custom&sidebar.open=true&selection.family=Open+Sans:wght@400;700

# Step One
- Create an HTML file that displays the title, game board (either a table or a set of divs) and some instructions
- Create a CSS sheet that makes the page look decent (more attractive styles can be added later). Flexbox properties can be used to position elements (not covered in the course, I know)
- Import jQuery
- Create a JavaScript file that programs basic game logic such as tracking who's turn it is, adding Xs and Os, checking for wins (I'll start by writing down and testing against every win state, then see if I can think of an easier way to test for wins) and changing display to match outcome
- Commit initial version to GitHub and edit readme file

# Step Two
- Add more styling to make the page attractive (colors, fonts, animations, hover effects, etc.)
- Optimise JavaScript to make it simpler and dryer
- Host game on GitHub pages and add the link on GitHub
- Commit updated version to GitHub and edit readme file

# Step Three - optional stuff
- Add bonus functionality to JavaScript files (keeping tracking of rounds, letting players choose tokens and select custom board sizes)
- Add local storage and networked multipler (if I can figure that stuff out!)
- Add an AI opponent (probably not going to happen honestly)
- Commit updated version to GitHub and edit readme file

# Step Four
- Re-read all code and look for opportunities for removing redundancies and optimising it
- Attempt to fix problems encountered in previous steps
- Commit updated version to GitHub and edit readme file
