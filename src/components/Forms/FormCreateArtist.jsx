import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";

const CreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData, resetForm] = useFormCreate({
    name: "",
    description: "",
    picture: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    // console.log(picture)
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("picture", formData.picture);

    const { data } = await apiHandler.post("/artists", fd);
    console.log(data);
    resetForm();
    navigate("/artist/" + data._id);
  };

  const { name, description } = formData;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
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
          id="picture"
          name="picture"
          // value={picture.name || ""}
          onChange={setFormData}
        />
      </div>

      <button>Submit</button>
    </form>
  );
};

export default CreateForm;
