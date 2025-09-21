import {
  ArrowRight,
  Code2,
  Database,
  Github,
  Palette,
  Shield,
  Sparkles,
  Zap,
} from "../assets/icons/icons";
import Logo from "../assets/csilogo.png";
import React from "react";
import { Link } from "react-router-dom";
import IconWrapper from "../utils/IconWrapper";

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Code2,
      title: "JavaScript Utilities",
      description:
        "Comprehensive collection of JavaScript code snippets and utilities for everyday development tasks.",
    },
    {
      icon: Palette,
      title: "UI Components",
      description:
        "Beautiful, responsive UI components including cards, buttons, modals, and interactive elements.",
    },
    {
      icon: Database,
      title: "Data Tools",
      description:
        "Advanced data manipulation tools with sorting, filtering, and search capabilities.",
    },
    {
      icon: Zap,
      title: "Performance Focused",
      description:
        "Optimized code snippets designed for maximum performance and minimal overhead.",
    },
    {
      icon: Shield,
      title: "Production Ready",
      description:
        "Battle-tested code that's ready for production environments with proper error handling.",
    },
    {
      icon: Sparkles,
      title: "Modern Standards",
      description:
        "Built with modern JavaScript standards, ES6+, and best practices in mind.",
    },
  ];

  const stats = [
    { label: "Code Utilities", value: "50+" },
    { label: "UI Components", value: "25+" },
    { label: "Categories", value: "6" },
    { label: "Ready to Use", value: "100%" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <IconWrapper className="w-12 h-12">
                <img src={Logo} />
              </IconWrapper>
              <span className="text-xl ml-[-10px] font-bold text-white">
                CodeInStock
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="/about"
                className="text-slate-300 hover:text-white transition-colors"
              >
                About
              </a>
              <Link
                to="/utilities"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your JavaScript
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Code Arsenal
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover a curated collection of JavaScript utilities, UI
              components, and code snippets. Built for developers who value
              clean code, performance, and productivity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/utilities"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Utilities
              <span className="ml-2 w-5 h-5">
                <ArrowRight />
              </span>
              {/* <ArrowRight className="ml-2 w-5 h-5" /> */}
            </Link>
            <a
              href="https://github.com/codeinstockapp"
              className="inline-flex items-center px-8 py-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 font-semibold rounded-lg transition-all duration-200"
            >
              <span className="mr-2 w-5 h-5">
                <Github />
              </span>
              {/* <Github className="mr-2 w-5 h-5" /> */}
              View on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From simple utilities to complex components, we've got your
              JavaScript development covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-8 rounded-xl transition-all duration-300 hover-lift"
              >
                <div className="bg-indigo-600 rounded-lg flex items-center justify-center  mb-6  w-10 h-10 text-white">
                  <IconWrapper>
                    <feature.icon />
                  </IconWrapper>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Built for Modern Development
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                CodeInStock is a comprehensive collection of JavaScript
                utilities and UI components designed to accelerate your
                development workflow. Every piece of code is carefully crafted,
                tested, and optimized for real-world applications.
              </p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Whether you're building a simple website or a complex web
                application, our tools help you write better code faster, with
                confidence in quality and performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/utilities"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Start Coding
                  <span className="ml-2 w-4 h-4">
                    <ArrowRight />
                  </span>
                </Link>
                {/* <a
                  href="https://codeinstock.com"
                  className="inline-flex items-center px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 font-semibold rounded-lg transition-colors"
                >
                  <Globe className="mr-2 w-4 h-4" />
                  Visit Website
                </a> */}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code>{`// Example: Array utilities
const uniqueArray = (arr) => {
  return [...new Set(arr)];
};

const groupBy = (arr, key) => {
  return arr.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

// Usage
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];

const grouped = groupBy(users, 'role');
console.log(grouped);`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust CodeInStock for their
            JavaScript development needs.
          </p>
          <Link
            to="/utilities"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now
            <span className="ml-2 w-5 h-5">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* <img
                  src="/csfavicon.png"
                  alt="CodeInStock Logo"
                  className="w-8 h-8"
                  onError={(e) => {
                    console.log("Logo failed to load");
                    e.currentTarget.style.display = "none";
                  }}
                /> */}
                <span className="text-xl font-bold text-white">
                  CodeInStock
                </span>
              </div>
              <p className="text-slate-400 max-w-md">
                Your go-to resource for JavaScript utilities, UI components, and
                development tools. Built by developers, for developers.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/utilities"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Utilities
                  </Link>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:codeinstockapp@gmail.com"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Mail
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/codeinstockapp"
                    target="_blank"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/codeinstock/"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/CodeinStock"
                    target="_blank"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 CodeInStock. All rights reserved.
            </p>

            <p className="text-slate-400 text-[14px]">
              <a href="/about" className=" hover:text-white">
                About
              </a>{" "}
              |{" "}
              <a href="/privacy" className=" hover:text-white">
                Privacy
              </a>{" "}
              |
              <a href="/terms" className=" hover:text-white">
                {" "}
                Terms
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
