import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import "./shoesUpdate.scss";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ShoesApi } from "../../../api/shoes/ShoesApi";

type IForm = {
  shoesName: string;
  shoesPrice: number;
  shoesImage: string;
};

const schema = yup.object().shape({
  shoesName: yup
    .string()
    .required()
    .max(100, "Length name cant over 100 characters")
    .min(3, "Minimum length of character of name is 3"),
  shoesPrice: yup.number().required().integer().positive(),
  shoesImage: yup.string().required(),
});

const ShoesUpdate = () => {
  const shoes = useAppSelector((state) => state.shoesState.shoesUpdate);
  const [status, setStatus] = React.useState(false);
  const [image, setImage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(schema),

    defaultValues: {
      shoesName: shoes.shoesName,
      shoesPrice: Number(shoes.shoesPrice),
      shoesImage: shoes.shoesImage,
    },
  });

  const onSubmit = (data: IForm) => {
    const params = {
      id: shoes._id,
      shoesName: data.shoesName,
      shoesPrice: Number(data.shoesPrice),
      shoesImage: data.shoesImage,
    };
    ShoesApi.updateShoesById(params);

    reset();
    setStatus(true);
  };

  return (
    <div className="update__container">
      <motion.div className="form__container">
        <h2>Update Shoes</h2>
        <form
          className="form__container-details"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="shoesName">Name</label>
          <motion.input
            type="text"
            placeholder="Shoes name"
            className="form-input"
            whileFocus={{
              boxShadow: "0px 0px 8px rgb(41, 52, 98)",
            }}
            {...register("shoesName")}
          />

          {errors.shoesName && (
            <p className="form-error">{errors.shoesName.message}</p>
          )}

          <label htmlFor="shoesPrice">Price</label>
          <motion.input
            type="number"
            placeholder="Shoes price"
            className="form-input"
            whileFocus={{
              boxShadow: "0px 0px 8px rgb(41, 52, 98)",
            }}
            {...register("shoesPrice")}
          />

          <label htmlFor="shoesImage">Image</label>

          <div className="form__image">
            {image === "" ? (
              <img src={shoes.shoesImage} alt="images" />
            ) : (
              <img src={image} alt="images" />
            )}

            <motion.input
              type="text"
              placeholder="Shoes image"
              className="form-input"
              whileFocus={{
                boxShadow: "0px 0px 8px rgb(41, 52, 98)",
              }}
              {...register("shoesImage")}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>

          <div className="btn__container">
            <motion.button
              whileHover={{
                scale: 1.1,
                originX: 0,
              }}
            >
              Update
            </motion.button>

            <Link to="/" className="btn-link">
              Home page
            </Link>
          </div>
        </form>

        {status && <p className="status-success">Update success</p>}
      </motion.div>
    </div>
  );
};

export default ShoesUpdate;
