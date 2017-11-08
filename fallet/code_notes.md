
English-language editions of Scrabble contain 100 letter tiles, in the following distribution:

2 blank tiles (scoring 0 points)
1 point: E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4, U ×4
2 points: D ×4, G ×3
3 points: B ×2, C ×2, M ×2, P ×2
4 points: F ×2, H ×2, V ×2, W ×2, Y ×2
5 points: K ×1
8 points: J ×1, X ×1
10 points: Q ×1, Z ×1

grid = new Grid();
letter = WordStore.getLetter();
grid.addLetter(letter);


WordStore
        new( lang )
        
Game
        grid[x][y] = letter
        
        new({
                lang: "English",
                minWordLength: 3,
                gridWidth: 8,
                gridHeight: 16,
                initialTick: 100, /* ms per tick */
                /* how/when to accelerate game? */
        })
        run()

        

        for each tick;
            if falling_letter
               drop down. adjust left/right if user input
               if letter touching "ground"
                  if has not moved from top of screen
                     game over!
                  else
                     compute if words are created. if yes, goto WORDS
                     set falling_letter = 0
            else
                get new letter to top of screen
                falling_letter = [whatever_x][0]




         WORDS
         