"use server";

import { v2 as cloudinary } from "cloudinary";

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
}: any) => {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret as string
  );

  if (expectedSignature === signature) {
    console.log({ public_id });
  }
};
