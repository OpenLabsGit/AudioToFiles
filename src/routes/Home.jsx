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
        <h1 className="text-3xl font-bold text-black">Bienvenue sur notre plateforme de téléchargement de musique, {user.firstName} !</h1>
      </div>
      <div className="mt-8">
        <div data-aos="fade-up" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Découvrez de nouveaux artistes</h2>
          <p className="text-lg">
            Explorez notre vaste collection de musique et découvrez de nouveaux artistes talentueux.
            Laissez-vous emporter par les rythmes et les mélodies qui éveilleront vos émotions.
          </p>
          <img src="/images/discover.jpg" alt="Découverte musicale" className="w-full mt-4" />
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Téléchargez vos chansons préférées</h2>
          <p className="text-lg">
            Téléchargez facilement vos chansons préférées et créez votre propre collection musicale.
            Écoutez-les hors ligne à tout moment et partagez-les avec vos amis et votre famille.
          </p>
          <img src="/images/download.jpg" alt="Téléchargement de musique" className="w-full mt-4" />
        </div>
        <div data-aos="fade-up" data-aos-delay="400" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Accédez à des fonctionnalités avancées</h2>
          <p className="text-lg">
            Profitez de fonctionnalités avancées telles que la création de playlists personnalisées,
            la recommandation de musique en fonction de vos goûts et bien plus encore.
            Notre plateforme est conçue pour rendre votre expérience musicale exceptionnelle.
          </p>
          <img src="/images/features.jpg" alt="Fonctionnalités avancées" className="w-full mt-4" />
        </div>
      </div>
    </>
  );
};

export default Home;
