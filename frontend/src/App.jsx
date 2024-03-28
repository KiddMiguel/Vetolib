import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Accueil from "./pages/accueil/accueil";
import ConnexionUser from "./pages/user/connexionUser";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import CabinetDetails from "./components/CabinetDetails";
import Inscription from "./pages/user/inscription";
import Profile from "./pages/user/profile";


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
            <Route path="/connexion" element={<ConnexionUser />} />
            <Route path="/cabinet/:id" element={<CabinetDetails />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/profile" element={<Profile />} />

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
