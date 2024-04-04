import { ChangeEvent } from "react";
import { Music } from "../entities/Music";
import Rating from "@mui/material/Rating";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { MusicContext } from "../context/MusicContext";
import { useContext } from "react";
import "../assets/EditMusic.css";

const EditMusic = () => {
  const { musics, setMusics } = useContext(MusicContext);

  const navigate = useNavigate();

  const param = useParams();
  const stringSerialId = param["id"] || "-1";
  const serialId = parseInt(stringSerialId);

  const newMusics = musics.slice();
  const musicIndex = newMusics.findIndex((music: Music) => {
    return music.serialId === serialId;
  });
  if (serialId === -1) {
    return <p>Element not found!</p>;
  }

  const [artist, setartist] = useState(newMusics[musicIndex].artist);
  const [title, setTitle] = useState(newMusics[musicIndex].title);
  const [rating, setRating] = useState(newMusics[musicIndex].rating);
  const [yearOfRelease, setYearOfRelease] = useState(
    newMusics[musicIndex].yearOfRelease
  );

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

  const handleEditButtonClick = async () => {
    if (
      title == "" ||
      artist == "" ||
      yearOfRelease > 2024 ||
      yearOfRelease < 1000
    ) {
      alert("Invalid Music!");
      return;
    }

    const postData = {
      title: title,
      artist: artist,
      rating: rating,
      yearOfRelease: yearOfRelease,
    };
    await fetch("http://localhost:8080/edit/" + stringSerialId, {
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

    //newMusics[musicIndex].artist = artist;
    //newMusics[musicIndex].title = title;
    //newMusics[musicIndex].rating = rating;
    //newMusics[musicIndex].yearOfRelease = yearOfRelease;
    //setMusics(newMusics);
  };

  return (
    <>
      <h2>Edit music information with serialNumber -&gt; {serialId}</h2>
      <div className="input">
        <div className="input-item">
          <label>Artist: </label> <br></br>
          <input
            type="text"
            id="artist"
            name="artist"
            defaultValue={newMusics[musicIndex].artist}
            onChange={handleArtist}
          ></input>
        </div>
        <br></br>
        <div className="input-item">
          <label>Title: </label> <br></br>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={newMusics[musicIndex].title}
            onChange={handleTitle}
          ></input>
        </div>
        <br></br>
        <div className="input-item">
          <label>Rating: </label> <br></br>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newRating) => {
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
            defaultValue={newMusics[musicIndex].yearOfRelease}
            onChange={handleYearOfRelease}
          ></input>
        </div>
      </div>
      <br></br>
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={handleEditButtonClick}
      >
        Edit Music
      </button>
    </>
  );
};

export default EditMusic;
