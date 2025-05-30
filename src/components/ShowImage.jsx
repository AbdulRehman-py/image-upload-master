import React, { useEffect, useState } from "react";
import ShareButton from "./ShareButton";

const ShowImage = ({ isDarkMode, file, uniqueUrl, filename }) => {
  const [imageSrc, setImageSrc] = useState(null);

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
    fetch(`http://localhost:3000/api/getImageUrl?filename=${filename}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.image_url) {
          setImageSrc(data.image_url);
        } else {
          setImageSrc(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
        setImageSrc(null);
      });
    return;
  }

  setImageSrc(null);
}, [file, uniqueUrl, filename]);
console.log("Image Source:", imageSrc);

  const buttonClass =
    "px-4 py-2 m-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200";

  return (
    <div
      className={`flex flex-col items-center justify-center p-5 w-full h-[100hv] ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } transition-colors duration-300`}
    >
      <div
        className={`p-3 ${
          isDarkMode ? "bg-[#121826]" : "bg-gray-100"
        } rounded-lg transition-colors duration-300 `}
      >
        {imageSrc && (
          <img
            src={imageSrc || "default.png"}
            alt="Uploaded preview"
            className="max-w-full  rounded-[5px]"
            width={420}
            height={100}
          />
        )}
      </div>
      <div className="flex gap-2">
        <ShareButton buttonClass={buttonClass} filename={filename} />
<button
  className={buttonClass}
  onClick={async () => {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "downloaded-image";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }}
>
  Download
</button>
      </div>
    </div>
  );
};

export default ShowImage;
