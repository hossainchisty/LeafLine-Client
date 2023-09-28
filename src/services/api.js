export async function fetchUserProfile() {
    // eslint-disable-next-line no-useless-catch
    try {
      const getToken = localStorage.getItem("userInfo");
      const token = getToken ? getToken.replace(/["']/g, "") : "";
  
      const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseDomain}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data.user;
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      throw error;
    }
  }