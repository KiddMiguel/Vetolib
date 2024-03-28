import React, { useState, useEffect } from 'react';

const DetAnimal = () => {
    const [animals, setAnimals] = useState([]);

    // Code de la page de détails de l'animal

    useEffect(() => {
        const fetchOwnerNames = async () => {
            const updatedAnimals = await Promise.all(animals.map(async (animal) => {
                const ownerName = await getOwnerName(animal.owner_id);
                return { ...animal, ownerName };
            }));
            setAnimals(updatedAnimals);
        };
        fetchOwnerNames(); // Call the fetchOwnerNames function
    }, [animals]);

    return (
        <div className="hero min-h-screen bg-base-100 flex justify-center items-center">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    {animals.map((animal) =>
                        <div key={animal.id}>
                            <h1 className="text-5xl font-bold">{animal.animal_name}</h1>
                            <p><strong>Propriétaire:</strong>{animal.username}</p>
                            <p><strong>Cabinet: </strong>{animal.ca_id}</p>
                            <p><strong>Race:</strong>{animal.race}</p>
                            <p><strong>Âge:</strong>{animal.age}</p>
                            <p><strong>Type d'animal:</strong>{animal.animal_type}</p>
                        </div>
                    )}
                    <h1 className="text-2xl font-bold">Description</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className="flex space-x-4">
                        <button className="btn btn-ghost">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetAnimal;