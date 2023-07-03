import React, { useEffect } from 'react';
import { SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import AOS from 'aos';

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    AOS.init(); // Initialisation de AOS
  }, []);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold text-black">Téléchargement de musique {user.firstName}</h1>
      </div>
      <div className="mt-8">
        <p data-aos="fade-up">Bienvenue sur notre plateforme de téléchargement de musique.</p>
        <p data-aos="fade-up" data-aos-delay="200">Allez dans le dashboard pour accéder à toutes les fonctionnalités.</p>
        <p data-aos="fade-up" data-aos-delay="400">Site actuellement en mise à jour...</p>
      </div>
    </>
  );
};

export default Home;


export default Home;
