import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";

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
    fd.append("ArtistId", formData.ArtistId);
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
      <form onSubmit={handleSubmitCreationForm}>
        {/* <div>
        <label htmlFor="name">ArtistId:</label>
        <input
          type="text"
          id="artistId"
          name="artistId"
          value={artistId}
          onChange={setFormData}
        />
      </div> */}

        <div>
          <label htmlFor="description">Title: </label>
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={setFormData}
          />
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            value={description}
            name="description"
            id="description"
            onChange={setFormData}
          />
        </div>

        <div>
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            id="img"
            name="img"
            // value={picture.name || ""}
            onChange={setFormData}
          />
        </div>

        <div>
          <label htmlFor="description">Categories: </label>
          <input
            type="text"
            value={categories}
            name="categories"
            id="categories"
            onChange={setFormData}
          />
        </div>

        <div>
          <label htmlFor="description">Price: </label>
          <input
            type="text"
            value={price}
            name="price"
            id="price"
            onChange={setFormData}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateFormCreation;
