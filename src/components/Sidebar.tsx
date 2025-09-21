/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { categories } from "../data/tools.js";
import SearchBar from "./SearchBar";
import type { Tool } from "../types/index.js";
import { Link } from "react-router-dom";
import IconWrapper from "../utils/IconWrapper";
import Logo from "../assets/csilogo.png";
import { LazyImage } from "./LazyImage.js";

interface SidebarProps {
  tools: Tool[];
  selectedTool: Tool | null;
  onSelectTool: any;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  tools,
  selectedTool,
  onSelectTool,
  searchTerm,
  onSearchChange,
  collapsed,
  onToggleCollapse,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["regular", "creative", "developer", "fun", "forms", "components"])
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getToolsByCategory = (categoryId: string) => {
    return tools.filter((tool) => tool.category === categoryId);
  };

  if (collapsed) {
    return (
      <div className="h-full w-full gradient-sidebar border-r border-slate-700 shadow-xl flex flex-col">
        <div className="p-4">
          <button
            onClick={onToggleCollapse}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Expand sidebar"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full gradient-sidebar border-r border-slate-700 shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <Link to={"/"} className="flex items-center gap-3">
            <IconWrapper className="w-12 h-12">
              <LazyImage src={Logo} />
              {/* <img src={Logo} /> */}
            </IconWrapper>
            <h1 className="text-xl font-bold text-white ml-[-10px]">
              CodeInStock
            </h1>
          </Link>
          <button
            onClick={onToggleCollapse}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Collapse sidebar"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Search tools..."
        />
      </div>

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {searchTerm ? (
          // Show filtered results
          <div className="p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Search Results ({tools.length})
            </h3>
            <div className="space-y-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool)}
                  className={`w-full text-left p-3 rounded-lg transition-all hover-lift ${
                    selectedTool?.id === tool.id
                      ? "bg-indigo-600 text-white border border-indigo-500 shadow-lg"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {tool.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Show categorized tools
          <div className="p-4 space-y-4">
            {Object.entries(categories).map(([categoryId, categoryName]) => {
              const categoryTools = getToolsByCategory(categoryId);
              console.log(categoryTools);
              const isExpanded = expandedCategories.has(categoryId);

              if (categoryTools.length === 0) return null;

              return (
                <div key={categoryId}>
                  <button
                    onClick={() => toggleCategory(categoryId)}
                    className="w-full flex items-center justify-between p-2 text-left text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                  >
                    <span className="text-white">{categoryName}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="mt-2 space-y-1 ml-2">
                      {categoryTools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => onSelectTool(tool)}
                          className={`w-full text-left p-3 rounded-lg  ${
                            selectedTool?.id === tool.id
                              ? "bg-indigo-600 text-white border border-indigo-500 shadow-lg"
                              : "text-slate-300 hover:bg-slate-700 hover:text-white"
                          }`}
                        >
                          <div className="flex gap-2">
                            <IconWrapper>
                              <tool.icon className="w-5 h-5" />
                            </IconWrapper>
                            <div className="font-medium text-sm">
                              {tool.name}
                            </div>
                          </div>
                          {/* <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {tool.description}
                          </div> */}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
