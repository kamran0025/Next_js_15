"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[64vh] bg-gray-100 flex items-start justify-center font-sans text-center mt-[2rem] p-4">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-4xl font-bold text-red-500 mb-4">Oops!</h2>
        <p className="text-lg text-gray-700 mb-6">
          {"Something went wrong. We're working to fix it!"}
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full justify-center">
          <button
            onClick={() => reset()}
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold text-base hover:bg-red-700 transition duration-200 shadow-md w-full sm:w-auto"
          >
            Try Again
          </button>

          {/* {onGoHome && (
            <button
              onClick={onGoHome}
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-base hover:bg-blue-700 transition duration-200 shadow-md w-full sm:w-auto"
            >
              Go to Home
            </button>
          )} */}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Please try again later or contact support if the issue persists.
        </p>
      </div>
    </div>
  );
}
