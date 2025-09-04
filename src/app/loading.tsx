export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="h-[55vh] bg-gray-100 flex mt-[5rem] items-start justify-center font-sans">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we prepare the content.</p>
      </div>
    </div>
  );
}
