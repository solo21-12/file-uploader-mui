"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Grid,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  LinearProgress,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: File[] = Array.from(event.target.files);
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...newFiles,
      ]);
    }
  };

  const handleRemoveFile = (file: File) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((f) => f !== file)
    );
  };

  const handleUpload = () => {
    // Simulating file upload progress for demonstration purposes
    setUploadProgress(0);
    const totalFiles = selectedFiles.length;

    const timer = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress! + 10;
        if (newProgress >= 100) {
          clearInterval(timer);
          return null;
        }
        return newProgress;
      });
    }, 500);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon color="info" />;
    } else {
      return <InsertDriveFileIcon color="warning" />;
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Button
          sx={{
            height: "200px",
            width: "400px",
            bgcolor: "#f2f2f2",
            borderRadius: "10px",
            marginTop: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginBottom:"50px"
          }}
          component="label"
        >
          <Typography
            variant="h5"
            sx={{
              color: "#817245",
              textAlign: "center",
              fontFamily: "Barlow",
              paddingTop: "5%",
            }}
          >
            Solo Uploads
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloudUploadIcon
              sx={{
                color: "#817245",
                fontSize: "60px",
              }}
            />
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </Box>
        </Button>
      </Grid>
      {selectedFiles.length > 0 && (
        <Grid item>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "25px",
              marginBottom: "25px",
            }}
          >
            <Table
              sx={{
                width: { xs: "350px", md: "500px", lg: "800px" },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#817245",
                    }}
                  >
                    File Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#817245",
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#817245",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedFiles.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell
                      sx={{
                        color: "#817245",
                      }}
                    >
                      {file.name}
                    </TableCell>
                    <TableCell align="center">
                      {getFileIcon(file.type)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="secondary"
                        onClick={() => handleRemoveFile(file)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {selectedFiles.length > 0 && (
        <Grid item>
          <Button variant="contained" onClick={handleUpload}
          sx={{
            bgcolor:"#817245"
          }}
          >
            Upload
          </Button>
        </Grid>
      )}
      {uploadProgress !== null && (
        <Grid item sx={{ width: "85%", position: "absolute", bottom: "0" }}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              bgcolor: "#817245",
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default FileUploader;
