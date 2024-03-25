import React from "react";
import Rating from "@mui/material/Rating";
import { Music } from "../App";
import { useParams } from "react-router-dom";

interface ViewMusicProps {
  musics: Music[];
}

const ViewMusic = ({ musics }: ViewMusicProps) => {
  const param = useParams();
  const stringSerialId = param["id"] || "-1";
  const serialId = parseInt(stringSerialId);
  const musicIndex = musics.findIndex((music: Music) => {
    return music.serialId === serialId;
  });
  return (
    <>
      <h2>View music information with serialNumber -&gt; {serialId}</h2>
      <div className="viewInfo" style={{ marginLeft: "15px" }}>
        <p>Serial Id: {musics[musicIndex].serialId}</p>
        <p>Band Name: {musics[musicIndex].artist}</p>
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
