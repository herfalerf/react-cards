import { render, screen } from "@testing-library/react";
import Card from "./Card";

it("renders App", () => {
  render(<Card />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Card />);
});
