import React, { useEffect, useState } from 'react';
import ShareButton from './ShareButton';

const ShowImage = ({ isDarkMode, file }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setBase64Image(reader.result);

      return () => URL.revokeObjectURL(url); // Cleanup when component unmounts
    }
  }, [file]);

  const buttonClass = "px-4 py-2 m-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200";

  return (
    <div className={`flex flex-col items-center justify-center p-5 w-full h-[100vh] ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
      <div className={`p-3 ${isDarkMode ? 'bg-[#121826]' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Uploaded preview"
            className="max-w-full h-auto rounded-[5px]"
            width={420}
            height={300}
          />
        )}
      </div>
      <div className='flex gap-2'>
        <ShareButton buttonClass={buttonClass} imageUrl={base64Image} />
        <a href={imageSrc} download="shared-image.png">
          <button className={buttonClass}>Download</button>
        </a>
      </div>
    </div>
  );
};

export default ShowImage;
