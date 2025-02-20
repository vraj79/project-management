"use client";

import React from "react";
import { useAppSelector } from "../redux";
import { useGetUsersQuery } from "@/state/api";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";

const CustomToolBar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "User ID",
    width: 150,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 150,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`https://vraj-pm-s3-images.s3.us-east-1.amazonaws.com/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ minHeight: 500, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={users || []}
          getRowId={(row) => row.userId}
          pagination
          slots={{ toolbar: CustomToolBar }}
          className={dataGridClassName}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;
