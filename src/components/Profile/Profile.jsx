import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingIndicator from "./LoadingIndicator";
import UserProfile from "./UserProfile";
import { fetchUserProfile } from "../../services/userService";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await fetchUserProfile();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!userData) {
    return null;
  }

  return <UserProfile user={userData} />;
}

export default Profile;
