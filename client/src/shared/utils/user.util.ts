export const getUserProperty = (key: keyof UserData) => {
  const userData = localStorage.getItem("data");

  if (!userData) return null; // Return null if no data is found

  try {
    const parsedData: UserData = JSON.parse(userData);
    return parsedData[key] ?? null; // Return the specific key value or null
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

// Define the expected user data structure
interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  googleId: string;
  id: string;
  isBlocked: boolean;
  isVerified: boolean;
  profilePicture: string;
}
