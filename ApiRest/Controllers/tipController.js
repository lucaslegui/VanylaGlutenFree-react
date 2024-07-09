import Tip from '../models/Tip.js';

export const getTips = async (req, res) => {
    try {
        const tips = await Tip.find();
        res.json(tips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const createTip = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newTip = new Tip({
            title,
            content,
        });

        const tip = await newTip.save();
        res.json(tip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const updateTip = async (req, res) => {
    const { title, content } = req.body;

    try {
        let tip = await Tip.findById(req.params.id);

        if (!tip) {
            return res.status(404).json({ msg: 'Consejo no encontrado' });
        }

        tip = await Tip.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content } },
            { new: true }
        );

        res.json(tip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const deleteTip = async (req, res) => {
    try {
        let tip = await Tip.findById(req.params.id);

        if (!tip) {
            return res.status(404).json({ msg: 'Consejo no encontrado' });
        }

        await Tip.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Consejo eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};