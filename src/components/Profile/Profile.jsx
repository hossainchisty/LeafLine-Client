import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import Favorite from "../Favorite/Favorite";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  // const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const getToken = localStorage.getItem("userInfo");
    const token = getToken ? getToken.replace(/["']/g, "") : "";

    fetch(`${apiBaseDomain}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          toast.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiBaseDomain]);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgba(106, 89, 187, 0.888)",
  };

  if (loading) {
    return (
      <div>
        {" "}
        <ClipLoader
          color={"rgba(106, 89, 187, 0.888)"}
          loading={loading}
          cssOverride={override}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!userData) {
    // Handle the case when userData is still null (optional)
    return null;
  }

  // Once data is available, render the user profile
  return (
    <div>
      <div className="flex justify-center mb-4">
        <img
          src={userData.avatar}
          alt={userData.full_name}
          className="w-32 h-32 rounded-full border-4"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mb-2">
        <div className="flex items-center justify-center">
          <span className="mr-1 mb-3">{userData.full_name}</span>
          {userData.isVerified && (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="text-[#0095F6] text-[20px]"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.38 14.72H7.67L6 13H3.53L3 12.5V10.08L1.31 8.36004V7.65004L3 5.93004V3.50004L3.53 3.00004H6L7.67 1.29004H8.38L10.1 3.00004H12.53L13.03 3.49004V5.93004L14.74 7.65004V8.36004L13 10.08V12.5L12.5 13H10.1L8.38 14.72ZM6.73004 10.4799H7.44004L11.21 6.71L10.5 6L7.09004 9.41991L5.71 8.03984L5 8.74984L6.73004 10.4799Z"></path>
            </svg>
          )}
        </div>
      </h2>
      <Favorite />
    </div>
  );
}

export default Profile;
