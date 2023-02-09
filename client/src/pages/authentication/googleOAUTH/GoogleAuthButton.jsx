import React, { useEffect, useState } from "react";

const GoogleAuthButton = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for the redirect from Google
    window.addEventListener("message", (event) => {
      const { accessToken } = event.data;
      handleGoogleRedirect(accessToken);
    });

    // Check if there's already an access token stored in local storage
    const storedAccessToken = localStorage.getItem("googleAccessToken");
    if (storedAccessToken) {
      setLoading(true);
      handleGoogleRedirect(storedAccessToken);
    }
  }, []);

  async function googleLogin() {
    try {
      // Redirect the user to the Google OAuth login page
      window.location.href = "http://localhost:3008/users/googleLogin";
    } catch (error) {
      console.log("GoogleLogin function - ERROR: ", error);
    }
  }

  async function handleGoogleRedirect(accessToken) {
    try {
      // Store the access token in local storage for future sessions
      localStorage.setItem("googleAccessToken", accessToken);

      // Make an API call to your server to retrieve the user's data using the access token
      setLoading(true);
      const response = await fetch("http://localhost:3008/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await response.json();

      // Use the user's data for whatever purpose you need, for example, to store it in state
      setUser(userData);
      setLoading(false);
    } catch (error) {
      // Handle the error
      console.log("handleGoogleRedirect function - ERROR: ", error);
    }
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <p>Hello, {user.name}!</p>
      ) : (
        <button onClick={googleLogin}>Login with Google</button>
      )}
    </>
  );
};
