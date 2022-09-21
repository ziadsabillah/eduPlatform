import { signIn } from "next-auth/react";

export const LoginScreen = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => signIn("google")}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};
