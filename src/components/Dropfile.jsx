import React, { useState, useEffect } from "react";
import ShowImage from "./ShowImage";
import { useDropzone } from 'react-dropzone';
import { supabase } from "../supabaseClient";
import LoadingBar from "./LoadingBar";
import "../styles/loading.css";
import toast from 'react-hot-toast';

const Dropfile = ({ isDarkMode }) => {
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 640,
    isSmall: window.innerWidth < 450,
  });

  const [file, setFile] = useState(null);
  const [uniqueUrl, setUniqueUrl] = useState("");
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = React.useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (["image/jpeg", "image/png", "image/gif"].includes(fileType)) {
        setFile(selectedFile);
      } else {
        toast.error("Please select a valid image file (JPG, PNG, GIF)", {
          duration: 3000,
          icon: '🖼️',
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: false
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

  useEffect(() => {
    if (!file) return;

    setIsUploading(true);
    const filename = `${Date.now()}-${file.name}`;
    setUploadedFilename(filename);
    
    async function ImageSave() {
      try {
        // Upload the file
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filename, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          toast.error("Error uploading file. Please try again.");
          return;
        }

        // Get the public URL
        const { data } = await supabase.storage
          .from("images")
          .getPublicUrl(filename);

        setUniqueUrl(data.publicUrl);
      
        // Save metadata
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/saveImage`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          mode: 'cors',
          body: JSON.stringify({
            image_url: data.publicUrl,
            image_name: filename,
          }),
        });
        
        const result = await response.json();
        if (result.success) {
          console.log("Image metadata saved successfully:", result.data);
          toast.success("Image uploaded successfully!");
        } else {
          console.error("Error saving image metadata:", result.error);
          toast.error("Error saving image metadata");
        }
      } catch (err) {
        console.error("Error during image upload process:", err);
        toast.error("An error occurred during upload");
      } finally {
        setIsUploading(false);
      }
    }

    ImageSave();
  }, [file]);

  return (
    <>
      {isUploading ? (
        <section className={`flex items-center justify-center w-full h-[100vh] ${getBgColor()} transition-colors duration-300`}>
          <LoadingBar />
        </section>
      ) : file && uniqueUrl ? (
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
              {...getRootProps()}
              className={`border-4 border-dotted ${getBorderColor()} rounded-lg flex flex-col items-center justify-center ${getPaddingClass()} transition-colors duration-300 cursor-pointer`}
            >
              <input {...getInputProps()} />
              <img
                src="/logo-small.svg"
                alt="download icon"
                width={30}
                height={20}
              />
              <span
                className={`${getTextColor()} text-[0.9rem] sm:text-base font-semibold font-sans mt-4 transition-colors duration-300`}
              >
                {isDragActive
                  ? "Drop the files here..."
                  : "Drag and drop files or browse files"}
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
