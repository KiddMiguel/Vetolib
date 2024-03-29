import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types'; // Importation de PropTypes

const EditCabinet = () => {
    const { id } = useParams(); // Utilisation de useParams pour récupérer le paramètre de l'URL
    console.log('id', id);
    const [cabinetName, setCabinetName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les données du cabinet à modifier
        const getCabinetDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/cabinet/${id}`); // Utilisation de l'ID récupéré depuis les paramètres de l'URL
                if (response.ok) {
                    const cabinetData = await response.json();
                    setCabinetName(cabinetData.cabinet_name);
                    setAddress(cabinetData.address);
                    setCity(cabinetData.city);
                    setPhoneNumber(cabinetData.phone_number);
                    setIsAvailable(cabinetData.is_available);
                } else {
                    console.error("Erreur lors de la récupération des détails du cabinet");
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        getCabinetDetails();
    }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer l'objet cabinet à envoyer au serveur pour la mise à jour
    const updatedCabinet = {
      cabinet_name: cabinetName,
      address: address,
      city: city,
      phone_number: phoneNumber,
      is_available: isAvailable
    };

    try {
      // Envoyer les données au serveur pour la mise à jour du cabinet
      const response = await fetch(`http://localhost:8000/cabinet/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCabinet)
      });

      if (response.ok) {
        // Rediriger vers la page d'accueil si la mise à jour réussit
        navigate("/cabinet");
      } else {
        console.error("Erreur lors de la mise à jour du cabinet");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Modifier les détails du cabinet</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom du cabinet:</label>
          <input
            type="text"
            value={cabinetName}
            onChange={(e) => setCabinetName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
         
        </div>
        <div className="form-group">
          <label>Adresse:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ville:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Numéro de téléphone:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Disponible:</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>
        <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Enregistrer les modifications</button>
      </form>
    </div>
  );
};

EditCabinet.propTypes = {
    id: PropTypes.number.isRequired
  };
export default EditCabinet;