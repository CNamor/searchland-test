import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { trpc } from "../trpc";
import { User } from "../../types/User.type";
import DeleteUserButton from "./DeleteUser";

const UserTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data, isLoading } = trpc.getUsers.useQuery({ page, pageSize });

  const handleRowClick = (userId: number) => {
    navigate(`/user-profile/${userId}`);
  };

  if (isLoading) return <div className='text-center'>Loading...</div>;

  if (!data || data.results.length === 0)
    return <div className='text-center'>No users found</div>;

  const { results: users, totalCount } = data;
  const totalPages = Math.ceil(totalCount / pageSize);

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
            <tr
              key={user.id}
              className='cursor-pointer hover:bg-gray-100'
              onClick={() => handleRowClick(user.id)}
            >
              <td className='py-2 px-4 border'>{user.id}</td>
              <td className='py-2 px-4 border'>{user.name}</td>
              <td className='py-2 px-4 border'>{user.email}</td>
              <td className='py-2 px-4 border'>
                <DeleteUserButton userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-between my-4'>
        <div>
          {!(page === 1) && (
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          )}
        </div>
        <div>
          {!(page === totalPages) && (
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <p className='text-center'>
        Page {page} of {totalPages}
      </p>
    </div>
  );
};

export default UserTable;
