import { Link } from "react-router-dom";
import { FaVideo, FaMusic } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const { user, isSignedIn } = useUser();
  
  return (
    <div className="text-center flex-col flex items-center justify-center">
      {isSignedIn ? (
   <>
   <img src={user.imageUrl} alt="Image de l'utilisateur" className="w-16 h-16 rounded-full mt-4" />
   <h5 className="text-2xl mt-4">
          Bonjour, {user.firstName} {user.lastName} !
        </h5>
        </>
      ) : (
        <h5 className="text-2xl">Bonjour, visiteur !</h5>
      )}
      <div className="flex-row flex items-center mt-12 justify-center gap-8">
        <Link to="/download/audio" className="">
          <div className="max-w-md mx-auto my-4">
            <div className="bg-white hover:bg-gray-100 transition-colors rounded-md flex justify-center items-center flex-col gap-4 shadow-md py-20 px-20">
              <h6 className="text-xl font-medium">Audio</h6>
              <p className="text-base">
                <FaMusic size={70} />
              </p>
            </div>
          </div>
        </Link>
        <Link to="/download/video">
          <div className="max-w-md mx-auto my-4">
            <div className="bg-white hover:bg-gray-100 transition-colors rounded-md flex justify-center items-center flex-col gap-4 shadow-md px-20 p-20">
              <h6 className="text-xl font-medium">Vidéos</h6>
              <p className="text-base">
                <FaVideo
                  className="video"
                  size={70}
                />
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
