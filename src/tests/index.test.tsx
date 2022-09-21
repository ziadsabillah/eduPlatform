import Home from "../pages";

import "@testing-library/jest-dom";
import { render, screen, waitFor, cleanup } from "@testing-library/react";

import { SessionProvider } from "next-auth/react";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "./test-utils/createMockRouter";

afterEach(cleanup);

describe("Home", () => {
  it("should render an element with testid main if user has session", () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      user: {
        id: "1",
        name: "John Doe",
        email: "a@gmail.com",
        image: "a",
      },
    };
    jest.mock("next-auth/react", () => {
      const originalModule = jest.requireActual("next-auth/react");
      return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
          return { data: mockSession, status: "authenticated" };
        }),
      };
    });
    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });

  it("should redirect to '/login' if user is not authenticated", () => {
    jest.mock("next-auth/react", () => {
      const originalModule = jest.requireActual("next-auth/react");
      return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
          return { data: null, status: "unauthenticated" };
        }),
      };
    });
    const mockRouter = createMockRouter({});
    render(
      <SessionProvider session={null}>
        <RouterContext.Provider value={mockRouter}>
          <Home />
        </RouterContext.Provider>
      </SessionProvider>
    );

    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });

  it("should show a greeting if user is authenticated", async () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      user: {
        id: "1",
        name: "John Doe",
        email: "a",
        image: "a",
      },
    };

    jest.mock("next-auth/react", () => {
      const originalModule = jest.requireActual("next-auth/react");
      return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
          return { data: mockSession, status: "authenticated" };
        }),
      };
    });

    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Hi John Doe!")).toBeInTheDocument();
    });
  });
});
