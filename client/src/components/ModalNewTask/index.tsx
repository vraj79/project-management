import React, { useState } from "react";
import Modal from "../Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewTask = ({ isOpen, onClose }: Props) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
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
    });
    onClose();
  };

  const isFormValid = () => {
    return title;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create Task">
      <p className="">hllo</p>
    </Modal>
  );
};

export default ModalNewTask;
