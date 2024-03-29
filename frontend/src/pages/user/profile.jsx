import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import axios from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();
    console.log(user)
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        user_type: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/${user.user_id}`);
                setUserData(response.data);
            } catch (error) {
                setError('Erreur lors du chargement des données de l’utilisateur.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user.user_id]);

    const handleUpdateRedirect = () => {
        navigate('/update-profile'); // Assurez-vous que cette route est définie dans vos routes
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Mes informations personnelles</h2>
            <div style={{ marginBottom: '10px' }}>
                <strong>Nom:</strong> {userData.nom}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Prénom:</strong> {userData.prenom}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Email:</strong> {userData.email}
            </div>
            <div style={{ marginBottom: '20px' }}>
                <strong>Type d'utilisateur:</strong> {userData.user_type}
            </div>
            <button
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    background: '#0056b3',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={handleUpdateRedirect}
            >
                Mettre à jour mes informations
            </button>
        </div>
    );
};

export default Profile;
