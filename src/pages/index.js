import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { portfolioData as staticPortfolioData } from '/src/data/portfolioData';
import useTheme from '/src/hooks/useTheme';
import ContactSection from '/src/pages/ContactSection';
import TerminalAnimation from '/src/components/TerminalAnimation';

export default function Home({ portfolioData: propPortfolioData }) {
  const { darkMode, themePreference, setThemeLight, setThemeDark, setThemeSystem } = useTheme();

  const portfolioData = propPortfolioData || staticPortfolioData;

  const projectRefs = useRef([]);
  const [projectsInView, setProjectsInView] = useState({});

  const headerRef = useRef(null);
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
        threshold: 0.5,
      }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [portfolioData.projects]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement && headerRef.current) {
      const headerOffset = headerRef.current.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (window.innerHeight / 2) + (targetElement.offsetHeight / 2);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <div className={`min-h-screen font-inter antialiased transition-all duration-1500 ease-in-out ${darkMode ? 'bg-black text-gray-100' : 'bg-[#FFFBF7] text-gray-800'}`}>
        {/* Header Section */}
        <header ref={headerRef} className={`shadow-sm py-6 transition-colors duration-1500 ease-in-out ${darkMode ? 'bg-gray-900' : 'bg-[#1C398E]'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4">
            <nav className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo-680.webp"
                  alt="Logo"
                  className="w-12 h-12 rounded-full"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/CCCCCC/333333?text=P`; }}
                />
                {/* You can add text next to the logo if needed, e.g., <span className="text-white text-xl font-bold">My Portfolio</span> */}
              </div>
              <div className="flex items-center space-x-2">
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
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className={`relative min-h-screen flex items-center justify-center pt-6 ${darkMode ? 'bg-black text-gray-100' : 'bg-[#FFFBF7] text-gray-800'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 flex flex-col md:flex-row items-center md:space-x-8 relative">
            {/* Text Content */}
            <div className="text-center md:text-left md:flex-grow mb-8 md:mb-0">
              <h2 className="text-5xl font-extrabold mb-2">{portfolioData.name}</h2>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="#project-1"
                  onClick={(e) => scrollToSection(e, 'project-1')}
                  className={`font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ${darkMode ? 'bg-indigo-400 text-gray-900 hover:bg-indigo-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  View Portfolio
                </a>
                <a
                  href="https://drive.usercontent.google.com/download?id=1atVtSXEr8ahoS79ReaEQ15o-xeREXLc7&export=download&authuser=0"
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
                src="/images/self.webp" // Placeholder for self.webp
                alt="Me"
                className="rounded-lg w-[384px] h-[576px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-8 mx-auto max-w-4xl px-6 lg:px-4`}>
          <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>About Me</h2>
          <p className={`text-lg leading-relaxed text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{portfolioData.about}</p>
        </section>

        {/* Projects Section - Parallax Waterfall */}
        <section id="projects" className="py-16"> {/* Moved id="projects" here */}
          {portfolioData.projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              ref={(el) => (projectRefs.current[index] = el)}
              className="relative flex items-center justify-center text-white overflow-hidden"
              style={{
                backgroundImage: `url(${project.background})`,
                backgroundColor: project.backgroundColor,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
              }}
            >
              {/* Ensure this inner div takes full height of its parent and centers content */}
              {/* Increased min-h to 200vh to allow for more scrolling before content moves */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[200vh]">
                {/* This is the container for the oval and the technologies */}
                <div className="flex flex-col items-center text-center max-w-[70%]">
                  {/* Oval (Title & Description) - Removed animation classes from here */}
                  <div className="relative px-8 py-4 flex flex-col items-center justify-center mb-8">
                    <div className="absolute inset-0 rounded-full" style={{ backgroundColor: darkMode ? 'rgba(16, 24, 40, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}></div>
                    <h3
                      className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-800'} relative z-10`} // Removed animation class
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-700'} relative z-10`} // Removed animation class
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies (Icons) - positioned horizontally below the oval, with animation */}
                  <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                    {project.technologies.map((tech, techIndex) => (
                      <div
                        key={tech.name}
                        className={`flex flex-col items-center ${projectsInView[`project-${project.id}`] ? 'animate-slideInFromTop' : 'opacity-0'}`} // Animation remains here
                        style={{ animationDelay: `${0.5 + techIndex * 0.1}s` }}
                      >
                        {tech.logo && (
                          <img
                            src={tech.logo}
                            alt={tech.name}
                            className="w-12 h-12 object-contain rounded-lg"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/CCCCCC/333333?text=${tech.name.substring(0,1)}`; }}
                          />
                        )}
                        <span className="text-xs font-medium text-white mt-1">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Terminal Animation for System Administrator section - Conditional rendering for screen size */}
                {project.id === 2 && (
                  <div className={`mt-8 relative z-10 w-full hidden md:flex justify-center`}>
                    <TerminalAnimation />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Render the ContactSection component, passing necessary props */}
        <ContactSection darkMode={darkMode} portfolioData={portfolioData} />

        {/* Footer */}
        <footer className={`py-8 text-center ${darkMode ? 'bg-gray-950 text-gray-400' : 'bg-[#1C398E] text-gray-100'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}