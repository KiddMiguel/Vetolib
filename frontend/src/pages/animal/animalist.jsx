import React, { useState, useEffect } from 'react';

async function getOwnerName(ownerId) {
    try {
        const response = await fetch(`http://localhost:8000/user/${ownerId}`);
        if (!response.ok) {
            throw new Error('Réponse du serveur non valide');
        }
        const data = await response.json();
        return data.username; // Supposons que le nom de l'utilisateur est dans la propriété 'username'
    } catch (error) {
        console.error('Erreur lors de la récupération du propriétaire:', error);
        return 'Propriétaire inconnu';
    }
}


function AnimalList() {
    const [animals, setAnimals] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/animal');
            if (!response.ok) {
                throw new Error('Réponse du serveur non valide');
            }
            const data = await response.json();
            setAnimals(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            setAnimals([]); // Définir un tableau vide en cas d'erreur
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Liste des Animaux</h1>
            <ul>
                {animals.map(async (animal) => {
                    const ownerName = await getOwnerName(animal.owner_id);
                    return (
                        <li key={animal.id}>
                            <strong>Nom de l'animal:</strong> {animal.animal_name},
                            <strong> Propriétaire:</strong> {ownerName}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AnimalList;

