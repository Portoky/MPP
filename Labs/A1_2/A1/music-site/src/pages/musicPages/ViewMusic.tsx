import React from "react";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { MusicContext } from "../../context/MusicContext";
import { useContext } from "react";
import { Music } from "../../entities/Music";
import "../../assets/ViewMusic.css";
import { ArtistContext } from "../../context/ArtistContext";

const ViewMusic = () => {
  const { musics } = useContext(MusicContext);
  const { artists } = useContext(ArtistContext);

  //get the id from the url
  const param = useParams();
  const stringmusicId = param["id"] || "-1";
  const musicId = parseInt(stringmusicId);
  const musicIndex = musics.findIndex((music: Music) => {
    return music.musicId === musicId;
  });
  //get artist of music
  return (
    <>
      <h2>View music information with serialNumber -&gt; {musicId}</h2>
      <div className="viewInfo">
        <p>Serial Id: {musics[musicIndex].musicId}</p>
        <p>Band Name: {musics[musicIndex].artistName}</p>
        <p>Song Title: {musics[musicIndex].title}</p>
        <p>
          Rating:{" "}
          <Rating name="read-only" value={musics[musicIndex].rating} readOnly />
        </p>
        <p>Release Year: {musics[musicIndex].yearOfRelease}</p>
      </div>
    </>
  );
};

export default ViewMusic;
