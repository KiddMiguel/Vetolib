import React, { useState, useEffect } from 'react';
import getOwnerName from '../../utils/GetOwner'; // Import the getOwnerName function from a separate file

function AnimalList() {
    const [animals, setAnimals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [animalsPerPage] = useState(5);

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

    // Pagination logic
    const indexOfLastAnimal = currentPage * animalsPerPage;
    const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
    const currentAnimals = animals.slice(indexOfFirstAnimal, indexOfLastAnimal);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container">
                <div className="row text-center">
                    <h1 className="text-center">Liste des Animaux</h1>
                    {currentAnimals && currentAnimals.map((animal) => (
                        <div key={animal.id}>
                            <div className="card lg:card-side bg-base-100 shadow-xl">
                                <figure>
                                    <img src="../../../public/images/Alpha.jpg" alt="Animal" />
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
            <nav aria-label="">
                <div className="pagination-center">
                    <li className="page-item disabled">
                        <a className="page-link">Previous</a>
                    </li>
                    {animals.length > animalsPerPage && (
                        <ul className='pagination justify-content-center'>
                            {Array.from({ length: Math.ceil(animals.length / animalsPerPage) }).map((_, index) => (
                                <li className="page-item" key={index} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </li>
                                
                            ))}
                        </ul>
                    )}
                    <li clasNames="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </div>
            </nav>
        </>
    );
}

export default AnimalList;
