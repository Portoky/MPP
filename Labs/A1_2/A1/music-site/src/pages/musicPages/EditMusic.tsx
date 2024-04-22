import { ChangeEvent } from "react";
import { Music } from "../../entities/Music";
import Rating from "@mui/material/Rating";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { ArtistContext } from "../../context/ArtistContext";
import "../../assets/EditMusic.css";
import Select from "react-select";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";

const EditMusic = () => {
  const { musics } = useContext(MusicContext);
  const { artists } = useContext(ArtistContext);
  const { isConnection } = useContext(ConnectionContext);
  const navigate = useNavigate();

  const param = useParams();
  const stringmusicId = param["id"] || "-1";
  const musicId = parseInt(stringmusicId);

  const newMusics = musics.slice();
  const musicIndex = newMusics.findIndex((music: Music) => {
    return music.musicId === musicId;
  });
  if (musicId === -1) {
    return <p>Element not found!</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [artistId, setArtistId] = useState(-1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [title, setTitle] = useState(newMusics[musicIndex].title);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rating, setRating] = useState(newMusics[musicIndex].rating);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [yearOfRelease, setYearOfRelease] = useState(
    newMusics[musicIndex].yearOfRelease
  );

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
      db.musics.update(musicId, postData);
      navigate("/");
    } catch (error) {
      console.log("Couldnt update artist in local repo");
    }
  };

  const updateServerDb = async () => {
    const postData = {
      title: title,
      rating: rating,
      yearOfRelease: yearOfRelease,
    };
    await fetch(
      "http://localhost:8080/music/edit/" +
        stringmusicId +
        "/artist/" +
        artistId,
      {
        method: "PUT",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleEditButtonClick = async () => {
    if (
      title === "" ||
      artistId === -1 ||
      yearOfRelease > 2024 ||
      yearOfRelease < 1000
    ) {
      alert("Invalid Music!");
      return;
    }
    if (isConnection === false) {
      updateLocalDb();
      return;
    }
    updateServerDb();
  };

  const artistOptions: { label: string; value: number }[] = [];
  artists.forEach((artist) => {
    artistOptions.push({ label: artist.name, value: artist.artistId });
  });
  return (
    <>
      <h2>Edit music information with serialNumber -&gt; {musicId}</h2>
      <div className="input">
        <div className="input-item">
          <label>Artist: </label> <br></br>
          <Select
            className="artistSelect"
            options={artistOptions}
            onChange={handleArtist}
          ></Select>
        </div>
        <br></br>
        <div className="input-item">
          <label>Title: </label> <br></br>
          <input
            type="text"
            className="form-control"
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
            defaultValue={newMusics[musicIndex].yearOfRelease}
            onChange={handleYearOfRelease}
          ></input>
        </div>
      </div>
      <br></br>
      <button
        type="button"
        style={{ marginLeft: "10px" }}
        className="btn btn-outline-success"
        onClick={handleEditButtonClick}
      >
        Edit Music
      </button>
    </>
  );
};

export default EditMusic;
