"use client";

import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";

type Props = {};

const tasksColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
  { field: "priority", headerName: "Priority", width: 200 },
  { field: "dueDate", headerName: "Due Date", width: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = (props: Props) => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetProjectsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  console.log(tasks, projects, "asdf");
  if (tasksLoading || projectsLoading) return <div>Loading...</div>;
  if (tasksError || projectsError || !tasks || !projects)
    return <div>Error fetching data</div>;

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  const tasksDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key as Priority],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFile: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFile: "#82CA9D",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Project Management Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full justify-between items-center">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Task Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksDistribution}>
                <CartesianGrid stroke={chartColors.barGrid} />
                <XAxis dataKey="name" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip
                  contentStyle={{
                    width: "min-content",
                    height: "min-content",
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill={chartColors.bar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Project Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart data={tasksDistribution}>
                <Pie dataKey="count" data={projectStatus} fill="#82CA9D" label>
                  {projectStatus.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div className="" style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={tasksColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={(row) => `data-grid-row`}
              getCellClassName={(row) => `data-grid-cell`}
              className={dataGridClassName}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
