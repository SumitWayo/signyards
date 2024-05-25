import { serialize } from "cookie";

export default function handler(req, res) {
  const cookie = serialize("token", "your-token-value", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3600, // 1 hour
    sameSite: "Lax",
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ success: true });
}
