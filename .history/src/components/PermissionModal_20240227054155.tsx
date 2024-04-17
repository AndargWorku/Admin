
// PermissionModal.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPermission, updatePermission } from '../redux/permissions/actions';

interface PermissionModalProps {
  onClose: () => void;
  permission: any | null;
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
      dispatch(updatePermission(permission.id, { name, description }));
    } else {
      dispatch(createPermission({ name, description }));
    }
    onClose();
  };

  return (
    <div>
      <h2>{permission ? 'Edit Permission' : 'Create Permission'}</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PermissionModal;
