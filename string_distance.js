// Import natural module
var natural = require('natural');

// Jaro Winkler string distance measuring algorithm
console.log("\nJaro Winkler Algorithmus:");
console.log(natural.JaroWinklerDistance("dixon","dicksonx"));
console.log(natural.JaroWinklerDistance('not', 'same'));