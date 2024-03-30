import { ChangeEvent } from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import "./AddMusic.css";
import { MusicRating } from "../entities/Music";
const AddMusic = () => {
  const [artist, setartist] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(MusicRating.ONESTAR);
  const [yearOfRelease, setYearOfRelease] = useState(-1);

  const handleArtist = (event: ChangeEvent<HTMLInputElement>) => {
    setartist(event.target.value);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleYearOfRelease = (event: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.target.value);
    setYearOfRelease(isNaN(inputNumber) ? -1 : inputNumber);
  };

  const handleAddButtonClick = async () => {
    if (
      title == "" ||
      artist == "" ||
      yearOfRelease > 2024 ||
      yearOfRelease < 1000
    ) {
      return;
    }

    //sending a POST request
    const postData = {
      title: title,
      artist: artist,
      rating: rating,
      yearOfRelease: yearOfRelease,
    };
    await fetch("http://localhost:8080/pages/addmusic", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <h2>Add music information</h2>
      <div className="input">
        <div className="input-item">
          <label>Artist: </label> <br></br>
          <input
            type="text"
            id="artist"
            name="artist"
            onChange={handleArtist}
            value={artist}
          ></input>
        </div>
        <br></br>
        <div className="input-item">
          <label>Title:{""} </label> <br></br>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleTitle}
            value={title}
          ></input>
        </div>
        <br></br>
        <div className="input-item">
          <label>Rating: </label> <br></br>
          <Rating
            name="rating"
            value={rating}
            onChange={(_event, newRating) => {
              setRating(newRating || 1);
            }}
          />
        </div>
        <br></br>
        <div className="input-item">
          <label>Release Year: </label> <br></br>
          <input
            type="number"
            id="yearOfRelease"
            name="yearOfRelease"
            onChange={handleYearOfRelease}
            value={yearOfRelease === -1 || "" ? "" : yearOfRelease}
          ></input>
        </div>
      </div>
      <br></br>
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={handleAddButtonClick}
      >
        Add Music
      </button>
    </>
  );
};

export default AddMusic;
