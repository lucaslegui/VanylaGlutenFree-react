import Recipe from '../models/Recipe.js';

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ msg: 'Receta no encontrada' });
        }

        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }

};

export const createRecipe = async (req, res) => {
    const { title, ingredients, steps, image } = req.body;

    try {
        const newRecipe = new Recipe({
            title,
            ingredients,
            steps,
            image,
        });

        if(req.file){
            const { filename } = req.file;
            newRecipe.setImgUrl(filename);
        }

        const recipe = await newRecipe.save();
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const updateRecipe = async (req, res) => {
    const { title, ingredients, steps, image } = req.body;

    try {
        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ msg: 'Receta no encontrada' });
        }

        recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $set: { title, ingredients, steps, image } },
            { new: true }
        );

        if (req.file) {
            const { filename } = req.file;
            recipe.setImgUrl(filename);
        }

        await recipe.save();

        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ msg: 'Receta no encontrada' });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Receta eliminada' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
