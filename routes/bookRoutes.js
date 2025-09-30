const express = require('express');
// { mergeParams: true } is crucial for accessing params from the parent router
const router = express.Router({ mergeParams: true }); 
const { getBooksByAuthor, createBookForAuthor } = require('../controllers/bookController.js');

router.get('/', getBooksByAuthor);
router.post('/', createBookForAuthor);

module.exports = router;