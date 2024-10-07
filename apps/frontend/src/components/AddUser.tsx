import React, { useState } from "react";
import { trpc } from "../trpc";
import { Modal } from "./Modal";

const UserTable: React.FC = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate } = trpc.createUser.useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
    },
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddUser(e);
    }
  };

  return (
    <div className='flex justify-end mb-4'>
      <button
        className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded'
        onClick={() => setShowAddUserModal(true)}
      >
        Create User
      </button>

      <Modal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      >
        <h2 className='text-lg font-bold mb-4'>Create User</h2>
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
        <div className='flex justify-end mt-4'>
          <button
            onClick={handleAddUser}
            className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded'
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
