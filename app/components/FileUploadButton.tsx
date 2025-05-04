import { useRef } from "react";

export default function FileUploadButton({ onFile }: { onFile: (file: File) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFile(e.target.files[0]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="p-2 rounded-full bg-gradient-to-br from-blue-500 via-fuchsia-500 to-purple-500 shadow-lg hover:scale-110 transition-transform text-white"
        title="Upload File"
        aria-label="Upload File"
      >
        <span role="img" aria-label="file">📎</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}
