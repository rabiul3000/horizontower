import axios from "axios";
import { errorAlert } from "../utils/alerts";

const saveImageToDB = async (imageFile) => {
  // Extract cloud name from the .env string
  const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
  const parsedUrl = new URL(cloudinaryUrl);
  const cloudName = parsedUrl.hostname;

  // Unsigned uploads use only this endpoint and preset
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "home_horizon"); // ✅ Must be unsigned

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url;
  } catch (err) {
    return null;
  }
};

export default saveImageToDB;
