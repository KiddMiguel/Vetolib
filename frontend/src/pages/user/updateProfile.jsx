import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import axios from '../../utils/axios';

import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        user_type: '',
        newPassword: '', // Nouveau champ pour le nouveau mot de passe
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8000/user/${user.user_id}`)
            .then(response => {
                setUserData({ ...response.data, newPassword: '' }); // Supprime le champ newPassword pour éviter de l'afficher
                setLoading(false);
            })
            .catch(err => {
                setError('Erreur lors du chargement des données de l’utilisateur.');
                setLoading(false);
            });
    }, [user.id]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        let updateData = { ...userData };
        delete updateData.newPassword; // Supprime newPassword avant l'envoi

        if (userData.newPassword) {
            updateData.password = userData.newPassword; // Ajoute le nouveau mot de passe s'il existe
        }

        setLoading(true);
        try {
            await axios.put(`http://localhost:8000/user/${user.user_id}`, updateData);
            alert('Informations mises à jour avec succès.');
            navigate('/profile'); // Redirection vers le profil de l'utilisateur        
            setUser({ ...user, ...updateData }); // Met à jour les données de l'utilisateur dans le contexte

        } catch (error) {
            setError('Erreur lors de la mise à jour des informations.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Modifier mon profil</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nom:</label>
                    <input type="text" name="nom" value={userData.nom || ''} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Prénom:</label>
                    <input type="text" name="prenom" value={userData.prenom || ''} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email || ''} onChange={handleInputChange} readOnly style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Vous êtes:</label>
                    <select name="user_type" value={userData.user_type || ''} onChange={handleInputChange} style={selectStyle}>
                        <option value="user">Utilisateur</option>
                        <option value="propriétaire">Propriétaire</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nouveau mot de passe (laisser vide si inchangé):</label>
                    <input type="password" name="newPassword" value={userData.newPassword || ''} onChange={handleInputChange} style={inputStyle} />
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
