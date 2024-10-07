import { ReactNode, useEffect } from "react";

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: (e?: React.MouseEvent | React.KeyboardEvent) => void;
  children: ReactNode;
  refreshOnClose?: boolean;
}> = ({ isOpen, onClose, children, refreshOnClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose: () => void = () => {
    if (refreshOnClose) {
      console.log("refreshing!");
      onClose();
      window.location.reload();
      console.log("refreshed!!");
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='bg-white rounded-lg shadow-lg p-6 relative'>
        <button
          onClick={() => handleClose()}
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
