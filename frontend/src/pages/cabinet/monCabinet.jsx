import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../utils/AuthContext";
import axios from '../../utils/axios';
 
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  header: {
    fontSize: '24px',
    color: '#0056b3',
    marginBottom: '20px'
  },
  info: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px'
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    marginRight: '10px'
  },
  linkRed: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    marginRight: '10px'
  },
  cabinetItem: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '20px',
    marginBottom: '20px'
  }
};
 
const CabinetDetails = () => {
  const [cabinet, setCabinet] = useState([]);
  const { user } = useAuth();
  const { isAuthenticated } = useAuth();
 
  useEffect(() => {
    axios.get(`http://localhost:8000/cabinet/moncabinet/${user.user_id}`)
      .then((response) => {
        const cabinetData = response.data;
        setCabinet(cabinetData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
 
  if (isAuthenticated && user && user.user_type === "propriétaire") {
    return (
      <div style={styles.container}>
        {cabinet.map((cabinetItem) => (
          <div key={cabinetItem.id} style={styles.cabinetItem}>
            <h2 style={styles.header}>{cabinetItem.cabinet_name}</h2>
            <p style={styles.info}>Adresse : {cabinetItem.address}, {cabinetItem.city}</p>
            <Link to={`/deletecabinet/${cabinetItem.cabinet_id}`} style={styles.linkRed}>Supprimer {cabinetItem.cabinet_name}</Link>
            <Link to={`/editcabinet/${cabinetItem.cabinet_id}`} style={styles.link}>Modifier {cabinetItem.cabinet_name}</Link>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div style={styles.container}>
        <p>Vous n'avez pas accès à cette page.</p>
      </div>
    );
  }
};
 
export default CabinetDetails;
