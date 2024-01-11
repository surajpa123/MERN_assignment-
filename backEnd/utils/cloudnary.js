import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: 'dkg4sefyq',
  api_key: '196338983788761',
  api_secret: 'cDZqIs5QNYrZQi7cn4VbX0TDNJk',
});



export const uploadOnCloudinary = async (localFilePath) => {
  try {
     if (!localFilePath) return null;

     const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        overwrite: true,
        public_id: Date.now().toString(),
     });
     fs.unlinkSync(localFilePath);
     //console.log("File uploaded successfully on Cloudinary", response);
     return response;
  } catch (error) {
     fs.unlinkSync(localFilePath);
     console.log("Error uploading file on Cloudinary", error);
     return null;
  }
};
