import React, {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from '../../api/axios';
import {AuthContext} from '../../context/AuthContext';
import {toast} from 'react-toastify';

const EditUser = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [user, setUser] = useState({name: '', email: '', role: ''});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`/users/${id}`, {headers: {'token': auth}})
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, auth]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`/users/${id}`, user, {headers: {'token': auth}})
            .then(() => {
                toast.success('User updated successfully');
                navigate('/users');
            })
            .catch(err => {
                console.error(err);
                toast.error(`Error al actualizar el usuario: ${err.response ? err.response.data : 'Server error'}`);
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <h2>Edit User</h2>
            {loading ? <p>Loading...</p> : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={user.name}
                               onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={user.email}
                               onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-select" id="role" name="role" value={user.role} onChange={handleChange}
                                required>
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            )}
        </div>
    );
}

export {EditUser};