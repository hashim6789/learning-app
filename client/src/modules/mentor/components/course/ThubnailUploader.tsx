interface ThumbnailUploaderProps {
  thumbnail: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  error?: string;
  register: any;
}

export const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  thumbnail,
  onUpload,
  onRemove,
  error,
  register,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-purple-700">
      Thumbnail
    </label>
    <div className="flex items-center justify-center w-full">
      <label className="relative flex items-center justify-center w-full aspect-video border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100">
        {thumbnail ? (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={thumbnail}
              alt="Course thumbnail"
              className="w-full h-full object-cover rounded-lg"
              style={{ aspectRatio: "16 / 9", objectPosition: "center" }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
            >
              Remove
            </button>
          </div>
        ) : (
          <UploadPlaceholder />
        )}
        <input
          {...register("thumbnail")}
          type="file"
          className="hidden"
          onChange={onUpload}
          accept="image/*"
        />
      </label>
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
