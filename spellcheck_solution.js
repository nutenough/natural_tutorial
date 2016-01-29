var natural = require('natural');
// Spellcheck muss extra eingebunden werden, ist wohl ein Fehler
var Spellcheck = require('natural/lib/natural/spellcheck/spellcheck');

// Unser Testkorpus
var corpus = ['hund', 'wund', 'bunt', 'hemd', 'schwund', 'hand', 'brot', 'rost', 'host'];
// Spellcheck initialisieren
var spellcheck = new Spellcheck(corpus);

// Festlegen eines Testwortes und anschließender Test
// Wenn das Wort falsch ist, werden Verbesserungsvorschläge gemacht
var testwort = 'bund';

if (spellcheck.isCorrect(testwort)) {
    console.log("\nDas Wort ist korrekt!");
} else {
    console.log("\nDas Wort ist nicht korrekt!");

    var korrektur1 = spellcheck.getCorrections(testwort, 1);
    var korrektur2 = spellcheck.getCorrections(testwort, 2);

    console.log("\nWortvorschläge mit Distanz 1");
    console.log(korrektur1);
    console.log("\nWortvorschläge mit Distanz 2");
    console.log(korrektur2);
}