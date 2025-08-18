
import { Metadata } from "next";
import NotFound from "./components/not-found";

export const metadata: Metadata = {
  title: "404 Page Not Found",
  description: "The page you are looking for does not exist.",
};

const ErrorPage = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default ErrorPage;
