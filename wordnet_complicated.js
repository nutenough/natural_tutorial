var natural = require("natural"),
    fs = require("fs");

var enText = "no etymological principle was followed here: in some cases it was the original noun that was chosen for retention, in other cases the verb. Even where a noun and verb of kindred meaning were not etymologically connected, one or other of them was frequently supressed. There was, for example, no such word as cut, its meaning being sufficiently covered by the noun-verb knife. Ajectives were formed by adding the suffix -ful to the noun-verb, and adverbs by adding -wise. Thus, for example, 'speedful' meant 'rapid', and 'speedwise' meant quickly'.";

var wordnet = new natural.WordNet();

function stemIndexFile(file) {
    var indexFileLines = fs.readFileSync(file.filePath, "utf8").split(/\r?\n/);

    var resultFile = "";

    for(var i = 0; i < indexFileLines.length; ++i) {
        var tokens = indexFileLines[i].split(/\s+/);
        tokens[0] = natural.PorterStemmer.stem(tokens[0]);
        resultFile += tokens.join(" ") + "\n";
    }

    fs.writeFileSync(file.filePath + ".stem", resultFile);

    file.filePath = file.filePath + ".stem";
}

stemIndexFile(wordnet.nounIndex);
stemIndexFile(wordnet.verbIndex);
stemIndexFile(wordnet.adjIndex);

natural.PorterStemmer.attach();

var tokens = enText.tokenizeAndStem();
var tokensLookedUp = 0;

for(var i = 0; i < tokens.length; ++i) {
    (function(i) {
        var lemma = wordnet.lookup(tokens[i], function(result) {
            // console.log(result);
            tokensLookedUp += 1;
            if(result && result.status !== "miss" && result.length > 0) {
                tokens[i] = result[0].pos + "@" + result[0].lemma;

            }
            if(tokensLookedUp == tokens.length) {
                console.log(tokens.join(" "));
            }
        });
    })(i);
}

