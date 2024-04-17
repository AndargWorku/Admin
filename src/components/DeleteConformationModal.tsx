import React from 'react';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700">
            Yes
          </button>
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
