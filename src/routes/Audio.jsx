import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Audio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cooldown, setCooldown] = useState(false);

  const handleDownloadClick = () => {
    if (inputValue.trim() !== "" && !cooldown) {
      setIsLoading(true);
      setCooldown(true);
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
        const thumbnail = document.querySelector(".thumbnail");
        const titleHtml = document.querySelector(".title");

        videos.forEach((video) => {
          const { title, description, thumbnails } = video.snippet;
          const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;

          console.log(video.snippet);

          const videoDetails = video.contentDetails;
          const duration = videoDetails.duration;

          const decodedDuration = duration
          console.log(decodedDuration);

          titleHtml.innerHTML = title;


          console.log(videoLink);

          thumbnail.src = thumbnails.high.url;

          downloadAudio(video.id.videoId);

          console.log(video.id.videoId);
        });

        setIsLoading(false);
        startCooldown();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        startCooldown();
      });
  };



  const downloadAudio = (videoId) => {
    const downloadUrl = `https://scpanel.hostycord.com:10009/download?link=https://www.youtube.com/watch?v=${videoId}`;

    axios
      .get(downloadUrl, { responseType: "arraybuffer" })
      .then((response) => {
        console.log(response.data);
        createAndDownloadBlob(response.data);
      })
      .catch((error) => {
        console.error("Error downloading video:", error);
      });
  };

  const createAndDownloadBlob = (data) => {
    const blob = new Blob([data], { type: "audio/mp3" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "audio.mp3";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const startCooldown = () => {
    setTimeout(() => {
      setCooldown(false);
    }, 30000); // 30 seconds
  };

  return (
    <>
      <nav className="my-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 010 1.414L5.414 9H8a1 1 0 110 2H5.414l4.879 4.879a1 1 0 11-1.414 1.414L2.586 10l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/audio"
              className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400"
            >
              Audio
            </Link>
          </li>
        </ol>
      </nav>
      <div className="max-w-3xl mx-auto">
        <div className="mt-6">
          <div className="space-y-4">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter keywords..."
                className="flex-grow w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                onClick={handleDownloadClick}
                className="ml-4 px-4 py-2 text-white bg-blue-600 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isLoading || cooldown}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.064 11.356a8.045 8.045 0 011.645-3L5 6a9.97 9.97 0 00-2 .37V6a8 8 0 0112.583-6.4c.013.016.027.031.04.047l1.75-1.06 1.413 2.33-1.75 1.061a7.97 7.97 0 01-.142 12.22l1.75 1.061-1.412 2.33-1.75-1.06a7.97 7.97 0 01-10.868-2.504l-1.751 1.06-1.413-2.33 1.75-1.06zm2.118 1.726a6 6 0 108.37-8.497l-1.63-1.005a4 4 0 11-5.381 5.718l-1.76 1.077z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Download"
                )}
              </button>
            </div>
            <div className="mt-4">
              <div className="w-full">
                <div className="h-2 bg-red-light"></div>
                <div className="flex items-center justify-center h-screen bg-red-lightest">
                  <div
                    className="bg-white shadow-lg rounded-lg"
                    style="width: 45rem !important;"
                  >
                    <div className="flex">
                      <div>
                        <img
                          className="w-full rounded thumbnail hidden md:block"
                          src="https://tailwindcss.com/img/card-top.jpg"
                          alt="Album Pic"
                        />
                      </div>
                      <div className="w-full p-8">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-2xl text-grey-darkest title font-medium">

                            </h3>
                            <p className="text-sm channel-name text-grey mt-1"></p>
                          </div>
                          <div className="text-red-lighter">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-8">
                          <div className="text-grey-darker">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" />
                            </svg>
                          </div>
                          <div className="text-grey-darker">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                            </svg>
                          </div>
                          <div className="text-white p-8 rounded-full bg-red-light shadow-lg">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                            </svg>
                          </div>
                          <div className="text-grey-darker">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                            </svg>
                          </div>
                          <div className="text-grey-darker">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-8 py-4">
                      <div className="flex justify-between text-sm text-grey-darker">
                        <p>0:00</p>
                        <p className="duration">4:20</p>
                      </div>
                      <div className="mt-1">
                        <div className="h-1 bg-grey-dark rounded-full">
                          <div className="w-1/5 h-1 bg-red-light rounded-full relative">
                            <span className="w-4 h-4 bg-red absolute pin-r pin-b -mb-1 rounded-full shadow"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Audio;
