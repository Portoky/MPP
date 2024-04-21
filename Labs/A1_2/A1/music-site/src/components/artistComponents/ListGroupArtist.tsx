import React from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { useContext, useState } from "react";
import axios from "axios";
import NavButton from "../NavButton";
import DeleteButton from "../DeleteButton";
import Alert from "../Alert";
import { elementsByPage } from "../../utils/Utils";
import { MusicContext } from "../../context/MusicContext";
interface ListGroupArtistProps {
  page: number;
}

const ListGroupArtist = ({ page }: ListGroupArtistProps) => {
  const { artists, setArtists } = useContext(ArtistContext);
  const { musics, setMusics } = useContext(MusicContext);

  const [indexToDelete, setIndexToDelete] = useState(-1);

  if (artists.length === 0) {
    return <p>No item found!</p>;
  }

  const onDeleteClick = (selectedIndex: number) => {
    setIndexToDelete(selectedIndex);
  };

  const doDeletion = async () => {
    await axios
      .delete(
        "http://localhost:8080/artist/delete/" + artists[indexToDelete].artistId
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
      .get("http://localhost:8080/artist")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        alert(error.message + ". Server might be down.");
      });
    await axios
      .get("http://localhost:8080/music")
      .then((response) => {
        setMusics(response.data);
      })
      .catch((error) => {
        alert(error.message + ". Server might be down.");
      });
  };

  const noDeletion = () => {
    setIndexToDelete(-1);
  };

  const artistsOnThisPage = artists.slice(
    (page - 1) * elementsByPage,
    page * elementsByPage
  );
  return (
    <>
      <ul data-testid="list" className="list-group">
        {artistsOnThisPage.map((artist, index) => (
          <li
            className={"list-group-item list-group-item-dark"}
            key={artist.artistId}
          >
            {artist.name}
            <br></br>
            {artist.biography}
            <br></br>
            <NavButton /*FOR EDIT*/
              path={"/artist/edit/" + artist.artistId}
              className="btn btn-warning"
            >
              Edit artist
            </NavButton>
            <NavButton /*FOR VIEW*/
              path={"/artist/view/" + artist.artistId}
              className="btn btn-info"
            >
              View artist
            </NavButton>
            <DeleteButton
              text="Delete Artist"
              onClick={() => onDeleteClick(index)}
            ></DeleteButton>
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
