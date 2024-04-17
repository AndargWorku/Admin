// PermissionTable.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  fetchPermissions,
  createPermission as createPermissionAction,
  updatePermission as updatePermissionAction,
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
  const allPermissions = useSelector((state: RootState) => state.permissions.permissions);

  const [permissions, setPermissions] = useState(allPermissions);
  const [showModal, setShowModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [permissionsPerPage] = useState(5); // Number of permissions per page
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  useEffect(() => {
    setPermissions(allPermissions);
  }, [allPermissions]);

  const indexOfLastPermission = currentPage * permissionsPerPage;
  const indexOfFirstPermission = indexOfLastPermission - permissionsPerPage;
  const currentPermissions = permissions.slice(indexOfFirstPermission, indexOfLastPermission);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
    const filteredPermissions = allPermissions.filter(permission =>
      permission.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPermissions(filteredPermissions);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const createPermission = (newPermission: Permission) => {
    dispatch(createPermissionAction(newPermission));
    setShowModal(false);
  };

  const updatePermission = (updatedPermission: Permission) => {
    dispatch(updatePermissionAction(updatedPermission));
    setShowModal(false);
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
      <button
        className='border rounded bg-indigo-950 hover:m-2 text-white'
        onClick={handleCreate}
      >
        Create Permission
      </button>

      <div className="mt-3 mb-4">
        <label htmlFor="filterName" className="block text-sm font-medium text-gray-600">
          Filter by Name:
        </label>
        <input
          type="text"
          id="filterName"
          name="filterName"
          value={filterName}
          onChange={handleFilterChange}
          className="mt-1 p-2 border rounded-md w-64"
          placeholder="Enter name"
        />
      </div>

      <table className="min-w-full border-b border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-r cursor-pointer">Name</th>
            <th className="py-2 px-4 border-r cursor-pointer">Description</th>
            <th className="py-2 px-4 border-r cursor-pointer">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPermissions.map((permission) => (
            <tr key={permission.id} className="border-b">
              <td className="py-2 px-4 border-r">{permission.name}</td>
              <td className="py-2 px-4 border-r">{permission.description}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(permission)}
                  className="edit hover:underline mr-2 hover:text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(permission.id)}
                  className="delete hover:underline hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: Math.ceil(permissions.length / permissionsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`whitespace-nowrap px-4 py-2 border ${
                currentPage === index + 1
                  ? 'border-indigo-500 text-indigo-600 focus:outline-none focus:border-indigo-700 focus:z-10'
                  : 'border-gray-300 text-gray-500 hover:bg-gray-50 focus:outline-none focus:border-gray-700 focus:z-10'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>

      {showModal && (
        <PermissionModal
          onClose={() => setShowModal(false)}
          permission={selectedPermission}
          createPermission={createPermission}
          updatePermission={updatePermission}
        />
      )}
    </div>
  );
};

export default PermissionTable;
