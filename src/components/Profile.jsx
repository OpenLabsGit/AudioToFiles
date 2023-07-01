import React from "react";
import { UserProfile, useUser, RedirectToSignIn, SignedOut } from "@clerk/clerk-react";

const Profile = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      {isSignedIn && (
        <div>
          <UserProfile />
        </div>
      )}
    </>
  );
};

export default Profile;
