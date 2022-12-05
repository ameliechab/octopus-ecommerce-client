import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFormCreate from "../../hooks/useFormCreate";
import apiHandler from "./../../api/apiHandler";
import "./ProfileUpdateCreation.css";

const ProfileUpdateCreation = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [formData, handleChange, setFormData, resetForm] = useFormCreate({
    title: "",
    description: "",
    img: {},
    categories: [],
    price: null,
  });

  useEffect(() => {
    apiHandler.getOneCreation(id).then((res) => {
      console.log(res);
      setFormData(res);
    });
  }, []);

  const handleUpdateCreationForm = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required`);
        return;
      }
    }
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("img", formData.img);
    fd.append("categories", formData.categories);
    fd.append("price", formData.price);

    const { data } = await apiHandler.patch(`/myCreation/${id}/update`, fd);
    console.log(data);
    resetForm();
    navigate("/profile/artists/updatecreationpage");
  };

  const { title, description, categories, price, img } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleUpdateCreationForm}
        className="create-all-object-details-page"
      >
        <div className="create-creation-presentation">
          {/* <label htmlFor="img">Picture</label> */}
          <img
            className="create-creation-picture"
            src={`${img}`}
            alt="add-creation"
          />

          <div className="create-creation-details">
            {/* <label  htmlFor="title">Title: </label> */}
            <input
              className="create-creation-details-title"
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={handleChange}
              // placeholder="Your creation name"
            />
            {/* <label htmlFor="description">Description: </label> */}
            <textarea
              className="create-creation-details-description"
              type="text"
              value={description}
              name="description"
              id="description"
              onChange={handleChange}
              // placeholder="Your description here"
            ></textarea>

            <h4>
              <label htmlFor="description">Categories: </label>
              <input
                type="text"
                value={categories}
                name="categories"
                id="categories"
                onChange={handleChange}
                placeholder="add category"
              />
            </h4>
          </div>
        </div>
        <div className="change-picture-creation-update">
          <input
            type="file"
            id="update-creation-picture"
            name="img"
            onChange={handleChange}
          />
        </div>
        <div className="create-creation-price-and-button">
          <h3>
            <label htmlFor="description">Price: </label>
            <input
              type="text"
              value={price}
              name="price"
              id="price"
              onChange={handleChange}
              placeholder="price"
            />
            €
          </h3>

          <button className="create-add-to-profile-button-creation-page">
            SUBMIT CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateCreation;
