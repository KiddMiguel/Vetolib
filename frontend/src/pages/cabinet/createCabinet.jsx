import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
const formStyle = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};
 
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '10px 0 20px 0',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: '1px solid #ccc'
};
 
const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  backgroundColor: '#0056b3',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out'
};
 
const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold'
};
 
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
      description,
      address,
      city,
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
<div style={formStyle}>
<h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Créer un nouveau cabinet</h1>
<form onSubmit={handleSubmit}>
<div>
<label style={labelStyle}>Nom du cabinet:</label>
<input
            style={inputStyle}
            type="text"
            value={cabinetName}
            onChange={(e) => setCabinetName(e.target.value)}
            required
          />
</div>
<div>
<label style={labelStyle}>Description:</label>
<textarea
            style={{ ...inputStyle, height: '100px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
</div>
<div>
<label style={labelStyle}>Adresse:</label>
<input
            style={inputStyle}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
</div>
<div>
<label style={labelStyle}>Ville:</label>
<input
            style={inputStyle}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
</div>
<div>
<label style={labelStyle}>Numéro de téléphone:</label>
<input
            style={inputStyle}
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
</div>
<div>
<label style={labelStyle}>Disponible:</label>
<input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
</div>
<button type="submit" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#004094'} onMouseOut={(e) => e.target.style.backgroundColor = '#0056b3'}>Créer</button>
</form>
</div>
  );
};
 
export default AddCabinet;