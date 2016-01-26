// Import natural module
var natural = require('natural');

// Porter Stemmer
console.log("\nPorter Stemmer:");
console.log(natural.PorterStemmer.stem("evening")); // stems a single word
console.log(natural.PorterStemmer.tokenizeAndStem("I need coffee in the morning to wake up.")); // tokenizes the string and stems it

// Lancaster Stemmer
console.log("\nLancaster Stemmer:");
console.log(natural.LancasterStemmer.stem("evening")); // stems a single word
console.log(natural.LancasterStemmer.tokenizeAndStem("I need coffee in the morning to wake up.")); // tokenizes the string and stems it
