import React, { ChangeEvent, useContext, useState } from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { useNavigate, useParams } from "react-router-dom";
import { Artist } from "../../entities/Artist";
import "../../assets/EditMusic.css";

const EditArtist = () => {
  const { artists, setArtists } = useContext(ArtistContext);
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

  const [name, setName] = useState(newArtists[artistIndex].name);
  const [biography, setBiography] = useState(newArtists[artistIndex].biography);

  function handleName(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleBiography(event: ChangeEvent<HTMLInputElement>): void {
    setBiography(event.target.value);
  }
  const handleEditButtonClick = async () => {
    if (name === "" || biography === "") {
      alert("Invalid Music!");
      return;
    }

    const postData = {
      name: name,
      biography: biography,
    };
    await fetch("http://localhost:8080/artist/edit/" + artistId, {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
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
          <label>Name: </label> <br></br>
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
