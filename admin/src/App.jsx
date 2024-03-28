import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/accueil";
import { useAuth } from "./utils/AuthContext";
import Cabinet from "./pages/cabinet";

function App() {
  const [count, setCount] = useState(0);
  const { isAuthenticated, logout } = useAuth();
  const {user } = useAuth();

  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);

  return (
    <>
      <div>
        <div className="my-4 pt-4 container-fluid">
          <Header />
        </div>
        <div className="">
          <Routes>
            <Route path="/" element={<Accueil />} />
            {(isAuthenticated ) && (
              <Route path="/cabinet" element={<Cabinet/>} />
            )}

            
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