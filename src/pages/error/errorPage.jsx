import { useRouteError } from "react-router-dom";
import BackButton from "../../components/hoc/backButton";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="mt-4 text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="mt-2">
        <i className="text-gray-500">{error.statusText || error.message}</i>
      </p>
      <BackButton />
    </div>
  );
}
