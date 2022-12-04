import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";
import "./FormCreateObject.css";

const CreateFormCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData, resetForm] = useFormCreate({
    // artistId: "",
    title: "",
    description: "",
    img: {},
    categories: [],
    price: null,
  });

  const handleSubmitCreationForm = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("img", formData.img);
    fd.append("categories", formData.categories);
    fd.append("price", formData.price);

    const { data } = await apiHandler.post("/creations/form", fd);
    console.log(data);
    resetForm();
    navigate("/creations/" + data._id);
  };

  const { title, description, categories, price } = formData;
  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleSubmitCreationForm}
        className="create-all-object-details-page"
      >
        <div className="create-creation-presentation">
          {/* <label htmlFor="img">Picture</label> */}
          <div className="create-creation-picture">
            <input
              type="file"
              id="create-creation-picture"
              name="img"
              onChange={setFormData}
            />
          </div>

          <div className="create-creation-details">
            {/* <label  htmlFor="title">Title: </label> */}
            <input
              className="create-creation-details-title"
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={setFormData}
              placeholder="Your creation name"
            />
            {/* <label htmlFor="description">Description: </label> */}
            <textarea
              className="create-creation-details-description"
              type="text"
              value={description}
              name="description"
              id="description"
              onChange={setFormData}
              placeholder="Your description here"
            ></textarea>

            <h4>
              <label htmlFor="description">Categories: </label>
              <input
                type="text"
                value={categories}
                name="categories"
                id="categories"
                onChange={setFormData}
                placeholder="add category"
              />
            </h4>
          </div>
        </div>
        <div className="create-creation-price-and-button">
          <h3>
            <label htmlFor="description">Price: </label>
            <input
              type="text"
              value={price}
              name="price"
              id="price"
              onChange={setFormData}
              placeholder="price"
            />
            €
          </h3>
          <button className="create-add-to-profile-button-creation-page">
            ADD TO YOUR PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormCreation;
