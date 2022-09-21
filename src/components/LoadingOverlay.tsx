import { useSession } from "next-auth/react";
import { ReactElement } from "react";

// fix the type of children to be a ReactNode instead of ReactElement (which is the default) so that we can pass in a string or a ReactNode
type Props = {
  children: ReactElement;
};
export const LoadingOverlay = ({ children }: Props) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return children;
};
