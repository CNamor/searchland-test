import React from "react";
import { trpc } from "../trpc";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = trpc.getUserById.useQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
      <p>Created on: {data?.createdAt}</p>
      <p>Last updated: {data?.updatedAt}</p>
    </div>
  );
};

export default UserProfile;
