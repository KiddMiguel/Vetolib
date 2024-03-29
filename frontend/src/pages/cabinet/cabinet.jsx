import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

 
const cabinetStyles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px', // Ajuste l'espace entre les cartes
      maxWidth: '960px', // Ajuste la largeur maximale du conteneur principal si nécessaire
      margin: '0 auto', // Centrer le conteneur principal horizontalement
    },
    cardContainer: {
      flex: '0 1 calc(33.33% - 20px)', // Ajuste la largeur des cartes pour afficher 3 colonnes
    }
  };

 
const Cabinet = () => {
  const [cabinetData, setCabinetData] = useState([]);
  const { isAuthenticated, logout, user } = useAuth();

 
  const getCabinet = async () => {
    try {
      const response = await fetch('http://localhost:8000/cabinet');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCabinetData(data);
      } else {
        console.error("Les données du cabinet ne sont pas un tableau.");
      }
    } catch(e) {
      console.error(e);
    }
  };
 
  useEffect(() => {
    getCabinet();
  }, []);
 
  return (
<>
<Link to="/createcabinet" className="btn btn-primary mb-4">Créer un cabinet</Link>
<div className="container">
<div style={cabinetStyles.container}>
          {cabinetData.map((cabinet) => (
<div key={cabinet.id} style={cabinetStyles.cardContainer}>
<div className="card bg-base-100 shadow-xl">
<figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
<div className="card-body">
<h2 className="card-title text-green-500">{cabinet.cabinet_name}</h2>
<p className="text-green-500">Description : {cabinet.description}</p>
<p className="text-green-500">Adresse : {cabinet.address}, {cabinet.city}</p>
<p className="text-green-500">Num téléphone : {cabinet.phone_number}</p>
<div className="card-actions">


                    {cabinet.is_available
                      ? <Link to={`/cabinet/${cabinet.cabinet_id}`} className="btn btn-primary">Ouvert</Link>
                      : <Link to="/cabinet" className="btn btn-primary">Fermé</Link>}
</div>
</div>
</div>
</div>
          ))}
</div>
</div>
</>
  );
};
 
export default Cabinet;