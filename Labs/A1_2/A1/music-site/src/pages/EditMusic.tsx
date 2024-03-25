import { ChangeEvent } from "react";
import { Music } from "../entities/Music";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { useState } from "react";
interface EditMusicProps {
  musics: Music[];
  setMusics: (musics: Music[]) => void;
}

const EditMusic = ({ musics, setMusics }: EditMusicProps) => {
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

  const handleEditButtonClick = () => {
    if (
      title == "" ||
      artist == "" ||
      yearOfRelease > 2024 ||
      yearOfRelease < 1000
    )
      return;
    newMusics[musicIndex].artist = artist;
    newMusics[musicIndex].title = title;
    newMusics[musicIndex].rating = rating;
    newMusics[musicIndex].yearOfRelease = yearOfRelease;
    setMusics(newMusics);
  };

  return (
    <>
      <h2>Edit music information with serialNumber -&gt; {serialId}</h2>
      <div className="input" style={{ marginLeft: "15px" }}>
        <div className="input-item">
          <label>Artist: </label> <br></br>
          <input
            type="text"
            id="artist"
            name="artist"
            defaultValue={newMusics[musicIndex].artist}
            onChange={handleArtist}
            //value={artist}
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
            //value={title}
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
            //value={yearOfRelease === -1 || "" ? "" : yearOfRelease}
          ></input>
        </div>
      </div>
      <br></br>
      <button
        style={{ marginLeft: "15px" }}
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
