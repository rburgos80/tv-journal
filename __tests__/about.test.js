import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../pages/about";

describe("About", () => {
  it("renders a heading", () => {
    render(<About />);

    const heading = screen.getByRole("heading", {
      name: /about tv journal/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
