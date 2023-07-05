"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Rejected({
  file,
  errors,
  removeRejected,
}: {
  file: { name: string,preview?:string};
  errors: { message: string };
  removeRejected: (name: string) => void;
}) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      key={file.name}
    >
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => removeRejected(file.name)}
          >
            <DeleteIcon  sx={{
                color:"red"
            }}/>
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar 
          src={file.preview && file.preview}
          sx={{
            bgcolor:'teal'
          }}>
            {!file.preview && <ImageIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={file.name} secondary={errors.message} />
      </ListItem>
    </List>
  );
}
