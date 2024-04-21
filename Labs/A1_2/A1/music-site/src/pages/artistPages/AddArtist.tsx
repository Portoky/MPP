import React, { ChangeEvent } from "react";
import { useState } from "react";
import "../../assets/AddMusic.css";
import { useNavigate } from "react-router-dom";

const AddArtist = () => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const navigate = useNavigate();
  //const [musicTracks, setMusicTracks] = useState([]);

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  function handleBiography(event: ChangeEvent<HTMLInputElement>): void {
    setBiography(event.target.value);
  }

  async function handleAddButtonClick() {
    if (name === "" || biography === "") {
      alert("Invalid Arist!");
      return;
    }

    const postData = {
      name: name,
      biography: biography,
    };

    await fetch("http://localhost:8080/artist/add", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <h2>Add Artist details</h2>
      <div className="input">
        <div className="input-item">
          <label>Artist's Name:</label>
          <br></br>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleName}
            value={name}
          ></input>
        </div>
        <div className="input-item">
          <label>Artist's biography:</label>
          <br></br>
          <input
            type="text"
            className="form-control"
            id="biography"
            name="biography"
            onChange={handleBiography}
            value={biography}
          ></input>
        </div>
        <br></br>
        <div className="input-item">
          <button
            style={{ marginLeft: "10px" }}
            type="button"
            className="btn btn-outline-success"
            onClick={handleAddButtonClick}
          >
            Add Music
          </button>
        </div>
      </div>
    </>
  );
};

export default AddArtist;
