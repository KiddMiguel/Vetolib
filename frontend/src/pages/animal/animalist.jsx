import React, { useState, useEffect } from 'react';
import getOwnerName  from '../../utils/GetOwner'; // Import the getOwnerName function from a separate file

function AnimalList() {
    const [animals, setAnimals] = useState([]);
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/animal');
            if (!response.ok) {
                throw new Error('Réponse du serveur non valide');
            }
            const data = await response.json();
           console.log(data);

            // Get the owner name for each animal
            const animalsWithOwnerName = await Promise.all(
                data.map(async (animal) => {
                    const ownerName = await getOwnerName(animal.owner_id);
                    return { ...animal, ownerName };
                })
            );

            setAnimals(animalsWithOwnerName);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            setAnimals([]); // Définir un tableau vide en cas d'erreur
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row text-center">
                    <h1 className="text-start">Liste des Animaux</h1>
                    {animals && animals.map((animal) => (
                        <div key={animal.id}>
                            <div className="card lg:card-side bg-base-100 shadow-xl">
                                <figure>
                                    <img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Animal" />
                                </figure>
                                <div className="card-body">
                                    <h1 className="card-title text-green-500">{animal.animal_name}</h1>
                                    <h1 className="text-green-500">Propriétaire</h1>
                                    <p className="text-green-500">{animal.ownerName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AnimalList;
