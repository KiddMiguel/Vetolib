import React, { useState, useEffect } from 'react';
import getOwnerName from '../../utils/GetOwner'; // Import the getOwnerName function from a separate file
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";

export default function Animal() {
  const { getUserId } = useAuth();
  console.log(getUserId.id);
  const handleButtonClick = () => {
  };
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Owner</th>
              <th>Cabinet</th>
              <th>Animal Name</th>
              <th>Animal Type</th>
              <th>Race</th>
              <th>Sexe</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {animals && animals.map((animal) => (

              <tr key={animal.id}>
                <td className="font-bold"  >{animal.ownerName}</td>
                <td className="font-bold">{animal.animal_name}</td>
                <td>Cabinet</td>
                <td>{animal.animal_type}</td>
                <td>{animal.race}</td>
                <td>{animal.sex}</td>
                <td>{animal.age} ans</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12"><img style={{ width: "50px" }} src="../../../public/img/Goldy.jpg" alt="" />
                    </div>
                  </div>
                </td>
                <th>
                  <button className="btn btn-primary" onClick={handleButtonClick} >details</button>:<button className="btn btn-secondary" onClick={handleButtonClick} >details</button>
                  <Link to={`/detanimal/${getUserId.id}`} className="btn btn-primary">Voir détails</Link>

              </th>
              </tr>

            ))}

        </tbody>
      </table>
    </div >
    </>
  );
}
// export default Animal;
