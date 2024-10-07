import React from "react";
import { useParams } from "react-router-dom";

import { trpc } from "../trpc";
import { formatDate } from "../utils/dateFormatter";
import BackHomeButton from "./BackHomeButton";
import NotFound from "./NotFound";
import AddUser from "./AddUser";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const userId = Number(id);
  if (isNaN(userId)) {
    console.error("Invalid user ID");
    return <NotFound />;
  }

  const { data, isLoading, error } = trpc.getUserById.useQuery(userId);

  if (error) return <NotFound />;

  return (
    <div>
      <BackHomeButton />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className='text-4xl font-bold mb-4'>{data?.name}'s Profile</h1>
          <p>
            <span className='font-bold'>Name:</span> {data?.name}
          </p>
          <p>
            <span className='font-bold'>E-mail:</span>{" "}
            <a
              href={`mailto:${data?.email}`}
              className='text-blue-500 hover:text-blue-700'
            >
              {data?.email}
            </a>
          </p>
          <p>
            <span className='font-bold'>Created on:</span>{" "}
            {formatDate(data?.createdAt)}
          </p>
          <p>
            <span className='font-bold'>Last updated:</span>{" "}
            {formatDate(data?.updatedAt)}
          </p>
          <div>
            <AddUser
              action='update'
              userId={userId}
              userName={data?.name}
              userEmail={data?.email}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
