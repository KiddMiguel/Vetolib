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


function App() {
  const [count, setCount] = useState(0);
  const { isAuthenticated, logout, user } = useAuth();
  console.log("isAuthenticated ici : ",isAuthenticated);
  
  console.log("user ici : ",user);
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
            <Route path="/animal/owner/:id" element={<Animal />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/connexion" element={<ConnexionUser />} />
            <Route path="/cabinet/" element={<Cabinet />} />
            <Route path="/cabinet/:id" element={<CabinetDetails />} />
            <Route path="/detanimal/:id" element={<Detanimal />} />
            <Route path="/animalist" element={<AnimalList />} />
            <Route path="/addanimal" element={<AddAnimal />} />
            <Route path="/editanimal/:id" element={<EditAnimal />} />
            {/* 
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/profile" element={<Profile />} />
                        <Route path="/animal/:id" element={<Detanimal />} />
            <Route path="/createCabinet" element={<AddCabinet />} /> 
            <Route path="/editCabinet/:id" element={<EditCabinet />} />
            <Route path="/deleteCabinet/:id" element={<DeleteCabinet />} />
           
            */}
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
