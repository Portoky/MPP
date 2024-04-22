import DeleteButton from "../DeleteButton";
import { MusicContext } from "../../context/MusicContext";
import { useState, useContext } from "react";
import Alert from "../Alert";
import axios from "axios";
import { elementsByPage } from "../../utils/Utils";
import NavButton from "../NavButton";
import { ArtistContext } from "../../context/ArtistContext";
import { ConnectionContext } from "../../context/ConnectionContext";
import { db } from "../../db/db";

interface ListGroupMusicProps {
  filter: string;
  page: number;
}

const ListGroupMusic = ({ filter, page }: ListGroupMusicProps) => {
  const { musics, setMusics } = useContext(MusicContext);
  const { artists } = useContext(ArtistContext);
  const [indexToDelete, setIndexToDelete] = useState(-1);
  const { isConnection } = useContext(ConnectionContext);

  if (musics.length === 0) {
    return <p>No item found!</p>;
  }

  const deleteFromLocalDb = async () => {
    try {
      await db.musics.delete(musics[indexToDelete].musicId);
      setMusics([]); // it is for telling the useEffect that there is a change not so nice but whatever
    } catch (error) {
      console.log("Couldnt update music in local repo");
    }
  };

  const deleteFromServerDb = async () => {
    await axios
      .delete(
        "http://localhost:8080/music/delete/" + musics[indexToDelete].musicId
      )
      .then(() => {
        console.log("Deletion successful");
      })
      .catch((err) => {
        console.log(err.message);
      });

    //we need to refetch the elements so the list is updated
    await axios
      .get("http://localhost:8080/music")
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
  const musicsOnThisPage = musics.slice(
    (page - 1) * elementsByPage,
    page * elementsByPage
  );
  return (
    <>
      <ul data-testid="list" className="list-group">
        {musicsOnThisPage
          .filter((music) => {
            return filterFunction(filter, music.title);
          })
          .map((music, index) => (
            <li className={"list-group-item list-group-item-dark"} key={index}>
              {(() => {
                const artist = artists.find((artist) => {
                  return artist.artistId === music.artistId;
                });
                //console.log(music);
                const artistName = artist ? artist.name : "Unknown Artist";
                return `${artistName}: ${music.title} - ${music.yearOfRelease}`;
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
