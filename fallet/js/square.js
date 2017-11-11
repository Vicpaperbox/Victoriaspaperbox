function Square(letter) {
    this.letter = letter;
    this.isDirty = 0;
    this.isUsed = 0;
    this.el = $('<div class="square"></div>');
    this.el.append(this.letter);
};

Square.prototype = {
    X: function(x) {
        if( x !== undefined ) {
            this.x = x;
            $(this.el).css("left", x * $(this.el).width() );
        }
        return this.x;
    },
    Y: function(y) {
        if( y !== undefined ) {
            this.y = y;
            $(this.el).css("top", y * $(this.el).height() );
        }
        return this.y;
    },
    moveDown: function() {
        this.Y( this.y + 1 );
    },
    moveRight: function() {
        this.X( this.x + 1 );
    },
    moveLeft: function() {
        this.X( this.x - 1 );
    },
    render: function(x, y) {
        this.x = this.X(x);
        this.y = this.Y(y);
    }
};
