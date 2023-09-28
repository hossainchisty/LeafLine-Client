const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(userData) {
  try {
    const response = await fetch(`${apiBaseDomain}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 201) {
      // Registration successful
      const responseData = await response.json();
      return { success: true, user: responseData.user };
    } else {
      // Registration failed
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: "An error occurred during registration. Please try again later.",
    };
  }
}
