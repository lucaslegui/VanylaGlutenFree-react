import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        duration: ''
    });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/courses/${id}`);
                setCourseData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                toast.error('Error fetching course');
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/courses/${id}`, courseData);
            toast.success('Course updated successfully');
            navigate('/courses');
        } catch (error) {
            console.error('Error updating course:', error);
            toast.error('Error updating course');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={courseData.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={courseData.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="videoUrl" className="form-label">Video URL</label>
                    <input type="text" className="form-control" id="videoUrl" name="videoUrl" value={courseData.videoUrl} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input type="text" className="form-control" id="duration" name="duration" value={courseData.duration} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export { EditCourse };