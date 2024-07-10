import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CoursesComponent = () => {
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

    const extractVideoID = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    return (
        <div className="container mt-5">
            <h2>Nuestros Cursos</h2>
            <div className="row">
                {courses.map(course => (
                    <div key={course._id} className="col-md-4 mb-4">
                        <div className="card">
                            <iframe
                                className="card-img-top"
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${extractVideoID(course.videoUrl)}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export {CoursesComponent};