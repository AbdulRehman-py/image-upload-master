import toast from 'react-hot-toast';

const ShareButton = ({ buttonClass, filename }) => {
  const handleShare = () => {
    if (!filename) {
      toast.error("Error: No valid filename to share!", {
        duration: 3000,
        icon: '❌',
      });
      return;
    }

    // Build the shareable app URL
    const shareUrl = `${window.location.origin}/image/${filename}`;

    if (navigator.share) {
      navigator.share({
        title: "Check this out!",
        text: "Here's something interesting for you.",
        url: shareUrl,
      }).catch(err => {
        console.error("Sharing failed:", err);
        toast.error("Failed to share the image", {
          duration: 3000,
          icon: '❌',
        });
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success("Link copied to clipboard!", {
          duration: 2000,
          icon: '📋',
        });
      }).catch(() => {
        toast.error("Failed to copy link", {
          duration: 3000,
          icon: '❌',
        });
      });
    }
  };

  return <button className={buttonClass} onClick={handleShare}><img src="/Link.svg" alt="link" className="w-4 h-4 mr-2 inline-block" /> Share</button>;
};

export default ShareButton;