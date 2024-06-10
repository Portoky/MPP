import React, { ChangeEvent, useContext } from "react";
import { useState } from "react";
import "../../assets/AddMusic.css";
import { useNavigate } from "react-router-dom";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { ArtistContext } from "../../context/ArtistContext";

const AddArtist = () => {
  const { isConnection } = useContext(ConnectionContext);
  const { artists, setArtists } = useContext(ArtistContext);
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const navigate = useNavigate();

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  function handleBiography(event: ChangeEvent<HTMLInputElement>): void {
    setBiography(event.target.value);
  }

  const addToLocalDb = async () => {
    const postData = {
      name,
      biography,
      musicList: [],
    };

    try {
      db.artists.add(postData).then((id) => {
        const updatedArtistsList = [
          ...artists,
          { artistId: id, name, biography, musicList: [] },
        ];
        setArtists(updatedArtistsList);
        navigate("/");
      });
    } catch (error) {
      console.log("Couldnt save artist in local repo");
    }
  };

  const addToServerDb = async () => {
    const postData = {
      name: name,
      biography: biography,
    };

    const response = await fetch("http://localhost:8080/artist/add", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
      },
    });
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
  async function handleAddButtonClick() {
    if (name === "" || biography === "") {
      alert("Invalid Arist!");
      return;
    }
    //If no connection to DB!!
    if (isConnection === false) {
      //working!!
      addToLocalDb();
      return;
    }
    addToServerDb();
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
