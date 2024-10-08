import React from "react";
import BackHomeButton from "./BackHomeButton";

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <h2 className='text-3xl mb-4'>Page Not Found</h2>
      <p className='text-lg mb-8'>
        Sorry, the page you are looking for does not exist.
      </p>
      <BackHomeButton />
    </div>
  );
};

export default NotFound;
