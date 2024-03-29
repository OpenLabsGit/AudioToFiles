import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tilt from 'react-parallax-tilt';
import ReactAudioPlayer from "react-audio-player";

const Audio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const handleDownloadClick = () => {
    if (inputValue.trim() !== "") {
      setIsLoading(true);
      searchVideos(inputValue);
    }
  };

  const downloadAudio = (videoId) => {
    const downloadUrl = `https://scpanel.hostycord.com:10009/download?videoId=${videoId}`;

    fetch(downloadUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error downloading video");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        setAudioUrl(url);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading video:", error);
      });
  };

  const handleAudioEnded = () => {
    setAudioUrl(null);
  };

  const searchVideos = (keywords) => {
    const apiKey = "AIzaSyDs9IaDQnj1z_OJUQ0Qd7nONvGQzDN-AP8"; // Remplacez par votre propre clé API YouTube

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${keywords}&key=${apiKey}`
      )
      .then((response) => {
        const videos = response.data.items;
        const thumbnail = document.querySelector(".thumbnail");
        const thumbnail2 = document.querySelector(".thumbnail2");
        const titleHtml = document.querySelector(".title");
        const channelName = document.querySelector(".channel-name");

        videos.forEach((video) => {
          const { title, thumbnails, channelTitle } = video.snippet;
          const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;

          const videoIds = video.id.videoId;

          titleHtml.innerHTML = title;

          channelName.innerHTML = channelTitle;

          console.log(videoLink);

          thumbnail.src = thumbnails.high.url;
          thumbnail2.src = thumbnails.high.url;

          // Extraire la couleur dominante de la miniature

          downloadAudio(videoIds);
        });

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Fonction pour convertir une couleur RGB en format hexadécimal
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
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l1.293 1.293a1 1 0 001.414-1.414l-7-7zM18 11h-2a1 1 0 01-1-1V8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1z" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li className="inline-flex items-center">
            <svg
              className="w-3 h-3 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-sm font-medium text-gray-500">Audio</span>
          </li>
        </ol>
      </nav>
      <div className="mt-8 flex items-center flex-col justify-center gap-2">
        <div className="relative w-1/5 h-1/5">
        <Tilt>
          <div className="aspect-square object-cover scale-110 rounded-3xl">
            <img
              src=""
              alt="Thumbnail"
              className="w-full thumbnail h-full rounded-3xl"
            />
          </div>
          </Tilt>
        </div>

        <h3 className="title mt-4 text-gray-100 text-3xl font-bold text-center"></h3>
        <h5 className="channel-name text-gray-100 text-sm font-medium text-center"></h5>
      </div>

      {audioUrl && (
        <ReactAudioPlayer src={audioUrl} autoPlay controls onEnded={handleAudioEnded} />
      )}

      <div className="-z-10 mt-20 absolute flex items-center justify-center top-0 left-0 bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border w-[100vw] h-[100vh] border-gray-100">
        <div className="flex mt-80 justify-center flex-col items-stretch dark:bg-gray-800 ">
          <h2 className="text-2xl font-bold mb-4">Audio Downloader</h2>
          <div>
            <input
              type="text"
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 block w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              placeholder="Enter video keywords"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white rounded-lg w-full focus:outline-none"
              onClick={handleDownloadClick}
            >
              {isLoading ? "Loading..." : "Download"}
            </button>
          </div>
          <div className="mt-4">
            {isLoading && (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-2.647L21 20.938A7.962 7.962 0 0120 12h-4c0 3.042 1.135 5.824 3 7.938zM12 4.709L9 7.356V3.064a8.045 8.045 0 013 1.645z"
                  />
                </svg>
                <span>Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <img
        src=""
        className="object-cover thumbnail2 blur-2xl brightness-60 top-0 left-0 -z-50 absolute w-[100vw] h-[100vh]"
      ></img>
    </>
  );
};

export default Audio;
