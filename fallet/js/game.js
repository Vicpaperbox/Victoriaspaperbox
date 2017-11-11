
function Game(args) {
    this.args = args;
};

Game.prototype = {
    constructor: Game,
    defaults: {
        el: '#gamearea',
        lang: "english",
        gridPx: 50,
        gridWidth: 8,
        gridHeight: 12,
        initialTick: 400, /* ms per tick */
        minWordLength: 3
        /* TODO - how/when to accelerate game? */
    },
    arg: function(a) {
        return this.arg[a] || this.defaults[a];
    },
    initialize: function() {
        this.state = { };
        this.score = 0;
        this.grid = new Grid(this.arg("el"), this.arg("gridWidth"), this.arg("gridHeight"), this.arg("gridPx"));
        this.loadLang( this.arg("lang") );
        this.tickDelay = this.arg("initialTick");
        this.increaseScore(0);
    },
    run: function() {
        var self = this;
        if( this.wordstore.isReady == 0 ) {
            setTimeout(function() { self.run() }, 100);
            return;
        }
        this.tickInterval = setInterval(function() { self.tick() }, this.tickDelay);
        $(document).on("keydown", function(e) {
            if( ! self.grid.hasMovingSquare() ) {
                return;
            }
            if( e.keyCode == 39 ) { // Right
                console.log("MOVE RIGHT");
                self.grid.moveSquareRight();
            }
            if( e.keyCode == 37 ) { // Left
                self.grid.moveSquareLeft();
            }
        });
        $(document).on("touchstart", function(e) {
            if( ! self.grid.hasMovingSquare() ) {
                return;
            }
            
            var touch = e.touches[0];
            var half = $(document).width() / 2;
            if( touch.pageX > half ) {
                self.grid.moveSquareRight();
            } else {
                self.grid.moveSquareLeft();
            }
        });
    },
    tick: function() {
        if( this.grid.hasMovingSquare() ) {
            if( this.grid.canMove() ) {
                this.grid.moveSquareDown();
            } else {
                this.grid.saveMovingSquare();
                this.checkWords();
            }
        } else {
            this.grid.addSquare( this.wordstore.getLetter() );
            if( ! this.grid.canMove() ) {
                this.gameOver();
            }
        }
    },
    checkWords: function() {
        var self = this;
        clearInterval(this.tickInterval);

        var multiplier = 1;
        while( this.grid.hasDirtySquares() ) {
            var dirtyRows = this.grid.getDirtyRows();
            for(var i = 0; i<dirtyRows.length; i++) {
                var line = dirtyRows[i];
                this._checkWordsRow(line, this.grid.width, multiplier);
            }
            
            var dirtyCols = this.grid.getDirtyCols();
            for(var i = 0; i<dirtyCols.length; i++) {
                var line = dirtyCols[i];
                this._checkWordsCol(line, this.grid.height, multiplier);
            }
            this.grid.removeUsed();
            this.grid.clearDirty();
            this.grid.dropFloaters();
            multiplier++;
        }
        
        this.tickInterval = setInterval(function() { self.tick() }, this.tickDelay);
    },
    _checkWordsRow: function(line, maxIndex, multiplier) {
        JR: for(var j = 0; j<maxIndex; j++) {
            // j is starting point of potential word
            if( this.grid.isSquareEmpty(j, line) ) {
                continue;
            }
            
            for(var k = (maxIndex-1); k>j; k--) {
                // k is last char of word. try longest first, the cut down
                if( this.grid.isSquareEmpty(k, line) ) {
                    continue;
                }
                
                var word = this.grid.getLetters(j, line, k, line);
                if(word === '' || word.length < this.arg("minWordLength") ) {
                    continue;
                }
                
                if(this.wordstore.isValidWord(word)) {
                    var score = this.wordstore.getScore(word);
                    this.foundWord(word);
                    this.increaseScore(score * multiplier);
                    this.grid.markSquaresUsed(j, line, k, line);
                    break JR;
                }
            }
        }
    },
    _checkWordsCol: function(line, maxIndex, multiplier) {
        JC: for(var j = 0; j<maxIndex; j++) {
            // j is starting point of potential word
            if( this.grid.isSquareEmpty(line, j) ) {
                continue;
            }
            
            for(var k = (maxIndex-1); k>j; k--) {
                // k is last char of word. try longest first, the cut down
                if( this.grid.isSquareEmpty(line, k) ) {
                    continue;
                }
                
                var word = this.grid.getLetters(line, j, line, k);
                if(word === '' || word.length < this.arg("minWordLength") ) {
                    continue;
                }
                
                if(this.wordstore.isValidWord(word)) {
                    var score = this.wordstore.getScore(word);
                    this.foundWord(word);
                    this.increaseScore(score * multiplier);
                    this.grid.markSquaresUsed(line, j, line, k);
                    break JC;
                }
            }
        }
    },
    increaseScore: function(incr) {
        this.score = this.score + incr;
        $("#score").text(this.score);
    },
    foundWord: function(word) {
        var li = $("<li>"+word+"</li>");
        $("#found-words").prepend($(li));
    },
    gameOver: function() {
        clearInterval(this.tickInterval);
        $( "#dialog" ).dialog();
    },
    loadLang: function(lang) {
        var url = "js/lang/" + lang + ".js";
        this.wordstore = new Wordstore(url);
    }
};
