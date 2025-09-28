import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tools } from "../data/tools";
import { initiateRazorpayPayment } from "../utils/razorpay";
import IconWrapper from "../utils/IconWrapper";
import { checkUserPurchasedTool } from "../data/userTools";
import Loader from "./Loader";

interface CheckoutPageProps {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUserPurchased, setIsUserPurchased] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (toolId) {
      const checkPurchase = async () => {
        try {
          const result = await checkUserPurchasedTool(toolId);
          console.log(result);
          if (result) {
            setIsUserPurchased(true);
          } else {
            const foundTool = tools.find((t) => t.id === toolId);
            if (foundTool) {
              setTool(foundTool);
            } else {
              navigate("/utilities");
            }
          }
        } catch (error) {
          console.error("Error checking purchase:", error);
        } finally {
          setLoading(false);
        }
      };

      checkPurchase();
    }
    setLoading(false);
  }, [toolId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!tool || !userInfo.name || !userInfo.email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await initiateRazorpayPayment({
        amount: tool.price,
        currency: "INR",
        description: `${tool.name} - ${tool.description}`,
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        onSuccess: (response) => {
          console.log("Payment successful:", response);
          alert(`Payment successful! You now have access to ${tool.name}`);
          // Here you would typically:
          // 1. Send payment details to your backend
          // 2. Update user's purchased items
          // 3. Redirect to the tool
          navigate(`/utilities/category/${tool.category}/tools/${tool.id}`);
        },
        onFailure: (error) => {
          console.error("Payment failed:", error);
          alert("Payment failed. Please try again.");
        },
        onDismiss: () => {
          console.log("Payment modal dismissed");
        },
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isUserPurchased) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl flex flex-col items-center">
          <p>Already purchased this tool. Please go back and check</p>
          <br />
          <button
            onClick={() => (window.location.href = "/utilities")}
            className="bg-indigo-600 w-[200px] p-2 rounded-4xl cursor-pointer"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-slate-300">
            Complete your purchase to access this premium tool
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tool Information */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tool Details
            </h2>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <IconWrapper className="w-6 h-6 text-indigo-600">
                  <tool.icon />
                </IconWrapper>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{tool.description}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                  {tool.category === "regular" ? "utility" : tool.category}
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Tool Price:</span>
                <span className="text-lg font-semibold text-gray-900">
                  ₹{tool.price}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="text-gray-900">₹0</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-indigo-600">₹{tool.price}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                What you get:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Lifetime access to {tool.name}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Full source code access
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Copy and use in your projects
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No subscription required
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Payment Information
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Secure Payment
                    </p>
                    <p className="text-xs text-blue-600">
                      Your payment is processed securely through Razorpay
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Pay ₹{tool.price} with Razorpay
              </button>

              {/* Back Button */}
              <button
                onClick={() => navigate("/utilities")}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                ← Back to Tool
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  SSL Secured
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Instant Access
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Money Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                What happens after payment?
              </h4>
              <p className="text-gray-600 text-sm">
                You'll get instant access to the tool's source code and can
                start using it immediately in your projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Is this a one-time payment?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes! This is a one-time payment for lifetime access to this
                specific tool. No recurring charges.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Can I use this in commercial projects?
              </h4>
              <p className="text-gray-600 text-sm">
                Absolutely! Once purchased, you can use the code in any personal
                or commercial project without restrictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
