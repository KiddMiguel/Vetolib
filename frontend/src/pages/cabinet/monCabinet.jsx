import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from "../../utils/AuthContext";
import axios from '../../utils/axios';

const CabinetDetails = () => {
  const [cabinet, setCabinet] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  const { isAuthenticated } = useAuth();

  
  useEffect(() => {
    axios.get(`http://localhost:8000/cabinet/moncabinet/${user.user_id}`)
      .then((response) => {
        const cabinetData = response.data; 
        console.log("idcabinet",cabinetData);
        setCabinet(cabinetData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  // Vérifier si l'utilisateur est authentifié et s'il est propriétaire du cabinet
  console.log("cabinet :", cabinet);
if (isAuthenticated && user && user.user_type === "propriétaire") {
  return (
    <div className="container">
      {cabinet.map((cabinetItem) => ( // Utiliser cabinetItem pour éviter la confusion avec cabinet
        <div key={cabinetItem.id}>
          <h2 className="card-title text-green-500">{cabinetItem.cabinet_name}</h2>
          <p className="text-green-500">Adresse : {cabinetItem.address}, {cabinetItem.city}</p>
        </div>
      ))}
    </div>
  );
} else {
  // Rediriger l'utilisateur ou afficher un message d'erreur
  return (
    <div>
      <p>Vous n'avez pas accès à cette page.</p>
    </div>
  );
}
};

export default CabinetDetails;