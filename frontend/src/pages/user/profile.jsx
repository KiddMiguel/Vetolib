import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        user_type: '',
        // Ajoute d'autres champs selon les informations de ton utilisateur
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Remplace 'userId' par l'identifiant réel de l'utilisateur connecté
    const userId = 'userId';

    useEffect(() => {
        // Remplace 'http://localhost:8000/user/' par l'URL de ton API
        axios.get(`http://localhost:8000/user/${userId}`)
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Une erreur est survenue lors du chargement des données de l’utilisateur.');
                setLoading(false);
            });
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Remplace 'http://localhost:8000/user/' par l'URL de ton API
        axios.put(`http://localhost:8000/user/${userId}`, userData)
            .then(response => {
                alert('Informations mises à jour avec succès.');
            })
            .catch(error => {
                setError('Erreur lors de la mise à jour des informations.');
            });
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Mon profil</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input type="text" name="nom" value={userData.nom} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input type="text" name="prenom" value={userData.prenom} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleInputChange} readOnly />
                </div>
                <div>
                    <label>Type d'utilisateur:</label>
                    <select name="user_type" value={userData.user_type} onChange={handleInputChange}>
                        <option value="user">Utilisateur</option>
                        <option value="propriétaire">Propriétaire</option>
                        {/* Ajoute d'autres options si nécessaire */}
                    </select>
                </div>
                {/* Ajoute d'autres champs d'input si nécessaire */}
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default Profile;
