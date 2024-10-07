import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { trpc } from "../trpc";
import { Modal } from "./Modal";
import DeleteUserButton from "./DeleteUser";
import { UserData } from "../../types/User.type";

const UserTable: React.FC<{
  user?: UserData;
  refreshOnClose?: boolean;
  closeOnSubmit?: boolean;
}> = ({ user, refreshOnClose = true, closeOnSubmit = true }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
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
    if (!user) {
      createUser({ name, email });
    } else {
      updateUser({ id: user?.id, name, email });
    }

    if (closeOnSubmit) {
      setShowAddUserModal(false);

      if (refreshOnClose) {
        window.location.reload();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className='flex justify-end mb-4'>
      <button
        className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded'
        onClick={(e) => {
          e.stopPropagation();
          setShowAddUserModal(true);
        }}
      >
        {user ? "Update" : "Create"} User
      </button>

      <Modal
        isOpen={showAddUserModal}
        onClose={(e: React.MouseEvent | React.KeyboardEvent | undefined) => {
          e?.stopPropagation();
          setShowAddUserModal(false);
        }}
        refreshOnClose={refreshOnClose}
      >
        <h2 className='text-lg font-bold mb-4'>
          {user ? "Update" : "Create"} User
        </h2>
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
            {user && (
              <DeleteUserButton
                userId={user.id}
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
