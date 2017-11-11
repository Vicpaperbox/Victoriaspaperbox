
function Language() {
};

Language.prototype = {
    getLetter: function() {
        return "A";
    },
    words: function() {
        return [
            "aaa",
            "aaaa"
        ];
    },
    getScore: function(letter) {
        return 1;
    }
}
