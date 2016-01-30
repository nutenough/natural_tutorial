var natural = require("natural");


var enText = "No etymological principle was followed here: " +
    "in some cases it was the original noun that was chosen for retention, " +
    "in other cases the verb. Even where a noun and verb of kindred meaning " +
    "were not etymologically connected, one or other of them was frequently supressed. " +
    "There was, for example, no such word as cut, its meaning being sufficiently covered by the noun-verb knife. " +
    "Ajectives were formed by adding the suffix -ful to the noun-verb, " +
    "and adverbs by adding -wise. Thus, for example, 'speedful' meant 'rapid', and 'speedwise' meant quickly'.";

natural.PorterStemmer.attach();

console.log(enText.tokenizeAndStem().join(" "));


console.log("-----------------------------------------------");

natural.LancasterStemmer.attach();

console.log(enText.tokenizeAndStem().join(" "));

var GermanStemmer = require("./german_stemmer");
GermanStemmer.attach();

console.log("-----------------------------------------------");

text = "Verbände mich nicht eine unverbrüchliche Zusage, dir auch nicht das Geringste zu verhehlen, was ich von den Schicksalen deines Bruders auffangen kann, liebster Freund, nimmermehr würde meine unschuldige Feder an dir zur Tyrannin geworden sein. Ich kann aus hundert Briefen von dir abnehmen, wie Nachrichten dieser Art dein brüderliches Herz durchbohren müssen; mir ist's, als säh' ich dich schon um den Nichtswürdigen, den Abscheulichen";

console.log(text.tokenizeAndStem().join(" "));
