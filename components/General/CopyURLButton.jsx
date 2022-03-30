import useCopyToClipboard from "../../utils/hooks/useCopyToClipboard";

const CopyUrlButton = ({ url }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(url);
  const buttonText = "Copy URL";

  if (copyUrlStatus === "copied") {
    buttonText = "Copied";
  } else if (copyUrlStatus === "failed") {
    buttonText = "Copy failed!";
  }

  return (
    <button
      onClick={copyUrl}
      style={{
        cursor: "pointer",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "1rem",
        marginBottom: "1rem",
        background: "#009fbf",
        color: "white",
      }}
    >
      {buttonText}
    </button>
  );
};

export default CopyUrlButton;
