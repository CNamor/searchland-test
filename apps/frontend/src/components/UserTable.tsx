import { useState } from "react";
import { trpc } from "../trpc";

import { User } from "../../types/User.type";

const UserTable = () => {
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const { data: users, isLoading } = trpc.getUsers.useQuery({ page, pageSize });

  const deleteUserMutation = trpc.deleteUser.useMutation({
    onSuccess: () => {
      alert("User deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      alert("Error deleting user");
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync({ id });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className='text-center'>Loading...</div>;

  if (!users || users.length === 0)
    return <div className='text-center'>No users found</div>;

  return (
    <div className='container mx-auto'>
      <table className='min-w-full bg-white border'>
        <thead>
          <tr>
            <th className='py-2 px-4 border'>ID</th>
            <th className='py-2 px-4 border'>Name</th>
            <th className='py-2 px-4 border'>Email</th>
            <th className='py-2 px-4 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className='py-2 px-4 border'>{user.id}</td>
              <td className='py-2 px-4 border'>{user.name}</td>{" "}
              <td className='py-2 px-4 border'>{user.email}</td>{" "}
              <td className='py-2 px-4 border'>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded'
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-between my-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
