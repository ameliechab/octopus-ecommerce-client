import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormCreate from "../../hooks/useFormCreate";
import apiHandler from "../../api/apiHandler";
import "./ProfileUpdateArtist.css";

const ProfileUpdateArtist = () => {
  const [error, setError] = useState("");
  const [myCreations, setMyCreations] = useState([]);
  const [formData, handleChange, setFormData, resetForm] = useFormCreate({
    name: "",
    description: "",
    picture: {},
  });
  const navigate = useNavigate();

  //Display artist profile with creation
  useEffect(() => {
    apiHandler.getMyArtist().then((res) => {
      console.log(res);
      setFormData(res);
    });
    apiHandler.getMyCreations().then((res) => {
      console.log(res);
      setMyCreations(res);
    });
  }, []);

  // Update artist profile
  const handleUpdateArtistForm = async (e) => {
    e.preventDefault();
    const formDataUpdatedArtist = new FormData();
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required`);
        return;
      }
    }
    formDataUpdatedArtist.append("name", formData.name);
    formDataUpdatedArtist.append("description", formData.description);
    formDataUpdatedArtist.append("picture", formData.picture);

    try {
      const { data } = await apiHandler.patchUpdateArtist(
        formDataUpdatedArtist
      );
      console.log(data);
      resetForm();
      navigate("/profile");
    } catch (err) {
      setError(err);
    }
  };

  //Delete the artist profile
  const handleDeleteArtist = async (event) => {
    event.preventDefault();
    try {
      const artistDeleted = await apiHandler.deleteArtist();
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const { name, description, picture } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleUpdateArtistForm}
        className="update-artist-presentation"
      >
        <div className="update-artist-picture">
          <img id="update-picture" src={`${picture}`} alt="add-creation" />
        </div>
        <div className="update-artist-details">
          <input
            className="update-artist-details-name"
            type="text"
            id="create-name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <textarea
            className="update-artist-details-description"
            type="text"
            value={description}
            name="description"
            id="create-description"
            onChange={handleChange}
          ></textarea>
          <input type="file" name="picture" onChange={handleChange} />

          <div className="div-for-submit-button-update-artist">
            {error && <p className="error">{error}</p>}
            <button className="submit-button-update-artist">
              SUBMIT CHANGES
            </button>
            <button
              className="submit-button-update-artist"
              onClick={handleDeleteArtist}
            >
              DELETE CREATOR PAGE
            </button>
          </div>
        </div>
      </form>

      <div className="update-object-of-artist-details">
        <h3 className="update-one-artist-creations">UPDATE YOUR CREATIONS</h3>
        <div className="all-creations-update-artist-page">
          <>
            <Link to="/profile/artists/createobject">
              <img
                className="create-creations-images-one-artist"
                src="../../../public/images/logos/AddCreation.png"
                alt="add-creation"
              />
            </Link>
          </>
          {myCreations.map((element) => {
            return (
              <div key={element._id}>
                <Link to={`/profile/artists/updateobjectpage/${element._id}`}>
                  <img
                    className="update-creations-images-one-artist"
                    src={element.img}
                    alt={element.title}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateArtist;
