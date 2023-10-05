/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-200">
      <div className="flex items-center flex-col justify-center w-screen px-3 h-screen gap-3">
        <img
          src="https://www.unitydevops.com/img/undraw_fixing_bugs_w7gi.svg"
          alt=""
          className="w-h-56 h-56 mb-8"
        />
        <h3 className="text-3xl font-semibold">We're Extreamly Sorry!</h3>
        <p className=" text-center">
          Some Unexpected Error Occurred, Please contact Support
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="btn btn-wide btn-secondary rounded-md mt-2"
        >
          Go To Home
        </button>
      </div>
    </div>
  );
}
