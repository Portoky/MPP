import { ArtistContext } from "../../context/ArtistContext";
import { useContext, useState } from "react";
import axios from "axios";
import NavButton from "../NavButton";
import DeleteButton from "../DeleteButton";
import Alert from "../Alert";
import { elementsByPage } from "../../utils/Utils";
import { MusicContext } from "../../context/MusicContext";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";
import { TrackCountContext } from "../../context/TrackCountContext";
interface ListGroupArtistProps {
  page: number;
  setPage: (page: number) => void;
}

const ListGroupArtist = ({ page, setPage }: ListGroupArtistProps) => {
  const { artists, setArtists } = useContext(ArtistContext);
  const { musics } = useContext(MusicContext);
  const { setMusics } = useContext(MusicContext);
  const { isConnection, setIsConnection } = useContext(ConnectionContext);
  const { trackCountDict } = useContext(TrackCountContext);
  const [indexToDelete, setIndexToDelete] = useState(-1);

  if (artists.length === 0) {
    return <p>No item found!</p>;
  }

  const deleteFromLocalDb = async () => {
    try {
      await db.artists.delete(artists[indexToDelete].artistId);
      //deleting associated musics
      const artistMusics = musics.filter((musics) => {
        return musics.artistId === artists[indexToDelete].artistId;
      });
      artistMusics.forEach(async (music) => {
        await db.musics.delete(music.musicId);
      });
      setArtists(artists.splice(indexToDelete, 1)); // it is for telling the useEffect that there is a change not so nice but whatever
      setIsConnection(false);
    } catch (error) {
      console.log("Couldnt update artist in local repo: " + error.message);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const deleteFromServerDb = async () => {
    await axios
      .delete(
        "http://localhost:8080/artist/delete/" +
          artists[indexToDelete].artistId,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        }
      )
      .then(() => {
        console.log("Deletion successful");
      })
      .catch((err) => {
        const message = err.message;
        if (message.includes("403")) {
          alert("You have no authorization to do that!");
        } else {
          alert(message);
        }
      });
    setPage(1);
    //we need to refetch the elements so the list is updated
    axios
      .get("http://localhost:8080/artistpage", {
        params: { offset: elementsByPage, page: page },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      })
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        alert(error.message + ". Server might be down.");
      });
    await axios
      .get("http://localhost:8080/musicpage", {
        params: { offset: elementsByPage, page: 1 },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      })
      .then((response) => {
        setMusics(response.data);
      })
      .catch((error) => {
        alert(error.message + ". Server might be down.");
      });
  };

  const onDeleteClick = (selectedIndex: number) => {
    setIndexToDelete(selectedIndex);
  };

  const doDeletion = async () => {
    if (isConnection === false) {
      //in case of no server connection
      deleteFromLocalDb();
      setIndexToDelete(-1);
      return;
    }
    deleteFromServerDb();
    setIndexToDelete(-1);
  };

  const noDeletion = () => {
    setIndexToDelete(-1);
  };

  return (
    <>
      <ul data-testid="list" className="list-group">
        {artists.map((artist, index) => (
          <li
            className={"list-group-item list-group-item-dark"}
            key={artist.artistId}
          >
            {artist.name}
            <br></br>
            {artist.biography}
            <br></br>
            MusicTrack Counter: {trackCountDict[artist.artistId] || 0}
            <br></br>
            {(sessionStorage.getItem("role") === "ADMIN" ||
              (sessionStorage.getItem("role") === "ARTIST" &&
                sessionStorage.getItem("username") === artist.name)) && (
              <>
                <NavButton /*FOR EDIT*/
                  path={"/artist/edit/" + artist.artistId}
                  className="btn btn-warning"
                >
                  Edit artist
                </NavButton>
              </>
            )}
            <NavButton /*FOR VIEW*/
              path={"/artist/view/" + artist.artistId}
              className="btn btn-info"
            >
              View artist
            </NavButton>
            {sessionStorage.getItem("role") === "ADMIN" && (
              <>
                <DeleteButton
                  text="Delete Artist"
                  onClick={() => onDeleteClick(index)}
                ></DeleteButton>
              </>
            )}
            {
              //conditional rendering wether we need popup or not
              indexToDelete === index && (
                <div>
                  <br></br>
                  <Alert onClose={noDeletion} onConfirm={doDeletion}>
                    Are you sure you want to delete the artist?
                  </Alert>
                </div>
              )
            }
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroupArtist;
