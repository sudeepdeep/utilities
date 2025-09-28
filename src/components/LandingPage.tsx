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
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconWrapper from "../utils/IconWrapper";
import { LazyImage } from "./LazyImage";
import PricingModal from "./PricingModal";

const LandingPage: React.FC = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

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
    { label: "Categories", value: "8" },
    { label: "Ready to Use", value: "100%" },
  ];

  // Carousel functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <IconWrapper className="w-12 h-12">
                {/* <img src={Logo} /> */}
                <LazyImage src={Logo} />
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
              {/* <button
                onClick={() => setIsPricingModalOpen(true)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Pricing
              </button> */}
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

      {/* Games Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interactive 2D Games
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience classic arcade-style games built with pure JavaScript.
              From nostalgic favorites to modern twists.
            </p>
          </div>

          <div className="relative">
            {/* Games Carousel */}
            <div className="games-carousel overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700">
              <div
                className="games-slider flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Snake Game */}
                <div className="game-slide min-w-full flex flex-col lg:flex-row items-center p-8 lg:p-12">
                  <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full mb-4">
                      🐍 Classic Arcade
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Snake Game
                    </h3>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      The timeless classic with smooth animations, growing
                      mechanics, and mobile-like controls. Navigate your snake
                      to collect food while avoiding collisions in this
                      addictive retro game.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Smooth Animations
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Mobile Controls
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        High Score
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Particle Effects
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-green-400">
                        ₹299
                      </span>
                      <Link
                        to="/utilities/category/games/tools/snake-game"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                      >
                        Play Now
                        <span className="ml-2 w-4 h-4">
                          <ArrowRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="game-preview bg-slate-900 rounded-xl p-6 border border-slate-600">
                      <div className="aspect-square bg-gradient-to-br from-green-900 to-green-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <div className="text-6xl">🐍</div>
                        <div className="absolute bottom-4 left-4 text-green-300 text-sm font-mono">
                          Score: 1250
                        </div>
                        <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spider-Man Web Swinger */}
                <div className="game-slide min-w-full flex flex-col lg:flex-row items-center p-8 lg:p-12">
                  <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-blue-500 text-white text-sm font-semibold rounded-full mb-4">
                      🕷️ Action Adventure
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Spider-Man Web Swinger
                    </h3>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      Experience the thrill of web-swinging through a dynamic
                      city with realistic physics. Master the art of momentum
                      and timing in this amazing Spider-Man inspired adventure.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Realistic Physics
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Dynamic City
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Web Mechanics
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Smooth Swinging
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-red-400">
                        ₹299
                      </span>
                      <Link
                        to="/utilities/category/games/tools/web-swinger-game"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-blue-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-blue-600 transition-all duration-200"
                      >
                        Swing Now
                        <span className="ml-2 w-4 h-4">
                          <ArrowRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="game-preview bg-slate-900 rounded-xl p-6 border border-slate-600">
                      <div className="aspect-square bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-city-silhouette opacity-20"></div>
                        <div className="text-6xl">🕷️</div>
                        <div className="absolute bottom-4 left-4 text-blue-300 text-sm font-mono">
                          Distance: 2.5km
                        </div>
                        <div className="absolute top-4 right-4 text-red-300 text-sm font-mono">
                          Speed: 45mph
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tic Tac Toe AI */}
                <div className="game-slide min-w-full flex flex-col lg:flex-row items-center p-8 lg:p-12">
                  <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full mb-4">
                      🎯 Strategy Game
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Tic Tac Toe AI
                    </h3>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      Challenge yourself against an intelligent AI opponent in
                      this classic strategy game. Features smooth animations,
                      score tracking, and multiple difficulty levels.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Smart AI
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Smooth Animations
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Score Tracking
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Two Player Mode
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-purple-400">
                        ₹299
                      </span>
                      <Link
                        to="/utilities/category/games/tools/tic-tac-toe-game"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                      >
                        Challenge AI
                        <span className="ml-2 w-4 h-4">
                          <ArrowRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="game-preview bg-slate-900 rounded-xl p-6 border border-slate-600">
                      <div className="aspect-square bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="grid grid-cols-3 gap-2 w-32 h-32">
                          <div className="bg-slate-700 rounded flex items-center justify-center text-blue-400 text-xl font-bold">
                            X
                          </div>
                          <div className="bg-slate-700 rounded flex items-center justify-center text-red-400 text-xl font-bold">
                            O
                          </div>
                          <div className="bg-slate-700 rounded"></div>
                          <div className="bg-slate-700 rounded flex items-center justify-center text-red-400 text-xl font-bold">
                            O
                          </div>
                          <div className="bg-slate-700 rounded flex items-center justify-center text-blue-400 text-xl font-bold">
                            X
                          </div>
                          <div className="bg-slate-700 rounded"></div>
                          <div className="bg-slate-700 rounded"></div>
                          <div className="bg-slate-700 rounded flex items-center justify-center text-blue-400 text-xl font-bold">
                            X
                          </div>
                          <div className="bg-slate-700 rounded"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 text-purple-300 text-sm font-mono">
                          Player: 3 | AI: 2
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chrome Dino Game */}
                <div className="game-slide min-w-full flex flex-col lg:flex-row items-center p-8 lg:p-12">
                  <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-gray-500 to-gray-700 text-white text-sm font-semibold rounded-full mb-4">
                      🦕 Endless Runner
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Chrome Dinosaur Game
                    </h3>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      The beloved offline Chrome game recreated with
                      pixel-perfect accuracy. Jump over cacti and duck under
                      pterodactyls in this endless desert adventure.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Pixel Perfect
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Endless Runner
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        High Score
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        Retro Style
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-gray-400">
                        ₹199
                      </span>
                      <Link
                        to="/utilities/category/games/tools/chrome-dino-game"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-200"
                      >
                        Start Running
                        <span className="ml-2 w-4 h-4">
                          <ArrowRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="game-preview bg-slate-900 rounded-xl p-6 border border-slate-600">
                      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute bottom-8 left-0 right-0 h-1 bg-gray-700"></div>
                        <div className="text-6xl mb-8">🦕</div>
                        <div className="absolute bottom-12 right-8 text-4xl">
                          🌵
                        </div>
                        <div className="absolute top-4 right-4 text-gray-300 text-sm font-mono">
                          HI 00847
                        </div>
                        <div className="absolute top-8 right-4 text-gray-300 text-sm font-mono">
                          00423
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-slate-600 z-10"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-slate-600 z-10"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2, 3].map((slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === slideIndex
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* View All Games Button */}
          <div className="text-center mt-12">
            <Link
              to="/utilities/category/games/tools/tic-tac-toe-game#tic-tac-toe-game"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Games
              <span className="ml-2 w-5 h-5">
                <ArrowRight />
              </span>
            </Link>
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
              V1.0.1 © 2025 CodeInStock. All rights reserved.
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

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        userEmail="user@example.com"
        userName="Demo User"
      />
    </div>
  );
};

export default LandingPage;
