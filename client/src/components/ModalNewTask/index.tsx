import React, { useState } from "react";
import Modal from "../Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import { formatISO } from "date-fns";
import { inputStyles, selectStyles } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, projectId = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<Status>(Status.ToDo);
  const [priority, setPriority] = React.useState<Priority>(Priority.Backlog);
  const [tags, setTags] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [authorUserId, setAuthorUserId] = React.useState("");
  const [assignedUserId, setAssignedUserId] = React.useState("");
  const [taskPrId, setTaskPrId] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !authorUserId || !(projectId !== null || taskPrId)) return;
    const formattedStartDate =
      startDate &&
      formatISO(new Date(startDate), {
        representation: "complete",
      });
    const formattedDueDate =
      dueDate &&
      formatISO(new Date(dueDate), {
        representation: "complete",
      });
    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: projectId !== null ? Number(projectId) : Number(taskPrId),
    });
    onClose();
  };


  const isFormValid = () => {
    return title && authorUserId;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create Task">
      <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          disabled={!isFormValid() || isLoading}
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm focus-within:ring-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Creating...." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
