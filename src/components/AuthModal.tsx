/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { User, Mail, Lock, CrownIcon } from "../assets/icons/icons";
import IconWrapper from "../utils/IconWrapper";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "./Loader";

const REACT_APP_URL = import.meta.env.REACT_APP_URL;
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const resp = await axios.post(
        "https://omni-backend-lake.vercel.app/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (resp && (resp.status == 201 || resp.status == 200) && resp.data) {
        Cookies.set("accessToken", resp.data.access_token);
        Cookies.set("userId", resp.data.userId);
        const hash = window.location.hash; // "#web-swinger-game?redirectUrl=/checkout/web-swinger-game"
        const hashParams = hash.split("?")[1];
        if (hashParams) {
          const params = new URLSearchParams(hashParams);
          const redirectUrl = params.get("redirectUrl");
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
        setIsLoading(false);
      }
      // onClose();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }

    // TODO: Implement login logic
  };

  const handleRegister = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    // TODO: Implement register logic

    try {
      const resp: any = await axios.post(
        REACT_APP_URL + "/auth/registration",
        formData
      );
      if (resp && (resp.status == 201 || resp.status == 200) && resp.data) {
        Cookies.set("accessToken", resp.data.access_token);
        Cookies.set("userId", resp.data.userId);
        const hash = window.location.hash; // "#web-swinger-game?redirectUrl=/checkout/web-swinger-game"
        const hashParams = hash.split("?")[1];
        if (hashParams) {
          const params = new URLSearchParams(hashParams);
          const redirectUrl = params.get("redirectUrl");
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            window.location.reload();
          }
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      setIsLoading(true);

      try {
        // Send the Google access token to your backend
        const resp = await axios.post(
          "https://omni-backend-lake.vercel.app/auth/google-auth", // Update this endpoint as needed
          {
            access_token: tokenResponse.access_token,
            token_type: tokenResponse.token_type,
            expires_in: tokenResponse.expires_in,
            scope: tokenResponse.scope,
          }
        );

        if (resp && (resp.status === 201 || resp.status === 200) && resp.data) {
          // Store your application's auth token
          Cookies.set("accessToken", resp.data.access_token);
          Cookies.set("userId", resp.data.userId);

          // Handle redirect logic (same as regular login)
          const hash = window.location.hash;
          const hashParams = hash.split("?")[1];
          if (hashParams) {
            const params = new URLSearchParams(hashParams);
            const redirectUrl = params.get("redirectUrl");
            if (redirectUrl) {
              window.location.href = redirectUrl;
            } else {
              window.location.reload();
            }
          } else {
            window.location.reload();
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Google login error:", error);
        setIsLoading(false);
        // You might want to show an error message to the user here
      }
    },
    onError: () => {
      console.log("Google Sign In Failed");
      setIsLoading(false);
    },
  });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-opacity-30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      {loading ? (
        <>
          <div className="relativew-[80px] h-[80px] rounded-full">
            <Loader />
          </div>
        </>
      ) : (
        <>
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-black text-white p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <IconWrapper className="w-8 h-8 text-yellow-500">
                  <CrownIcon />
                </IconWrapper>
                <h2 className="text-2xl font-bold">CodeInStock</h2>
              </div>

              <p className="text-gray-300 text-sm">
                Access premium tools and features
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === "login"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === "register"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {activeTab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconWrapper className="w-5 h-5 text-gray-400">
                          <Mail />
                        </IconWrapper>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconWrapper className="w-5 h-5 text-gray-400">
                          <Lock />
                        </IconWrapper>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IconWrapper className="w-5 h-5 text-gray-400">
                            <User />
                          </IconWrapper>
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="First name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconWrapper className="w-5 h-5 text-gray-400">
                          <Mail />
                        </IconWrapper>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconWrapper className="w-5 h-5 text-gray-400">
                          <Lock />
                        </IconWrapper>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Register
                  </button>
                </form>
              )}

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={() => handleGoogleSignIn()}
                className="cursor-pointer w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Continue with Google
                </span>
              </button>
            </div>

            {/* Terms and Conditions */}
            <div className="px-6 pb-6">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By continuing, you agree to our{" "}
                <a href="/terms" className="text-black hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-black hover:underline">
                  Privacy Policy
                </a>
                . Premium features require payment and are subject to our{" "}
                <a href="/terms" className="text-black hover:underline">
                  Premium Terms
                </a>
                .
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthModal;
