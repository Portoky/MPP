import { ChangeEvent } from "react";
import ListGroup from "../components/ListGroup";
import NavAddButton from "../components/NavAddButton";
import { useEffect, useState } from "react";
import NavDiagramButton from "../components/NavDiagramButton";
import Pagination from "@mui/material/Pagination";
import { elementsByPage } from "../utils/Utils";
import { MusicContext } from "../MusicContext";
import { useContext } from "react";

const Home = () => {
  const { musics, setMusics } = useContext(MusicContext);
  console.log(musics);
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        setMusics(data);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }, []);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const handlefilterChage = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page < musics.length / 5 + 1) setPage(page);
  };

  const elementsShown = musics.slice(
    (page - 1) * elementsByPage,
    page * elementsByPage
  ).length;
  return (
    <>
      <div
        className="upperPart"
        style={{ marginLeft: "10px", marginBottom: "15px" }}
      >
        <h1>Music forum</h1>
        <h5>Add, Modify, Remove melodies!</h5>
        <div>
          <NavAddButton></NavAddButton> <br></br>
          <NavDiagramButton></NavDiagramButton> <br></br>
          <input
            type="text"
            id="filter"
            name="filter"
            onChange={handlefilterChage}
            value={filter}
            placeholder="Filter by title!"
          ></input>
        </div>
      </div>
      <ListGroup
        musics={musics}
        setMusics={setMusics}
        filter={filter}
        page={page}
      ></ListGroup>
      <div style={{ display: "flex" }}>
        <Pagination
          id="pagination"
          count={Math.floor(musics.length / 5 + 1)}
          page={page}
          onChange={handlePagination}
        />
        <label style={{ marginLeft: "auto" }}>
          Showing from {(page - 1) * elementsByPage + 1} to{" "}
          {(page - 1) * elementsByPage + elementsShown} out of {musics.length}
        </label>
      </div>
    </>
  );
};

export default Home;
