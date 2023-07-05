"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container } from "@mui/material";
import { getSignature, saveToDataBase } from "@/app/_action";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuthContext } from "@/app/Context/store";
import { useRouter } from "next/navigation";
import Uploading from "./uploading";
import Success from "./succes";
import Rejected from "./rejected";
const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 10,
    multiple: true,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files?.length) return;
    if (!currentUser) {
      router.push("/auth");
    } else {
      setIsUploading(true);
      const { signature, timestamp } = await getSignature();

      const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDNARY_API_KEY);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("folder", "next");

        const uploadPromise = fetch(URL, {
          method: "POST",
          body: formData,
        }).then((res) => res.json());

        uploadPromises.push(uploadPromise);
      }

      const uploadResponses = await Promise.all(uploadPromises);

      if (uploadResponses.length === files.length) {
        setIsUploading(false);
        setIsUploaded(true);
        removeAll();

        for (let i = 0; i < uploadResponses.length; i++) {
          const uploadData = uploadResponses[i];
          await saveToDataBase({
            version: uploadData.version,
            signature: uploadData.signature,
            public_id: uploadData.public_id,
            user: currentUser.id,
            filename: uploadData.original_filename,
          });
        }
      }
    }
    // Getting the signature from the server
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isUploaded && !isUploading && (
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 text-[#817245]  cursor-pointer p-10">
            <CloudUploadIcon className="w-14 h-14 fill-current" sx={{}} />
            {isDragActive ? (
              <Typography
                sx={{
                  fontFamily: "Barlow",
                  color: "#817245",
                }}
              >
                Drop the files here ...
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontFamily: "Barlow",
                  color: "#817245",
                  fontSize: "10px",
                }}
              >
                Drag & drop images here, or click to select files
              </Typography>
            )}
          </div>
        </div>
      )}
      <Container
        className="mt-10"
        sx={{
          padding: 0,
        }}
      >
        <Container
          sx={{
            padding: 0,
          }}
        >
          {!isUploading && files.length > 0 && (
            <Container>
              <h2 className="title text-3xl font-semibold font-Barlow text-[#817245]">
                Preview
              </h2>
              <Container className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={removeAll}
                  className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-[#817245] transition-colors"
                >
                  Remove all
                </button>
                <button
                  type="submit"
                  className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-[#817245]  rounded-md px-3 hover:text-[#817245] hover:scale-105 transition-colors"
                >
                  Upload
                </button>
              </Container>
              <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                Accepted Files
              </h3>
              <ul className="mt-6 flex flex-col">
                {files.map((file, errors) => (
                  <Rejected
                    file={file}
                    errors={errors}
                    removeRejected={removeFile}
                  />
                ))}
              </ul>
            </Container>
          )}

          {/* Rejected Files */}
          {rejected.length > 0 && (
            <Container>
              <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
                Rejected Files
              </h3>
              <ul className="mt-6 flex flex-col">
                {rejected.map(({ file, errors }) => (
                  <Rejected
                    file={file}
                    errors={errors}
                    removeRejected={removeRejected}
                  />
                ))}
              </ul>
            </Container>
          )}
        </Container>
      </Container>
      <Container>
        {isUploading && <Uploading text="Uploading..." />}

        {isUploaded && (
          <Success setIsUploaded={setIsUploaded} isUploaded={isUploaded} />
        )}
      </Container>
    </form>
  );
};

export default Dropzone;
