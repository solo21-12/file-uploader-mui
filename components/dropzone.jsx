import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Container } from "@mui/material";
import { getSignature, saveToDataBase } from "@/app/_action";

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

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
    // geeting the signature from the server
    const { signature, timestamp } = await getSignature();

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("api_key", process.env.NEXT_PUNLIC_CLOUDNARY_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("folder", "next");

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    await saveToDataBase({
      version: data.version,
      signature: data.signature,
      public_id: data.public_id,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 text-[#817245]  cursor-pointer">
          <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
          {isDragActive ? (
            <p className="text-[#817245]">Drop the files here ...</p>
          ) : (
            <p className="text-[#817245]">
              Drag & drop images here, or click to select files
            </p>
          )}
        </div>
      </div>

      <section className="mt-10">
        {/* Accepted files */}
        <Container>
          {files.length > 0 && (
            <Container>
              <div className="flex gap-4">
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
                  className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:text-[#817245] transition-colors"
                >
                  Upload to Cloudinary
                </button>
              </div>
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
      </section>
    </form>
  );
};

export default Dropzone;
