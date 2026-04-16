import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: '', email: '', oldPassword: '', newPassword: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch existing profile details
        const fetchProfile = async () => {
            try {
                const response = await api.get('/student/profile');
                setProfile({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    oldPassword: '',
                    newPassword: ''
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
                // If profile fetch fails, try to get data from localStorage or show empty form
                const storedName = localStorage.getItem('studentName') || '';
                const storedEmail = localStorage.getItem('studentEmail') || '';
                setProfile({
                    name: storedName,
                    email: storedEmail,
                    oldPassword: '',
                    newPassword: ''
                });
                setMessage('Note: Profile data could not be loaded from server. Please fill in your details.');
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare data to send, only include fields that have values
            const dataToSend = {
                name: profile.name,
                email: profile.email
            };

            // Only include password fields if user wants to change password
            if (profile.newPassword && profile.newPassword.trim()) {
                dataToSend.oldPassword = profile.oldPassword;
                dataToSend.newPassword = profile.newPassword;
            }

            await api.put('/student/profile', dataToSend);
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile. Please check your inputs.');
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <div className="profile-header">
                    <h2>Student Profile</h2>
                    <p>Update your personal information and password</p>
                </div>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="oldPassword">Current Password</label>
                        <input type="password" id="oldPassword" name="oldPassword" value={profile.oldPassword} onChange={handleChange} placeholder="Enter current password to change" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" name="newPassword" value={profile.newPassword} onChange={handleChange} placeholder="Enter new password" />
                    </div>
                    <button type="submit" className="update-btn">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;