// RoleTable.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from '../redux/actions/rolesActions';
import RoleModal from './RoleModal';

const RoleTable: React.FC = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.roles.roles);

  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedRole(null);
    setShowModal(true);
  };

  const handleEdit = (role: any) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      dispatch(deleteRole(roleId));
    }
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
      <button onClick={handleCreate}>Create Role</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Total Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>{role.permissions.length}</td>
              <td>
                <button onClick={() => handleEdit(role)}>Edit</button>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <RoleModal onClose={() => setShowModal(false)} role={selectedRole} />}
    </div>
  );
};

export default RoleTable;
