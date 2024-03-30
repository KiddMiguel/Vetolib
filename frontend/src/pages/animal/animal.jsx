import React, { useState, useEffect } from 'react';
import getOwnerName from '../../utils/GetOwner'; // Import the getOwnerName function from a separate file
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function Animal() {
  const navigate = useNavigate();

  const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/animal/${id}`)
          .then(() => {
            navigate();
          })
          .catch((error) => {
            console.log(error);
          });
    };
  const { user } = useAuth();
  console.log(user);
  const handleButtonClick = () => {
  };
  const [data, setData] = useState([]);
  const [animals, setAnimals] = useState([]);
  async function fetchData() {
    try {
      axios.get('http://localhost:8000/animal/owner/' + user.user_id)
        .then((response) => {
          console.log(response.data);
          setAnimals(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Get the owner name for each animal
      const animalsWithOwnerName = await Promise.all(
        data.map(async (animal) => {
          const ownerName = await getOwnerName(animal.owner_id);
          return { ...animal, ownerName };
        })
      );
      console.log(animalsWithOwnerName);
      setAnimals(animalsWithOwnerName);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setAnimals([]); // Définir un tableau vide en cas d'erreur
    }
  }
  console.log(animals);

  console.log(data);


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

              <tr key={animal.animal_id}>
                <td className="font-bold"  >{user.nom +" "+ user.prenom}</td>
                <td className="font-bold">{animal.animal_name}</td>
                <td>Cabinet</td>
                <td>{animal.animal_type}</td>
                <td>{animal.race}</td>
                <td>{animal.sex}</td>
                <td>{animal.age} ans</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12"><img style={{ width: "50px" }} src="../../../public/images/Skippy.jpg" alt="" />
                    </div>
                  </div>
                </td>
                <th>
                  <Link to={`/detanimal/${animal.animal_id}`} className="btn btn-primary">Voir détails</Link>
                </th>
                <th>
                  <button className="btn btn-danger" onClick={() => handleDelete(animal.animal_id)}>Effacer</button>
                </th>
              </tr>

            ))}

          </tbody>
        </table>
        <Link to={`/addanimal/`} className="btn btn-primary" style={{margin:"auto"}}>Ajouter</Link>
      </div >
    </>
  );
}
