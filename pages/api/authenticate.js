// pages/api/authenticate.js

import { getAuth, signInWithCustomToken } from "firebase/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const auth = getAuth();
  const token = req.body.token; // Assuming you pass the token in the request body

  try {
    const userCredential = await signInWithCustomToken(auth, token);
    const user = userCredential.user;

    // Here, you might generate a session token or JWT token and send it back to the client
    // Or you can set a different authentication mechanism based on your application's requirements

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error("Firebase authentication error:", error);
    res.status(500).json({ error: "Firebase authentication failed" });
  }
}
