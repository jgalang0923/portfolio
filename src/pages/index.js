import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'; // Import the Head component
import Image from 'next/image'; // Import Next.js Image component
import { Sun, Moon, Monitor } from 'lucide-react';
import { Analytics } from "@vercel/analytics/next";
import TerminalAnimation from '/src/components/TerminalAnimation';
import useTheme from '/src/hooks/useTheme';
import { portfolioData as staticPortfolioData } from '/src/data/portfolioData'; // Renamed to avoid confusion with prop name

// Main App Component for the portfolio
export default function Home() {
  // Inlined theme logic for self-contained example
  const [themePreference, setThemePreference] = useState('system'); // 'light', 'dark', or 'system'
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const applyTheme = () => {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (themePreference === 'dark') {
        setDarkMode(true);
      } else if (themePreference === 'light') {
        setDarkMode(false);
      } else { // system
        setDarkMode(isSystemDark);
      }
    };

    applyTheme(); // Apply theme on initial load

    // Listen for system theme changes if preference is 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themePreference === 'system') {
        applyTheme();
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  const setThemeLight = () => setThemePreference('light');
  const setThemeDark = () => setThemePreference('dark');
  const setThemeSystem = () => setThemePreference('system');


  // Refs for Intersection Observer to trigger animations
  const projectRefs = useRef([]);
  const [projectsInView, setProjectsInView] = useState({});

  // Ref for the header to calculate offset
  const headerRef = useRef(null);

  // Intersection Observer for project animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProjectsInView((prev) => ({ ...prev, [entry.target.id]: true }));
          } else {
            setProjectsInView((prev) => ({ ...prev, [entry.target.id]: false }));
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    // Observe each project reference
    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [staticPortfolioData.projects]); // Re-run if projects data changes

  // Smooth scroll function with offset for fixed header
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement && headerRef.current) {
      const headerOffset = headerRef.current.offsetHeight; // Get header height
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Calculate absolute position
      const offsetPosition = elementPosition - headerOffset; // Adjust for fixed header

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // Smooth scrolling animation
      });
    }
  };

  return (
    <>
      {/* Standard HTML Head content - Next.js Head component is not used here */}
      <title>Welcome</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="A Personal portfolio website" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#1C398E" /> {/* Adjusted theme color */}
      <meta name="author" content="Joshua Galang" />
      <link rel="canonical" href="https://jgalang.com" /> {/* Replace with your actual domain */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      {/* Favicons from Icons8, ensure these URLs are stable or self-host */}
      <link rel="icon" type="image/png" sizes="16x16" href="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-hypertext-markup-language-programming-for-web-pages-and-application-text-color-tal-revivo.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-hypertext-markup-language-programming-for-web-pages-and-application-text-color-tal-revivo.png" />


      {/* Main container with theme-based background and text colors */}
      <div className={`min-h-screen font-inter antialiased transition-all duration-1500 ease-in-out ${darkMode ? 'bg-black text-gray-100' : 'bg-[#FFFBF7] text-gray-800'}`}>
        {/* Header Section */}
        <header ref={headerRef} className={`shadow-sm py-6 transition-colors duration-1500 ease-in-out ${darkMode ? 'bg-gray-900' : 'bg-[#1C398E]'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4">
            <nav className="flex items-center space-x-2 w-full justify-end">
              {/* Navigation links */}
              <ul className="flex space-x-4 mr-4">
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`p-2 rounded-md transition duration-300 ${darkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-white hover:text-gray-200'}`}>About</a></li>
                <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={`p-2 rounded-md transition duration-300 ${darkMode ? 'text-gray-300' : 'text-white'} hover:text-gray-200`}>My Skills</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={`p-2 rounded-md transition duration-300 ${darkMode ? 'text-gray-300' : 'text-white'} hover:text-gray-200`}>Contact</a></li>
              </ul>
              {/* Theme Selection Buttons */}
              <div className="flex rounded-full bg-gray-200 dark:bg-gray-800 p-1">
                <button
                  onClick={setThemeLight}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-300 ${themePreference === 'light'
                    ? 'bg-[#FFFBF7] text-indigo-700 shadow'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  aria-label="Light mode"
                >
                  <Sun className="w-5 h-5" />
                </button>
                <button
                  onClick={setThemeDark}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-300 ${themePreference === 'dark'
                    ? 'bg-gray-700 text-yellow-300 shadow dark:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  aria-label="Dark mode"
                >
                  <Moon className="w-5 h-5" />
                </button>
                <button
                  onClick={setThemeSystem}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-300 ${themePreference === 'system'
                    ? 'bg-gray-700 text-yellow-300 shadow'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  aria-label="System mode"
                >
                  <Monitor className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className={`relative min-h-screen flex items-center justify-center pt-6 ${darkMode ? 'bg-black text-gray-100' : 'bg-[#FFFBF7] text-gray-800'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 flex flex-col md:flex-row items-center md:space-x-8 relative">
            {/* Text Content */}
            <div className="text-center md:text-left md:flex-grow mb-8 md:mb-0">
              <h2 className="text-5xl font-extrabold mb-2">{staticPortfolioData.name}</h2>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className={`font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ${darkMode ? 'bg-indigo-400 text-gray-900 hover:bg-indigo-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  My Skills
                </a>
                <a
                  href="https://drive.usercontent.google.com/download?id=1atVtSXEr8ahoS79ReaEQ15o-xeREXLc7&export=download&authuser=0" // Ensure this URL is correct and accessible
                  className={`font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ${darkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </div>
            </div>
            {/* Profile Picture (using standard img tag) */}
            <div className="md:flex-none flex justify-end">
              <img
                src="/images/self.webp" // Local image path, ensure it's accessible in public folder
                alt="Hope Joshua Galang Profile"
                className="rounded-lg w-[384px] h-[576px] object-cover"
                width={384}
                height={576}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-8 mx-auto max-w-4xl px-6 lg:px-4`}>
          <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>About Me</h2>
          <p className={`text-lg leading-relaxed text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{staticPortfolioData.about}</p>
        </section>

        {/* Projects Section - Parallax Waterfall */}
        <section id="projects" className="py-16"> {/* ID moved here for navigation */}
          {staticPortfolioData.projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              ref={(el) => {
                if (el) projectRefs.current[index] = el;
              }}
              className="relative flex flex-col md:flex-row items-center justify-center text-white overflow-hidden md:min-h-screen"
              style={{
                backgroundImage: `url(${project.background})`,
                backgroundColor: project.backgroundColor,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Creates the parallax effect
                minHeight: '100vh', // Each project section takes full viewport height
              }}
            >
              {/* Inner container for content, also takes full viewport height */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
                {/* Project Title and Description (centered) */}
                <div className="relative px-8 py-4 flex flex-col items-center justify-center mb-8 max-w-[90%] md:max-w-[70%]"> {/* Added mb-8 for spacing */}
                  {/* Semi-transparent background for text */}
                  <div className="absolute inset-0 rounded-full" style={{ backgroundColor: darkMode ? 'rgba(16, 24, 40, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}></div>
                  <h3
                    id={`project-title-${project.id}`} // Unique ID for each title
                    className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-800'} relative z-10 ${projectsInView[`project-${project.id}`] ? 'animate-slideInFromTop' : 'opacity-0'}`}
                    style={{ animationDelay: '0.1s' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-700'} relative z-10 ${projectsInView[`project-${project.id}`] ? 'animate-slideInFromTop' : 'opacity-0'}`}
                    style={{ animationDelay: '0.3s' }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Technology Logos (below and horizontal, in boxes) */}
                <div className="flex flex-wrap justify-center gap-4 max-w-[90%]"> {/* Use flex-wrap and gap for horizontal layout */}
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={tech.name}
                      className={`flex flex-col items-center p-4 bg-gray-800/50 rounded-lg shadow-lg ${projectsInView[`project-${project.id}`] ? 'animate-popOut' : 'opacity-0'}`}
                      style={{ animationDelay: `${0.5 + techIndex * 0.1}s` }}
                    >
                      {tech.logo && (
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-12 h-12 object-contain mb-2" // Smaller icon, mb-2 for spacing
                          width={48} // Fixed width for consistent display
                          height={48} // Fixed height for consistent display
                          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/CCCCCC/333333?text=${tech.name.substring(0, 1)}`; }}
                        />
                      )}
                      <span className="text-sm font-medium text-white text-center">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Conditional rendering for TerminalAnimation (only for project.id === 2) */}
                {project.id === 2 && (
                  <div className={`mt-6 relative z-10`}>
                    {/* <TerminalAnimation /> */} {/* Commented out as source not provided */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-12 md:py-16 shadow-md rounded-lg mx-auto max-w-4xl mt-8 mb-12 px-6 lg:px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>Get In Touch</h2>
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">
            <p className="mb-2 flex items-center justify-center flex-wrap">
              <img
                src="https://img.icons8.com/fluency/48/new-post.png"
                alt="Email icon"
                className="w-6 h-6 mr-2"
                width={24} height={24}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=E`; }} />
              <a href={`mailto:${staticPortfolioData.contactEmail}`} className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{staticPortfolioData.contactEmail}</a>
            </p>
            <p className="mb-2 flex items-center justify-center flex-wrap">
              <img
                src="https://img.icons8.com/color/48/github--v1.png"
                alt="GitHub icon"
                className="w-6 h-6 mr-2"
                width={24} height={24}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=G`; }} />
              <a href={`https://github.com/${staticPortfolioData.github}`} target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>github.com/{staticPortfolioData.github}</a>
            </p>

            <p className="flex items-center justify-center flex-wrap">
              <img
                src="https://img.icons8.com/color/48/linkedin.png"
                alt="LinkedIn icon"
                className="w-6 h-6 mr-2"
                width={24} height={24}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=L`; }} />
              <a href={`https://www.linkedin.com/in/galangjoshua/`} target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>linkedin.com/in/galangjoshua</a>

            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 text-center ${darkMode ? 'bg-gray-950 text-gray-400' : 'bg-[#1C398E] text-gray-100'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} {staticPortfolioData.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}