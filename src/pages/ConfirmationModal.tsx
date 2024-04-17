// ConfirmationModal.tsx
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="z-10 w-96 p-4 bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this order?</p>
            <div className="flex justify-end">
              <button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
                No
              </button>
              <button onClick={onConfirm} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
