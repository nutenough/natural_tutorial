// Import natural module
var natural = require('natural');

// Word Tokenizer
tokenizer = new natural.WordTokenizer();
console.log("\nWord Tokenizer:");
console.log(tokenizer.tokenize("my dog hasn't any fleas."));

// Word Punct Tokenizer
tokenizer = new natural.WordPunctTokenizer();
console.log("\nWord Punct Tokenizer:");
console.log(tokenizer.tokenize("my dog hasn't any fleas."));

// Treebank Word Tokenizer
tokenizer = new natural.TreebankWordTokenizer();
console.log("\nTreebank Word Tokenizer:");
console.log(tokenizer.tokenize("my dog hasn't any fleas."));

// Regexp Tokenizer
tokenizer = new natural.RegexpTokenizer({pattern: /\-/});
console.log("\nRegexp Tokenizer:");
console.log(tokenizer.tokenize("user-generated"));