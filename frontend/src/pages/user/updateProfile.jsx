import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/AuthContext";

const UpdateProfile = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        user_type: '',
        // Ajoute d'autres champs si nécessaire
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`http://localhost:8000/user/${user.id}`, userData)
            .then(response => {
                alert('Informations mises à jour avec succès.');
                setLoading(false);
            })
            .catch(error => {
                setError('Erreur lors de la mise à jour des informations.');
                setLoading(false);
            });
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Modifier mon profil</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nom:</label>
                    <input type="text" name="nom" value={userData.nom} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Prénom:</label>
                    <input type="text" name="prenom" value={userData.prenom} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleInputChange} readOnly style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Vous êtes:</label>
                    <select name="user_type" value={userData.user_type} onChange={handleInputChange} style={selectStyle}>
                        <option value="user">Utilisateur</option>
                        <option value="propriétaire">Propriétaire</option>
                        {/* Ajoute d'autres options si nécessaire */}
                    </select>
                </div>
                <button type="submit" style={submitButtonStyle}>Mettre à jour</button>
            </form>
        </div>
    );
};

// Styles
const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd'
};

const selectStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '20px'
};

const submitButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    background: '#0056b3',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default UpdateProfile;
