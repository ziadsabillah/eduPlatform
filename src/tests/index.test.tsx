import Home from "../pages";

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

describe("Home", () => {
  it("should call useSession to check if user has session or not", async () => {
    const mockRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockRouter}>
        <Home />
      </RouterContext.Provider>
    );
    await waitFor(() => {
      expect(useSession).toHaveBeenCalled();
    });
  });
});
