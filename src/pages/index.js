import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react'; // Re-imported lucide-react icons

// TerminalAnimation Component: Displays a typing and deleting terminal animation
const TerminalAnimation = () => {
  const command = "sudo rm -rf / --no-preserve-root"; // The command to animate
  const prompt = "ubuntu@Ubuntu:~ # "; // Static terminal prompt
  const [displayedText, setDisplayedText] = useState(prompt); // State for the text currently displayed, initialized with prompt
  const [isDeleting, setIsDeleting] = useState(false); // State to track if text is being deleted
  const [charIndex, setCharIndex] = useState(0); // Index of the current character in the command (excluding prompt)
  const [typingSpeed, setTypingSpeed] = useState(100); // Speed of typing/deleting

  useEffect(() => {
    let timer;

    // Function to handle typing animation
    const handleTyping = () => {
      // If deleting, remove characters from the command part
      if (isDeleting) {
        setDisplayedText(prompt + command.substring(0, charIndex - 1));
        setTypingSpeed(50); // Faster deletion
      } else {
        // If typing, add characters to the command part
        setDisplayedText(prompt + command.substring(0, charIndex + 1));
        setTypingSpeed(100); // Normal typing speed
      }

      // Update character index
      setCharIndex(prev => {
        if (isDeleting) {
          // If deleting and at the beginning of the command, switch to typing
          if (prev === 0) {
            setIsDeleting(false);
            setTypingSpeed(5000); // Pause for 5 seconds after deletion
            return 0;
          }
          return prev - 1; // Decrement index for deletion
        } else {
          // If typing and at the end of the command, switch to deleting
          if (prev === command.length) {
            setIsDeleting(true);
            setTypingSpeed(3000); // Pause for 3 seconds after typing
            return prev;
          }
          return prev + 1; // Increment index for typing
        }
      });
    };

    timer = setTimeout(handleTyping, typingSpeed); // Set timeout for the next character

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, charIndex, typingSpeed, command, prompt]); // Added command and prompt to dependencies

  return (
    // Outer div for the terminal frame, with a background image placeholder
    <div
      className="relative bg-cover bg-center rounded-lg shadow-lg w-[786px] h-[527px] flex items-start overflow-hidden" // Adjusted width and height
      style={{ backgroundImage: `url('http://202.164.169.117:8080/terminal.png')`, backgroundColor: '#333' }} // Placeholder for terminal image
    >
      {/* Inner div to contain the animated text, positioned to simulate terminal content area */}
      <div className="absolute top-20 left-16 right-16 bottom-16 text-white font-mono">
        <pre className="whitespace-pre-wrap text-left text-lg">
          {displayedText}
          <span className="animate-blink">_</span> {/* Blinking cursor */}
        </pre>
      </div>
      {/* Basic blink animation for the cursor */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

// Main App Component for the portfolio
const App = () => {
  // State to hold portfolio data, potentially fetched from a Django backend
  const [portfolioData, setPortfolioData] = useState({
    name: "Hope Joshua Galang",
    about: "Hello! I'm a passionate developer with a knack for building engaging web applications. I enjoy turning complex problems into simple, beautiful, and intuitive designs. My expertise spans across various technologies, and I'm always eager to learn new things and take on exciting challenges.",
    projects: [
      {
        id: 1,
        title: "Cloud Services",
        description: "Expertise in managing and deploying applications on leading cloud platforms.",
        technologies: [
          { name: "Google Cloud", logo: "https://img.icons8.com/fluency/48/google-cloud.png" }, // Added logo property
          { name: "Huawei Cloud", logo: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-huawei-technologies-company-a-chinese-multinational-technology-provides-telecommunications-equipment-and-consumer-electronics-logo-shadow-tal-revivo.png" }, // Added logo property
          { name: "Amazon AWS", logo: "https://img.icons8.com/color/48/amazon-web-services.png" }, // Added logo property
          { name: "Microsoft Azure", logo: "https://img.icons8.com/fluency/48/azure-1.png" }, // Added logo property
          { name: "Globe Cloud", logo: "https://companieslogo.com/img/orig/GTMEY-a1d3b2cf.png?t=1720244492" }, // Added logo property
        ],
        backgroundColor: "#6366F1", // Reverted to original color for Cloud Services
        background: "http://202.164.169.117:8080/1.png", // Placeholder for background image URL
      },
      {
        id: 2,
        title: "System Administrator",
        description: "Proficient in server management, database administration, and system optimization.",
        technologies: [
          { name: "Ubuntu", logo: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-ubuntu-is-a-free-and-open-source-linux-distribution-logo-shadow-tal-revivo.png" }, // Added logo property
          { name: "Nginx", logo: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-nginx-accelerates-content-and-application-delivery-improves-security-logo-shadow-tal-revivo.png"},
          { name: "Glassfish", logo: "https://upload.wikimedia.org/wikipedia/en/8/85/GlassFish_logo.svg"},
          { name: "Tomcat", logo: "https://img.icons8.com/color/48/tomcat.png"},
        ],
        backgroundColor: "#EF4444", // Red 500 for System Administrator
        background: "http://202.164.169.117:8080/2.png", // Placeholder for background image URL
      },
      {
        id: 3,
        title: "Web App Developer",
        description: "Build and maintain web apps using known stacks focusing on responsive UIs and scalable back-end systems",
        technologies: [
          { name: "NextJS", logo: "https://img.icons8.com/fluency/48/nextjs.png" },
          { name: "Tailwind", logo: "https://img.icons8.com/color/48/tailwindcss.png" },
          { name: "Grails", logo: "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_36f1bae8310bb7a2f8417ff867932e4a/grails.png" },
          { name: "PostgreSQL", logo: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-postgre-sql-a-free-and-open-source-relational-database-management-system-logo-shadow-tal-revivo.png" }, // Added logo property
          { name: "MySQL", logo: "https://img.icons8.com/color/48/mysql-logo.png" }, // Added logo property
        ],
        backgroundColor: "#b1dd9e", // Updated color to #b1dd9e for Web App Developer
        background: "http://202.164.169.117:8080/code.png", // Placeholder for background image URL
      },
      {
        id: 4,
        title: "Creating Reports",
        description: "Skilled in developing complex reports and dashboards using Jaspersoft Studio.",
        technologies: [
          { name: "JasperServer", logo: "https://cdn-1.webcatalog.io/catalog/jaspersoft/jaspersoft-icon-filled-256.png?v=1745891749842" }, // Added logo property
          { name: "TIBCO Jaspersoft", logo: "https://logodix.com/logo/1745696.jpg" } // Added logo property
        ],
        backgroundColor: "#3B82F6", // Blue 500 for Creating Reports
        background: "http://202.164.169.117:8080/3.png", // Placeholder for background image URL
      }
    ],
    contactEmail: "joshuagalang8@gmail.com",
    github: "hachiko008",
    linkedin: "https://www.linkedin.com/in/galangjoshua/"
  });

  // State for the current theme mode (true for dark, false for light)
  const [darkMode, setDarkMode] = useState(false);
  // State for the user's explicit theme preference ('light', 'dark', 'system')
  const [themePreference, setThemePreference] = useState(() => {
    // Initialize from localStorage or default to 'system'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('themePreference') || 'system';
    }
    return 'system';
  });

  // Refs for Intersection Observer to trigger animations
  const projectRefs = useRef([]);
  // State to track if a project section is in view for animation
  const [projectsInView, setProjectsInView] = useState({});

  // Ref for the header to calculate offset
  const headerRef = useRef(null);

  // Function to set theme to light
  const setThemeLight = () => {
    setThemePreference('light');
    localStorage.setItem('themePreference', 'light');
  };

  // Function to set theme to dark
  const setThemeDark = () => {
    setThemePreference('dark');
    localStorage.setItem('themePreference', 'dark'); // Corrected localStorage key
  };

  // Function to set theme to system preference
  const setThemeSystem = () => {
    setThemePreference('system');
    localStorage.setItem('themePreference', 'system');
  };

  // Effect to apply theme based on preference and listen for system changes
  useEffect(() => {
    let mediaQuery;
    let handleChange;

    if (themePreference === 'system') {
      // If system preference, check current system theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);

      // Listen for changes in system color scheme preference
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      handleChange = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // If explicit light or dark, set darkMode directly
      setDarkMode(themePreference === 'dark');
    }

    // Apply or remove 'dark' class to document.documentElement
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Cleanup the event listener on component unmount or preference change
    return () => {
      if (mediaQuery && handleChange) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, [themePreference, darkMode]); // Re-run when themePreference or darkMode changes

  // Intersection Observer for project animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProjectsInView((prev) => ({ ...prev, [entry.target.id]: true }));
          } else {
            // Optional: Reset animation when out of view
            setProjectsInView((prev) => ({ ...prev, [entry.target.id]: false }));
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
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
  }, [portfolioData.projects]); // Re-run if projects data changes

  // Function to simulate fetching data from a Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example: Replace with your actual Django API endpoint
        // const response = await fetch('/api/portfolio-data/');
        // const data = await response.json();
        // setPortfolioData(data);

        // For now, we'll just use the static data defined above
        console.log("Simulating data fetch. In a real app, you'd fetch from Django.");
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on component mount

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
    // React.Fragment is used to return multiple top-level elements (style and div)
    <>
      {/* Tailwind CSS Custom Animations (defined inline for demonstration) */}
      {/* In a real project, these would typically be in a CSS file or tailwind.config.js */}
      <style>
        {`
          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes popOut {
            from {
              opacity: 0;
              transform: scale(0.5); /* Logos should not move after popping out */
            }
            to {
              opacity: 1;
              transform: scale(1); /* Logos should not move after popping out */
            }
          }

          .animate-slideInFromTop {
            animation: slideInFromTop 0.8s ease-out forwards;
          }

          .animate-popOut {
            animation: popOut 0.6s ease-out forwards;
          }
        `}
      </style>
      {/* Apply dark mode classes conditionally to the main div */}
      <div className={`min-h-screen font-inter antialiased transition-all duration-1500 ease-in-out ${darkMode ? 'bg-black text-gray-100' : 'bg-[#FFFBF7] text-gray-800'}`}>
        {/* Header Section */}
        <header ref={headerRef} className={`shadow-sm py-6 transition-colors duration-1500 ease-in-out ${darkMode ? 'bg-gray-900' : 'bg-[#1C398E]'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4">
            <nav className="flex items-center space-x-2 w-full justify-end">
              <ul className="flex space-x-4 mr-4">
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`p-2 rounded-md transition duration-300 ${darkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-white hover:text-gray-200'}`}>About</a></li>
                {/* Changed href and onClick to target the specific Cloud Services title */}
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
                  <Sun className="w-5 h-5" /> {/* Sun Icon */}
                </button>
                <button
                  onClick={setThemeDark}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-300 ${themePreference === 'dark'
                    ? 'bg-gray-700 text-yellow-300 shadow dark:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  aria-label="Dark mode"
                >
                  <Moon className="w-5 h-5" /> {/* Moon Icon */}
                </button>
                <button
                  onClick={setThemeSystem}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-300 ${themePreference === 'system'
                    ? 'bg-gray-700 text-yellow-300 shadow' // Always show dark selected style for system button when active
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  aria-label="System mode"
                >
                  <Monitor className="w-5 h-5" /> {/* PC Monitor Icon */}
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className={`relative min-h-screen flex items-center justify-center pt-6 ${darkMode ? 'bg-black text-gray-100' : 'bg-[#FFFBF7] text-gray-800'}`}> {/* Added pt-12 to section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 flex flex-col md:flex-row items-center md:space-x-8 relative"> {/* Removed pt-12 from this div */}
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
                  href="#" // Placeholder for resume download link
                  className={`font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ${darkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                >
                  Download Resume
                </a>
              </div>
            </div>
            {/* Profile Picture Placeholder */}
            <div className="md:flex-none flex justify-end">
              <img
              src="http://202.164.169.117:8080/self.png"
              alt="Hope Joshua Galang Profile"
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
        <section className="py-16"> {/* Removed id="projects" from here */}
          <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>My Skills</h2>
          {portfolioData.projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`} // Added ID for Intersection Observer
              ref={(el) => (projectRefs.current[index] = el)} // Assign ref
              className="relative flex items-center justify-center text-white overflow-hidden"
              style={{
                backgroundImage: `url(${project.background})`, // Re-added background image property
                backgroundColor: project.backgroundColor, // Use specific background color from project data
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Re-added fixed attachment for parallax effect
                minHeight: '100vh', // Ensure the section itself is at least viewport height
              }}
            >
              {/* This is the wrapper for content that will scroll over the fixed background */}
              {/* The content itself will be wrapped in a div that dictates the scrollable height */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[200vh]">
                {/* Conditional rendering for Cloud Services (id: 1) */}
                {project.id === 1 ? (
                  // Specific layout for Cloud Services
                  <div className="flex w-full h-full items-center justify-center relative z-10">
                    {/* Left side: Logos */}
                    <div className="flex flex-col items-center justify-center space-y-2 absolute left-[8%] top-1/2 -translate-y-1/2">
                      {/* New invisible div with id="projects" for precise scrolling */}
                      <div id="projects"></div>
                      {project.technologies.map((tech, techIndex) => (
                        <div
                          key={tech.name}
                          className={`flex flex-col items-center ${projectsInView[`project-${project.id}`] ? 'animate-popOut' : 'opacity-0'}`}
                          style={{ animationDelay: `${0.5 + techIndex * 0.1}s` }}
                        >
                          {/* Icon/Image for Technology */}
                          {tech.logo && (
                            <img
                              src={tech.logo}
                              alt={tech.name}
                              className="w-16 h-32 object-contain mb-1" // Adjust size as needed
                              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=${tech.name.substring(0,1)}`; }} // Fallback
                            />
                          )}
                          <span className="text-sm font-medium text-white">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Center side: Title, Description with Oval Background */}
                    <div className="flex flex-col items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[70%]">
                      {/* Wrapper for the title and description, which will have the oval background */}
                      <div className="relative px-8 py-4 flex flex-col items-center justify-center">
                          {/* The oval background itself */}
                          <div className="absolute inset-0 rounded-full" style={{ backgroundColor: darkMode ? 'rgba(16, 24, 40, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}></div>
                          
                          {/* Title */}
                          <h3
                              id="cloud-services-title" // Added ID here
                              className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-800'} relative z-10 ${projectsInView[`project-${project.id}`] ? 'animate-slideInFromTop' : 'opacity-0'}`}
                              style={{ animationDelay: '0.1s' }}
                          >
                              {project.title}
                          </h3>
                          {/* Description */}
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
                  // Layout for System Administrator and Creating Reports (now also centered text)
                  <div className="flex w-full h-full items-center justify-center relative z-10">
                    {/* Left side: Logos */}
                    <div className="flex flex-col items-center justify-center space-y-2 absolute left-[8%] top-1/2 -translate-y-1/2">
                      {project.technologies.map((tech, techIndex) => (
                        <div
                          key={tech.name}
                          className={`flex flex-col items-center ${projectsInView[`project-${project.id}`] ? 'animate-popOut' : 'opacity-0'}`}
                          style={{ animationDelay: `${0.5 + techIndex * 0.1}s` }}
                        >
                          {/* Icon/Image for Technology */}
                          {tech.logo && (
                            <img
                              src={tech.logo}
                              alt={tech.name}
                              className="w-16 h-32 object-contain mb-1 rounded-lg" // Adjust size as needed
                              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=${tech.name.substring(0,1)}`; }} // Fallback
                            />
                          )}
                          <span className="text-sm font-medium text-white">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Central content block: Title, Description, and Terminal */}
                    <div className="flex flex-col items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[70%]">
                      {/* Wrapper for the title and description, which will have the oval background */}
                      <div className="relative px-8 py-4 flex flex-col items-center justify-center">
                          {/* The oval background itself */}
                          <div className="absolute inset-0 rounded-full" style={{ backgroundColor: darkMode ? 'rgba(16, 24, 40, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}></div>
                          {/* Title */}
                          <h3
                              className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-800'} relative z-10 ${projectsInView[`project-${project.id}`] ? 'animate-slideInFromTop' : 'opacity-0'}`}
                              style={{ animationDelay: '0.1s' }}
                          >
                              {project.title}
                          </h3>
                          {/* Description */}
                          <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} relative z-10`}>
                              {project.description}
                          </p>
                      </div>
                      {project.id === 2 && ( // Only render TerminalAnimation for System Administrator
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
              <img src="https://img.icons8.com/fluency/48/new-post.png" alt="Email icon" className="w-6 h-6 mr-2" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=E`; }} />
              <a href={`mailto:${portfolioData.contactEmail}`} className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{portfolioData.contactEmail}</a>
            </p>
            <p className="mb-2 flex items-center justify-center">
              <img src="https://img.icons8.com/color/48/github--v1.png" alt="GitHub icon" className="w-6 h-6 mr-2" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=G`; }} />
            <a href={`https://github.com/${portfolioData.github}`} target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>github.com/{portfolioData.github}</a>
            </p>
            <p className="flex items-center justify-center">
              <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn icon" className="w-6 h-6 mr-2" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=L`; }} />
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
};

export default App;
