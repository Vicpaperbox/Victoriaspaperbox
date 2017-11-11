
function Wordstore(langFile) {
    this.isReady = 0;
    this.langFile = langFile;
    this.tree = {};
    
    var script = document.createElement('script');
    script.src = langFile;
    var self = this;
    script.onload = function(){ self.processLang() };
    script.onerror = function(){ self.failLang() };
    document.head.appendChild(script);
};

Wordstore.prototype = {
    processLang: function() {
        this.lang = new Language();
        var words = this.lang.words();
        for(var i in words) {
            var treePtr = this.tree;
            var word = words[i];
            var chars = word.split('');
            for(var j in chars) {
                var c = chars[j];
                if( typeof(treePtr[c]) == 'undefined' ) {
                    treePtr[c] = {};
                }
                treePtr = treePtr[c];
            }
            treePtr._ = 1; // end of word
        }
        this.isReady = 1;
    },
    failLang: function() {
        alert("ERROR - Could not load language");
    },
    getLetter: function() {
        return this.lang.getLetter();
    },
    isValidWord: function(word) {
        var chars = word.toLowerCase().split('');
        var treePtr = this.tree;
        for(var i in chars) {
            var c = chars[i];
            if( typeof(treePtr[c]) == 'undefined' ) {
                return false;
            }
            treePtr = treePtr[c];
        }
        if( typeof(treePtr._) == 'undefined' ) {
            return false;
        }
        return true;
    },
    getScore: function(word) {
        var score = 0;
        var chars = word.toUpperCase().split('');
        for(var i in chars) {
            var c = chars[i];
            score += this.lang.getScore(c);
        }
        return score;
    }
};
