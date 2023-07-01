import React from 'react';
import { SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';

const Home = () => {

  const { isLoaded, isSignedIn, user } = useUser();

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
        <p>Bienvenue sur notre plateforme de téléchargement de musique.</p>
        <p>Connectez-vous pour accéder à toutes les fonctionnalités.</p>
      </div>
    </>
  );
};

export default Home;
