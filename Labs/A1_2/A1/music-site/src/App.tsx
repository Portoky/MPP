import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AddMusic from "./pages/musicPages/AddMusic";
import Home from "./pages/Home";
import EditMusic from "./pages/musicPages/EditMusic";
import ViewMusic from "./pages/musicPages/ViewMusic";
import Diagram from "./pages/Diagram";
import { MusicProvider } from "./context/MusicContext";
import { ArtistProvider } from "./context/ArtistContext";
import AddArtist from "./pages/artistPages/AddArtist";
import EditArtist from "./pages/artistPages/EditArtist";
import ViewArtist from "./pages/artistPages/ViewArtist";
import { ConnectionProvider } from "./context/ConnectionContext";
import { TrackCountProvider } from "./context/TrackCountContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <ConnectionProvider>
        <TrackCountProvider>
          <MusicProvider>
            <ArtistProvider>
              {" "}
              {/*this is how we provide the props now globally with context*/}
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login></Login>}></Route>
                  <Route
                    path="/register"
                    element={<Register></Register>}
                  ></Route>
                  <Route
                    path="/" /*id show the which elements to show */
                    element={<Home></Home>}
                  />
                  <Route
                    path="/music/edit/:id"
                    element={<EditMusic></EditMusic>}
                  />
                  <Route
                    path="/music/view/:id"
                    element={<ViewMusic></ViewMusic>}
                  />
                  <Route path="/music/add" element={<AddMusic></AddMusic>} />
                  <Route path="/diagram" element={<Diagram></Diagram>} />
                  <Route
                    path="/artist/edit/:id"
                    element={<EditArtist></EditArtist>}
                  />
                  <Route
                    path="/artist/view/:id"
                    element={<ViewArtist></ViewArtist>}
                  />
                  <Route path="/artist/add" element={<AddArtist></AddArtist>} />
                </Routes>
              </BrowserRouter>
            </ArtistProvider>
          </MusicProvider>
        </TrackCountProvider>
      </ConnectionProvider>
    </div>
  );
};

export default App;
