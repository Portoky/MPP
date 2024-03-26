import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import EditMusic from "../pages/EditMusic";
import { Routes, Route } from "react-router-dom";
import { createMusic } from "../utils/Utils";
import { MemoryRouter } from "react-router-dom";
describe("Edit", () => {
  test("renders", () => {
    const rendering = render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route
            path="/edit/:id"
            element={
              <EditMusic
                musics={[
                  createMusic("Rocky Racoon", "The Beatles", 5, 1966),
                  createMusic("Nowhere Man", "The Beatles", 4, 1965),
                  createMusic("Let It Be", "The Beatles", 4, 1970),
                ]}
                setMusics={() => {}}
              ></EditMusic>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(rendering).toMatchSnapshot();
    //expect(screen.getByText("Music forum")).toBeDefined();
  });
});
