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

  useEffect(() => {
    const myArtist = apiHandler.getMyArtist().then((res) => {
      console.log(res);
      setFormData(res);
    });

    const myCreations = apiHandler.getMyCreations().then((res) => {
      console.log(res);
      setMyCreations(res);
    });
  }, []);

  const handleUpdateArtistForm = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required`);
        return;
      }
    }
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("picture", formData.picture);

    const { data } = await apiHandler.patch("/myArtist/update", fd);
    console.log(data);
    resetForm();
    navigate("/profile/artists/updateartistpage");
  };

  const { name, description, picture } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleUpdateArtistForm}
        className="update-artist-presentation"
      >
        <div className="update-artist-picture">
          {/* <label htmlFor="picture">Picture</label> */}
          <img id="update-picture" src={`${picture}`} alt="add-creation" />
        </div>
        <div className="update-artist-details">
          {/* <label htmlFor="name">Name:</label> */}
          <input
            className="update-artist-details-name"
            type="text"
            id="create-name"
            name="name"
            value={name}
            onChange={handleChange}
            // placeholder={myArtist.name}
          />
          {/* <label htmlFor="description">Description: </label> */}
          <textarea
            className="update-artist-details-description"
            type="text"
            value={description}
            name="description"
            id="create-description"
            onChange={handleChange}
            // placeholder={myArtist.description}
          ></textarea>
          <input
            // style={{ backgroundImage: `{url(`${myArtist.picture}`)}`` }}
            type="file"
            name="picture"
            onChange={handleChange}
          />

          <div className="div-for-submit-button-update-artist">
            {error && <p className="error">{error}</p>}
            <button className="submit-button-update-artist">
              SUBMIT CHANGES
            </button>
          </div>
        </div>
      </form>

      <div className="update-object-of-artist-details">
        <h3 className="update-one-artist-creations">CREATIONS</h3>
        <div className="all-creations-update-artist-page">
          {myCreations.map((element) => {
            return (
              <>
                <Link
                  // className="creations-images-one-artist"
                  to={`/profile/artists/updateobjectpage/${element._id}`}
                >
                  <img
                    className="update-creations-images-one-artist"
                    src={element.img}
                    alt={element.title}
                  />
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateArtist;
