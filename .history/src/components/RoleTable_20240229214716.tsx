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
  const [filter, setFilter] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(2); // Number of roles per page

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRoles(
      roles.filter((role) =>
        role.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [roles, filter]);

  // Logic for displaying current roles
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  const handleFilter = () => {
    setCurrentPage(1); // Reset pagination to first page when filtering
    setFilteredRoles(
      roles.filter((role) =>
        role.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
      <button
        onClick={handleCreate}
        className="bg-indigo-950 border rounded hover:m-2 text-white"
      >
        Create Role
      </button>
      <div className="mb-5 flex justify-between items-center">
        <p className="mt-3">Search by Name:</p>
        <input
          type="text"
          placeholder="Search by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="bg-indigo-950 border rounded hover:m-2 text-white"
        >
          Filter
        </button>
      </div>
      <table className="min-w-full border-b border-gray-300">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Total Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRoles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-r">{role.name}</td>
              <td className="py-2 px-4 border-r">{role.description}</td>
              <td className="py-2 px-4 border-r">{role.permissions.length}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(role)}
                  className="edit hover:underline mr-2 hover:text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="delete hover:underline hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`${
            currentPage === 1 ? 'invisible' : 'visible'
          } bg-indigo-950 border rounded hover:m-2 text-white`}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          className={`${
            indexOfLastRole >= filteredRoles.length ? 'invisible' : 'visible'
          } bg-indigo-950 border rounded hover:m-2 text-white`}
        >
          Next
        </button>
      </div>
      {showModal && <RoleModal onClose={() => setShowModal(false)} role={selectedRole} />}
    </div>
  );
};

export default RoleTable;
