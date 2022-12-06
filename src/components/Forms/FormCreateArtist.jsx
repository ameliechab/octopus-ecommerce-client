import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";
import "./FormCreateArtist.css";

const CreateFormArtist = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, handleChangeData, setStateData, resetForm] = useFormCreate({
    name: "",
    description: "",
    picture: {},
  });

  const handleSubmitArtistForm = async (e) => {
    e.preventDefault();
    const formDataArtist = new FormData();
    formDataArtist.append("name", formData.name);
    formDataArtist.append("description", formData.description);
    formDataArtist.append("picture", formData.picture);

    try {
      const data = await apiHandler.createArtist(formDataArtist);
      resetForm();
      navigate("/artist/" + data._id);
    } catch (err) {
      setError(err);
    }
  };

  const { name, description } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleSubmitArtistForm}
        className="create-artist-presentation"
      >
        <div className="create-artist-picture">
          {/* <label htmlFor="picture">Picture</label> */}
          <input
            type="file"
            id="create-picture"
            name="picture"
            onChange={handleChangeData}
          />
        </div>
        <div className="create-artist-details">
          {/* <label htmlFor="name">Name:</label> */}
          <input
            className="create-artist-details-name"
            type="text"
            id="create-name"
            name="name"
            value={name}
            onChange={handleChangeData}
            placeholder="Your brand/creator name"
          />
          {/* <label htmlFor="description">Description: </label> */}
          <textarea
            className="create-artist-details-description"
            type="text"
            value={description}
            name="description"
            id="create-description"
            onChange={handleChangeData}
            placeholder="Description of you and your activity"
          ></textarea>
          <div className="div-for-submit-button-create-artist">
            {error && <p>{error}</p>}
            <button className="submit-button-create-artist">Submit</button>
          </div>
        </div>
      </form>

      <div className="create-object-of-artist-details">
        <h3 className="create-one-artist-creations">CREATIONS</h3>
        <div className="create-all-creations-artist-page">
          <>
            <Link to="/profile/artists/createobject">
              <img
                className="create-creations-images-one-artist"
                src="/images/logos/AddCreation.png"
                alt="add-creation"
              />
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};

export default CreateFormArtist;
