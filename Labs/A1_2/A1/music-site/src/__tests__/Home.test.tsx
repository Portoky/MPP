import { describe, expect, test } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";

import Home from "../pages/Home";
describe("Home", () => {
  test("renders", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Music Forum", { exact: false }));
    });

    // Check if the "Add Button" is present in the Home component
    expect(screen.getByText("Add Music", { exact: false }));
    //expect(rendering).toMatchSnapshot();
    //expect(screen.getByText("Music forum")).toBeDefined();
  });
});
