const ShareButton = ({ buttonClass, filename }) => {
  const handleShare = () => {
    if (!filename) {
      alert("Error: No valid filename to share!");
      return;
    }

    // Build the shareable app URL
    const shareUrl = `${window.location.origin}/image/${filename}`;

    if (navigator.share) {
      navigator.share({
        title: "Check this out!",
        text: "Here’s something interesting for you.",
        url: shareUrl,
      }).catch(err => console.error("Sharing failed:", err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return <button className={buttonClass} onClick={handleShare}>📢 Share</button>;
};

export default ShareButton;