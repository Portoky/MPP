import { ChangeEvent, useContext, useEffect } from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import "../../assets/AddMusic.css";
import { MusicRating } from "../../entities/Music";
import { useNavigate } from "react-router-dom";
import { ArtistContext } from "../../context/ArtistContext";
import Select from "react-select";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";
import axios from "axios";
import { Artist } from "../../entities/Artist";

const AddMusic = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(MusicRating.ONESTAR);
  const [yearOfRelease, setYearOfRelease] = useState(-1);
  const [artistId, setArtistId] = useState(-1);
  const [artistName, setArtistName] = useState("");
  const navigate = useNavigate();
  const { artists } = useContext(ArtistContext);
  const { isConnection } = useContext(ConnectionContext);

  const handleArtist = (opt) => {
    const artistId = opt.value;
    setArtistId(artistId);
    const artistName = opt.label;
    setArtistName(artistName);
    console.log(artistName);
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
    const response = await fetch(
      "http://localhost:8080/music/add/" + artistId,
      {
        method: "POST",
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
  const artistOptions: { label: string; value: number }[] = [];
  //options
  useEffect(() => {
    const getAllArtistFromServerDb = async () => {
      axios
        .get("http://localhost:8080/artist", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        })
        .then((response) => {
          const allArtists = response.data;
          allArtists.forEach((artist: Artist) => {
            artistOptions.push({ label: artist.name, value: artist.artistId });
          });
        });
    };
    const getAllArtistFromLocalDb = async () => {
      const allArtists = await db.artists.toArray();
      allArtists.forEach((artist: Artist) => {
        artistOptions.push({ label: artist.name, value: artist.artistId });
      });
    };
    if (isConnection) {
      getAllArtistFromServerDb();
    } else {
      getAllArtistFromLocalDb();
    }
  }, []);

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
