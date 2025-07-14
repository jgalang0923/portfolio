// src/components/TerminalAnimation.js
import React, { useState, useEffect } from 'react';

const TerminalAnimation = () => {
  const command = "sudo rm -rf / --no-preserve-root";
  const prompt = "ubuntu@Ubuntu:~ # ";
  const [displayedText, setDisplayedText] = useState(prompt);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;

    const handleTyping = () => {
      setTypingSpeed(() => {
        if (isDeleting) return 50;
        if (charIndex === command.length) return 3000;
        if (charIndex === 0 && isDeleting) return 5000;
        return 100;
      });

      setDisplayedText(() => {
        if (isDeleting) {
          return prompt + command.substring(0, charIndex - 1);
        } else {
          return prompt + command.substring(0, charIndex + 1);
        }
      });

      setCharIndex(prev => {
        if (isDeleting) {
          if (prev === 0) {
            setIsDeleting(false);
            return 0;
          }
          return prev - 1;
        } else {
          if (prev === command.length) {
            setIsDeleting(true);
            return prev;
          }
          return prev + 1;
        }
      });
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, charIndex, typingSpeed, command, prompt]);

  return (
    <div
      className="relative bg-cover bg-center rounded-lg shadow-lg w-[786px] h-[527px] flex items-start overflow-hidden"
      style={{ backgroundImage: `url('/images/terminal.webp')`}}
    >
      <div className="absolute top-20 left-16 right-16 bottom-16 text-white font-mono">
        <pre className="whitespace-pre-wrap text-left text-lg">
          {displayedText}
          <span className="animate-blink">_</span>
        </pre>
      </div>
    </div>
  );
};

export default TerminalAnimation;