import { ChangeEvent, useContext, useState } from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { useNavigate, useParams } from "react-router-dom";
import { Artist } from "../../entities/Artist";
import "../../assets/EditMusic.css";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";

const EditArtist = () => {
  const { artists } = useContext(ArtistContext);
  const { isConnection } = useContext(ConnectionContext);
  const navigate = useNavigate();

  const param = useParams();
  const stringartistId = param["id"] || "-1";
  const artistId = parseInt(stringartistId);

  const newArtists = artists.slice();
  const artistIndex = newArtists.findIndex((artist: Artist) => {
    return artist.artistId === artistId;
  });
  if (artistId === -1) {
    return <p>Element not found!</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState(newArtists[artistIndex].name);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [biography, setBiography] = useState(newArtists[artistIndex].biography);

  function handleName(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleBiography(event: ChangeEvent<HTMLInputElement>): void {
    setBiography(event.target.value);
  }

  const updateLocalDb = async () => {
    const postData = {
      name,
      biography,
    };
    try {
      db.artists.update(artistId, postData);
      navigate("/");
    } catch (error) {
      console.log("Couldnt update artist in local repo");
    }
  };

  const updateServerDb = async () => {
    const postData = {
      name: name,
      biography: biography,
    };
    const response = await fetch(
      "https://mpp-marci-spring-app-20240517184709.azuremicroservices.io/artist/edit/" +
        artistId,
      {
        method: "PUT",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      }
    );
    if (!response.ok) {
      if (response.status === 403) {
        alert("You have no authorization to do that!");
        navigate("/");
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } else {
      navigate("/");
    }
  };

  const handleEditButtonClick = async () => {
    if (name === "" || biography === "") {
      alert("Invalid Music!");
      return;
    }

    if (isConnection === false) {
      //working!!
      updateLocalDb();
      return;
    }
    updateServerDb();
  };
  return (
    <>
      <h2>Edit artist information with serialNumber -&gt; {artistId}</h2>
      <div className="input">
        <div className="input-item">
          <label>Name: </label> <br></br>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            defaultValue={newArtists[artistIndex].name}
            onChange={handleName}
          ></input>
        </div>
        <br></br>
        <div className="input-item">
          <label>Biography: </label> <br></br>
          <input
            type="text"
            className="form-control"
            id="biography"
            name="biography"
            defaultValue={newArtists[artistIndex].biography}
            onChange={handleBiography}
          ></input>
        </div>
        <br></br>
        <button
          type="button"
          style={{ marginLeft: "10px", width: "30%" }}
          className="btn btn-outline-success"
          onClick={handleEditButtonClick}
        >
          Edit Artist
        </button>
      </div>
    </>
  );
};

export default EditArtist;
