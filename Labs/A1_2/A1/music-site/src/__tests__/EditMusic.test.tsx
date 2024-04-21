import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { MusicProvider } from "../context/MusicContext";
import EditMusic from "../pages/musicPages/EditMusic";
import ViewMusic from "../pages/musicPages/ViewMusic";
import AddMusic from "../pages/musicPages/AddMusic";
import Diagram from "../pages/Diagram";

describe("Edit", () => {
  test("renders", () => {
    const rendering = render(
      <MusicProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/edit/:id" element={<EditMusic></EditMusic>} />
            <Route path="/view/:id" element={<ViewMusic></ViewMusic>} />
            <Route path="/pages/addmusic" element={<AddMusic></AddMusic>} />
            <Route path="/pages/diagram" element={<Diagram></Diagram>} />
          </Routes>
        </MemoryRouter>
      </MusicProvider>
    );
    expect(rendering).toMatchSnapshot();
    //expect(screen.getByText("Music forum")).toBeDefined();
  });
});
