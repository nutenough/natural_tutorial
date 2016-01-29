var natural = require('natural');
classifier = new natural.BayesClassifier();

// Dokumente hinzufügen
classifier.addDocument('ich habe einen großen hund', 'hund');
classifier.addDocument('ich habe eine katze', 'katze');
classifier.addDocument('bello bringt gerne stöckchen', 'hund');
classifier.addDocument('die katze schnurrt', 'katze');
classifier.addDocument('bellen bellt gebellt', 'hund');
classifier.addDocument('schnurren schnurrt', 'katze');

// Classifier trainieren, damit er die Dokumente auch verarbeitet
classifier.train();

// Test des Classifiers
var testsatz = 'fridolin liegt auf meinem schoß und schnurrt vor sich hin';
console.log("\nDie Kategorie für den Testsatz '" + testsatz + "' ist: " + classifier.classify(testsatz));