const SkeletonLoader = () => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-surfaceDark animate-pulse"
        >
          <div className="h-40 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-4 w-1/3 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 flex items-center gap-3">
            <div className="h-4 w-14 rounded-md  bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
  
  export default SkeletonLoader;