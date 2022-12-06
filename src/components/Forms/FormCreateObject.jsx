import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";
import "./FormCreateObject.css";

const CreateFormCreation = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, handleChangeData, setStateData, resetForm] = useFormCreate({
    title: "",
    description: "",
    img: {},
    categories: [],
    price: 0,
  });

  const handleSubmitCreationForm = async (e) => {
    e.preventDefault();
    const formDataCreation = new FormData();
    formDataCreation.append("title", formData.title);
    formDataCreation.append("description", formData.description);
    formDataCreation.append("img", formData.img);
    formDataCreation.append("categories", formData.categories.toLowerCase());
    formDataCreation.append("price", formData.price);

    try {
      const data = await apiHandler.createCreation(formDataCreation);
      resetForm();
      navigate("/creations/" + data._id);
    } catch (err) {
      setError(err);
    }
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
              onChange={handleChangeData}
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
              onChange={handleChangeData}
              placeholder="Your creation name"
            />
            {/* <label htmlFor="description">Description: </label> */}
            <textarea
              className="create-creation-details-description"
              type="text"
              value={description}
              name="description"
              id="description"
              onChange={handleChangeData}
              placeholder="Your description here"
            ></textarea>

            <h4>
              <label htmlFor="description">Categories: </label>
              <input
                type="text"
                value={categories}
                name="categories"
                id="categories"
                onChange={handleChangeData}
                placeholder="add category"
              />
            </h4>
          </div>
        </div>
        <div className="create-creation-price-and-button">
          <h3>
            <label htmlFor="description">Price: </label>
            <input
              type="number"
              value={price}
              name="price"
              id="price"
              onChange={handleChangeData}
              placeholder="price"
            />
            €
          </h3>
          {error && <p>{error}</p>}

          <button className="create-add-to-profile-button-creation-page">
            ADD TO YOUR PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormCreation;
