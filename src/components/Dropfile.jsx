import React, { useState, useEffect } from 'react'

const Dropfile = ({isDarkMode}) => {
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 640,
    isSmall: window.innerWidth < 450
  });
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 640,
        isSmall: window.innerWidth < 450
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get background color based on dark mode
  const getBgColor = () => isDarkMode ? "bg-[#121826]" : "bg-gray-100";
  
  // Get text color based on dark mode
  const getTextColor = () => isDarkMode ? "text-gray-200" : "text-gray-800";
  
  // Get border color based on dark mode
  const getBorderColor = () => isDarkMode ? "border-gray-700" : "border-gray-200";
  
  // Determine which padding to apply
  const getPaddingClass = () => {
    if (screenSize.isSmall) {
      return 'px-[1.5rem] py-[5rem]';
    } else if (screenSize.isMobile) {
      return 'p-[5rem]';
    } else {
      return 'p-[8rem]';
    }
  };
  
  return (
    <section className={`flex items-center justify-center w-full h-[100vh] ${getBgColor()} transition-colors duration-300`}>
      <div className={`p-2 sm:p-4 border-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg transition-colors duration-300`}>
        <div 
          className={`border-4 border-dotted ${getBorderColor()} rounded-lg flex flex-col items-center justify-center ${getPaddingClass()} transition-colors duration-300`}
        >
          <img 
            src="/logo-small.svg" 
            alt="download icon" 
            width={30}
            height={20}
          />
          <span className={`${getTextColor()} text-[0.9rem] sm:text-base font-semibold font-sans mt-4 transition-colors duration-300`}>
            Drag and drop files or <strong className="text-blue-500 cursor-pointer font-inter">browse files</strong>
          </span>
          <p className={`font-inter text-[0.9rem] sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
            JPG, PNG, GIF - MAX file size 2MB
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dropfile;