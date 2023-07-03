import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NotFound from "./errors/NotFound";
import LoadingBar from "react-top-loading-bar";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  ClerkProvider,
  SignIn,
  SignUp,
  UserProfile,
} from "@clerk/clerk-react";

const clerkPubKey = "pk_live_Y2xlcmsuYXVkaW90b2ZpbGVzLmNvbSQ";

import Home from "./routes/Home";
import Politique from "./routes/Politique";
import Video from "./routes/Video";
import Audio from "./routes/Audio";
import Error from "./routes/Errors";
import Navbars from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./routes/Dashboard";

const App = () => {
  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Navbars />
        <div className="mt-12">
          <Routes>
            <Route path="/sign-in" element={<SignIn redirectUrl='https://audiotofiles.com/dashboard' />}/>
            <Route path="/sign-up" element={<SignUp redirectUrl='https://audiotofiles.com' />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/download/video" element={<Video />} />
            <Route path="/download/audio" element={<Audio />} />
            <Route path="/politiques" element={<Politique />} />
            <Route path="/errors" element={<Error />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </div>
      </ClerkProvider>
    </>
  );
};

export default App;
