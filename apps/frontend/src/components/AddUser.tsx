import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { trpc } from "../trpc";
import { Modal } from "./Modal";
import DeleteUserButton from "./DeleteUser";

const UserTable: React.FC<{
  action?: "create" | "update";
  userId?: number;
  userName?: string;
  userEmail?: string;
}> = ({ action = "create", userId, userName, userEmail }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [name, setName] = useState(
    action === "update" && userName ? userName : ""
  );
  const [email, setEmail] = useState(
    action === "update" && userEmail ? userEmail : ""
  );
  const navigate = useNavigate();

  const { mutate: createUser } = trpc.createUser.useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
    },
  });

  const { mutate: updateUser } = trpc.updateUser.useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action === "create") {
      createUser({ name, email });
    } else if (action === "update" && userId) {
      updateUser({ id: userId, name, email });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formattedAction = action.charAt(0).toUpperCase() + action.slice(1);

  return (
    <div className='flex justify-end mb-4'>
      <button
        className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded'
        onClick={() => setShowAddUserModal(true)}
      >
        {formattedAction} User
      </button>

      <Modal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      >
        <h2 className='text-lg font-bold mb-4'>{formattedAction} User</h2>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          className='border p-2 mb-2 w-full'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          className='border p-2 mb-2 w-full'
        />
        <div className='flex justify-between mt-4'>
          <>
            {action === "update" && userId && (
              <DeleteUserButton
                userId={userId}
                callback={() => navigate("/")}
              />
            )}
          </>
          <>
            <button
              onClick={handleSubmit}
              className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded'
            >
              Submit
            </button>
          </>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
