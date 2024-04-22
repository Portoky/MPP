import React, { useContext, useEffect, useState } from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { useParams } from "react-router-dom";
import { Artist } from "../../entities/Artist";
import { Music } from "../../entities/Music";
import "../../assets/ViewMusic.css";
import axios from "axios";
import { ConnectionContext } from "../../context/ConnectionContext";
import { MusicContext } from "../../context/MusicContext";

const ViewArtist = () => {
  const { artists } = useContext(ArtistContext);
  const { musics } = useContext(MusicContext);
  const { isConnection } = useContext(ConnectionContext);
  const [artistMusic, setArtistMusic] = useState<Music[]>([]);

  const param = useParams();
  const stringartistId = param["id"] || "-1";
  const artistId = parseInt(stringartistId);
  const artistIndex = artists.findIndex((artist: Artist) => {
    return artist.artistId === artistId;
  });

  useEffect(() => {
    if (isConnection === false) {
      const filteredMusics: Music[] = musics.filter(
        (music) => music.artistId === artistId
      );
      setArtistMusic(filteredMusics);
    } else {
      axios
        .get("http://localhost:8080/music/artist/" + artistId)
        .then((response) => {
          setArtistMusic(response.data);
        })
        .catch((error) => {
          alert(error.message + ". Server might be down.");
        });
    }
  }, []);
  return (
    <>
      <h2>View artist information</h2>
      <div className="viewInfo">
        <p>Serial Id: {artists[artistIndex].artistId}</p>
        <p>Artist Name: {artists[artistIndex].name}</p>
        <p>Biography: {artists[artistIndex].biography}</p>
        <ul className="list-group">
          {artistMusic.length === 0 ? (
            <li className="list-group-item">
              No music made by this artist so far
            </li>
          ) : (
            artistMusic.map((music: Music) => (
              <li
                style={{ width: "30%" }}
                key={music.musicId}
                className="list-group-item"
              >
                {music.title}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default ViewArtist;
