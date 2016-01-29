var natural = require('natural');
var tfidf = new natural.TfIdf;

tfidf.addDocument('this document is about texttechnology.');
tfidf.addDocument('this document is about javascript.');
tfidf.addDocument('this document is about javascript and texttechnology.');
tfidf.addDocument('this document is about texttechnology. it has examples for the course texttechnology');

// Auch measure mehrerer Terme möglich
console.log('\nWort \"texttechnology\"');
tfidf.tfidfs('texttechnology', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

console.log('\nWort \"javascript\"');
tfidf.tfidfs('javascript', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

// Einlesen von Dokumenten
tfidf.addFileSync('test_1.txt');
tfidf.addFileSync('test_2.txt');

console.log('\nWort \"javascript\"');
tfidf.tfidfs('texttechnology', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});