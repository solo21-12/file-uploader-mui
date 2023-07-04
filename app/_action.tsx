"use server";

import supabase from "@/config/supabse";
import { v2 as cloudinary } from "cloudinary";

const adminUsername = process.env
  .NEXT_PUBLIC_ADMIN_USERNAME_POCKETBASE as string;
const adminPassword = process.env
  .NEXT_PUBLIC_ADMIN_PASSWORD_POCKETBASE as string;


const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDNARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDNARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDNARY_SECRET,
  secure: true,
});

export const getSignature = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "next",
    },
    cloudinaryConfig.api_secret as string
  );

  return { timestamp, signature };
};

export const saveToDataBase = async ({
  version,
  signature,
  public_id,
  user,
  filename,
}: any) => {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret as string
  );

  if (expectedSignature === signature) {
    const data = {
      user_id: user,
      public_id: public_id,
      filename: filename,
    };
    await supabase.from("files").insert(data);
  }
};

export const fetchData = async ({ user }: { user: string }) => {
  let records: any = "";
  try {
    // Retrieve data from the table for a specific user ID
    const { data, error } = await supabase.from("files").select();

    if (error) {
      console.log("Error retrieving user data:", error);
      return;
    }

    console.log(data);

    const a = data.filter((data) => data.user_id === user);
    records = a;
  } catch (error) {
    console.log("Error retrieving user data:");
  }
  return records;
};

export const retrieveFile = async (publicId: string) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    const fileUrl = result.secure_url;
    return fileUrl;
  } catch (error) {
    console.error("Error retrieving file:", error);
  }
};

export const deleteFile = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    const { data, error } = await supabase
      .from("files")
      .delete()
      .eq("public_id", publicId);
    console.log("File deletion result:", result,data);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
