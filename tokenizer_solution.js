// Import natural module
var natural = require('natural');

// Word Tokenizer
tokenizer = new natural.WordTokenizer();
console.log("\nWord Tokenizer:");
console.log(tokenizer.tokenize("I don't like cats."));

// Word Punct Tokenizer
tokenizer = new natural.WordPunctTokenizer();
console.log("\nWord Punct Tokenizer:");
console.log(tokenizer.tokenize("I don't like cats."));

// Treebank Word Tokenizer
tokenizer = new natural.TreebankWordTokenizer();
console.log("\nTreebank Word Tokenizer:");
console.log(tokenizer.tokenize("I don't like cats."));

// Regexp Tokenizer
tokenizer = new natural.RegexpTokenizer({pattern: /\-/});
console.log("\nRegexp Tokenizer:");
console.log(tokenizer.tokenize("user-generated"));