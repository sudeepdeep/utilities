/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { tools } from "../data/tools.js";
import type { Tool } from "../types/index.js";
import AuthModal from "./AuthModal.js";
import { SEO } from "./SEO.js";
import Sidebar from "./Sidebar.js";
import ToolViewer from "./ToolViewer.js";
import axios from "axios";
import Cookies from "js-cookie";

const UtilitiesPage: React.FC = () => {
  const { toolId, categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(
    tools[0] || null
  );
  const [activeTab, setActiveTab] = useState("code");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userData, setUserData] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchTerm) return tools;

    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  function handleToolChange(tool: any) {
    setActiveTab("code");
    setSelectedTool(tool);
    setMobileMenuOpen(false); // Close mobile menu when tool is selected
    navigate(
      `/utilities/category/${tool.category}/tools/${tool.id}#${tool.id}`
    );
  }

  useEffect(() => {
    const userId: any = Cookies.get("userId");
    const token: any = Cookies.get("accessToken");
    if (token) {
      setIsLoading(true);
      axios
        .get(`https://omni-backend-lake.vercel.app/user/${userId}/my-profile`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          if (res.status == 200 && res.data && res.data.user) {
            setUserData(res.data.user);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    if (toolId && categoryId) {
      const tool: any = tools.find((item) => item.id == toolId);
      setSelectedTool(tool);
    } else {
      const tool: any = tools[0];
      setSelectedTool(tools[0]);
      navigate(
        `/utilities/category/${tool.category}/tools/${tool.id}#${tool.id}`
      );
    }
  }, [toolId, categoryId]);

  if (toolId && categoryId && !selectedTool) return <div>Tool not found</div>;

  return (
    <>
      {toolId && categoryId && selectedTool ? (
        <SEO
          title={`${selectedTool.name} - Free JavaScript Code`}
          description={`${selectedTool.description} Copy-paste ready JavaScript code snippet for developers.`}
          keywords={`javascript, ${selectedTool.name.toLowerCase()}, ${
            selectedTool.category
          }, utility, code snippet, developer tools, javascript code snippets, javascript utilities online, free javascript tools, copy paste javascript code, developer tools, javascript helper functions`}
          url={`/utilities/category/${categoryId}/tools/${selectedTool.id}`}
          type="article"
          tool={selectedTool}
        />
      ) : (
        <SEO
          title="JavaScript Utilities & Developer Tools"
          description="Browse our collection of JavaScript utilities, code snippets, and developer tools."
          keywords="javascript utilities, developer tools, code snippets, javascript code snippets, javascript utilities online, free javascript tools, copy paste javascript code, developer tools, javascript helper functions"
          url="/utilities"
        />
      )}
      <div className="relative h-screen bg-slate-900 overflow-hidden">
        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile menu button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Back to home button - mobile */}
        <div className="md:hidden fixed top-4 right-4 z-50">
          <Link
            to="/"
            className="p-2 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>

        {/* Sidebar */}
        <div
          className={`
          fixed left-0 top-0 h-full z-30 transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${sidebarCollapsed ? "md:w-16" : "md:w-72"}
          w-72
        `}
        >
          <Sidebar
            tools={filteredTools}
            selectedTool={selectedTool}
            onSelectTool={handleToolChange}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onModalOpen={() => setIsAuthModalOpen(true)}
            userData={userData}
            setUserData={setUserData}
            loading={loading}
          />
        </div>

        {/* Main content */}
        <main
          className={`
          h-full transition-all duration-300 ease-in-out
          ml-0
          ${sidebarCollapsed ? "md:ml-16" : "md:ml-72"}
        `}
        >
          {/* Desktop back to home button */}
          {/* <div className="hidden md:block absolute top-4 right-4 z-10">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors shadow-lg"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </div> */}

          <ToolViewer
            tool={selectedTool}
            onSelectTool={handleToolChange}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            userData={userData}
            onModalOpen={() => setIsAuthModalOpen(true)}
          />
        </main>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </>
  );
};

export default UtilitiesPage;
