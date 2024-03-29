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
import Cabinet from "./pages/cabinet/cabinet";
import AddCabinet from "./pages/cabinet/createCabinet";
import EditCabinet from "./pages/cabinet/editCabinet";
import DeleteCabinet from "./pages/cabinet/deleteCabinet";
import Animal from "./pages/animal/animal";
import AnimalList from "./pages/animal/animalist";
import Detanimal from "./pages/animal/detanimal";
import AddAnimal from "./pages/animal/addanimal";
import EditAnimal from "./pages/animal/editanimal";
import Appointment from "./pages/appointment/appointment";
import MonCabinet from "./pages/cabinet/monCabinet";

import UpdateProfile from "./pages/user/updateProfile"

function App() {
  const [count, setCount] = useState(0);
  const { isAuthenticated, logout, user } = useAuth();

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
            <Route path="/cabinet/" element={<Cabinet />} />
            <Route path="/cabinet/:id" element={<CabinetDetails />} />
            <Route path="/deleteCabinet/:id" element={<DeleteCabinet />}/>                       
            <Route path="/editCabinet/:id" element={<EditCabinet />} />
            <Route path="/createCabinet" element={<AddCabinet />} />

            <Route path="/animal" element={<Animal />} />
            <Route path="/animal/owner/:id" element={<Animal />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/connexion" element={<ConnexionUser />} />
     
            <Route path="/animal/owner/:id" element={<Detanimal />} />

            <Route path="/monCabinet" element={< MonCabinet />} />
            
 
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