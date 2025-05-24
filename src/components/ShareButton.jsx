const ShareButton = ({ buttonClass, imageUrl }) => {
  const handleShare = () => {
    if (!imageUrl) {
      alert("Error: No valid image URL to share!");
      return;
    }

    if (navigator.share) {
      navigator.share({
        title: "Check this out!",
        text: "Here’s something interesting for you.",
        url: imageUrl.startsWith("data:image") ? window.location.href : imageUrl, // Fallback for Base64
      }).catch(err => console.error("Sharing failed:", err));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return <button className={buttonClass} onClick={handleShare}>📢 Share</button>;
};

export default ShareButton;
