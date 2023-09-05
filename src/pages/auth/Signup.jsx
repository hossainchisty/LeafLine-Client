/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiBaseDomain}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        // Registration successful
        setIsEmailSent(true);
        setSubmittedData(data);

        // Display a success toast
        toast.success(
          "Registration successful. Check your inbox for verification."
        );

        // Add any additional logic here, such as redirecting the user
      } else {
        // Registration failed
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        "An error occurred during registration. Please try again later."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        {isEmailSent ? ( // Render a message if the email has been sent
          <div>
            <h2 className="text-2xl font-semibold mb-4">Check your inbox</h2>
            <div className="mb-4 text-gray-600">
              We are glad that you're with us! We've sent you a verification
              link to the email address{" "}
              <span className="text-black font-semibold">
                {submittedData?.email}
              </span>
              .
            </div>
          </div>
        ) : (
          // Render the form if the email hasn't been sent yet
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-1xl font-semibold mb-4">
              👋 Let's Create a New Account.
            </h2>
            <div className="mb-4">
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
                <span className="text-red-600 text-lg font-bold">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                {...register("full_name", {
                  required: true,
                  maxLength: 50, // Maximum length of 50 characters
                })}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
                required
              />
              {errors.full_name && errors.full_name.type === "required" && (
                <span className="text-red-600 text-sm">
                  Full Name is required
                </span>
              )}
              {errors.full_name && errors.full_name.type === "maxLength" && (
                <span className="text-red-600 text-sm">
                  Full Name is too long (max 50 characters)
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
                <span className="text-red-600 text-lg font-bold">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i, // Email format validation
                })}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
                required
              />
              {errors.email && errors.email.type === "required" && (
                <span className="text-red-600 text-sm">Email is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-red-600 text-sm">
                  Invalid email format
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
                <span className="text-red-600 text-lg font-bold">*</span>
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 4, // Minimum password length of 4 characters
                })}
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
                required
              />
              {errors.password && errors.password.type === "required" && (
                <span className="text-red-600 text-sm">
                  Password is required
                </span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="text-red-600 text-sm">
                  Password must be at least 4 characters long
                </span>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-md"
              >
                Sign Up
              </button>
              <div className="flex justify-center mt-4">
                <Link to="/signin" className="text-black">
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
