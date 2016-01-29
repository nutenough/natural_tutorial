var natural = require("natural");

var text = "The quick brown fox won't jump today :(";

// ["The","quick","brown","fox","won","t","jump","today"]
var tokenizer = new natural.WordTokenizer();
console.log(JSON.stringify( tokenizer.tokenize(text) ));

//["The","quick","brown","fox","won","'","t","jump","today"," :("]
tokenizer = new natural.WordPunctTokenizer();
console.log(JSON.stringify( tokenizer.tokenize(text) ));

//["The","quick","brown","fox","wo","n't","jump","today",":","("]
tokenizer = new natural.TreebankWordTokenizer();
console.log(JSON.stringify( tokenizer.tokenize(text) ));

//["The","quick","brown","fox","won't","jump","today"]
tokenizer = new natural.RegexpTokenizer({pattern: /[^a-zA-Z']+/});
console.log(JSON.stringify( tokenizer.tokenize(text) ));

//["Im","übrigen","bin","ich","der","Meinung","daß","Karthago","zerstört","werden","muss"]
text = "Im übrigen bin ich der Meinung, daß Karthago zerstört werden muss.";
tokenizer = new natural.RegexpTokenizer({pattern: /[^a-zA-UäöüÄÖÜß]+/});
console.log(JSON.stringify( tokenizer.tokenize(text) ));
