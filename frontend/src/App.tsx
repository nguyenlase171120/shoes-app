import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import RegisterShoes from "./components/registration/RegisterShoes";
import ShoesUpdate from "./components/update/shoes/ShoesUpdate";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Search from "./components/search/Search";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Search />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<Error />} />

          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/shoes">
            <Route path="register" element={<RegisterShoes />} />
            <Route path="update" element={<ShoesUpdate />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
