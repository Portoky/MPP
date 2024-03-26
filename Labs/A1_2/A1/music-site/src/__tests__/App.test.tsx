import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
describe("Home", () => {
  test("renders", () => {
    const rendering = render(<App />);
    expect(rendering).toMatchSnapshot();
    expect(screen.getByText("Music forum")).toBeDefined();
  });
});
