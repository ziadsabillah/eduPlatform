import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoginScreen } from "../components/login/LoginScreen";

const LoginPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
    return null;
  }
  return <LoginScreen />;
};

export default LoginPage;
