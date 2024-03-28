import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Accueil from "./pages/accueil/accueil";
import ConnexionUser from "./pages/user/connexionUser";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import CabinetDetails from "./components/CabinetDetails";
import Animal from "./pages/animal/animal";
import AnimalList from "./pages/animal/animalist";
import Detanimal from "./pages/animal/detanimal";
import AddAnimal from "./pages/animal/addanimal";
import EditAnimal from "./pages/animal/editanimal";


function App() {
  const [count, setCount] = useState(0);
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <div>
        <div className="my-4 pt-4 container-fluid">
          <Header />
        </div>
        <div className="">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/animal" element={<Animal />} />
            <Route path="/animalist" element={<AnimalList />} />
            <Route path="/connexion" element={<ConnexionUser />} />
            <Route path="/cabinet/:id" element={<CabinetDetails />} />
            <Route path="/animal/:id" element={<Detanimal />} />
            <Route path="/addanimal" element={<AddAnimal />} />
            <Route path="/editanimal/:id" element={<EditAnimal />} />
          </Routes>
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
