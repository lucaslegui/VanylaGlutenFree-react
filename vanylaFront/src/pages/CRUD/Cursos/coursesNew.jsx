import React, { useState } from 'react';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseCreate = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        duration: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/courses', courseData);
            toast.success('Course created successfully');
            navigate('/courses');
        } catch (error) {
            console.error('Error creating course:', error);
            toast.error('Error creating course');
        }
    };

    const extractVideoID = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    return (
        <div className="container mt-5">
            <h2>Create New Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name="title" value={courseData.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea className="form-control" id="description" name="description" value={courseData.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="videoUrl" className="form-label">Video URL:</label>
                    <input type="text" className="form-control" id="videoUrl" name="videoUrl" value={courseData.videoUrl} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (HHMMSS):</label>
                    <input type="text" className="form-control" id="duration" name="duration" value={courseData.duration} onChange={handleChange} />
                </div>
                {courseData.videoUrl && (
                    <div className="mb-3">
                        <label className="form-label">Video Preview:</label>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${extractVideoID(courseData.videoUrl)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Create Course</button>
            </form>
        </div>
    );
};

export {CourseCreate};