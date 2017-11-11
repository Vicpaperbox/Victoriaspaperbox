function Grid(el, width, height, gridPx) {
    this.el = el;
    this.width = width;
    this.height = height;
    this.gridPx = gridPx;
    this.grid = this.createArray(width, height);
    this.action = undefined;

    $(this.el).width( width * gridPx );
    $(this.el).height( height * gridPx );
};

Grid.prototype = {
    createArray: function(length) {
        var arr = new Array(length || 0),
        i = length;
        
        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = this.createArray.apply(this, args);
        }
        return arr;
    },
    getGrid: function() {
        return this.grid;
    },
    addSquare: function(letter) {
        var s = new Square(letter);
        $(s.el).css("width", this.gridPx + "px;");
        $(s.el).css("height", this.gridPx + "px;");
        $(s.el).css("line-height", this.gridPx + "px;");
        $(this.el).append(s.el);
        s.render(4, 0);
        this.movingSquare = s;
    },
    hasMovingSquare: function() {
        if( this.movingSquare === undefined ) {
            return false;
        }
        return true;
    },
    canMove: function() {
        if( ! this.movingSquare ) {
            return false;
        }
        if( this.movingSquare.Y()+1 >= this.height ) {
            //console.log("Can't move, out of bounds");
            return false;
        }
        //console.log("Check grid for " + this.movingSquare.X() + ", " + this.movingSquare.Y());
        //console.dir(this.grid);
        if( this.grid[this.movingSquare.X()][this.movingSquare.Y()+1] !== undefined ) {
            //console.log("Can't move, grid taken");
            return false;
        }
        return true;
    },
    saveMovingSquare: function() {
        this.movingSquare.isDirty = 1;
        this.grid[this.movingSquare.X()][this.movingSquare.Y()] = this.movingSquare;
        this.movingSquare = undefined;
    },
    moveSquareDown: function() {
        if( this.action !== undefined ) {
            this.movingSquare[this.action]();
            this.action = undefined;
        }
        this.movingSquare.moveDown();
    },
    moveSquareLeft: function() {
        if( this.movingSquare.X()-1 < 0 ) {
            return;
        }
        if( this.grid[this.movingSquare.X()-1][this.movingSquare.Y()+1] !== undefined ) {
            return;
        }
        this.action = 'moveLeft';
    },
    moveSquareRight: function() {
        if( this.movingSquare.X()+1 >= this.width ) {
            return;
        }
        if( this.grid[this.movingSquare.X()+1][this.movingSquare.Y()+1] !== undefined ) {
            return;
        }
        this.action = 'moveRight';
    },
    getDirtyRows: function() {
        var res = [];
        for(i = 0; i<this.height; i++) {
            for(j = 0; j<this.width; j++) {
                if( typeof( this.grid[j][i] ) == 'undefined' ) {
                    continue;
                }
                if( this.grid[j][i].isDirty == 1 ) {
                    res.push( i );
                    break;
                }
            }
        }
        return res;
    },
    getDirtyCols: function() {
        var res = [];
        for(j = 0; j<this.width; j++) {
            for(i = 0; i<this.height; i++) {
                if( typeof( this.grid[j][i] ) == 'undefined' ) {
                    continue;
                }
                if( this.grid[j][i].isDirty == 1 ) {
                    res.push( j );
                    break;
                }
            }
        }
        return res;
    },
    clearDirty: function() {
        for(j = 0; j<this.width; j++) {
            for(i = 0; i<this.height; i++) {
                if( typeof( this.grid[j][i] ) == 'undefined' ) {
                    continue;
                }
                this.grid[j][i].isDirty = 0;
            }
        }
    },
    hasDirtySquares: function() {
        for(j = 0; j<this.width; j++) {
            for(i = 0; i<this.height; i++) {
                if( typeof( this.grid[j][i] ) == 'undefined' ) {
                    continue;
                }
                if( this.grid[j][i].isDirty == 1 ) {
                    return true;
                }
            }
        }
        return false;
    },
    dropFloaters: function() {
        // Good name huh?
        // Any squares that suddenly has space underneath them are dropped down
        for(i = this.height-2; i>=0; i--) { // -2, don't look at the line furtest down
            for(j = 0; j<this.width; j++) {
                if( typeof( this.grid[j][i] ) == 'undefined' ) {
                    continue;
                }
                var ii = i;
                for( k=i+1; k<this.height; k++ ) {
                    if( typeof( this.grid[j][k] ) == 'undefined' ) {
                        this.grid[j][k] = this.grid[j][ii];
                        this.grid[j][k].Y(k);
                        this.grid[j][k].isDirty = 1;
                        this.grid[j][ii] = undefined;
                        ii = k;
                    }
                }
            }
        }
    },
    isSquareEmpty: function(x,y) {
        if( typeof( this.grid[x] ) == 'undefined' ) {
            return true;
        }
        if( typeof( this.grid[x][y] ) == 'undefined' ) {
            return true;
        }
        return false;
    },
    getLetters: function(startX, startY, endX, endY) {
        var word = '';
        for(var x=startX; x<=endX; x++) {
            for(var y=startY; y<=endY; y++) {
                if( this.isSquareEmpty(x,y) ) {
                    return '';
                }
                word += this.grid[x][y].letter;
            }
        }
        return word;
    },
    markSquaresUsed: function(startX, startY, endX, endY) {
        for(var x=startX; x<=endX; x++) {
            for(var y=startY; y<=endY; y++) {
                this.grid[x][y].isUsed = 1;
            }
        }
    },
    removeUsed: function() {
        for(j = 0; j<this.width; j++) {
            for(i = 0; i<this.height; i++) {
                if( typeof( this.grid[j][i] ) == 'undefined' ) {
                    continue;
                }
                if( this.grid[j][i].isUsed == 1 ) {
                    $( this.grid[j][i].el ).remove();
                    this.grid[j][i] = undefined;
                }
            }
        }
    }
}
