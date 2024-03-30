import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import {useAuth} from "../../utils/AuthContext";

const EditAnimal = () => {
    const { user } = useAuth();
    const { id } = useParams();
    console.log('id', id);
    const [animalName, setAnimalName] = useState("");
    const [animalType, setAnimalType] = useState("");
    const [race, setRace] = useState("");
    const [age, setAge] = useState("");
    const [sexe, setSex] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getAnimalDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/animal/${id}`);
                if (response.status === 200) {
                    const animalData = response.data;
                    setAnimalName(animalData.animal_name);
                    setAnimalType(animalData.animal_type);
                    setRace(animalData.race);
                    setAge(animalData.age);
                    setIsAvailable(animalData.is_available);
                } else {
                    console.error("Error retrieving animal details");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getAnimalDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/animal/${id}`, {
                animal_name: animalName,
                animal_type: animalType,
                race: race,
                age: age,
                sex: sexe,
            });
            if (response.status === 200) {
                console.log("Animal details updated successfully");
                navigate(`/detanimal/${id}`);
            } else {
                console.error("Error updating animal details");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Animal Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="floatingInput"
                        placeholder="Nom de l'animal"
                        type="text"
                        value={animalName}
                        onChange={(e) => setAnimalName(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Nom de l'animal</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        value={animalType}
                        onChange={(e) => setAnimalType(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Espèce</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Race</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="floatingSelect"
                        value={sexe}
                        onChange={(e) => setSex(e.target.value)}
                        required
                    >
                        <option value="">Choix de sexe</option>
                        <option value="Male">Male</option>
                        <option value="Femelle">Femelle</option>
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="floatingInput"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Age</label>
                </div>
                <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Modifier</button>
            </form>
        </div>
    );
};

export default EditAnimal;