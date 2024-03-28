import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCabinet = () => {
  const [cabinetName, setCabinetName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer l'objet cabinet à envoyer au serveur
    const newCabinet = {
      cabinet_name: cabinetName,
      description: description,
      address: address,
      city: city,
      phone_number: phoneNumber,
      is_available: isAvailable
    };

    try {
      // Envoyer les données au serveur
      const response = await fetch("http://localhost:8000/cabinet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCabinet)
      });

      if (response.ok) {
        // Rediriger vers la page d'accueil si la création réussit
        navigate("/cabinet");
      } else {
        console.error("Erreur lors de la création du cabinet");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Créer un nouveau cabinet</h1>
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
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
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
        <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Créer</button>
      </form>
    </div>
  );
};

export default AddCabinet;