import { LoginScreen } from "../components/login/LoginScreen";
import LoginPage from "../pages/login";

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { SessionProvider, useSession } from "next-auth/react";

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
  it("should call useSession on login to check if user has session or not", async () => {
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
  it("should render a button to sign in with google if user is not authenticated", () => {
    render(<LoginScreen />);
    // expect a button with text Sign In with Google to be in the document
    expect(
      screen.getByRole("button", { name: /Sign In with Google/i })
    ).toBeInTheDocument();
  });
  it("should redirect to '/' if user is not authenticated", () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <LoginPage />
      </RouterContext.Provider>
    );

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
