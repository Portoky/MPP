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
}

const ListGroup = ({ musics, setMusics, filter }: ListGroupProps) => {
  const [indexToDelete, setIndexToDelete] = useState(-1);

  const onDelete = (selectedIndex: number) => {
    setIndexToDelete(selectedIndex);
  };

  if (musics.length === 0) {
    return <p>No item found!</p>;
  }

  const doDeletion = () => {
    const newMusics = musics.slice();
    newMusics.splice(indexToDelete, 1);
    setMusics(newMusics);
    setIndexToDelete(-1);
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

  return (
    <>
      <ul data-testid="list" className="list-group">
        {musics
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
              <NavEditButton
                musics={musics}
                setMusic={setMusics}
                serialId={music.serialId}
              ></NavEditButton>
              <NavViewButton
                musics={musics}
                setMusic={setMusics}
                serialId={music.serialId}
              ></NavViewButton>
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
