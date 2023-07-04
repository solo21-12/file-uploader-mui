import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Image from "next/image";
const Images = ({ files, removeFile }: any) => {
  return (
    <Box sx={{ overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {files.map((item: any) => (
          <ImageListItem
            key={item.name}
            sx={{
              cursor: "pointer",
            }}
          >
            <img
              src={`${item.preview}?w=248&fit=crop&auto=format`}
              srcSet={`${item.preview}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                  onClick={()=>removeFile(item.public_id)}

                >
                  <XMarkIcon className="w-3 lg:w-6 h-3 lg:h-6 fill-white hover:fill-secondary-400 hover:fill-red-500 transition-colors" />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Images;
