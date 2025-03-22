import React, { useState, useEffect } from 'react'

const Dropfile = () => {
    const [screenSize, setScreenSize] = useState({
        isMobile: window.innerWidth < 640,
        isSmall: window.innerWidth < 450
    });
    
    useEffect(() => {
        // Function to handle resize events
        const handleResize = () => {
            setScreenSize({
                isMobile: window.innerWidth < 640,
                isSmall: window.innerWidth < 450
            });
        };
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Determine which padding to apply
    const getPaddingClass = () => {
        if (screenSize.isSmall) {
            return 'px-[2rem] py-[5rem]';
        } else if (screenSize.isMobile) {
            return 'p-[5rem]';
        } else {
            return 'p-[8rem]';
        }
    };
    
    return (
        <section className='flex items-center justify-center w-full h-[100vh]'>
            <div className='sm:p-4 customsize:p-2 p-1 border-1 bg-white rounded-lg'>
                <div 
                    className={`border-4 rounded-lg border-dotted border-gray-200 flex flex-col items-center justify-center ${getPaddingClass()}`}
                >
                    <img src="/download.svg" alt="download icon" />
                    <span className='text-black customsize:text-base text-[0.9rem] font-semibold font-sans'>
                        Drag and drop files or <strong className='text-blue-500 cursor-pointer font-inter'>browse files</strong>
                    </span>
                    <p className='font-inter customsize:text-base text-[0.9rem]'>
                        JPG, PNG, GIF - MAX file size 2MB
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Dropfile