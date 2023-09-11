import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile() {
  // Use the useContext hook to access the user data from the context
  const { userInfo } = useContext(UserContext);
  console.log(userInfo);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-8">
      <div className="flex justify-center mb-6">
        <img
          src={userInfo.avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-green-600"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mb-2">
        {userInfo.full_name}
      </h2>
      <p className="text-lg text-gray-600 text-center">
        {userInfo.role || "Author"}
      </p>
      <hr className="my-4" />
      <div className="text-gray-700">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p>{userInfo.about}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Contact</h3>
        <ul>
          <li>Email: {userInfo.email}</li>
          <li>Website: {userInfo.website}</li>
          <li>LinkedIn: {userInfo.linkedin}</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
