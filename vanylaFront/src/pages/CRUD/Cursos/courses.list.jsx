import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CoursesList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error al cargar los cursos');
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/courses/${id}`);
            setCourses(courses.filter(course => course._id !== id));
            toast.success('Course eliminado successfully!');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Error no se pudo eliminar el curso');
        }
    };

    const extractVideoID = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Cursos</h2>
            <div className="list-group">
                {courses.map(course => (
                    <div key={course._id} className="list-group-item">
                        <h5 className="mb-1">{course.title}</h5>
                        <p>{course.description}</p>
                        {course.videoUrl && (
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${extractVideoID(course.videoUrl)}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        )}
                        <Link to={`/courses/edit/${course._id}`} className="btn btn-primary">Editar</Link>
                        <button onClick={() => handleDelete(course._id)} className="btn btn-danger" style={{marginLeft: '10px'}}>Delete</button>
                    </div>
                ))}
            </div>
            <Link to="/courses/create" className="btn btn-primary mt-3">Nuevo Curso</Link>
        </div>
    );
};

export {CoursesList};