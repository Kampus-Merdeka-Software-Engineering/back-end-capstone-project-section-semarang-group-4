const express = require('express');
const app = express();
const port = 3000;
// Middleware to parse JSON requests
app.use(express.json());
// Sample catalog data (using static)
const products = require('./products.json');

// Routes for the RESTful API
// GET all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET a specific product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
})

// POST to create a new product 
app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        // Add more properties as needed
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT to update a product by ID
app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found'});
    }

    product.name = req.body.name;
    // Update other properties as needed
    res.json(product);
});

// DELETE a product by ID
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({message: 'Product not found'});
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
