/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const EmailVerification = () => {
  const { token } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [limitExpires, setLimitExpires] = useState(false);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(
          `${apiBaseDomain}/users/verify?token=${token}`,
          {
            method: "POST",
          }
        );

        if (response.status == 200) {
          setIsVerified(true);
        } else if (response.status == 429) {
          setLimitExpires(true);
        } else {
          const data = await response.json();
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setIsVerified(false);
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        {isVerified ? (
          <div>
            <h2 className="text-1xl font-semibold mb-4 text-green-400">
              Email Verified!
            </h2>
            <p>Your email has been successfully verified.</p>
          </div>
        ) : limitExpires ? (
          <div>
            <h2 className="text-1xl font-semibold mb-4 text-red-400">
              Rate Limit Exceeded
            </h2>
            <p>
              Too many verification requests from this IP. Please try again
              after an hour.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-1xl font-semibold mb-4 text-red-400">
              Email Verification Failed
            </h2>
            <p>Sorry, we couldn't verify your email. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
