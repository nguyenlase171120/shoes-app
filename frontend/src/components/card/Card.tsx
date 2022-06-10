import React, { useContext } from "react";
import { motion } from "framer-motion";
import "./card.scss";
import { MdSystemUpdateAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { ShoesApi } from "../../api/shoes/ShoesApi";
import { useAppDispatch } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { setStatusDelete } from "../../redux/slice/shoesSlice";
import { AuthContext } from "../../context/AuthContext";

interface ICardProps {
  shoesName: string;
  shoesPrice: number;
  shoesImage: string;
  shoesId: string;
}

export const Card: React.FC<ICardProps> = ({
  shoesName,
  shoesPrice,
  shoesImage,
  shoesId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    //Create confirm to delete
    if (window.confirm("Are you want to delete this product ?") === true) {
      //Delete product and notification

      const result = await ShoesApi.deleteShoes(shoesId);
      if (result) {
        alert("Delete product successfully");
        dispatch(setStatusDelete(true));
      }
    } else {
    }
  };

  const handleUpdate = () => {
    dispatch({ type: "shoes/update", payload: shoesId });
    setTimeout(() => {
      navigate("/shoes/update");
    }, 300);
  };

  const checkLogin = useContext(AuthContext);

  return (
    <motion.div className="card__container">
      <motion.img
        src={shoesImage}
        alt="image"
        whileHover={{
          scale: 1.1,
          originX: 0,
        }}
      />

      <div className="card__container__info">
        <h4>{shoesName}</h4>
        <p>{shoesPrice}</p>
      </div>

      {checkLogin && (
        <div className="card__container-features">
          <MdSystemUpdateAlt
            className="card__container-update"
            onClick={handleUpdate}
          />
          <AiOutlineDelete
            className="card__container-delete"
            onClick={handleDelete}
          />
        </div>
      )}
    </motion.div>
  );
};
