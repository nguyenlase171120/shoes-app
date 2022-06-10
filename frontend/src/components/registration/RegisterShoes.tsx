import React from "react";
import "./registerShoes.scss";
import { motion } from "framer-motion";
import { shoesBackground } from "../../assets/images";
import { useForm } from "react-hook-form";
import { ShoesApi } from "../../api/shoes/ShoesApi";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Inputs {
  name: string;
  price: number;
  image: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("user name must be required")
    .max(100, "Length of username cant over 100 characters"),
  image: yup.string().required("image must be required"),
});

const RegisterShoes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [status, setStatus] = React.useState(false);
  const [preview, setPreview] = React.useState<string>("");

  const onSubmit = async (data: Inputs) => {
    const params = {
      name: data.name,
      price: Number(data.price),
      image: data.image,
    };

    const result = await ShoesApi.addNewShoes(params);

    setValue("name", "");
    setValue("image", "");
    setValue("price", 0);
    // reset();
    if (result.status) {
      setStatus(true);
      setPreview("");
    }
  };

  return (
    <div className="container">
      <div className="container-image">
        <img src={shoesBackground} alt="images" />
      </div>

      <div className="registration__container">
        <motion.form
          className="registration__container-form"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2>New product</h2>

          <div className="form--details">
            <label htmlFor="name">Name </label>
            <motion.input
              id="name"
              type="text"
              placeholder="Name product"
              className="form__input"
              whileFocus={{
                scale: 1.1,
                originX: 0,
                originY: 0,
                boxShadow: "0px 0px 8px rgb(21, 19, 60)",
              }}
              {...register("name")}
              onFocus={(e) => {
                setStatus(false);
              }}
            />

            {errors.name && (
              <p className="form-errors">{errors.name?.message}</p>
            )}

            <label htmlFor="price">Price</label>
            <motion.input
              id="price"
              type="number"
              placeholder="Price product"
              className="form__input"
              whileFocus={{
                scale: 1.1,
                originX: 0,
                originY: 0,
                boxShadow: "0px 0px 8px rgb(21, 19, 60)",
              }}
              {...register("price")}
            />

            <label htmlFor="img">Image</label>

            <motion.input
              type="text"
              id="img"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                setPreview(e.target.value);
              }}
            />

            {preview && (
              <img src={preview} alt="images" className="image-preview" />
            )}

            {errors.image && (
              <p className="form-errors">{errors.image?.message}</p>
            )}

            <div className="form__container-btn">
              <button>Submit</button>

              <Link to="/" className="form-link">
                Home page
              </Link>
            </div>
          </div>

          <div>
            {status && <p className="form-success">Create new shoes success</p>}
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default RegisterShoes;
