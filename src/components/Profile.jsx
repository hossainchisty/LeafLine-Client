import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-8">
      <div className="flex justify-center mb-6">
        <img
          src={user.users.avatar}
          alt={user.users.full_name}
          className="w-32 h-32 rounded-full border-4"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mb-2">
        {user.users.full_name}
      </h2>
      <p className="text-lg text-gray-600 text-center">{user.users.role}</p>
      <hr className="my-4" />
      <div className="text-gray-700">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p>{user.users.about}</p>
      </div>
    </div>
  );
}

export default Profile;
