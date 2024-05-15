import DeleteButton from "../DeleteButton";
import { MusicContext } from "../../context/MusicContext";
import { useState, useContext, useEffect } from "react";
import Alert from "../Alert";
import axios from "axios";
import { elementsByPage } from "../../utils/Utils";
import NavButton from "../NavButton";
import { ArtistContext } from "../../context/ArtistContext";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";
import { Artist } from "../../entities/Artist";

interface ListGroupMusicProps {
  filter: string;
  page: number;
  setPage: (page: number) => void;
}

const ListGroupMusic = ({ filter, page, setPage }: ListGroupMusicProps) => {
  const { musics, setMusics } = useContext(MusicContext);
  const [indexToDelete, setIndexToDelete] = useState(-1);
  const { isConnection, setIsConnection } = useContext(ConnectionContext);
  if (musics.length === 0) {
    return <p>No item found!</p>;
  }

  const deleteFromLocalDb = async () => {
    try {
      await db.musics.delete(musics[indexToDelete].musicId);
      setMusics(musics.splice(indexToDelete, 1)); // it is for telling the useEffect that there is a change not so nice but whatever
      setIsConnection(false);
    } catch (error) {
      console.log("Couldnt update music in local repo");
    }
  };

  const deleteFromServerDb = async () => {
    await axios
      .delete(
        "http://localhost:8080/music/delete/" + musics[indexToDelete].musicId,
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

    //we need to refetch the elements so the list is updated
    await axios
      .get("http://localhost:8080/musicpage", {
        params: { offset: elementsByPage, page: page },
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
      deleteFromLocalDb();
      setIndexToDelete(-1);
      return;
    }
    deleteFromServerDb();
    setIndexToDelete(-1);
  };

  //so the popup dissappears
  const noDeletion = () => {
    setIndexToDelete(-1);
  };

  function filterFunction(filter: string, title: string) {
    if (filter.length === 0 || title.includes(filter)) {
      return true;
    }
    return false;
  }

  //const totalElements = musics.length;
  return (
    <>
      <ul data-testid="list" className="list-group">
        {musics
          .filter((music) => {
            return filterFunction(filter, music.title);
          })
          .map((music, index) => (
            <li className={"list-group-item list-group-item-dark"} key={index}>
              {/*(() => {
                const artist = currentPageArtists.find((artist) => {
                  return artist.artistId === music.artistId;
                });
                //console.log(music);
                const artistName = artist ? artist.name : "Unknown Artist";
                return `${artistName}: ${music.title} - ${music.yearOfRelease}`;
              })()*/}
              {(() => {
                return `${music.artistName}: ${music.title} - ${music.yearOfRelease}`;
              })()}
              <br></br>
              <NavButton /*FOR EDIT*/
                path={"/music/edit/" + music.musicId}
                className="btn btn-warning"
              >
                Edit music
              </NavButton>
              <NavButton /*FOR VIEW*/
                path={"/music/view/" + music.musicId}
                className="btn btn-info"
              >
                View music
              </NavButton>
              <DeleteButton
                onClick={() => onDeleteClick(index)}
                text="Delete Music"
              ></DeleteButton>
              {
                //conditional rendering wether we need popup or not
                indexToDelete === index && (
                  <div>
                    <br></br>
                    <Alert onClose={noDeletion} onConfirm={doDeletion}>
                      Are you sure you want to delete the melody?
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

export default ListGroupMusic;
