// PermissionModal.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPermission, updatePermission } from '../redux/actions/permissionsActions';

interface PermissionModalProps {
  onClose: () => void;
  permission: { id: string; name: string; description: string } | null;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ onClose, permission }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (permission) {
      setName(permission.name);
      setDescription(permission.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [permission]);

  const handleSave = () => {
    if (permission) {
      dispatch(updatePermission({ id: permission.id, data: { name, description } }));
    } else {
      dispatch(createPermission({ name, description }));
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
      <h2>{permission ? 'Edit Permission' : 'Create Permission'}</h2>
      <div className='mb-4'>
      <label className="block text-sm font-semibold mb-2">
        Name:
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      
      </div>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PermissionModal;
