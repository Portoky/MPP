import React from "react";
import { Music } from "../entities/Music";
import NavEditButton from "./NavEditButton";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import Alert from "./Alert";
import NavViewButton from "./NavViewButton";

interface ListGroupProps {
  musics: Music[];
  setMusics: (musics: Music[]) => void;
  filter: string;
  page: number;
}

const elementsByPage = 5;

const ListGroup = ({ musics, setMusics, filter, page }: ListGroupProps) => {
  const [indexToDelete, setIndexToDelete] = useState(-1);
  const onDelete = (selectedIndex: number) => {
    setIndexToDelete(selectedIndex);
  };

  if (musics.length === 0) {
    return <p>No item found!</p>;
  }

  const doDeletion = async () => {
    const newMusics = musics.slice();
    const deletedMusic = newMusics.splice(indexToDelete, 1);
    setMusics(newMusics);
    setIndexToDelete(-1);
    await fetch("http://localhost:8080/delete/" + deletedMusic[0].serialId, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Deletion successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
              key={music.serialId}
            >
              {music.artist + ": " + music.title + " - " + music.yearOfRelease}
              <br></br>
              <NavEditButton serialId={music.serialId}></NavEditButton>
              <NavViewButton serialId={music.serialId}></NavViewButton>
              <DeleteButton onClick={() => onDelete(index)}></DeleteButton>
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

export default ListGroup;
