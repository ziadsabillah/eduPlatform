import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Nav = () => {
  // simple navigation with tailwindcss that has a home and login links

  const { status, data } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Edu Platform
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="text-sm">
        {isAuthenticated && (
          <div data-testid="greeting" className="text-gray-200">
            {"Hi " + data?.user?.name}!
          </div>
        )}
      </div>
      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
              Home
            </a>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  Profile
                </a>
              </Link>
              <button
                onClick={() =>
                  signOut({
                    redirect: false,
                  })
                }
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
