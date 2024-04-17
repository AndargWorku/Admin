// PermissionTable.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  fetchPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from '../redux/permissions/actions';
import PermissionModal from './PermissionModal';

const PermissionTable: React.FC = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state: RootState) => state.permissions.permissions);

  const [showModal, setShowModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedPermission(null);
    setShowModal(true);
  };

  const handleEdit = (permission: any) => {
    setSelectedPermission(permission);
    setShowModal(true);
  };

  const handleDelete = (permissionId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      dispatch(deletePermission(permissionId));
    }
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Permission</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              <td>{permission.description}</td>
              <td>
                <button onClick={() => handleEdit(permission)}>Edit</button>
                <button onClick={() => handleDelete(permission.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <PermissionModal onClose={() => setShowModal(false)} permission={selectedPermission} />}
    </div>
  );
};

export default PermissionTable;
