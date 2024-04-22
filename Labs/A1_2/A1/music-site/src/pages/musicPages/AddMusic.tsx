import { ChangeEvent, useContext } from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import "../../assets/AddMusic.css";
import { MusicRating } from "../../entities/Music";
import { useNavigate } from "react-router-dom";
import { ArtistContext } from "../../context/ArtistContext";
import Select from "react-select";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";

const AddMusic = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(MusicRating.ONESTAR);
  const [yearOfRelease, setYearOfRelease] = useState(-1);
  const [artistId, setArtistId] = useState(-1);
  const navigate = useNavigate();
  const { artists } = useContext(ArtistContext);
  const { isConnection } = useContext(ConnectionContext);

  const handleArtist = (opt) => {
    const artistId = opt.value;
    setArtistId(artistId);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleYearOfRelease = (event: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.target.value);
    setYearOfRelease(isNaN(inputNumber) ? -1 : inputNumber);
  };

  const updateLocalDb = async () => {
    const postData = {
      title,
      artistId,
      rating,
      yearOfRelease,
    };
    try {
      const id = await db.musics.add(postData);
      //updateting the artistMusicList too!
      const artistToAddMusic = await db.artists.get(artistId);
      if (artistToAddMusic) {
        const musicToAdd = await db.musics.get(id);
        if (musicToAdd) {
          artistToAddMusic.musicList.push(musicToAdd);
          const name = artistToAddMusic.name;
          const biography = artistToAddMusic.biography;
          const musicList = artistToAddMusic.musicList;
          const updateData = {
            name,
            biography,
            musicList,
          };
          await db.artists.update(artistId, updateData);
        }
      }
      console.log(id);
      navigate("/");
    } catch (error) {
      console.log("Couldnt save music in local repo");
    }
    return;
  };

  const updateServerDb = async () => {
    const postData = {
      title: title,
      rating: rating,
      yearOfRelease: yearOfRelease,
    };
    await fetch("http://localhost:8080/music/add/" + artistId, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleAddButtonClick = async () => {
    if (
      title === "" ||
      artistId === -1 ||
      yearOfRelease > 2024 ||
      yearOfRelease < 1000
    ) {
      alert("Invalid Music!");
      return;
    }

    //If no connection to DB!!
    if (isConnection === false) {
      //working!!
      updateLocalDb();
      return;
    }
    //else
    //sending a POST request
    updateServerDb();
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
