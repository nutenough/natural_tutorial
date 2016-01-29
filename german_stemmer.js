// based on http://snowball.tartarus.org/algorithms/german/stemmer.html

module.exports =
    (function () {
        "use strict";

        function SnowballStemmer() {
            this.setInitState();
        }
// based on http://snowball.tartarus.org/algorithms/german/stemmer.html

module.exports =
(function () {
    "use strict";

    function SnowballStemmer() {
        this.setInitState();
    }

    SnowballStemmer.VOWELS = ['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'ü'];

    SnowballStemmer.STOPWORDS = ["aber","als","am","an","auch","auf","aus","bei","bin","bis","bist","da","dadurch","daher","darum","das","daß","dass","dein","deine","dem","den","der","des","dessen","deshalb","die","dies","dieser","dieses","doch","dort","du","durch","ein","eine","einem","einen","einer","eines","er","es","euer","eure","für","hatte","hatten","hattest","hattet","hier","hinter","ich","ihr","ihre","im","in","ist","ja","jede","jedem","jeden","jeder","jedes","jener","jenes","jetzt","kann","kannst","können","könnt","machen","mein","meine","mit","muß","mußt","musst","müssen","müßt","nach","nachdem","nein"/*,"nicht"*/,"nun","oder","seid","sein","seine","sich","sie","sind","soll","sollen","sollst","sollt","sonst","soweit","sowie","und","unser","unsere","unter","vom","von","vor","wann","warum","was","weiter","weitere","wenn","wer","werde","werden","werdet","weshalb","wie","wieder","wieso","wir","wird","wirst","wo","woher","wohin","zu","zum","zur","über"];


    SnowballStemmer.isVowel = function (chr) {
        return (SnowballStemmer.VOWELS.indexOf(chr) >= 0);
    };

    SnowballStemmer.prototype.setInitState = function () {
        this.R1 = -1;
        this.R2 = -1;
        this.word_buffer = [];
    };

    SnowballStemmer.prototype.defineR = function (start) {
        var len = this.size();
        if (start === 0) {
            start = 1;
        }

        if (start < len && start > 0) {
            for (var i = start; i < len; i += 1) {
                if (!SnowballStemmer.isVowel(this.charAt(i))
                   && SnowballStemmer.isVowel(this.charAt(i-1)))
                    {
                        return ((i-start) + start  + 1);
                    }
            }
        }
        return -1;
    };

    SnowballStemmer.prototype.setWord = function (word) {
        //replace ß by ss
        this.word_buffer = word.toLocaleLowerCase().replace("ß", "ss").split("");
    };

    SnowballStemmer.prototype.cutEnd = function (count) {
        return this.word_buffer.splice(this.size() - count, count).join("");
    };

    SnowballStemmer.prototype.append = function (str) {
        Array.prototype.push.apply(this.word_buffer, str.split(""));
    };

    SnowballStemmer.prototype.cutEndIfR1 = function (count) {
        if (this.size() - this.R1 >= count) {
            return this.cutEnd(count);
        }
        return false;
    };

    SnowballStemmer.prototype.cutEndIfR2 = function (count) {
        if (this.size() - this.R2 >= count) {
            return this.cutEnd(count);
        }
        return false;
    };

    SnowballStemmer.prototype.endsWith = function (end) {
        var len = this.word_buffer.length;
        return (len >= end.length
                && this.word_buffer.slice(len - end.length, len).join("") === end);
    };

    SnowballStemmer.prototype.endsWithOneOf = function () {
        for(var i = 0; i < arguments.length; ++i) {
            if (this.endsWith(arguments[i])) {
                return true;
            }
        }
        return false;
    };

    SnowballStemmer.prototype.charAt = function (i) {
        if (i < 0) {
            return this.word_buffer[this.size() + i];
        } else {
            return this.word_buffer[i];
        }
    };

    SnowballStemmer.prototype.setCharAt = function (i, chr) {
        this.word_buffer[i] = chr.charAt(0);
    };

    SnowballStemmer.prototype.size = function () {
        return this.word_buffer.length;
    };

    SnowballStemmer.prototype.preprocess = function () {
        //put u and y between voels into upper case
        for(var i = 1; i < this.size(); ++i) {
            var c = this.charAt(i);
            if (c == 'u') {
                if (SnowballStemmer.isVowel(this.charAt(i-1))
                  && SnowballStemmer.isVowel(this.charAt(i+1)))
                {
                    this.setCharAt(i, 'U');
                }
            } else if (c == 'y') {
                if (SnowballStemmer.isVowel(this.charAt(i-1))
                  && SnowballStemmer.isVowel(this.charAt(i+1)))
                {
                    this.setCharAt(i, 'Y');
                }
            }
        }

        /*
         * R1 and R2 are first set up in the standard way,
         * but then R1 is adjusted
         * so that the region before it contains at least 3 letters
         */
        this.R1 = this.defineR(0);
        this.R2 = this.defineR(this.R1);
        if (this.R1 < 3 && this.R1 > -1) {
            this.R1 = 3;
        }
    };

    /*
     * Search for the longest among the following suffixes,
     *		(a) e   em   en   ern   er   es
     *		(b) s (preceded by a valid s-ending)
     * and delete if in R1.
     * (Of course the letter of the valid s-ending is not necessarily in R1)
     *
     * (For example, äckern -> äck, ackers -> acker, armes -> arm)
     */
    SnowballStemmer.prototype.step1 = function () {
        if (this.R1 < 0) {
            return;
        }

        // e em en ern er es
        if (this.endsWith("ern")) {
            this.cutEndIfR1(3);
        } else if (this.endsWithOneOf("em", "en", "er", "es")) {
            this.cutEndIfR1(2);
        } else if (this.endsWith("e")) {
            this.cutEndIfR1(1);
        }
        //b, d, f, g, h, k, l, m, n, r or t
        else if (this.endsWithOneOf("bs", "ds", "fs", "gs", "hs", "ks", "ls", "ms", "ns", "rs", "ts")) {
            this.cutEndIfR1(1);
        }
    };

    /*
     * Search for the longest among the following suffixes,
     *		(a) en   er   est
     *		(b) st (preceded by a valid st-ending, itself preceded by at least 3 letters)
     * and delete if in R1.
     *
     * (For example, derbsten -> derbst by step 1, and derbst -> derb by step 2, since b is a valid st-ending, and is preceded by just 3 letters)
     */

    SnowballStemmer.prototype.step2 = function () {
        if (this.R1 < 0) {
            return;
        }

        if (this.endsWith("est")) {
            this.cutEndIfR1(3);
        } else if (this.endsWithOneOf("en", "er")) {
            this.cutEndIfR1(2);
        }
        // b, d, f, g, h, k, l, m, n or t
        else if (this.endsWithOneOf("bst", "dst", "fst", "gst", "hst", "kst", "lst", "mst", "nst", "tst")) {
            if (this.size() > 5) {
                this.cutEndIfR1(2);
            }
        }
    };

    SnowballStemmer.prototype.step3 = function () {
        if (this.R1 < 0 || this.R2 < 0) {
            return;
        }

        /*
         * Search for the longest among the following suffixes,
         * and perform the action indicated.
         *		end   ung
         * delete if in R2
         * if preceded by ig, delete if in R2 and not preceded by e
         */

        if (this.endsWithOneOf("end", "ung")) {
            this.cutEndIfR2(3);
            if (this.endsWith("ig") && this.charAt(-3) != 'e') {
                this.cutEndIfR2(2);
            }
        }
        // ig ik isch
        else if (this.endsWithOneOf("ig", "ik") && this.charAt(-3) != 'e') {
            this.cutEndIfR2(2);
        }
        else if (this.endsWith("isch") && this.charAt(-5) != 'e') {
            this.cutEndIfR2(4);
        }
        /*
         * lich   heit
         * delete if in R2
         * if preceded by er or en, delete if in R1
         */
        else if (this.endsWithOneOf("lich", "heit")) {
            var suffix = this.cutEnd(4);
            //if preceded by er or en, delete if in R1
            if (this.endsWithOneOf("en", "er")) {
                if (this.cutEndIfR1(2) === false) {
                    this.append(suffix);
                }
            } else {
                this.append(suffix);
                this.cutEndIfR2(4);
            }
        }
        /*
         * keit
         * delete if in R2
         * if preceded by lich or ig, delete if in R2
         */
        else if (this.endsWith("keit")) {
            this.cutEndIfR2(4);
            if (this.endsWith("ig")) {
                this.cutEndIfR2(2);
            } else if (this.endsWith("lich")) {
                this.cutEndIfR2(4);
            }
        }
    };

    // Turn U and Y back into lower case,
    // and remove the umlaut accent from a, o and u.
    SnowballStemmer.prototype.finally = function () {
        var result = "";
        for(var i = 0; i < this.size(); ++i) {
            var c = this.charAt(i);
            if (c === 'ä') {
                result += 'a';
            } else if (c === 'U') {
                result += 'u';
            } else if (c === 'ü') {
                result += 'u';
            } else if (c === 'Y') {
                result += 'y';
            } else if (c === 'ö') {
                result += 'o';
            } else {
                result += c;
            }
        }
        return result;
    };

    SnowballStemmer.prototype.stem = function () {
        if (arguments.length > 0) {
            this.setInitState();
            this.setWord(arguments[0]);
        }

        this.preprocess();
        this.step1();
        this.step2();
        this.step3();
        return this.finally();
    };

    SnowballStemmer.stem = function (word) {
        var stemmer = new SnowballStemmer();
        return stemmer.stem(word);
    };

    SnowballStemmer.attach = function () {
        String.prototype.stem = function () {
            return SnowballStemmer.stem(this);
        };
        String.prototype.tokenizeAndStem = function () {
            var natural = require("natural");

            var tokenizer = new natural.RegexpTokenizer({pattern: /[^a-zA-UäöüÄÖÜß]+/}),
                stemmer = new SnowballStemmer();

            var tokens = tokenizer.tokenize(this);
            var result = [];

            for(var i = 0; i < tokens.length; ++i) {
                if (SnowballStemmer.STOPWORDS.indexOf(tokens[i]) < 0) {
                    result.push(stemmer.stem(tokens[i]));
                }
            }

            return result;
        };
    };

    return {
        stem: SnowballStemmer.stem,
        attach: SnowballStemmer.attach
    };
})();

        SnowballStemmer.VOWELS = ['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'ü'];

        SnowballStemmer.STOPWORDS = ["aber","als","am","an","auch","auf","aus","bei","bin","bis","bist","da","dadurch","daher","darum","das","daß","dass","dein","deine","dem","den","der","des","dessen","deshalb","die","dies","dieser","dieses","doch","dort","du","durch","ein","eine","einem","einen","einer","eines","er","es","euer","eure","für","hatte","hatten","hattest","hattet","hier","hinter","ich","ihr","ihre","im","in","ist","ja","jede","jedem","jeden","jeder","jedes","jener","jenes","jetzt","kann","kannst","können","könnt","machen","mein","meine","mit","muß","mußt","musst","müssen","müßt","nach","nachdem","nein"/*,"nicht"*/,"nun","oder","seid","sein","seine","sich","sie","sind","soll","sollen","sollst","sollt","sonst","soweit","sowie","und","unser","unsere","unter","vom","von","vor","wann","warum","was","weiter","weitere","wenn","wer","werde","werden","werdet","weshalb","wie","wieder","wieso","wir","wird","wirst","wo","woher","wohin","zu","zum","zur","über"];


        SnowballStemmer.isVowel = function (chr) {
            return (SnowballStemmer.VOWELS.indexOf(chr) >= 0);
        };

        SnowballStemmer.prototype.setInitState = function () {
            this.R1 = -1;
            this.R2 = -1;
            this.word_buffer = [];
        };

        SnowballStemmer.prototype.defineR = function (start) {
            var len = this.size();
            if (start === 0) {
                start = 1;
            }

            if (start < len && start > 0) {
                for (var i = start; i < len; i += 1) {
                    if (!SnowballStemmer.isVowel(this.charAt(i))
                        && SnowballStemmer.isVowel(this.charAt(i-1)))
                    {
                        return ((i-start) + start  + 1);
                    }
                }
            }
            return -1;
        };

        SnowballStemmer.prototype.setWord = function (word) {
            //replace ß by ss
            this.word_buffer = word.toLocaleLowerCase().replace("ß", "ss").split("");
        };

        SnowballStemmer.prototype.cutEnd = function (count) {
            return this.word_buffer.splice(this.size() - count, count).join("");
        };

        SnowballStemmer.prototype.append = function (str) {
            Array.prototype.push.apply(this.word_buffer, str.split(""));
        };

        SnowballStemmer.prototype.cutEndIfR1 = function (count) {
            if (this.size() - this.R1 >= count) {
                return this.cutEnd(count);
            }
            return false;
        };

        SnowballStemmer.prototype.cutEndIfR2 = function (count) {
            if (this.size() - this.R2 >= count) {
                return this.cutEnd(count);
            }
            return false;
        };

        SnowballStemmer.prototype.endsWith = function (end) {
            var len = this.word_buffer.length;
            return (len >= end.length
            && this.word_buffer.slice(len - end.length, len).join("") === end);
        };

        SnowballStemmer.prototype.endsWithOneOf = function () {
            for(var i = 0; i < arguments.length; ++i) {
                if (this.endsWith(arguments[i])) {
                    return true;
                }
            }
            return false;
        };

        SnowballStemmer.prototype.charAt = function (i) {
            if (i < 0) {
                return this.word_buffer[this.size() + i];
            } else {
                return this.word_buffer[i];
            }
        };

        SnowballStemmer.prototype.setCharAt = function (i, chr) {
            this.word_buffer[i] = chr.charAt(0);
        };

        SnowballStemmer.prototype.size = function () {
            return this.word_buffer.length;
        };

        SnowballStemmer.prototype.preprocess = function () {
            //put u and y between voels into upper case
            for(var i = 1; i < this.size(); ++i) {
                var c = this.charAt(i);
                if (c == 'u') {
                    if (SnowballStemmer.isVowel(this.charAt(i-1))
                        && SnowballStemmer.isVowel(this.charAt(i+1)))
                    {
                        this.setCharAt(i, 'U');
                    }
                } else if (c == 'y') {
                    if (SnowballStemmer.isVowel(this.charAt(i-1))
                        && SnowballStemmer.isVowel(this.charAt(i+1)))
                    {
                        this.setCharAt(i, 'Y');
                    }
                }
            }

            /*
             * R1 and R2 are first set up in the standard way,
             * but then R1 is adjusted
             * so that the region before it contains at least 3 letters
             */
            this.R1 = this.defineR(0);
            this.R2 = this.defineR(this.R1);
            if (this.R1 < 3 && this.R1 > -1) {
                this.R1 = 3;
            }
        };

        /*
         * Search for the longest among the following suffixes,
         *		(a) e   em   en   ern   er   es
         *		(b) s (preceded by a valid s-ending)
         * and delete if in R1.
         * (Of course the letter of the valid s-ending is not necessarily in R1)
         *
         * (For example, äckern -> äck, ackers -> acker, armes -> arm)
         */
        SnowballStemmer.prototype.step1 = function () {
            if (this.R1 < 0) {
                return;
            }

            // e em en ern er es
            if (this.endsWith("ern")) {
                this.cutEndIfR1(3);
            } else if (this.endsWithOneOf("em", "en", "er", "es")) {
                this.cutEndIfR1(2);
            } else if (this.endsWith("e")) {
                this.cutEndIfR1(1);
            }
            //b, d, f, g, h, k, l, m, n, r or t
            else if (this.endsWithOneOf("bs", "ds", "fs", "gs", "hs", "ks", "ls", "ms", "ns", "rs", "ts")) {
                this.cutEndIfR1(1);
            }
        };

        /*
         * Search for the longest among the following suffixes,
         *		(a) en   er   est
         *		(b) st (preceded by a valid st-ending, itself preceded by at least 3 letters)
         * and delete if in R1.
         *
         * (For example, derbsten -> derbst by step 1, and derbst -> derb by step 2, since b is a valid st-ending, and is preceded by just 3 letters)
         */

        SnowballStemmer.prototype.step2 = function () {
            if (this.R1 < 0) {
                return;
            }

            if (this.endsWith("est")) {
                this.cutEndIfR1(3);
            } else if (this.endsWithOneOf("en", "er")) {
                this.cutEndIfR1(2);
            }
            // b, d, f, g, h, k, l, m, n or t
            else if (this.endsWithOneOf("bst", "dst", "fst", "gst", "hst", "kst", "lst", "mst", "nst", "tst")) {
                if (this.size() > 5) {
                    this.cutEndIfR1(2);
                }
            }
        };

        SnowballStemmer.prototype.step3 = function () {
            if (this.R1 < 0 || this.R2 < 0) {
                return;
            }

            /*
             * Search for the longest among the following suffixes,
             * and perform the action indicated.
             *		end   ung
             * delete if in R2
             * if preceded by ig, delete if in R2 and not preceded by e
             */

            if (this.endsWithOneOf("end", "ung")) {
                this.cutEndIfR2(3);
                if (this.endsWith("ig") && this.charAt(-3) != 'e') {
                    this.cutEndIfR2(2);
                }
            }
            // ig ik isch
            else if (this.endsWithOneOf("ig", "ik") && this.charAt(-3) != 'e') {
                this.cutEndIfR2(2);
            }
            else if (this.endsWith("isch") && this.charAt(-5) != 'e') {
                this.cutEndIfR2(4);
            }
            /*
             * lich   heit
             * delete if in R2
             * if preceded by er or en, delete if in R1
             */
            else if (this.endsWithOneOf("lich", "heit")) {
                var suffix = this.cutEnd(4);
                //if preceded by er or en, delete if in R1
                if (this.endsWithOneOf("en", "er")) {
                    if (this.cutEndIfR1(2) === false) {
                        this.append(suffix);
                    }
                } else {
                    this.append(suffix);
                    this.cutEndIfR2(4);
                }
            }
            /*
             * keit
             * delete if in R2
             * if preceded by lich or ig, delete if in R2
             */
            else if (this.endsWith("keit")) {
                this.cutEndIfR2(4);
                if (this.endsWith("ig")) {
                    this.cutEndIfR2(2);
                } else if (this.endsWith("lich")) {
                    this.cutEndIfR2(4);
                }
            }
        };

        // Turn U and Y back into lower case,
        // and remove the umlaut accent from a, o and u.
        SnowballStemmer.prototype.finally = function () {
            var result = "";
            for(var i = 0; i < this.size(); ++i) {
                var c = this.charAt(i);
                if (c === 'ä') {
                    result += 'a';
                } else if (c === 'U') {
                    result += 'u';
                } else if (c === 'ü') {
                    result += 'u';
                } else if (c === 'Y') {
                    result += 'y';
                } else if (c === 'ö') {
                    result += 'o';
                } else {
                    result += c;
                }
            }
            return result;
        };

        SnowballStemmer.prototype.stem = function () {
            if (arguments.length > 0) {
                this.setInitState();
                this.setWord(arguments[0]);
            }

            this.preprocess();
            this.step1();
            this.step2();
            this.step3();
            return this.finally();
        };

        SnowballStemmer.stem = function (word) {
            var stemmer = new SnowballStemmer();
            return stemmer.stem(word);
        };

        SnowballStemmer.attach = function () {
            String.prototype.stem = function () {
                return SnowballStemmer.stem(this);
            };
            String.prototype.tokenizeAndStem = function () {
                var natural = require("natural");

                var tokenizer = new natural.RegexpTokenizer({pattern: /[^a-zA-UäöüÄÖÜß]+/}),
                    stemmer = new SnowballStemmer();

                var tokens = tokenizer.tokenize(this);
                var result = [];

                for(var i = 0; i < tokens.length; ++i) {
                    if (SnowballStemmer.STOPWORDS.indexOf(tokens[i]) < 0) {
                        result.push(stemmer.stem(tokens[i]));
                    }
                }

                return result;
            };
        };

        return {
            stem: SnowballStemmer.stem,
            attach: SnowballStemmer.attach
        };
    })();
