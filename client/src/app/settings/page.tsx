import Header from "@/components/Header";
import React from "react";

type Props = {};

const Settings = (props: Props) => {
  const userSettings = {
    username: "John Doe",
    email: "k9l5o@example.com",
    teamName: "My Team",
    roleName: "Admin",
  };
  const labelStyles = `block text-sm font-medium dark:text-white`;
  const textStyles = `mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 dark:text-white`;

  return (
    <div className="p-8">
      <Header name="Settings" isSmallText />
      <div className="space-y-4">
        <div className="">
          <label htmlFor="" className={labelStyles}>
            Username
          </label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div className="">
          <label htmlFor="" className={labelStyles}>
            Email
          </label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div className="">
          <label htmlFor="" className={labelStyles}>
            Team Name
          </label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div className="">
          <label htmlFor="" className={labelStyles}>
            Role
          </label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
