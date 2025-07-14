import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'; // Import the Head component
import Image from 'next/image'; // Import Next.js Image component
import { Sun, Moon, Monitor } from 'lucide-react';
import { Analytics } from "@vercel/analytics/next";
import TerminalAnimation from '/src/components/TerminalAnimation';
import useTheme from '/src/hooks/useTheme';
import { portfolioData as staticPortfolioData } from '/src/data/portfolioData'; // Renamed to avoid confusion with prop name

// Main App Component for the portfolio
// In Next.js, this is your page component. It receives data via props if getStaticProps is used.
export default function Home({ portfolioData }) { // Changed to default export for Next.js page
  // Use the custom useTheme hook for all theme logic
  const { darkMode, themePreference, setThemeLight, setThemeDark, setThemeSystem } = useTheme();

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

  // Smooth scroll function with offset for fixed header
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement && headerRef.current) {
      const headerOffset = headerRef.current.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Short, clear description of your page." />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="theme-color" content="#FFFBF7C" />
        <meta name="author" content="Joshua Galang" />
        <link rel="canonical" href="https://jgalang.com" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-hypertext-markup-language-programming-for-web-pages-and-application-text-color-tal-revivo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-hypertext-markup-language-programming-for-web-pages-and-application-text-color-tal-revivo.png" />
      </Head>

      <div className={`min-h-screen font-inter antialiased transition-all duration-1500 ease-in-out ${darkMode ? 'bg-black text-gray-100' : 'bg-[#FFFBF7] text-gray-800'}`}>
        {/* Header Section */}
        <header ref={headerRef} className={`shadow-sm py-6 transition-colors duration-1500 ease-in-out ${darkMode ? 'bg-gray-900' : 'bg-[#1C398E]'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4">
            <nav className="flex items-center space-x-2 w-full justify-end">
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
              <h2 className="text-5xl font-extrabold mb-2">{portfolioData.name}</h2>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, 'projects')}
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
            {/* Profile Picture (using Next.js Image component) */}
            <div className="md:flex-none flex justify-end">
              <Image
                src="/images/self.webp" // Google Drive URL
                alt="Hope Joshua Galang Profile"
                className="rounded-lg w-[384px] h-[576px] object-cover"
                width={384}
                height={576}
                priority
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
        <section className="py-16">
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
              <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[200vh]">
                {project.id === 1 ? (
                  <div className="flex w-full h-full items-center justify-center relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-2 absolute left-[8%] top-1/2 -translate-y-1/2">
                      <div id="projects"></div>
                      {project.technologies.map((tech, techIndex) => (
                        <div
                          key={tech.name}
                          className={`flex flex-col items-center ${projectsInView[`project-${project.id}`] ? 'animate-popOut' : 'opacity-0'}`}
                          style={{ animationDelay: `${0.5 + techIndex * 0.1}s` }}
                        >
                          {tech.logo && (
                            <Image
                              src={tech.logo}
                              alt={tech.name}
                              className="w-16 h-32 object-contain mb-1"
                              width={48}
                              height={48}
                              unoptimized={true}
                              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=${tech.name.substring(0,1)}`; }}
                            />
                          )}
                          <span className="text-sm font-medium text-white">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[70%]">
                      <div className="relative px-8 py-4 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 rounded-full" style={{ backgroundColor: darkMode ? 'rgba(16, 24, 40, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}></div>
                        <h3
                          id="cloud-services-title"
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
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full h-full items-center justify-center relative z-10">
                    <div className="flex flex-col items-center justify-center space-y-2 absolute left-[8%] top-1/2 -translate-y-1/2">
                      {project.technologies.map((tech, techIndex) => (
                        <div
                          key={tech.name}
                          className={`flex flex-col items-center ${projectsInView[`project-${project.id}`] ? 'animate-popOut' : 'opacity-0'}`}
                          style={{ animationDelay: `${0.5 + techIndex * 0.1}s` }}
                        >
                          {tech.logo && (
                            <Image
                              src={tech.logo}
                              alt={tech.name}
                              className="w-16 h-32 object-contain mb-1 rounded-lg"
                              width={tech.logo.includes('img.icons8.com') ? 48 : tech.logo.includes('external-tal-revivo') ? 96 : tech.logo.includes('upload.wikimedia.org') ? 100 : tech.logo.includes('images.g2crowd.com') ? 100 : tech.logo.includes('cdn-1.webcatalog.io') ? 256 : tech.logo.includes('logodix.com') ? 100 : 100}
                              height={tech.logo.includes('img.icons8.com') ? 48 : tech.logo.includes('external-tal-revivo') ? 96 : tech.logo.includes('upload.wikimedia.org') ? 100 : tech.logo.includes('images.g2crowd.com') ? 100 : tech.logo.includes('cdn-1.webcatalog.io') ? 256 : tech.logo.includes('logodix.com') ? 100 : 100}
                              unoptimized={true}
                              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=${tech.name.substring(0,1)}`; }}
                            />
                          )}
                          <span className="text-sm font-medium text-white">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[70%]">
                      <div className="relative px-8 py-4 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 rounded-full" style={{ backgroundColor: darkMode ? 'rgba(16, 24, 40, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}></div>
                        <h3
                          className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-800'} relative z-10 ${projectsInView[`project-${project.id}`] ? 'animate-slideInFromTop' : 'opacity-0'}`}
                          style={{ animationDelay: '0.1s' }}
                        >
                          {project.title}
                        </h3>
                        <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} relative z-10`}>
                          {project.description}
                        </p>
                      </div>
                      {project.id === 2 && (
                        <div className={`mt-6 relative z-10`}>
                          <TerminalAnimation />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-16 shadow-md rounded-lg mx-auto max-w-4xl mt-8 mb-12 px-6 lg:px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>Get In Touch</h2>
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">
            <p className="mb-2 flex items-center justify-center">
              <Image
                src="https://img.icons8.com/fluency/48/new-post.png"
                alt="Email icon"
                className="w-6 h-6 mr-2"
                width={24} height={24}
                unoptimized={true}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=E`; }} />
              <a href={`mailto:${portfolioData.contactEmail}`} className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{portfolioData.contactEmail}</a>
            </p>
            <p className="mb-2 flex items-center justify-center">
              <Image
                src="https://img.icons8.com/color/48/github--v1.png"
                alt="GitHub icon"
                className="w-6 h-6 mr-2"
                width={24} height={24}
                unoptimized={true}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=G`; }} />
              <a href={`https://github.com/${portfolioData.github}`} target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>github.com/{portfolioData.github}</a>
            </p>
            <p className="flex items-center justify-center">
              <Image
                src="https://img.icons8.com/color/48/linkedin.png"
                alt="LinkedIn icon"
                className="w-6 h-6 mr-2"
                width={24} height={24}
                unoptimized={true}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=L`; }} />
              <a href={`https://www.linkedin.com/in/galangjoshua/`} target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>linkedin.com/in/galangjoshua</a>
            </p>
          </div>
        </section>

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

// Next.js specific data fetching for static content
export async function getStaticProps() {
  // This runs at build time. For a real app, you'd fetch from your Django API here.
  // For now, we use the local static data.
  return {
    props: {
      portfolioData: staticPortfolioData,
    },
  };
}