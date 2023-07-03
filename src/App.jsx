import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NotFound from "./errors/NotFound";
import LoadingBar from 'react-top-loading-bar';

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
  const [isLoading, setIsLoading] = useState(false);
  const loadingBarRef = useRef(null);
  const unlisten = useNavigate();

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
      loadingBarRef.current.continuousStart();
    };

    const completeLoading = () => {
      setIsLoading(false);
      loadingBarRef.current.complete();
    };

    const handleRouteChange = () => {
      startLoading();
      // Ici, vous pouvez ajouter une logique de chargement spécifique à chaque route si nécessaire
      // Par exemple, si vous avez des appels API ou des chargements de données à effectuer

      // Simuler un délai de chargement de 2 secondes (à remplacer avec votre propre logique)
      setTimeout(completeLoading, 2000);
    };

     unlisten(handleRouteChange);
    return () => {
      unlisten();
    };
  }, [unlisten]);

  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Navbars />
        <div className="mt-12">
          {isLoading && <LoadingBar ref={loadingBarRef} height={3} color="#1BC5BD" />}
          <Routes>
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
