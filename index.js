const express = require('express');
const authorRoutes = require('./routes/authorRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const errorHandler = require('./middleware/errorHandler.js');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/authors', authorRoutes);
app.use('/authors/:authorId/books', bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});