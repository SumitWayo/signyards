import React, { useState } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const Authent = ({ onAuthComplete, handleClose }) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha resolved..");
            onSignup();
          },
        }
      );
    } else {
      console.log("Recaptcha already initialized.");
      onSignup(); // Call your signup function here
    }
  }

  function onSignup() {
    setLoading(true);

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onSignupButtonClick() {
    onCaptchVerify();
    onSignup();
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        const token = await res.user.getIdToken();
        localStorage.setItem("accessToken", token);
        onAuthComplete(token);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-gray-800 font-medium text-2xl">
            👍 Login Success
          </h2>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-center leading-normal text-gray-800 font-medium text-3xl mb-6">
              Welcome to <br /> SIGNYARD.COM
            </h1>
            {showOTP ? (
              <>
                <div className="bg-emerald-500 text-white w-fit mx-auto p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-gray-800 text-center"
                >
                  Enter your OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="opt-container border border-gray-400 rounded px-3 py-2"
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text -white rounded"
                >
                  {loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-emerald-500 text-white w-fit mx-auto p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                  </svg>
                </div>
                <label
                  htmlFor="phone"
                  className="font-bold text-xl text-gray-800 text-center"
                >
                  Verify your phone number
                </label>
                <input
                  type="tel"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  className="border border-gray-400 rounded px-3 py-2"
                />
                <button
                  onClick={() => {
                    handleClose(); // Close the section when button is clicked
                    onSignupButtonClick(); // Trigger signup button click
                  }}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Authent;
