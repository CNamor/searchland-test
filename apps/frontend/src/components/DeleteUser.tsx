import { trpc } from "../trpc";

const DeleteUserButton: React.FC<{
  userId: number;
  callback?: Function;
}> = ({ userId, callback }) => {
  const deleteUserMutation = trpc.deleteUser.useMutation({
    onSuccess: () => {
      alert("User deleted successfully");
      if (callback) callback();
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

  return (
    <button
      className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded'
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(userId);
      }}
    >
      Delete
    </button>
  );
};

export default DeleteUserButton;
