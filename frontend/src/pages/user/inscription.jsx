import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";

const Inscription = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [username, setUsername] = useState(""); // Si nécessaire pour ton API
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("user");
    const [acceptCgu, setAcceptCgu] = useState(false);
    const [acceptDataPolicy, setAcceptDataPolicy] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth(); // Assure-toi que cette fonction est bien définie dans ton contexte d'authentification

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!acceptCgu || !acceptDataPolicy) {
            alert("Vous devez accepter les CGU et la politique de traitement des données pour vous inscrire.");
            return;
        }

        const userObject = {
            email,
            nom,
            prenom,
            username, // Inclus si nécessaire pour ton API
            password,
            user_type: userType,
        };

        try {
            const response = await axios.post("http://localhost:8000/user/", userObject);
            console.log("data ici0", response.data);
            if (response.data.token) {
                login(response.data.token, response.data.user); // Assure-toi que cette fonction agit comme attendu
                navigate('/'); // Redirection après l'inscription réussie
            } else {
                console.log("Inscription réussie mais sans token:", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card shadow-sm p-4">
                        <h2 className="text-center mb-4">Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nom" className="form-label">Nom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nom"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prenom" className="form-label">Prénom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="prenom"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Champ username si nécessaire */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Mot de passe</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userType" className="form-label">Type d'utilisateur</label>
                                <select
                                    className="form-select"
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    required
                                >
                                    <option value="user">Utilisateur</option>
                                    <option value="propriétaire">Propriétaire</option>
                                </select>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="acceptCgu"
                                    checked={acceptCgu}
                                    onChange={(e) => setAcceptCgu(e.target.checked)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="acceptCgu">
                                    J'ai lu et j'accepte les <a href="/cgu">CGU</a>
                                </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="acceptDataPolicy"
                                    checked={acceptDataPolicy}
                                    onChange={(e) => setAcceptDataPolicy(e.target.checked)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="acceptDataPolicy">
                                    J'accepte que mes données soient collectées et traitées conformément à la politique de confidentialité
                                </label>
                            </div>
                            <button className="btn btn-primary w-100" type="submit">S'inscrire</button>
                            <div className="text-center mt-3">
                                <Link to="/connexion">J'ai déjà un compte !</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inscription;
