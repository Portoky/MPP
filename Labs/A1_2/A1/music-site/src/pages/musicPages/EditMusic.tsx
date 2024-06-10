import { ChangeEvent } from "react";
import { Music } from "../../entities/Music";
import Rating from "@mui/material/Rating";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { MusicContext } from "../../context/MusicContext";
import "../../assets/EditMusic.css";
import Select from "react-select";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";
import axios from "axios";
import { Artist } from "../../entities/Artist";

const EditMusic = () => {
  const { musics } = useContext(MusicContext);
  const { isConnection } = useContext(ConnectionContext);
  const [artistName, setArtistName] = useState("");
  const navigate = useNavigate();

  const param = useParams();
  const stringmusicId = param["id"] || "-1";
  const musicId = parseInt(stringmusicId);

  const newMusics = musics.slice();
  const musicIndex = newMusics.findIndex((music: Music) => {
    return music.musicId === musicId;
  });

  const artistOptions: { label: string; value: number }[] = [];
  //options
  useEffect(() => {
    if (sessionStorage.getItem("role") === "ADMIN") {
      axios
        .get("http://localhost:8080/artist", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          const allArtists = response.data;
          allArtists.forEach((artist: Artist) => {
            artistOptions.push({
              label: artist.name,
              value: artist.artistId || 0,
            });
          });
        });
    }
    if (sessionStorage.getItem("role") == "ARTIST") {
      axios
        .get(
          "http://localhost:8080/artist/name/" +
            sessionStorage.getItem("username"),
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
            },
          }
        )
        .then((response) => {
          const artist: Artist = response.data;
          artistOptions.push({
            label: artist.name,
            value: artist.artistId || 0,
          });
        });
    }
  }, []);

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
    const artistName = opt.label;
    setArtistName(artistName);
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
      artistName,
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
    const response = await fetch(
      "http://localhost:8080/music/edit/" +
        stringmusicId +
        "/artist/" +
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
