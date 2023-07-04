import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Container } from "@mui/material";
import { getSignature, saveToDataBase } from "@/app/_action";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuthContext } from "@/app/Context/store";
import { useRouter } from "next/navigation";
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

      const formData = new FormData();
      files.forEach((file) => formData.append("file", file));
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDNARY_API_KEY);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", "next");

      const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
      const dataPromises = files.map((file) =>
        fetch(URL, {
          method: "POST",
          body: formData,
        }).then((res) => res.json())
      );

      const uploadResponses = await Promise.all(dataPromises);

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
          <div className="flex flex-col items-center justify-center gap-4 text-[#817245]  cursor-pointer">
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
                  fontSize:"10px"
                }}
              >
                Drag & drop images here, or click to select files
              </Typography>
            )}
          </div>
        </div>
      )}
      <Container className="mt-10">
        {/* Accepted files */}
        <Container>
          {!isUploading && files.length > 0 && (
            <Container>
              <Container className="flex gap-4">
                <h2 className="title text-3xl font-semibold font-Barlow text-[#817245]">
                  Preview
                </h2>
                <button
                  type="button"
                  onClick={removeAll}
                  className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-[#817245] transition-colors"
                >
                  Remove all files
                </button>
                <button
                  type="submit"
                  className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-[#817245]  rounded-md px-3 hover:text-[#817245] hover:scale-105 transition-colors"
                >
                  Upload to Solo Upload
                </button>
              </Container>
              <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                Accepted Files
              </h3>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="relative h-32 rounded-md shadow-lg"
                  >
                    <Image
                      src={file.preview}
                      alt={file.name}
                      width={100}
                      height={100}
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                      className="h-full w-full object-contain rounded-md"
                    />
                    <button
                      type="button"
                      className="w-7 h-7 border border-secondary-400 bg-red-600 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                      onClick={() => removeFile(file.name)}
                    >
                      <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 hover:fill-red-500 transition-colors" />
                    </button>
                    <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                      {file.name}
                    </p>
                  </li>
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
                  <li
                    key={file.name}
                    className="flex items-start justify-between"
                  >
                    <div>
                      <p className="mt-2 text-neutral-500 text-sm font-medium">
                        {file.name}
                      </p>
                      <ul className="text-[12px] text-red-400">
                        {errors.map((error) => (
                          <li key={error.code}>{error.message}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-[#817245] transition-colors"
                      onClick={() => removeRejected(file.name)}
                    >
                      remove
                    </button>
                  </li>
                ))}
              </ul>
            </Container>
          )}
        </Container>
      </Container>
      <Container>
        {isUploading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80vh",
            }}
          >
            <CircularProgress
              sx={{
                color: "#817245",
                width: "80px !important",
                height: "80px !important",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Barlow",
                color: "#817245",
                fontSize: "60px",
              }}
              className="mt-5 text-lg"
            >
              Uploading...
            </Typography>
          </Box>
        )}

        {isUploaded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80vh",
            }}
          >
            <div className="">
              <div className="message-container-child-cirlce">
                <CheckIcon
                  sx={{
                    color: "white",
                    fontSize: "45px",
                  }}
                />
              </div>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Barlow",
                  color: "#817245",
                  fontSize: "60px",
                }}
                className="mt-5 text-lg"
              >
                Succesfully Uploaded
              </Typography>
              <Button
                sx={{
                  color: "#817245",
                  ":hover": {
                    bgcolor: "white",
                    scale: "1.05",
                  },
                  marginTop: "25px",
                }}
                variant="contained"
                onClick={() => setIsUploaded(!isUploaded)}
              >
                Continue Uploading
              </Button>
            </div>
          </Box>
        )}
      </Container>
    </form>
  );
};

export default Dropzone;
