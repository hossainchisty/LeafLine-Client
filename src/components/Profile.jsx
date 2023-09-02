/* eslint-disable react/no-unescaped-entities */


function Profile() {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-8">
      <div className="flex justify-center mb-6">
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1693677570~exp=1693678170~hmac=9e3c63338abf0155a20a5f531a35ac421da33e56265589839c662fa046a41fc2"
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-green-600"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mb-2">John Doe</h2>
      <p className="text-lg text-gray-600 text-center">Web Developer</p>
      <hr className="my-4" />
      <div className="text-gray-700">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p>
          I'm a web developer passionate about creating modern and responsive
          web applications.
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Contact</h3>
        <ul>
          <li>Email: john.doe@example.com</li>
          <li>Website: www.johndoe.com</li>
          <li>LinkedIn: linkedin.com/in/johndoe</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
