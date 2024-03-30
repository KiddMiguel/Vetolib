import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import axios from '../../utils/axios';

const DetAnimal = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id: animalId } = useParams();
    const [animal, setAnimal] = useState(null);

    const handleEdit = () => {
        navigate(`/editanimal/${animalId}`);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/animal/${animalId}`)
            .then(() => {
                navigate(`/animal/owner/${user.user_id}`);
            })
            .catch((error) => {
                console.error('Error deleting animal:', error);
            });
    };

    useEffect(() => {
        const getAnimalById = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/animal/${animalId}`);
                setAnimal(response.data);
            } catch (error) {
                console.error('Error fetching animal:', error);
            }
        };
        getAnimalById();
    }, [animalId]);

    return (
        <div className="hero min-h-screen bg-base-100 flex justify-center items-center">
            <div className="hero-content flex-col lg:flex-row-reverse"  style={{textAlign:"center",}}>
                <img src="../../../public/images/Bongo.jpg" alt="Animal" className="max-w-sm rounded-lg shadow-2xl"  style={{width:200}} />
                <div>
                    {animal && (
                        <div>
                            <h1 className="text-5xl font-bold">{animal.animal_name}</h1>
                            <p><strong>Propriétaire:</strong> {user.nom} {user.prenom}</p>
                            <p><strong>Cabinet: </strong> {animal.ca_id}</p>
                            <p><strong>Race:</strong> {animal.race}</p>
                            <p><strong>Âge:</strong> {animal.age}</p>
                            <p><strong>Type d'animal:</strong> {animal.animal_type}</p>
                            <div className="flex space-x-4">
                                <button onClick={ () => handleEdit} className="btn btn-ghost">Edit</button>
                                <button onClick={ () =>handleDelete} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetAnimal;
