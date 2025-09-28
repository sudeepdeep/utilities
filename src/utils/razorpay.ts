/* eslint-disable @typescript-eslint/no-explicit-any */

// Razorpay types
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, any>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (options: {
  amount: number;
  currency?: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess: (response: RazorpayResponse) => void;
  onFailure?: (error: any) => void;
  onDismiss?: () => void;
}): Promise<void> => {
  const {
    amount,
    currency = "INR",
    description,
    prefill,
    onSuccess,
    onFailure,
    onDismiss,
  } = options;

  // Load Razorpay script if not already loaded
  const isScriptLoaded = await loadRazorpayScript();

  if (!isScriptLoaded) {
    console.error("Razorpay script failed to load");
    if (onFailure) {
      onFailure(new Error("Razorpay script failed to load"));
    }
    return;
  }

  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  if (!razorpayKeyId) {
    console.error("Razorpay key ID not found in environment variables");
    if (onFailure) {
      onFailure(new Error("Razorpay key ID not configured"));
    }
    return;
  }

  const razorpayOptions: RazorpayOptions = {
    key: razorpayKeyId,
    amount: amount * 100, // Razorpay expects amount in paise
    currency,
    name: "CodeInStock",
    description,
    handler: (response: RazorpayResponse) => {
      console.log("Payment successful:", response);
      onSuccess(response);
    },
    prefill,
    theme: {
      color: "#000000",
    },
    modal: {
      ondismiss: () => {
        console.log("Payment dismissed");
        if (onDismiss) {
          onDismiss();
        }
      },
    },
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.on("payment.failed", (response: any) => {
      console.error("Payment failed:", response.error);
      if (onFailure) {
        onFailure(response.error);
      }
    });
    razorpay.open();
  } catch (error) {
    console.error("Error initializing Razorpay:", error);
    if (onFailure) {
      onFailure(error);
    }
  }
};

// Predefined pricing plans
export const PRICING_PLANS = {
  BASIC: {
    name: "Basic Plan",
    price: 99,
    currency: "INR",
    description: "Access to basic utilities and tools",
    features: [
      "Access to 50+ utilities",
      "Basic code snippets",
      "Email support",
    ],
  },
  PRO: {
    name: "Pro Plan",
    price: 299,
    currency: "INR",
    description: "Access to all premium features",
    features: [
      "Access to 200+ utilities",
      "Premium code snippets",
      "Advanced tools",
      "Priority support",
      "No ads",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise Plan",
    price: 999,
    currency: "INR",
    description: "Full access with enterprise features",
    features: [
      "Unlimited access to all utilities",
      "Custom code generation",
      "API access",
      "Dedicated support",
      "White-label solution",
    ],
  },
};
