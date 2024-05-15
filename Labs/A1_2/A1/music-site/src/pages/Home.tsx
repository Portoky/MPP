import { ChangeEvent } from "react";
import ListGroupMusic from "../components/musicComponents/ListGroupMusic";
import { useEffect, useState } from "react";
import NavButton from "../components/NavButton";
import Pagination from "@mui/material/Pagination";
import { elementsByPage } from "../utils/Utils";
import { MusicContext } from "../context/MusicContext";
import { useContext } from "react";
import axios from "axios";
import "../assets/Home.css";
import ListGroupArtist from "../components/artistComponents/ListGroupArtist";
import { ArtistContext } from "../context/ArtistContext";
import { ConnectionContext } from "../context/ConnectionContext";
import { db } from "../db/db";
import { Artist } from "../entities/Artist";
import { Music } from "../entities/Music";
import { TrackCountContext } from "../context/TrackCountContext";
import { useNavigate } from "react-router-dom";

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

async function synchronizeArtistsThenMusic(artists: Artist[]) {
  artists.forEach(async (artist: Artist) => {
    const artistPostData = {
      name: artist.name,
      biography: artist.biography,
    };

    await fetch("http://localhost:8080/artist/add", {
      method: "POST",
      body: JSON.stringify(artistPostData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
      },
    })
      .then((response) => response.json())
      .then((responseArtist: Artist) => {
        console.log(artist);
        artist.musicList.forEach(async (music: Music) => {
          const musicPostData = {
            title: music.title,
            artistId: responseArtist,
            rating: music.rating,
            yearOfRelease: music.yearOfRelease,
          };
          await fetch(
            "http://localhost:8080/music/add/" + responseArtist.artistId,
            {
              method: "POST",
              body: JSON.stringify(musicPostData),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
        });
      })
      .catch((err) => {
        const message = err.message;
        if (message.includes("403")) {
          alert("You have no authorization to do that!");
        } else {
          alert(message);
        }
      });
  });
}
const Home = () => {
  const navigate = useNavigate();
  const { musics, setMusics } = useContext(MusicContext); //current musics on this page
  const { artists, setArtists } = useContext(ArtistContext); //current artists on this page
  const { isConnection, setIsConnection } = useContext(ConnectionContext);

  //const [queryMusics, setQueryMusics] = useState([]);
  //const [queryArtists, setQueryArtists] = useState([]);
  const [musicsCount, setMusicsCount] = useState(0); //number of all musics
  const [artistsCount, setArtistsCount] = useState(0); //number of all artists
  const { setTrackCountDict } = useContext(TrackCountContext);
  const [musicsShownCount, setMusicsShownCount] = useState(0);
  const [artistsShownCount, setArtistsShownCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [musicPage, setMusicPage] = useState(1);
  const [artistPage, setArtistPage] = useState(1);
  const handlefilterChage = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };
  window.addEventListener("offline", () => {
    alert("You went offline! Check internet connection");
  });

  const getArtistMusicCount = async (artistId?: number) => {
    if (isConnection === false) {
      return musics.filter((music) => music.artistId === artistId).length;
    } else {
      axios
        .get("http://localhost:8080/artist/view/count/" + artistId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        })
        .then((response) => {
          setTrackCountDict((prevTrackCountDict) => ({
            ...prevTrackCountDict,
            [artistId]: response.data,
          }));
          return response.data;
        })
        .catch(() => {
          return 0;
        });
    }
  };

  //side effect to check if we have authorization first
  useEffect(() => {
    const bearerToken = sessionStorage.getItem("bearerToken");
    if (!bearerToken) {
      // Redirect to the login page if bearer token doesn't exist
      navigate("/login");
    }
  }, [navigate]);

  //side effect just for checking if we have connection
  useEffect(() => {
    axios
      .get("http://localhost:8080/musicpage", {
        params: { offset: elementsByPage, page: musicPage },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      })
      .then(() => {
        setIsConnection(true); //checking if connection with server is still okay
      })
      .catch(() => {
        setIsConnection(false); //means the server might be down, we use the instoragedb
      });
  }, []);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //if connection with server is not made
  /*const queryMusics =
    useLiveQuery(() => {
      return db.musics.toArray();
    }) || []; //so it is not whining for undefined stuff
  const queryArtists =
    useLiveQuery(() => {
      return db.artists.toArray();
    }) || [];*/ //so it is not whining for undefined stuff
  let queryMusics: Music[] = [];
  let queryArtists: Artist[] = [];
  useEffect(() => {
    /////
    const fetchLocalDb = async () => {
      db.musics.toArray().then((musics) => {
        queryMusics = musics;
      });
      const musicsOnThisPage = queryMusics.slice(
        (musicPage - 1) * elementsByPage,
        musicPage * elementsByPage
      );

      db.artists.toArray().then((artists) => {
        queryArtists = artists;
      });
      const artistsOnThisPage = queryArtists.slice(
        (musicPage - 1) * elementsByPage,
        musicPage * elementsByPage
      );
      setMusics(musicsOnThisPage);
      setArtists(artistsOnThisPage);

      setMusicsShownCount(
        musics.slice(
          (musicPage - 1) * elementsByPage,
          musicPage * elementsByPage
        ).length
      );
      setArtistsShownCount(
        artists.slice(
          (artistPage - 1) * elementsByPage,
          artistPage * elementsByPage
        ).length
      );
    };
    const fetchServerDb = async () => {
      //queryArtists = db.artists.toArray();
      synchronizeArtistsThenMusic(queryArtists);
      axios
        .get("http://localhost:8080/musicpage", {
          params: { offset: elementsByPage, page: musicPage },
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        })
        .then((response) => {
          setMusics(response.data);
          setMusicsCount(parseInt(response.headers["allmusiccount"]));
          setIsConnection(true); //checking if connection with server is still okay
        })
        .catch((error) => {
          console.log(error.message);
          setIsConnection(false); //means the server might be down, we use the instoragedb
        });

      axios
        .get("http://localhost:8080/artistpage", {
          params: { offset: elementsByPage, page: artistPage },
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        })
        .then((response) => {
          setArtists(response.data);
          setArtistsCount(parseInt(response.headers["allartistcount"]));
          setIsConnection(true);
        })
        .catch((error) => {
          setIsConnection(false); //means the server might be down, we use the instoragedb
        });
      db.deleteAll();
      setMusicsShownCount(musics.length);
      setArtistsShownCount(artists.length);
    };
    /////
    if (isConnection === false) {
      //connection lost
      fetchLocalDb();
    } else {
      //connection back, update server
      fetchServerDb();
    }
  }, [isConnection, artistPage, musicPage]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/artist/view/count", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      })
      .then((response) => {
        setTrackCountDict(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  //take the needed elements (depending on current page) from music list

  //change page number thus elements shown
  const handleMusicPagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page <= musicsCount / 5 + 1) setMusicPage(page);
  };

  const handleArtistPagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page <= artistsCount / 5 + 1) setArtistPage(page);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("bearerToken");
    navigate("/login");
  };
  return (
    <>
      <div className="upperPart">
        <h1>Music forum</h1>
        <h5>Add, Modify, Remove melodies!</h5>
      </div>
      <div className="enitityList">
        <div className="ListGroupMusic">
          <h3>Melodies:</h3>
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
          <ListGroupMusic
            filter={filter}
            page={musicPage}
            setPage={setMusicPage}
          ></ListGroupMusic>
          <div className="paginationPart">
            <Pagination
              id="pagination"
              count={Math.ceil(musicsCount / 5)}
              page={musicPage}
              onChange={handleMusicPagination}
            />
            <label>
              Showing from {(musicPage - 1) * elementsByPage + 1} to{" "}
              {(musicPage - 1) * elementsByPage + musicsShownCount} out of{" "}
              {musicsCount}
            </label>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="ListGroupArtist">
          <h3>Artists:</h3>
          <div>
            <NavButton path="/artist/add/" className="btn btn-primary">
              Add Artist
            </NavButton>{" "}
          </div>
          <ListGroupArtist
            page={artistPage}
            setPage={setArtistPage}
          ></ListGroupArtist>{" "}
          <div className="paginationPart">
            <Pagination
              id="pagination"
              count={Math.ceil(artistsCount / 5)}
              page={artistPage}
              onChange={handleArtistPagination}
            />
            <br></br>
            <label>
              Showing from {(artistPage - 1) * elementsByPage + 1} to{" "}
              {(artistPage - 1) * elementsByPage + artistsShownCount} out of{" "}
              {artistsCount}
            </label>
          </div>
        </div>
      </div>
      <button className="btn btn-outline-info" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Home;
