import React from "react";
import { Music } from "../../entities/Music";
import DeleteButton from "../DeleteButton";
import { MusicContext } from "../../context/MusicContext";
import { useState, useContext } from "react";
import Alert from "../Alert";
import axios from "axios";
import { elementsByPage } from "../../utils/Utils";
import NavButton from "../NavButton";

interface ListGroupMusicProps {
  filter: string;
  page: number;
}

const ListGroupMusic = ({ filter, page }: ListGroupMusicProps) => {
  const { musics, setMusics } = useContext(MusicContext);

  const [indexToDelete, setIndexToDelete] = useState(-1);

  if (musics.length === 0) {
    return <p>No item found!</p>;
  }

  const onDeleteClick = (selectedIndex: number) => {
    setIndexToDelete(selectedIndex);
  };

  const doDeletion = async () => {
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

    setIndexToDelete(-1);

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
            <li
              className={"list-group-item list-group-item-dark"}
              key={music.musicId}
            >
              {music.artist === null
                ? "Unknown: " + music.title + " - " + music.yearOfRelease
                : music.artist.name +
                  ": " +
                  music.title +
                  " - " +
                  music.yearOfRelease}{" "}
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
