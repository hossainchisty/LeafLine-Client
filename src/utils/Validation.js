// Validate email format
export function validateEmail(email) {
    // A simple regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Validate password length
  export function validatePassword(password) {
    // Minimum password length of 4 characters
    return password.length >= 4;
  }
  