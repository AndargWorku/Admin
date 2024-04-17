// PermissionTable.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  fetchPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from '../redux/actions/permissionsActions';
import PermissionModal from './PermissionModal';
interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionsState {
  permissions: Permission[];
}


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
    <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
      <button 
      className='border rounded bg-indigo-950 hover:m-2 text-white'
      onClick={handleCreate}>Create Permission</button>
      
      
      <table className="min-w-full border-b border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-r cursor-pointer">Name</th>
            <th className="py-2 px-4 border-r cursor-pointer">Description</th>
            <th className="py-2 px-4 border-r cursor-pointer">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="border-b">
              <td className="py-2 px-4 border-r">{permission.name}</td>
              <td className="py-2 px-4 border-r">{permission.description}</td>
              <td className="py-2 px-4">
                <button onClick={() => handleEdit(permission)}
                className="edit hover:underline mr-2 hover:text-gray-700"
                >Edit</button>
                <button onClick={() => handleDelete(permission.id)}
                 className="delete hover:underline hover:text-red-700"
                >Delete</button>
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
