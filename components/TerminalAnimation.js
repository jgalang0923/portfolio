import React, { useState, useEffect } from 'react';

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
    // Outer div for the terminal frame, with a background image
    <div
      className="relative bg-cover bg-center rounded-lg shadow-lg w-[500px] h-64 flex items-start overflow-hidden" // Increased height for better terminal appearance
      style={{ backgroundImage: `url(https://placehold.co/500x256/333333/333333?text=)` }} // Placeholder for terminal background image
    >
      {/* Inner div to contain the animated text, positioned to simulate terminal content area */}
      <div className="absolute top-8 left-4 right-4 bottom-4 text-green-400 font-mono">
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

export default TerminalAnimation;
