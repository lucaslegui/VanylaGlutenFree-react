import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }

};

export const createCourse = async (req, res) => {
    const { title, description, videoUrl, duration } = req.body;

    try {
        const newCourse = new Course({
            title,
            description,
            videoUrl,
            duration,
        });

        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const updateCourse = async (req, res) => {
    const { title, description, videoUrl, duration } = req.body;

    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }

        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, videoUrl, duration } },
            { new: true }
        );

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

export const deleteCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }

        await Course.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Curso eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};