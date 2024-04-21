import { ChangeEvent, useContext } from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import "../../assets/AddMusic.css";
import { MusicRating } from "../../entities/Music";
import { useNavigate } from "react-router-dom";
import { ArtistContext } from "../../context/ArtistContext";
import { Artist } from "../../entities/Artist";
import Select from "react-select";

const AddMusic = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(MusicRating.ONESTAR);
  const [yearOfRelease, setYearOfRelease] = useState(-1);
  const [artist, setArtist] = useState<Artist | null>(null);
  const navigate = useNavigate();
  const { artists, setArtists } = useContext(ArtistContext);

  const handleArtist = (opt) => {
    const artistId = opt.value;
    const newArtist = artists.find((artist: Artist) => {
      return artistId === artist.artistId;
    });
    if (newArtist != null) setArtist(newArtist);
    console.log(artist);
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
      title === "" ||
      artist === null ||
      yearOfRelease > 2024 ||
      yearOfRelease < 1000
    ) {
      alert("Invalid Music!");
      return;
    }

    //sending a POST request
    const postData = {
      title: title,
      rating: rating,
      yearOfRelease: yearOfRelease,
    };
    await fetch("http://localhost:8080/music/add/" + artist.artistId, {
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
  };

  //options
  const artistOptions: { label: string; value: number }[] = [];
  artists.forEach((artist) => {
    artistOptions.push({ label: artist.name, value: artist.artistId });
  });

  return (
    <>
      <h2>Add music information</h2>
      <div className="input">
        <div className="input-item">
          <label>Choose artist: </label> <br></br>
          <Select
            className="artistSelect"
            options={artistOptions}
            onChange={handleArtist}
          ></Select>
        </div>
        <br></br>
        <div className="input-item">
          <label>Title:{""} </label> <br></br>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
            id="yearOfRelease"
            name="yearOfRelease"
            onChange={handleYearOfRelease}
            value={yearOfRelease === -1 || "" ? "" : yearOfRelease}
          ></input>
        </div>
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
    </>
  );
};

export default AddMusic;
