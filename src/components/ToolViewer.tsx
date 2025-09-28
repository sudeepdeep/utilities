/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Tool } from "../types/index.tsx";
import CodeBlock from "./CodeBlock.tsx";
import IconWrapper from "../utils/IconWrapper.tsx";
import PremiumCard from "./PremiumCard.tsx";
import Loader from "./Loader.tsx";

interface ToolViewerProps {
  tool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  setActiveTab?: any;
  activeTab?: any;
  userData?: any;
  onModalOpen?: any;
}

const ToolViewer: React.FC<ToolViewerProps> = ({
  tool,
  setActiveTab,
  activeTab,
  userData,
  onModalOpen,
}) => {
  const navigate = useNavigate();
  const [isFree, setIsFree] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData && tool && !tool.isFree) {
      if (userData.purchasedItems && userData.purchasedItems.length > 0) {
        const isUserPurchased = userData.purchasedItems.find(
          (item: any) => item == tool.id
        );
        if (isUserPurchased) {
          setIsFree(true);
        } else {
          setIsFree(false);
        }
        setIsLoading(false);
      } else {
        if (tool?.isFree) {
          setIsFree(true);
        } else {
          setIsFree(false);
        }
        setIsLoading(false);
      }
    } else {
      if (tool?.isFree) {
        setIsFree(true);
      } else {
        setIsFree(false);
      }
      setIsLoading(false);
    }
  }, [tool, userData]);

  function removeQueryFromUrl(url: any) {
    // Remove everything after ? in both main URL and hash
    return url.replace(/\?.*$/, "").replace(/(#.*?)\?.*$/, "$1");
  }

  // Handle payment for premium tools
  const handlePayNow = () => {
    if (!tool) return;
    // Navigate to checkout page with tool ID
    if (!userData) {
      const url = window.location.href;
      let cleanedUrl = removeQueryFromUrl(url);
      cleanedUrl += `?redirectUrl=/checkout/${tool.id}`;
      window.location.href = cleanedUrl;
      onModalOpen();
    } else {
      navigate(`/checkout/${tool.id}`);
    }
  };
  // Function to encrypt code for Syntaxz URL
  function compressCode(code: any) {
    try {
      // Remove extra whitespace and encode for URL

      const cleaned = code
        .split("\n")
        .map((line: any) => line.trim())
        .join("\n")
        .trim();

      // const minified = code.replace(/\s+/g, " ").trim();
      return btoa(encodeURIComponent(cleaned));
    } catch (error) {
      console.error("Compression failed:", error);
      return null;
    }
  }

  // Function to open Syntaxz with encrypted code
  const runOnSyntaxz = () => {
    if (!tool) return;

    const encryptedCode = compressCode(tool.code);
    const syntaxzUrl = `https://www.syntaxz.com/code-editor/javascript?code=${encryptedCode}`;
    window.open(syntaxzUrl, "_blank");
  };

  // Function to run forms in new tab
  const runFormInNewTab = () => {
    if (!tool) return;

    // Check for popup blocker
    const newWindow = window.open(
      "",
      "_blank",
      "width=800,height=600,scrollbars=yes,resizable=yes"
    );

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      alert("Popup blocked! Please allow popups for this site and try again.");
      return;
    }

    try {
      // For form and component tools, the code contains complete HTML, so write it directly
      if (tool.category === "forms" || tool.category === "components") {
        newWindow.document.write(tool.code);
        newWindow.document.close();
      } else {
        // For non-form tools, create a basic HTML structure and execute as JavaScript
        newWindow.document.write(
          `<!DOCTYPE html><html><head><title>${tool.name}</title></head><body><script>${tool.code}</script></body></html>`
        );
        newWindow.document.close();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      // Clear the document and show error
      newWindow.document.open();
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Error - ${tool.name}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #f8f9fa;
            }
            .error-container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              border-left: 4px solid #e74c3c;
            }
            h2 { color: #e74c3c; margin-top: 0; }
            p { color: #666; line-height: 1.5; }
            button {
              background: #3498db;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 4px;
              cursor: pointer;
              margin-top: 15px;
            }
            button:hover { background: #2980b9; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h2>Failed to Load Form</h2>
            <p><strong>Error:</strong> ${errorMessage}</p>
            <p>There was an issue loading the form content. Please try again or contact support if the problem persists.</p>
            <button onclick="window.close()">Close Window</button>
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  if (!tool) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-slate-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-200 mb-2">
            Select a Tool
          </h3>
          <p className="text-slate-400">
            Choose a JavaScript utility from the sidebar to get started
          </p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <div className="text-center">
          {/* <div className="w-16 h-16 mx-auto mb-4 text-slate-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div> */}
          <Loader />
        </div>
      </div>
    );

  return (
    <div className="h-full w-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-gray-400 text-[13px]">
              <a href="/" className="cursor-pointer hover:text-blue-500">
                Home
              </a>
              <h1 className="truncate ml-[0px]"> / {tool.name}</h1>
              <span className="neon-gold w-4">
                <IconWrapper>
                  <tool.icon />
                  {/* {tool.icon ? <tool.icon /> : } */}
                </IconWrapper>
              </span>
            </div>
            <p className="text-slate-300 mt-1 text-sm sm:text-base line-clamp-2">
              {tool.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-600 text-white capitalize shadow-lg">
              {tool.category === "regular" ? "utility" : tool.category}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 sm:mt-6">
          <nav className="flex space-x-4 sm:space-x-8">
            <button
              onClick={() => setActiveTab("code")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "code"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("syntaxz")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === "syntaxz"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="hidden sm:inline">
                {tool.category === "forms" ||
                tool.category === "components" ||
                tool.category === "games"
                  ? "Run HTML"
                  : "Run on Syntaxz"}
              </span>
              <span className="sm:hidden">
                {tool.category === "forms" ||
                tool.category === "components" ||
                tool.category === "games"
                  ? "Run"
                  : "Syntaxz"}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "code" ? (
          !isFree ? (
            // Show premium card for paid tools
            <PremiumCard
              title={tool.name}
              description={tool.description}
              price={tool.price || 0}
              onPayNow={handlePayNow}
            />
          ) : (
            <CodeBlock code={tool.code} language="javascript" />
          )
        ) : (
          <div className="h-full flex items-center justify-center bg-slate-900 p-4 sm:p-8">
            <div className="text-center max-w-md w-full">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-indigo-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-3">
                {tool.category === "forms" ||
                tool.category === "components" ||
                tool.category === "games"
                  ? "Run HTML"
                  : "Run on Syntaxz"}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-sm sm:text-base">
                {tool.category === "forms" ||
                tool.category === "components" ||
                tool.category === "games"
                  ? "Execute this HTML component in a new tab with full CSS and JavaScript functionality."
                  : "Execute this JavaScript code in a professional online compiler environment with full debugging capabilities."}
              </p>
              <button
                onClick={
                  tool.category === "forms" ||
                  tool.category === "components" ||
                  tool.category === "games"
                    ? runFormInNewTab
                    : runOnSyntaxz
                }
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 space-x-2 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>
                  {tool.category === "forms" ||
                  tool.category === "components" ||
                  tool.category === "games"
                    ? "Open Form"
                    : "Open in Syntaxz"}
                </span>
              </button>
              <p className="text-xs text-slate-500 mt-4">
                {tool.category === "forms" ||
                tool.category === "components" ||
                tool.category === "games"
                  ? "Opens form in a new tab with live functionality"
                  : "Opens in a new tab with encrypted code"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolViewer;
