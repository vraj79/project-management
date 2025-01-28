"use client";

import React from "react";
import { useAppSelector } from "../redux";
import { useGetTeamsQuery } from "@/state/api";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";

const CustomToolBar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Team ID",
    width: 250,
  },
  {
    field: "teamName",
    headerName: "Team Name",
    width: 250,
  },
  {
    field: "productOwnerUsername",
    headerName: "Product Owner",
    width: 250,
  },
  {
    field: "projectManagerUsername",
    headerName: "Product Manager",
    width: 250,
  },
];

const Teams = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: tasks, isLoading, isError } = useGetTeamsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ minHeight: 500, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={tasks || []}
          pagination
          slots={{ toolbar: CustomToolBar }}
          className={dataGridClassName}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
