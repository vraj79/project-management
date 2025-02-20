import { Task } from "@/state/api";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg dark:bg-dark-secondary dark:text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="text-lg font-semibold">Attachments:</strong>
          <div className="flex flex-wrap gap-4">
            {task.attachments.length > 0 && (
              <Image
                src={`https://vraj-pm-s3-images.s3.us-east-1.amazonaws.com/${task.attachments?.[0]?.fileUrl}`}
                alt={task.attachments?.[0]?.fileName}
                width={400}
                height={200}
                className="rounded-md shadow-sm"
              />
            )}
          </div>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-sm">
          <strong className="font-medium">ID:</strong> {task?.id}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Title:</strong> {task?.title}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Description:</strong>{" "}
          {task?.description || "No description provided"}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Status:</strong> {task?.status}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Priority:</strong> {task?.priority}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Tags:</strong>{" "}
          {task?.tags || "No tags provided"}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Start Date:</strong>{" "}
          {task?.startDate ? format(new Date(task.startDate), "P") : "N/A"}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Due Date:</strong>{" "}
          {task?.dueDate ? format(new Date(task.dueDate), "P") : "N/A"}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Author:</strong>{" "}
          {task?.author ? task.assignee?.username : "Unknown"}
        </p>
        <p className="text-sm">
          <strong className="font-medium">Assignee:</strong>{" "}
          {task?.assignee ? task.assignee?.username : "Unassigned"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
