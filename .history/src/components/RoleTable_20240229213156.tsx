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

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRoles(roles.filter(role =>
      role.name.toLowerCase().includes(filter.toLowerCase())
    ));
  }, [roles, filter]);

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
    setFilteredRoles(roles.filter(role =>
      role.name.toLowerCase().includes(filter.toLowerCase())
    ));
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
      <button onClick={handleCreate} className='bg-indigo-950 border rounded hover:m-2 text-white'>Create Role</button>
     <div className="  mb-4 flex justify-end">
     <p className="mt-3"> Search by Name</p>
      <input
        type="text"
        placeholder="Search by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button onClick={handleFilter} className="bg-indigo-950 border rounded hover:m-2 text-white">Filter</button>
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
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-r">{role.name}</td>
              <td className="py-2 px-4 border-r">{role.description}</td>
              <td className="py-2 px-4 border-r">{role.permissions.length}</td>
              <td className="py-2 px-4">
                <button onClick={() => handleEdit(role)}
                className="edit hover:underline mr-2 hover:text-gray-700"
                >Edit</button>
                <button onClick={() => handleDelete(role.id)}
                className="delete hover:underline hover:text-red-700"
                >Delete</button>
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
