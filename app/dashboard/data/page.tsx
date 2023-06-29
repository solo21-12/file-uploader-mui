"use client";
import { Fade, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import DeleteIcon from "@mui/icons-material/Delete";
const Data = () => {
  const VISIBLE_FIELDS = ["name", "country", "dateCreated"];

  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  const columns = React.useMemo(
    () =>
      data.columns
        .filter((column) => VISIBLE_FIELDS.includes(column.field))
        .map((column) => ({
          ...column,
          flex: 1,
        })),
    [data.columns]
  );

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleDelete = () => {
    // Logic to handle the deletion of data goes here
    console.log("Data deleted");
  };

  return (
    <Fade in={show} timeout={2000}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 1,
            height: "calc(100% - 48px)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DataGrid
            {...data}
            initialState={{
              ...data.initialState,
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: [],
                },
              },
            }}
            disableColumnFilter
            disableDensitySelector
            columns={[
              ...columns,
              {
                field: "Action",
                headerName: "Action",
                width: 100,
                renderCell: () => (
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon color="error" />
                  </IconButton>
                ),
              },
            ]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              color: "#817245",
              cursor:"pointer"
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default Data;
