import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAnimal = () => {
    const [animal_name, setName] = useState('');
    const [animal_type, setSpecies] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [race, setRace] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const animal = { animal_name, animal_type, race, sex, age };

        try {
            const response = await fetch('http://localhost:8000/animal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(animal),
            });

            if (response.ok) {
                navigate('/accueil');
            } else {
                console.error('Erreur lors de la création de l\'animal');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Ajouter un nouvel animal</h1>
            <form onSubmit={handleSubmit}>
                
                <div className="form-floating mb-3">
                    <input
                        class="form-control" 
                        id="floatingInput"
                        placeholder="Nom de l'animal"
                        type="text"
                        value={animal_name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label for="floatingInput" >Nom de l'animal</label>

                </div>
                <div className="form-floating mb-3">
                    <input
                        class="form-control" 
                        id="floatingInput"
                        type="text"
                        value={animal_type}
                        onChange={(e) => setSpecies(e.target.value)}
                        required
                    />
                    <label for="floatingInput" >Espèce</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        class="form-control" id="floatingInput"
                        type="text"
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                        required
                    />
                    <label for="floatingInput" >Race</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        class="form-select" 
                        id="floatingSelect"
                        value={sex}
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
                        class="form-control" 
                        id="floatingInput"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <label for="floatingInput" >Age</label>
                </div>
                <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Ajouter</button>
            </form>
        </div>
    );
};

export default AddAnimal;