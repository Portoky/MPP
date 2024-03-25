import { ChangeEvent } from "react";
import ListGroup from "../components/ListGroup";
import { Music } from "../entities/Music";
import NavAddButton from "../components/NavAddButton";
import { useState } from "react";
import NavDiagramButton from "../components/NavDiagramButton";

interface HomeProps {
  musics: Music[];
  setMusics: (musics: Music[]) => void;
}

const Home = ({ musics, setMusics }: HomeProps) => {
  const [filter, setFilter] = useState("");

  const handlefilterChage = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

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
      ></ListGroup>
    </>
  );
};

export default Home;
