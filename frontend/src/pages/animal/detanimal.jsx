import React, { useEffect, useState, useHistory } from 'react';
import getOwnerName from '../../utils/GetOwner';
const DetAnimal = () => {
    const [animals, setAnimals] = useState([]);
    const history = useHistory();
    const handleEdit = () => {
        history.push(`/editanimal/${animals.id}`);
        };
    const handleDelete = () => {
        fetch(`http://localhost:8000/animal/${animals.id}`, {
            method: 'DELETE'
        }).then(() => {
            history.push('/animal');
        });
    };
    useEffect(() => {
        const fetchOwnerNames = async () => {
            const updatedAnimals = await Promise.all(animals.map(async (animal) => {
                const ownerName = await getOwnerName(animal.owner_id);
                return { ...animal, ownerName };
            }));
            setAnimals(updatedAnimals);
        };
        fetchOwnerNames();
    }, [animals]);

    useEffect(() => {

        const fetchAnimal = async () => {
            try {
                const response = await  fetch(`http://localhost:8000/animal/${animals.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setAnimals(data);
                }
            } catch (error) {
                console.error('Error fetching animals:', error);
            }
        }
        fetchAnimal();
    }
    , []);
    return (
        <div className="hero min-h-screen bg-base-100 flex justify-center items-center">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    {animals.map((animal) =>
                        <div key={animal.id}>
                            <h1 className="text-5xl font-bold">{animal.animal_name}</h1>
                            <p><strong>Propriétaire:</strong>{user.nom+""+user.prenom}</p>
                            <p><strong>Cabinet: </strong>{animal.ca_id}</p>
                            <p><strong>Race:</strong>{animal.race}</p>
                            <p><strong>Âge:</strong>{animal.age}</p>
                            <p><strong>Type d'animal:</strong>{animal.animal_type}</p>
                        </div>
                    )}
                    <h1 className="text-2xl font-bold">Description</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className="flex space-x-4">
                        <button onClick={handleEdit} className="btn btn-ghost">Edit</button>
                        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetAnimal;

