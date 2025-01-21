export const getStatusStyles = (status: string) => {
  switch (status) {
    case "To Do":
      return "text-blue-800 hover:bg-green-100";
    case "Work In Progress":
      return "text-yellow-800 hover:bg-yellow-100";
    case "Under Review":
      return "text-orange-800 hover:bg-orange-100";
    case "Completed":
      return "text-green-800 hover:bg-green-100";
    default:
      return "text-gray-800 hover:bg-gray-100";
  }
};

export const getPriorityColor = (label: string) => {
  switch (label) {
    case "Urgent":
      return "text-red-600 hover:bg-red-100";
    case "High":
      return "text-yellow-600 hover:bg-yellow-100";
    case "Medium":
      return "text-orange-600 hover:bg-orange-100";
    case "Low":
      return "text-green-600 hover:bg-green-100";
    case "Backlog":
      return "text-gray-600 hover:bg-gray-100";
    default:
      return "text-gray-600 hover:bg-gray-100";
  }
};

export const dataGridClassName =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    // General styles for the grid
    "& .MuiDataGrid-root": {
      border: "none",
      backgroundColor: isDarkMode ? "#1A1A1A" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    },
    // Column header styles
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: isDarkMode ? "#1A1A1A" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: isDarkMode ? "#1A1A1A" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      color: isDarkMode ? "#fff" : "#000",
    },
    // Column header titles and row styles
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
        borderColor: `${isDarkMode ? "#2d3135" : ""}`,
      },
    },
    // Icon button styles
    "& .MuiIconButton-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    // Table pagination styles
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    // Data grid cell and row styles
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
    },
    "& .MuiDataGrid-footer": {
      backgroundColor: isDarkMode ? "#1A1A1A" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: isDarkMode ? "#1A1A1A" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#2d3135" : "e5e7eb"}`,
    },
    // Hide column separator
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
  };
};

export const inputStyles =
  "w-full rounded border borderp-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

export const selectStyles =
  "block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
