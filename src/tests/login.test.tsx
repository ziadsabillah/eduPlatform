import { LoginScreen } from "../components/login/LoginScreen";
import LoginPage from "../pages/login";

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "./test-utils/createMockRouter";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    user: {
      name: "John Doe",
      email: "a@gmail.com",
      image: "a",
    },
  };

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("LoginScreen", () => {
  it("should render a button to sign in with google", () => {
    render(<LoginScreen />);
    // expect a button with text Sign In with Google to be in the document
    expect(
      screen.getByRole("button", { name: /Sign In with Google/i })
    ).toBeInTheDocument();
  });

  it("should call useSession on login to check if user has session or not", async () => {
    // TODO - mock useSession to return authenticated
    // and then check that the router is called with "/"
    // and that the LoginScreen is not rendered
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <LoginPage />
      </RouterContext.Provider>
    );
    await waitFor(() => {
      expect(useSession).toHaveBeenCalled();
    });
  });
});
