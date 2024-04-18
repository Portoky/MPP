import { ChangeEvent } from "react";
import ListGroup from "../components/ListGroup";
import NavAddButton from "../components/NavAddButton";
import { useEffect, useState } from "react";
import NavDiagramButton from "../components/NavDiagramButton";
import Pagination from "@mui/material/Pagination";
import { elementsByPage } from "../utils/Utils";
import { MusicContext } from "../context/MusicContext";
import { useContext } from "react";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import "../assets/Home.css";

const Home = () => {
  const { musics, setMusics } = useContext(MusicContext);

  window.addEventListener("offline", () => {
    alert("You went offline! Check internet connection");
  });
  //generated value saved

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
          .get("http://localhost:8080/")
          .then((response) => {
            setMusics(response.data);
          })
          .catch((error) => {
            alert(error.message + ". Server might be down.");
          });
      });
    });
  }, []);

  //side effect
  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((response) => {
        setMusics(response.data);
      })
      .catch((error) => {
        alert(error.message + ". Server might be down.");
      });
  }, []); //[] dependency so it renders once at mounting!

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const handlefilterChage = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  //change page number thus elements shown
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (page <= musics.length / 5 + 1) setPage(page);
  };

  //take the needed elements (depending on current page) from music list
  const elementsShown = musics.slice(
    (page - 1) * elementsByPage,
    page * elementsByPage
  ).length;
  return (
    <>
      <div className="upperPart">
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
      <ListGroup filter={filter} page={page}></ListGroup>
      <div className="lowerPart">
        <Pagination
          id="pagination"
          count={Math.ceil(musics.length / 5)}
          page={page}
          onChange={handlePagination}
        />
        <label>
          Showing from {(page - 1) * elementsByPage + 1} to{" "}
          {(page - 1) * elementsByPage + elementsShown} out of {musics.length}
        </label>
      </div>
    </>
  );
};

export default Home;
