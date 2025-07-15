// /src/pages/contact.js (or /src/components/ContactSection.js if it's a component)
import React from 'react';

const ContactSection = ({ darkMode, portfolioData }) => {
  return (
    <section id="contact" className={`py-16 shadow-md rounded-lg mx-auto max-w-4xl mt-8 mb-12 px-6 lg:px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>Get In Touch</h2>
      <div className="text-center text-lg text-gray-700 dark:text-gray-300">
        <p className="mb-2 flex items-center justify-center">
          <img
            src="https://img.icons8.com/fluency/48/new-post.png"
            alt="Email icon"
            className="w-6 h-6 mr-2"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=E`; }} />
          <a href={`mailto:${portfolioData.contactEmail}`} className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{portfolioData.contactEmail}</a>
        </p>
        <p className="mb-2 flex items-center justify-center">
          <img
            src="https://img.icons8.com/color/48/github--v1.png"
            alt="GitHub icon"
            className="w-6 h-6 mr-2"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/CCCCCC/333333?text=G`; }} />
          <a href={`https://github.com/${portfolioData.github}`} target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>github.com/{portfolioData.github}</a>
        </p>
        <p className="flex items-center justify-center">
          <img
            src="https://img.icons8.com/color/48/linkedin.png"
            alt="LinkedIn icon"
            className="w-6 h-6 mr-2"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/333333?text=L`; }} />
          <a href={`https://www.linkedin.com/in/galangjoshua/`} target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>linkedin.com/in/galangjoshua</a>
        </p>
      </div>
    </section>
  );
};


export default ContactSection; // Export the component