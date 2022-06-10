import React from "react";
import "./navbar.scss";
import { motion } from "framer-motion";

const Navbar = () => {
  const [links, setLinks] = React.useState([
    "MEN",
    "WOMEN",
    "JEWELRY",
    "ABOUT",
  ]);

  return (
    <ul className="navbar__container">
      {links.map((item, key) => {
        return (
          <motion.li
            key={key}
            className="navbar__container-link"
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(205,209,228)",
              color: "rgb(82,78,183)",
              originX: 0,
            }}
          >
            {item}

            <div />
          </motion.li>
        );
      })}
    </ul>
  );
};

export default Navbar;
