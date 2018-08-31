const mongoose = require('mongoose');
const Entry = require('../models/Entry');

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/irondictionary', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let dictionary= [
    {
      originalWord : "hello",
      convertedWord : "namaskar"
    },
    {
    originalWord:"welcome",
    convertedWord : "swagatham"

  },

  {
    originalWord:"how are you",
    convertedWord : "hengidya"
  },

  {
    originalWord:"wonderful",
    convertedWord : "channagide"
  }
  ];

  Entry.deleteMany().then(x=> {
    Entry.create(dictionary)
      .then(dictionaryWord => {
        console.log(dictionaryWord,dictionaryWord.length, " entries were created");
      })
      .catch(err => console.log("entries could not be created"));
  });

