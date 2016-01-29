var natural = require('natural');
var tfidf = new natural.TfIdf;

tfidf.addDocument('this document is about texttechnology.');
tfidf.addDocument('this document is about javascript.');
tfidf.addDocument('this document is about javascript and texttechnology.');
tfidf.addDocument('this document is about texttechnology. it has examples for the course texttechnology');

console.log('\nWort \"texttechnology\"');
tfidf.tfidfs('texttechnology', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

console.log('\nWort \"javascript\"');
tfidf.tfidfs('javascript', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});