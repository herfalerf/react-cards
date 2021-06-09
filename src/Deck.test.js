import { render, screen } from "@testing-library/react";
import Deck from "./Deck";

it("renders App", () => {
  render(<Deck />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Deck />);
});
