import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Accueil from "./pages/accueil/accueil";
import ConnexionUser from "./pages/user/connexionUser";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import CabinetDetails from "./components/CabinetDetails";
import Cabinet from "./pages/cabinet/cabinet";
import AddCabinet from "./pages/cabinet/createCabinet";
import EditCabinet from "./pages/cabinet/editCabinet";
import DeleteCabinet from "./pages/cabinet/deleteCabinet";


function App() {
  const [count, setCount] = useState(0);
  const { isAuthenticated, logout, user } = useAuth();
  
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
            <Route path="/connexion" element={<ConnexionUser />} />
            <Route path="/cabinet/:id" element={<CabinetDetails />} />
            <Route path="/cabinet/" element={<Cabinet />} />
            <Route path="/createCabinet" element={<AddCabinet />} /> 
            <Route path="/editCabinet/:id" element={<EditCabinet />} />
            <Route path="/deleteCabinet/:id" element={<DeleteCabinet />} />
            
                  
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
