const prisma = require('../config/db.js');

// GET all books for a specific author
const getBooksByAuthor = async (req, res, next) => {
    try {
        const { authorId } = req.params;
        const books = await prisma.book.findMany({
            where: { authorId: parseInt(authorId) }
        });
        res.json(books);
    } catch (error) {
        next(error);
    }
};

// POST a new book for a specific author
const createBookForAuthor = async (req, res, next) => {
    try {
        const { authorId } = req.params;
        const { title } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'Book title is required' });
        }

        const newBook = await prisma.book.create({
            data: {
                title: title,
                authorId: parseInt(authorId) // Link the book to the author
            }
        });
        res.status(201).json(newBook);
    } catch (error) {
        // Handle cases where the authorId doesn't exist
        if (error.code === 'P2003') {
            return res.status(404).json({ message: 'Author not found' });
        }
        next(error);
    }
};

module.exports = {
    getBooksByAuthor,
    createBookForAuthor
};