import React, { useState } from "react";
import axios  from "axios";
import { Link } from "react-router-dom";

const Video = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDownloadClick = () => {
    if (inputValue.trim() !== "") {
      setIsLoading(true);
      searchVideos(inputValue);
    }
  };

  const searchVideos = (keywords) => {
    const apiKey = "AIzaSyDs9IaDQnj1z_OJUQ0Qd7nONvGQzDN-AP8";

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${keywords}&key=${apiKey}`
      )
      .then((response) => {
        const videos = response.data.items;
        videos.forEach((video) => {
          const { title, description } = video.snippet;
          const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;

          console.log("Titre :", title);
          console.log("Description :", description);
          console.log("Lien :", videoLink);
          console.log("-----");
        });

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <nav className="flex ml-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to={"/dashboard"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Dashboard
            </Link>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Video
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex dark:bg-gray-700">
        <div className="w-1/2 p-6 border-r border-gray-300 dark:border-gray-600">
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Video Prompt or Link
            </label>
            <input
              type="text"
              id="default-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // ...
            />

<button
        disabled={isLoading}
        type="button"
        onClick={handleDownloadClick}
        className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      >
        {!isLoading ? "Download a video" : (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.189"
              />
            </svg>
            Loading...
          </>
        )}
      </button>
          </div>
        </div>
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
    </>
  );
};

export default Video;
