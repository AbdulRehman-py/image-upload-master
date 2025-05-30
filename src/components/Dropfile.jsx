import React, { useState, useEffect, useRef } from "react";
import ShowImage from "./ShowImage";
import { supabase } from "../../supabaseClient";

const Dropfile = ({ isDarkMode }) => {
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 640,
    isSmall: window.innerWidth < 450,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 640,
        isSmall: window.innerWidth < 450,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBgColor = () => (isDarkMode ? "bg-[#121826]" : "bg-gray-100");
  const getTextColor = () => (isDarkMode ? "text-gray-200" : "text-gray-800");
  const getBorderColor = () =>
    isDarkMode ? "border-gray-700" : "border-gray-200";

  const getPaddingClass = () => {
    if (screenSize.isSmall) {
      return "px-[1.5rem] py-[5rem]";
    } else if (screenSize.isMobile) {
      return "p-[5rem]";
    } else {
      return "p-[8rem]";
    }
  };

  // ...existing code...

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uniqueUrl, setUniqueUrl] = useState("");
  const handleButtonClick = () => fileInputRef.current.click();
  const [uploadedFilename , setUploadedFilename] = useState("");
 



  const handleFileChange = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (["image/jpeg", "image/png", "image/gif"].includes(fileType)) {
        setFile(selectedFile);
      } else {
        alert("Please select a valid image file (JPG, PNG, GIF)");
      }
    }
  };

  useEffect(() => {

    if (!file) return;

    
    const filename = `${Date.now()}-${file.name}`;
    setUploadedFilename(filename);
    async function ImageSave() {
      
      const {error} = await supabase.storage
        .from('images')
        .upload(filename, file);

      if (error) {
        console.error("Error uploading file:", error);
        return;
      }

      const { data} = supabase.storage
      .from("images")
      .getPublicUrl(filename);

      setUniqueUrl(data.publicUrl);
    
    
    try {
      const response = await fetch("http://localhost:3000/api/saveImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: data.publicUrl,
          image_name: filename,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("Image metadata saved successfully:", result.data);
      } else {
        console.error("Error saving image metadata:", result.error);
      }
    } catch (err) {
      console.error("Error uploading image metadata:", err);
    }
    }

    ImageSave();

  }, [file]);

  

  

  return (
    <>
      {file && uniqueUrl ? (
        <ShowImage uniqueUrl={uniqueUrl} file={file} filename={uploadedFilename} isDarkMode={isDarkMode} />
      ) : (
        <section
          className={`flex items-center justify-center w-full h-[100vh] ${getBgColor()} transition-colors duration-300`}
        >
          <div
            className={`p-2 sm:p-4 border-1 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg transition-colors duration-300`}
          >
            <div
              className={`border-4 border-dotted ${getBorderColor()} rounded-lg flex flex-col items-center justify-center ${getPaddingClass()} transition-colors duration-300`}
            >
              <img
                src="/logo-small.svg"
                alt="download icon"
                width={30}
                height={20}
              />
              <span
                className={`${getTextColor()} text-[0.9rem] sm:text-base font-semibold font-sans mt-4 transition-colors duration-300`}
              >
                Drag and drop files or{" "}
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="text-blue-500 cursor-pointer font-inter"
                >
                  browse files
                </button>
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </span>
              <p
                className={`font-inter text-[0.9rem] sm:text-base ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } transition-colors duration-300`}
              >
                JPG, PNG, GIF - MAX file size 2MB
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Dropfile;
