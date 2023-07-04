"use client";

import { Fade } from "@mui/material";
import { useEffect, useState } from "react";

import { deleteFile, fetchData, retrieveFile } from "@/app/_action";
import Images from "@/components/Images";
import Variants from "@/components/skeleton";
import { useAuthContext } from "@/app/Context/store";
import supabase from "@/config/supabse";

interface Data {
  name: string;
  preview: string;
  public_id: string;
  collectionId: string;
}

const DataComponent: React.FC = () => {
  const { currentUser } = useAuthContext();
  const [datas, setData] = useState<Data[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setShow(true);
      const { data, error }: { data: any; error: any } = await supabase
        .from("files")
        .select();
      const a = data.filter((data: any) => data.user_id === currentUser.id);

      if (a && a.length > 0) {
        for (const file of a) {
          const retrieveFiles = await retrieveFile(file.public_id);
          setData((prevData) => [
            ...prevData,
            {
              name: file.filename,
              preview: retrieveFiles,
              public_id: file.public_id,
              collectionId: file.collectionId,
            },
          ]);
        }
      }
    };

    fetchDataAsync();
  }, [currentUser.id]);

  const deletFiles = (public_id: string) => {
    const a = datas.filter((item) => item.public_id !== public_id);
    setData(a);
    deleteFile(public_id);
  };
  return (
    <Fade in={show} timeout={2000}>
      <div>
        {datas && datas.length > 0 ? (
          <Images files={datas} removeFile={deletFiles} />
        ) : (
          <Variants />
        )}
      </div>
    </Fade>
  );
};

export default DataComponent;
