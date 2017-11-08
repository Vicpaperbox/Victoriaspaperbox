TetriScrabble
=============

Game works something like this;

* Random (well..using scrabble distribution) character appears, falling down
* User can move the character left/right while it's moving
* Character lands
* App checks if words have been created, horizontal and/or vertical
* If word has been created
  * flash it, remove characters, add score
    * If horizontal AND vertical word created at once, double(?) points
  * characters on top fall down
  * If new words created, goto 10. Points doubles
* Once newly added character can't move 1 step down, game over


User input in game
* On computer
  * Left / Right keys
* On mobile
  * Tap left / right of falling character
* FOR LATER - Tap character to rotate -- if we will add character combos
* Some button to allow "drop character to bottom now"?


Tech details;

* All in Javascript/HTML
* Use localStorage to save highscores - namespace it!


Phonegap best practices (? taken from various websites);

* Load JavaScript on demand, when you need it
* Listen for touch events, rather than click events
* Use CSS effects where possible
* http://www.gauntface.co.uk/blog/2014/02/05/cordova-web-best-practices-v2-0/

Future ideas;

* Save highscores to server
* Multiplayer!

