import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Edit, Edit2 } from "lucide-react";
import userImage from "../../../../assets/img/user_image.avif";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { config } from "../../../../shared/configs/config";
import axios from "axios";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

// Configure Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "your_cloud_name", // Replace with your Cloudinary cloud name
  },
});

type FormData = z.infer<typeof schema>;

interface Props {}

const PersonalDetails: React.FC<Props> = ({}) => {
  const [profileImage, setProfileImage] = useState<string>(userImage);

  const handleEditProfileImage = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", config.CLOUDINARY_PRESET); // Replace with your upload preset
      try {
        // Upload to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        if (response.status === 200) {
          console.log(response);
          if (response.data.secure_url) {
            // const profileImage = cld.image(response.data.public_id);
            const profileImage = response.data.secure_url;
            setProfileImage(response.data.secure_url);
            const editImageResponse = await api.put(
              `/api/profile/profile-img`,
              {
                profileImage,
              }
            );
            console.log(editImageResponse);
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isEditable, setIsEditable] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await api.put("/mentor/profile/personal", data);
      if (response.status === 200 && response.data) {
        console.log(response.data);
        showToast.success(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      showToast.error(error.message);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="text-xl font-semibold mb-4">Basic Details</div>
        <div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                {profileImage.startsWith("http") ? (
                  <AdvancedImage cldImg={cld.image(profileImage)} />
                ) : (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <button
                onClick={handleEditProfileImage}
                className="absolute bottom-0 right-0 rounded-full bg-white p-2 border border-gray-300"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditable(!isEditable)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            {isEditable ? "Cancel" : "Edit"}
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border rounded-lg p-4"
        >
          <div className="grid gap-4 mt-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">First Name</label>
              <input
                {...register("firstName")}
                className="border p-2 rounded-md"
                defaultValue={"Muhammed Hashim"}
                placeholder="Enter first name"
                disabled={!isEditable}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                {...register("lastName")}
                className="border p-2 rounded-md"
                defaultValue={"Hashim"}
                placeholder="Enter last name"
                disabled={!isEditable}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input
                defaultValue={"hashim@gmail.com"}
                className="border p-2 rounded-md"
                type="email"
                placeholder="Enter email"
                disabled={true}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4 ${
              !isEditable && "cursor-not-allowed opacity-50"
            }`}
            disabled={!isEditable}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
