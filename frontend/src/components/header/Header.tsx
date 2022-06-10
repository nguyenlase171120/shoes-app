import "./header.scss";
import { logo } from "../../assets/images";
import Navbar from "../navbar/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { searchShoesReducer } from "../../redux/slice/shoesSlice";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const status = useContext(AuthContext);

  const handleLogo = () => {
    dispatch(
      searchShoesReducer([
        {
          _id: "",
          shoesName: "",
          shoesPrice: 0,
          shoesImage: "",
        },
      ])
    );
  };

  const handleLogout = () => {
    dispatch({ type: "/user/login-type", payload: false });
  };
  return (
    <div className="header__container">
      <div className="header__container--images" onClick={handleLogo}>
        <img src={logo} alt="logo" />
        <h3>Shoes Store</h3>
      </div>

      <Navbar />

      {status === false ? (
        <div className="header__container-auth">
          <motion.button
            onClick={() => navigate("/auth/login")}
            className="header__container-button"
            whileHover={{
              scale: 1.1,
              originX: 0,
              boxShadow: "0px 0px 8px rgb(19, 44, 51)",
            }}
          >
            Login
          </motion.button>
          <span onClick={() => navigate("/auth/register")}>
            Sign-up
            <div />
          </span>
        </div>
      ) : (
        <div>
          <motion.button
            className="btn-logout"
            whileHover={{
              scale: 1.1,
              originX: 0,
              boxShadow: "0px 0px 8px rgb(255, 195, 195)",
            }}
            onClick={handleLogout}
          >
            Log out
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Header;
