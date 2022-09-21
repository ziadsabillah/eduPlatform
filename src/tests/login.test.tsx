import { LoginScreen } from "../components/login/LoginScreen";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("LoginScreen", () => {
  it("should render a button to sign in with google", () => {
    render(<LoginScreen />);
    // expect a button with text Sign In with Google to be in the document
    expect(
      screen.getByRole("button", { name: /Sign In with Google/i })
    ).toBeInTheDocument();
  });
});
