const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Entry = require('../models/Entry');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/dictionary', (req, res, next) => {
  Entry.find()
  .then(entries => {
    res.render('dictionary', {
      entries, 
      error: req.query.error
    });
  })
  .catch(err => next(err))
});

router.post('/entries', (req, res, next) => {
  let { originalWord, convertedWord } = req.body
  Entry.create({ originalWord, convertedWord })
  .then(entry => {
    res.redirect('/dictionary')
  })
  .catch(err => {
    res.redirect('/dictionary?error=original word and converted word need to be defined')
    // next(err)
  })
});

router.get('/entries/:id/delete', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.redirect('/dictionary')
    return;
  }
  
  Entry.findByIdAndRemove(req.params.id)
  .then(entry => {
    res.redirect('/dictionary')
  })
  .catch(err => next(err))
});

router.get('/converter', (req, res, next) => {
  let { originalText } = req.query
  if (!originalText)
    res.render('converter')
  else {
    Entry.find()
    .then(entries => {
      let convertedText = originalText

      for (let i = 0; i < entries.length; i++) {
        convertedText = convertedText.replace(
          new RegExp(entries[i].originalWord, "g"), 
          entries[i].convertedWord
        )
        console.log('DEBUG', i);
        console.log(entries[i].originalWord, entries[i].convertedWord);
        console.log(convertedText);
      }

      res.render('converter', {
        originalText,
        convertedText
      })
    })
  }
})

module.exports = router;