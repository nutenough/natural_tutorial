// Import natural module
var natural = require('natural');

// Jaro Winkler string distance measuring algorithm
console.log("\nJaro Winkler Algorithmus:");
console.log(natural.JaroWinklerDistance("Kaffee","Cafe"));
console.log(natural.JaroWinklerDistance('ja', 'nein'));

// Levenshtein
console.log("\nLevenshtein Algorithmus:");
console.log(natural.LevenshteinDistance("intention","execution"));
console.log(natural.LevenshteinDistance('Texttechnologie', 'Texttechnologie'));

// Dice's Koeffizient
console.log("\nDice's Koeffizient:");
console.log(natural.DiceCoefficient('Kaffee', 'Cafe'));
console.log(natural.DiceCoefficient('Texttechnologie', 'Texttechnologie'));