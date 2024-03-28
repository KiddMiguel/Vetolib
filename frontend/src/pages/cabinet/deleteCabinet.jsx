import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types'; // Importation de PropTypes

const DeleteCabinet = () => {
    const { id } = useParams(); // Utilisation de useParams pour récupérer le paramètre de l'URL

  const [cabinetName, setCabinetName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les données du cabinet à supprimer
    const getCabinetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/cabinet/${id}`);
        if (response.ok) {
          const cabinetData = await response.json();
          setCabinetName(cabinetData.cabinet_name);
        } else {
          console.error("Erreur lors de la récupération des détails du cabinet");
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    getCabinetDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Envoyer la requête de suppression du cabinet au serveur
      const response = await fetch(`http://localhost:8000/cabinet/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Rediriger vers la page d'accueil si la suppression réussit
        navigate("/cabinet");
      } else {
        console.error("Erreur lors de la suppression du cabinet");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Supprimer le cabinet "{cabinetName}"</h1>
      <p>Êtes-vous sûr de vouloir supprimer ce cabinet ? Cette action est irréversible.</p>
      <button onClick={handleDelete} style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Supprimer</button>
    </div>
  );
};

DeleteCabinet.propTypes = {
    id: PropTypes.number.isRequired
};

export default DeleteCabinet;