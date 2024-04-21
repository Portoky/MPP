import { ChangeEvent } from "react";
import ListGroupMusic from "../components/musicComponents/ListGroupMusic";
import { useEffect, useState } from "react";
import NavButton from "../components/NavButton";
import Pagination from "@mui/material/Pagination";
import { elementsByPage } from "../utils/Utils";
import { MusicContext } from "../context/MusicContext";
import { useContext } from "react";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import "../assets/Home.css";
import ListGroupArtist from "../components/artistComponents/ListGroupArtist";
import { ArtistContext } from "../context/ArtistContext";

const Home = () => {
  const { musics, setMusics } = useContext(MusicContext);
  const { artists, setArtists } = useContext(ArtistContext);
  window.addEventListener("offline", () => {
    alert("You went offline! Check internet connection");
  });
  //generated value saved

  /*we dont want to use websockets now
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/backend-socket");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/generatedmusic", (message) => {
        const newMusic = JSON.parse(message.body);
        // console.log(newMusic.musicId);
        // if (!receivedIds.has(newMusic.musicId)) {
        //   setMusics((oldMusics) => [...oldMusics, newMusic]);
        //   setReceivedIds((oldRecievedIds) =>
        //     new Set(oldRecievedIds).add(newMusic.musicId)
        //   );
        // }
        axios
          .get("http://localhost:8080/music")
          .then((response) => {
            setMusics(response.data);
          })
          .catch((error) => {
            alert(error.message + ". Server might be down.");
          });
      });
    });
  }, []);*/

  //side effect
  useEffect(() => {
    axios
      .get("http://localhost:8080/music")
      .then((response) => {
        setMusics(response.data);
      })
      .catch((error) => {
        alert(error.message + ". Server might be down.");
      });
  }, []); //[] dependency so it renders once at mounting!
  useEffect(() => {
    axios
      .get("http://localhost:8080/artist")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        alert(error.message + ". Server might be down.");
      });
  }, []);

  const [filter, setFilter] = useState("");
  const [musicPage, setMusicPage] = useState(1);
  const [artistPage, setArtistPage] = useState(1);
  const handlefilterChage = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  //change page number thus elements shown
  const handleMusicPagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page <= musics.length / 5 + 1) setMusicPage(page);
  };

  const handleArtistPagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page <= artists.length / 5 + 1) setArtistPage(page);
  };

  //take the needed elements (depending on current page) from music list
  const musicsShown = musics.slice(
    (musicPage - 1) * elementsByPage,
    musicPage * elementsByPage
  ).length;

  const artistsShown = artists.slice(
    (artistPage - 1) * elementsByPage,
    artistPage * elementsByPage
  ).length;

  return (
    <>
      <div className="upperPart">
        <h1>Music forum</h1>
        <h5>Add, Modify, Remove melodies!</h5>
      </div>
      <div className="enitityList">
        <div className="ListGroupMusic">
          <div>
            <NavButton path="/music/add" className="btn btn-primary">
              Add Music
            </NavButton>{" "}
            <br></br>
            <NavButton path="/diagram" className="btn btn-outline-info">
              Check Rating Stats
            </NavButton>{" "}
            <br></br>
            <input
              type="text"
              id="filter"
              name="filter"
              onChange={handlefilterChage}
              value={filter}
              placeholder="Filter by title!"
            ></input>
          </div>
          <ListGroupMusic filter={filter} page={musicPage}></ListGroupMusic>
          <div className="paginationPart">
            <Pagination
              id="pagination"
              count={Math.ceil(musics.length / 5)}
              page={musicPage}
              onChange={handleMusicPagination}
            />
            <label>
              Showing from {(musicPage - 1) * elementsByPage + 1} to{" "}
              {(musicPage - 1) * elementsByPage + musicsShown} out of{" "}
              {musics.length}
            </label>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="ListGroupArtist">
          <div>
            <NavButton path="/artist/add/" className="btn btn-primary">
              Add Artist
            </NavButton>{" "}
          </div>
          <ListGroupArtist page={artistPage}></ListGroupArtist>{" "}
          <div className="paginationPart">
            <Pagination
              id="pagination"
              count={Math.ceil(artists.length / 5)}
              page={musicPage}
              onChange={handleArtistPagination}
            />
            <br></br>
            <label>
              Showing from {(artistPage - 1) * elementsByPage + 1} to{" "}
              {(artistPage - 1) * elementsByPage + artistsShown} out of{" "}
              {artists.length}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
