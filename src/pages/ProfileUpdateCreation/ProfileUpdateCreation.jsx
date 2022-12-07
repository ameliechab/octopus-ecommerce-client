import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFormCreate from "../../hooks/useFormCreate";
import apiHandler from "./../../api/apiHandler";
import "./ProfileUpdateCreation.css";

const ProfileUpdateCreation = () => {
  const [error, setError] = useState("");
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

  //Display creation by id
  useEffect(() => {
    apiHandler.getOneCreation(id).then((res) => {
      console.log(res);
      setFormData(res);
    });
  }, []);

  const handleDeleteCreation = async (event) => {
    event.preventDefault();
    try {
      const creationDeleted = await apiHandler.deleteCreationArtistProfile(id);
      navigate("/profile/artists/updateartistpage");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCreationForm = async (e) => {
    e.preventDefault();
    const formDataUpdatedCreation = new FormData();
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required`);
        return;
      }
    }
    formDataUpdatedCreation.append("title", formData.title);
    formDataUpdatedCreation.append("description", formData.description);
    formDataUpdatedCreation.append("img", formData.img);
    formDataUpdatedCreation.append("categories", formData.categories);
    formDataUpdatedCreation.append("price", formData.price);

    try {
      const data = await apiHandler.patchUpdateCreation(
        formDataUpdatedCreation,
        id
      );
      console.log(data);
      resetForm();
      navigate("/profile/artists/updatecreationpage");
    } catch (err) {
      setError(err);
    }
  };

  const { title, description, categories, price, img } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleUpdateCreationForm}
        className="update-all-object-details-page"
      >
        <div className="update-creation-presentation">
          {/* <label htmlFor="img">Picture</label> */}
          <img
            className="update-creation-picture"
            src={`${img}`}
            alt="add-creation"
          />

          <div className="update-creation-details">
            {/* <label  htmlFor="title">Title: </label> */}
            <input
              className="update-creation-details-title"
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={handleChange}
              // placeholder="Your creation name"
            />
            {/* <label htmlFor="description">Description: </label> */}
            <textarea
              className="update-creation-details-description"
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
        <div className="update-creation-price-and-button">
          <h3>
            <label htmlFor="description">Price: </label>
            <input
              type="number"
              value={price}
              name="price"
              id="price"
              onChange={handleChange}
              placeholder="price"
            />
            €
          </h3>
          {error && <p className="error">{error}</p>}
          <button className="update-add-to-profile-button-creation-page">
            SUBMIT CHANGES
          </button>
          <button
            className="update-add-to-profile-button-creation-page"
            onClick={handleDeleteCreation}
          >
            DELETE THIS CREATION
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateCreation;
