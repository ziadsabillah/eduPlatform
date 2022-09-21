import { Session } from "next-auth";

export const createMockSession = (session: Partial<Session> = {}) => {
  return {
    user: {
      id: "1",
      email: "",
      name: "",
      image: "",
    },
    expires: "",
    ...session,
  };
};
