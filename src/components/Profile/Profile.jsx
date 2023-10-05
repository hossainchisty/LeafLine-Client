import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserProfile from './UserProfile';
import { fetchUserProfile } from '../../services/userService';
import ProfileSkeleton from './ProfileSkeleton';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      try {
        const user = await fetchUserProfile();
        setUserData(user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    }

    fetchUser();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div>
      {isLoading ? <ProfileSkeleton /> : <UserProfile user={userData} />}
    </div>
  );
}

export default Profile;
