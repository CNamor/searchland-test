import { ReactNode } from "react";

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 relative'>
        <button
          onClick={onClose}
          className='absolute mr-1 top-2 right-2 text-gray-600 hover:text-gray-800'
          aria-label='Close'
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};
