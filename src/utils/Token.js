export const storeToken = (userInfo) => {
  const data = JSON.stringify(userInfo);
  window.localStorage.setItem("userInfo", data);
};

export const clearToken = () => {
  window.localStorage.clear();
};

const isTokenExpired = (token) => {
  if (!token || !token.exp) {
    // If the token or expiration claim doesn't exist, consider it expired
    return true;
  }

  const expirationTimestamp = token.exp * 1000; // Convert Unix timestamp to milliseconds
  const currentTimestamp = Date.now();

  return currentTimestamp > expirationTimestamp;
};

export const getToken = () => {
  const data = window.localStorage.getItem("userInfo");

  if (data) {
    const userInfo = JSON.parse(data);

    // Check if userInfo includes a token and it's not expired (you may need to implement isTokenExpired)
    if (userInfo.token && !isTokenExpired(userInfo.token)) {
      return true; // User is authenticated
    }
  }

  return false; // User is not authenticated
};
