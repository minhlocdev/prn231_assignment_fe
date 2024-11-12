export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="mt-4 text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="mt-2">
        <i className="text-gray-500">404 - Not Found</i>
      </p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
