import React, { useEffect, useState } from "react";
import ShareButton from "./ShareButton";

const ShowImage = ({ isDarkMode, file, uniqueUrl, filename }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url;

    if (file) {
      url = URL.createObjectURL(file);
      setImageSrc(url);
      return () => URL.revokeObjectURL(url);
    }

    if (uniqueUrl) {
      setImageSrc(uniqueUrl);
      return;
    }

    // Only fetch if filename is present AND file/uniqueUrl are NOT set
    if (filename && !file && !uniqueUrl) {
      const decodedFilename = decodeURIComponent(filename);
      fetch(`${import.meta.env.VITE_API_URL}/api/getImageUrl?filename=${decodedFilename}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.success && data.image_url) {
            setImageSrc(data.image_url);
            setError(null);
          } else {
            setImageSrc(null);
            setError("Failed to load image");
          }
        })
        .catch((error) => {
          console.error("Error fetching image URL:", error);
          setImageSrc(null);
          setError("Failed to load image");
        });
      return;
    }

    setImageSrc(null);
  }, [file, uniqueUrl, filename]);

  const buttonClass =
    "px-4 py-2 m-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200";

  return (
    <div
      className={`flex flex-col items-center justify-center p-5 w-full min-h-screen overflow-y-auto ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } transition-colors duration-300`}
    >
      <div
        className={`p-3 max-w-4xl mx-auto ${
          isDarkMode ? "bg-[#121826]" : "bg-gray-100"
        } rounded-lg transition-colors duration-300`}
      >
        {error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt="Uploaded preview"
            className="w-full h-auto max-h-[80vh] object-contain rounded-[5px]"
            style={{ minHeight: '200px' }}
            onError={() => setError("Failed to load image")}
          />
        ) : (
          <div className="text-center p-4">Loading...</div>
        )}
      </div>
      {imageSrc && !error && (
        <div className="flex gap-2">
          <ShareButton buttonClass={buttonClass} filename={filename} />
          <button
            className={buttonClass}
            onClick={async () => {
              try {
                const response = await fetch(imageSrc);
                if (!response.ok) throw new Error('Download failed');
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename || "downloaded-image";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                console.error("Download error:", err);
                setError("Failed to download image");
              }
            }}
          >
            <img src="/download.svg" alt="download" className="w-4 h-4 mr-2 inline-block" /> Download
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowImage;
