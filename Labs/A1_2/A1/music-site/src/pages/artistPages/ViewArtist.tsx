import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { useParams } from "react-router-dom";
import { Artist } from "../../entities/Artist";
import { Music } from "../../entities/Music";
import "../../assets/ViewMusic.css";
import axios from "axios";
import { ConnectionContext } from "../../context/ConnectionContext";
import { MusicContext } from "../../context/MusicContext";
import { TrackCountContext } from "../../context/TrackCountContext";
import { elementsByPage } from "../../utils/Utils";

const ViewArtist = () => {
  const { artists } = useContext(ArtistContext);
  const { musics } = useContext(MusicContext);
  const { trackCountDict } = useContext(TrackCountContext);
  const { isConnection } = useContext(ConnectionContext);
  const [artistMusic, setArtistMusic] = useState<Music[]>([]);
  const [artistMusicPage, setArtistMusicPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [musicCount, setMusicCount] = useState(0);
  const param = useParams();
  const stringartistId = param["id"] || "-1";
  const artistId = parseInt(stringartistId);
  const artistIndex = artists.findIndex((artist: Artist) => {
    return artist.artistId === artistId;
  });

  useEffect(() => {
    if (isConnection === false) {
      setMusicCount(
        musics.filter((music) => music.artistId === artistId).length
      );
    } else {
      axios
        .get(
          "https://mpp-marci-spring-app-20240517184709.azuremicroservices.io/artist/view/count/" +
            artistId,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
            },
          }
        )
        .then((response) => {
          setMusicCount(response.data);
        })
        .catch(() => {
          setMusicCount(0);
        });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (isConnection === false) {
      const filteredMusics: Music[] = musics.filter(
        (music) => music.artistId === artistId
      );
      setArtistMusic(filteredMusics);
    } else {
      axios
        .get(
          "https://mpp-marci-spring-app-20240517184709.azuremicroservices.io/music/artist/" +
            artistId,
          {
            params: { offset: 20, page: artistMusicPage },
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
            },
          }
        )
        .then((response) => {
          setArtistMusic((prevArtistMusic) => {
            return [...new Set([...prevArtistMusic, ...response.data])];
          });
          setHasMore(response.data.length > 0);
          setLoading(false);
        })
        .catch((err) => {
          const message = err.message;
          if (message.includes("403")) {
            alert("You have no authorization to look at other artists musics!");
          } else {
            alert(err.message + ". Server might be down.");
          }
        });
    }
  }, [artistMusicPage]);

  const observerLast = useRef();
  //its a js code this is why all the red part

  const lastMusicRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerLast.current) observerLast.current.disconnect();
      observerLast.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setArtistMusicPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observerLast.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <h2>View artist information</h2>
      <div className="viewInfo">
        <p>Serial Id: {artists[artistIndex].artistId}</p>
        <p>Artist Name: {artists[artistIndex].name}</p>
        <p>Biography: {artists[artistIndex].biography}</p>
        <p>
          Number of songs written by artist:{" "}
          {trackCountDict[artists[artistIndex].artistId] || 0}
        </p>
        <ul className="list-group">
          {artistMusic.length === 0 ? (
            <></>
          ) : (
            artistMusic.map((music: Music, index) => {
              if (index === artistMusic.length - 1) {
                return (
                  <li
                    ref={lastMusicRef}
                    style={{ width: "30%" }}
                    key={music.musicId}
                    className="list-group-item"
                  >
                    {music.title}
                  </li>
                );
              } else {
                return (
                  <li
                    style={{ width: "30%" }}
                    key={music.musicId}
                    className="list-group-item"
                  >
                    {music.title}
                  </li>
                );
              }
            })
          )}
        </ul>
        <div>{loading && "Loading..."}</div>
      </div>
    </>
  );
};

export default ViewArtist;
