import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMusic from "./pages/AddMusic";
import Home from "./pages/Home";
import EditMusic from "./pages/EditMusic";
import ViewMusic from "./pages/ViewMusic";
import Diagram from "./pages/Diagram";
import { MusicProvider } from "./context/MusicContext";

const App = () => {
  return (
    <div>
      <MusicProvider>
        {" "}
        {/*this is how we provide the props now globally with context*/}
        <BrowserRouter>
          <Routes>
            <Route
              path="/" /*id show the which elements to show */
              element={<Home></Home>}
            />
            <Route path="/edit/:id" element={<EditMusic></EditMusic>} />
            <Route path="/view/:id" element={<ViewMusic></ViewMusic>} />
            <Route path="/pages/addmusic" element={<AddMusic></AddMusic>} />
            <Route path="/pages/diagram" element={<Diagram></Diagram>} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </div>
  );
};

export default App;
