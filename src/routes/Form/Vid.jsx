 const Vid  = ( ) => {
    return (
        <div className="flex dark:bg-gray-700">
    

        <div className="hidden w-1/2 p-6 flex flex-col gap-8 items-center justify-center">
          <div
            role="status"
            className="flex w-full items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
          >
            <svg
              className="w-12 h-12 text-gray-200 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 384 512"
            >
              <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div role="status" className="animate-pulse">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
            <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
            <div className="flex items-center justify-center mt-4">
              <svg
                className="w-10 h-10 mr-2 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>

        
        <div className="flex flex-col items-center justify-center gap-8">
          <img src="../../src/assets/video.svg" className="ml-8" alt="Video" />
          <p className="mb-3 text-center text-gray-500 dark:text-gray-400">
            Make sure you provide a good name or a good link for your video.
          </p>
        </div>
      </div>
    )
 };
 
 export default Vid;