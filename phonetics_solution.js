// Import natural module
var natural = require('natural');

// Metaphone
var metaphone = natural.Metaphone;
var soundEx = natural.SoundEx;

var wordA = 'phonetics';
var wordB = 'fonetix';


console.log("\nMetaphone algorithm: ");

if(metaphone.compare(wordA, wordB)){
    console.log("They sound alike!");
} else {
    console.log("They don't sound alike.");
}

console.log(metaphone.process(wordA));
console.log(metaphone.process(wordB));

//SoundEx
console.log("\nSoundEx algorithm: ");

if(soundEx.compare(wordA, wordB)){
    console.log("They sound alike!");
} else {
    console.log("They don't sound alike.");
}

console.log(soundEx.process(wordA));
console.log(soundEx.process(wordB));