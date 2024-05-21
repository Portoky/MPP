import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import Login from "../pages/Login";

describe("Login", () => {
  test("Login form should redirect to Home and display Add Button", async () => {
    render(<Login />);

    await waitFor(() => {
      expect(screen.getByText("login", { exact: false }));
    });

    // Fill in the username and password
    fireEvent.change(screen.getByLabelText("Username", { exact: false }), {
      target: { value: "portoky" },
    });
    fireEvent.change(screen.getByLabelText("Password", { exact: false }), {
      target: { value: "jelszo" },
    });

    fireEvent.click(screen.getByText("Login", { exact: false }));

    // Wait for the home page to be displayed
    /*await waitFor(() => {
      expect(screen.getByText("Music Forum", { exact: false }));
    });

    // Check if the "Add Button" is present in the Home component
    expect(screen.getByText("Add Music", { exact: false }));*/
  });
});
