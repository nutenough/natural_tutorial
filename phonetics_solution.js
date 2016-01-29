// Import natural module
var natural = require('natural');

// Metaphone und SoundEx initialisieren
var metaphone = natural.Metaphone;
var soundEx = natural.SoundEx;

var wordA = 'Katharina';
var wordB = 'Catherine';

// SoundEx
console.log("\nSoundEx algorithm: ");

if(soundEx.compare(wordA, wordB)){
    console.log("They sound alike!");
} else {
    console.log("They don't sound alike.");
}

// Ausgabe der phoentischen Umwandlung
console.log(soundEx.process(wordA));
console.log(soundEx.process(wordB));

// Metaphone
console.log("\nMetaphone algorithm: ");

if(metaphone.compare(wordA, wordB)){
    console.log("They sound alike!");
} else {
    console.log("They don't sound alike.");
}

// Ausgabe der phoentischen Umwandlung
console.log(metaphone.process(wordA));
console.log(metaphone.process(wordB));