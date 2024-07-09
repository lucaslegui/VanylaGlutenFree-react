import User from '../Models/User.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server error');
    }
};


export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({msg: 'Usuario eliminado'});
    } catch (err) {
        res.status(500).send('Server error');
    }
};

export const updateUser = async (req, res) => {
    const {name, email, role} = req.body;

    try {
        await User.findByIdAndUpdate(req.params.id, {name, email, role});
        res.json({msg: 'Usuario actualizado'});
    } catch (err) {
        res.status(500).send('Server error');
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
}
