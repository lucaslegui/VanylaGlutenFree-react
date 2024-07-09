import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({msg: 'Producto no encontrado'});
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};


export const createProduct = async (req, res) => {
    const {name, description, category, price, image, availability} = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            image,
            availability,
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const updateProduct = async (req, res) => {
    const {name, description, category, price, image, availability} = req.body;

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({msg: 'Producto no encontrado'});
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            {$set: {name, description, category, price, image, availability}},
            {new: true}
        );

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({msg: 'Producto no encontrado'});
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({msg: 'Producto eliminado'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
