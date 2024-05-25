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
    // Set cookie example (make sure to secure properly)
    res.setHeader(
      "Set-Cookie",
      `token=${user.za}; Path=/; HttpOnly; Secure; SameSite=Lax`
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Firebase authentication error:", error);
    res.status(500).json({ error: "Firebase authentication failed" });
  }
}
