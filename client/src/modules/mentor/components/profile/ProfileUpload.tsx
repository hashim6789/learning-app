import { useState } from "react";
import { Camera } from "lucide-react";

type ProfileUploadProps = {};

const ProfileUpload: React.FC<ProfileUploadProps> = ({}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  const onUpload = async (file: File) => {};

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="file-upload"
        className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-purple-300 border-dashed rounded-full cursor-pointer bg-purple-50 hover:bg-purple-100 dark:hover:bg-purple-800 dark:bg-purple-700 dark:border-purple-600 dark:hover:border-purple-500 dark:hover:bg-purple-600"
      >
        <div className="flex flex-col items-center justify-center p-4">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Camera className="w-8 h-8 mb-2 text-purple-500 dark:text-purple-400" />
          )}
          <p className="text-xs text-purple-500 dark:text-purple-400">
            Click to upload
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>
      {file && (
        <p className="mt-2 text-sm text-purple-600">
          Selected file: {file.name}
        </p>
      )}
    </div>
  );
};

export default ProfileUpload;
