const prisma = require('../config/db.js');

// GET /authors - Get all authors
const getAuthors = async (req, res, next) => {
    try {
        const authors = await prisma.author.findMany();
        res.json(authors);
    } catch (error) {
        next(error);
    }
};

// GET /authors/:id - Get author by ID
const getAuthorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await prisma.author.findUnique({
            where: { id: parseInt(id) }
        });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        next(error);
    }
};

// POST /authors - Create a new author
const createAuthor = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Author name is required' });
        }
        const newAuthor = await prisma.author.create({
            data: { name }
        });
        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
};

// PUT /authors/:id - Update an author
const updateAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Author name is required' });
        }
        const updatedAuthor = await prisma.author.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        res.json(updatedAuthor);
    } catch (error) {
        // Check for Prisma's specific "record not found" error
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Author not found' });
        }
        next(error);
    }
};

// DELETE /authors/:id - Delete an author
const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.author.delete({
            where: { id: parseInt(id) }
        });
        res.sendStatus(204); // 204 No Content
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Author not found' });
        }
        next(error);
    }
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};