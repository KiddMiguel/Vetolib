import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
 
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
  transition: 'background-color 0.2s'
};
 
const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold'
};
 
const EditCabinet = () => {
    const { id } = useParams(); 
    const [cabinetName, setCabinetName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getCabinetDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/cabinet/${id}`);
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
      const updatedCabinet = {
        cabinet_name: cabinetName,
        address: address,
        city: city,
        phone_number: phoneNumber,
        is_available: isAvailable
      };
      try {
        const response = await fetch(`http://localhost:8000/cabinet/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedCabinet)
        });
        console.log(response);
        if (response.ok) {
          navigate("/cabinet");
        } else {
          console.error("Erreur lors de la mise à jour du cabinet");
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    return (
<div style={formStyle}>
<h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Modifier les détails du cabinet</h1>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label style={labelStyle}>Nom du cabinet:</label>
<input
              style={inputStyle}
              type="text"
              value={cabinetName}
              onChange={(e) => setCabinetName(e.target.value)}
              required
            />
</div>
<div className="form-group">
<label style={labelStyle}>Adresse:</label>
<input
              style={inputStyle}
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
</div>
<div className="form-group">
<label style={labelStyle}>Ville:</label>
<input
              style={inputStyle}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
</div>
<div className="form-group">
<label style={labelStyle}>Numéro de téléphone:</label>
<input
              style={inputStyle}
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
</div>
<div className="form-group">
<label style={labelStyle}>Disponible:</label>
<input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
</div>
<button type="submit" style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#004094')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#0056b3')}>
            Enregistrer les modifications
</button>
</form>
</div>
    );
};
 
export default EditCabinet;