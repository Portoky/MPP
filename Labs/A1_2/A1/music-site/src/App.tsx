import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMusic from "./pages/AddMusic";
import Home from "./pages/Home";
import EditMusic from "./pages/EditMusic";
import ViewMusic from "./pages/ViewMusic";
import { createMusic } from "./utils/Utils";
import Diagram from "./pages/Diagram";
const App = () => {
  const [musics, setMusics] = useState([
    createMusic("Rocky Racoon", "The Beatles", 5, 1966),
    createMusic("Nowhere Man", "The Beatles", 4, 1965),
    createMusic("Let It Be", "The Beatles", 4, 1970),
  ]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home musics={musics} setMusics={setMusics}></Home>}
          />
          <Route
            path="/edit/:id"
            element={
              <EditMusic musics={musics} setMusics={setMusics}></EditMusic>
            }
          />
          <Route
            path="/view/:id"
            element={<ViewMusic musics={musics}></ViewMusic>}
          />
          <Route
            path="/pages/addmusic"
            element={
              <AddMusic musics={musics} setMusics={setMusics}></AddMusic>
            }
          />
          <Route
            path="/pages/diagram"
            element={<Diagram musics={musics} setMusics={setMusics}></Diagram>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
