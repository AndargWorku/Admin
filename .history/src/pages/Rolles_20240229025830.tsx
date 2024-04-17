


import React, { useState, useEffect } from 'react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
}

const RollesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [newRole, setNewRole] = useState<Role>({ id: '', name: '', description: '', permissions: [] });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, [currentPage, filter]);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`https://sheba-app.onrender.com/api/roles?page=${currentPage}&filter=${filter}`);
      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles);
        setTotalPages(data.totalPages);
      } else {
        throw new Error('Failed to fetch roles');
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch('https://sheba-app.onrender.com/api/permissions');
      if (response.ok) {
        const data = await response.json();
        setPermissions(data.permissions);
      } else {
        throw new Error('Failed to fetch permissions');
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleCreateRole = async () => {
    try {
      const response = await fetch(`https://sheba-app.onrender.com/api/roles/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newRole, permissions: selectedPermissions }),
      });
      if (response.ok) {
        setIsRoleModalOpen(false);
        setNewRole({ id: '', name: '', description: '', permissions: [] });
        setSelectedPermissions([]);
        fetchRoles();
      } else {
        throw new Error('Failed to create role');
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsRoleModalOpen(true);
    setSelectedPermissions(role.permissions);
  };

  const handleUpdateRole = async () => {
    if (!selectedRole) return;

    try {
      const response = await fetch(`https://sheba-app.onrender.com/api/roles/${selectedRole.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedRole.name,
          description: selectedRole.description,
          permissions: selectedPermissions,
        }),
      });

      if (response.ok) {
        setIsRoleModalOpen(false);
        setSelectedRole(null);
        setSelectedPermissions([]);
        fetchRoles();
      } else {
        throw new Error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteRole = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`https://sheba-app.onrender.com/api/roles/${selectedRole?.id}/delete`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIsDeleteModalOpen(false);
        fetchRoles();
      } else {
        throw new Error('Failed to delete role');
      }
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleRoleModalClose = () => {
    setIsRoleModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));
  };

  const handlePermissionChange = (permissionId: string) => {
    const index = selectedPermissions.indexOf(permissionId);
    if (index === -1) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId));
    }
  };

  return (
    <div className="container mx-auto p-4 block">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-indigo-950 text-white px-4 py-2 rounded" onClick={() => setIsRoleModalOpen(true)}>
          Create Role
        </button>
        <input
          type="text"
          placeholder="Search by name"
          className="border rounded px-4 py-2 w-64"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="mb-4">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Permissions</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="border p-2">{role.name}</td>
                <td className="border p-2">{role.description}</td>
                <td className="border p-2">
                  {role.permissions.map((permissionId) => {
                    const permission = permissions.find((p) => p.id === permissionId);
                    return permission ? <span key={permission.id}>{permission.name}, </span> : null;
                  })}
                </td>
                <td className="border p-2">
                  <button className="bg-indigo-950 text-white px-4 py-2 rounded mr-2" onClick={() => handleEditRole(role)}>
                    Edit
                  </button>
                  <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteRole(role)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mb-4">
        <div>
          <button
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>
      {isRoleModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Create Role</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border rounded px-4 py-2 w-full"
                  value={newRole.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded px-4 py-2 w-full"
                  value={newRole.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Permissions</label>
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => handlePermissionChange(permission.id)}
                    />
                    <label htmlFor={permission.id} className="ml-2">
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-indigo-950 text-white px-4 py-2 rounded"
                  onClick={handleCreateRole}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-pink-500  text-white px-4 py-2 rounded ml-2"
                  onClick={handleRoleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Are you sure you want to delete this role?</p>
            <div className="mt-4">
              <button
                className="bg-indigo-950 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-pink-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteModalClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RollesPage;








// // // // // import React, { useState, ChangeEvent } from 'react';

// // // // // interface Role {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   description: string;
// // // // //   permissions: string[];
// // // // // }

// // // // // const predefinedPermissions: string[] = ['3 permission ', '5 rolls', '5 permission', '6 roles'];

// // // // // const RolesPage: React.FC = () => {
// // // // //   const itemsPerPage = 3;

// // // // //   const [roles, setRoles] = useState<Role[]>([
// // // // //     { id: '1', name: 'Admin', description: 'Full access to all features', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //     { id: '2', name: 'Editor', description: 'Can edit content', permissions: ['3 permission ', '5 rolls',] },
// // // // //     { id: '3', name: 'Viewer', description: 'Read-only access', permissions: [ '5 rolls', '5 permission',] },
// // // // //     { id: '4', name: 'Moderator', description: 'Moderate user-generated content', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //     { id: '5', name: 'Guest', description: 'Limited access for guests', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //     { id: '1', name: 'Admin', description: 'Full access to all features', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //     { id: '2', name: 'Editor', description: 'Can edit content', permissions: ['3 permission ', '5 rolls',] },
// // // // //     { id: '3', name: 'Viewer', description: 'Read-only access', permissions: [ '5 rolls', '5 permission',] },
// // // // //     { id: '4', name: 'Moderator', description: 'Moderate user-generated content', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //     { id: '5', name: 'Guest', description: 'Limited access for guests', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //    { id: '1', name: 'Admin', description: 'Full access to all features', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //     { id: '2', name: 'Editor', description: 'Can edit content', permissions: ['3 permission ', '5 rolls',] },
// // // // //     { id: '3', name: 'Viewer', description: 'Read-only access', permissions: [ '5 rolls', '5 permission',] },
// // // // //     { id: '4', name: 'Moderator', description: 'Moderate user-generated content', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //     { id: '5', name: 'Guest', description: 'Limited access for guests', permissions: ['3 permission ', '5 rolls', '5 permission', '6 roles'] },
// // // // //   ]);


// // // // //   const [modalOpen, setModalOpen] = useState<boolean>(false);
// // // // //   const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
// // // // //   const [newRole, setNewRole] = useState<Role>({
// // // // //     id: '0',
// // // // //     name: '',
// // // // //     description: '',
// // // // //     permissions: [],
// // // // //   });
// // // // //   const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
// // // // //   const [currentPage, setCurrentPage] = useState<number>(1);
// // // // //   const [searchTerm, setSearchTerm] = useState<string>('');

// // // // //   const handleAddRole = () => {
// // // // //     setRoles([...roles, newRole]);
// // // // //     setModalOpen(false);
// // // // //     setNewRole({
// // // // //       id: '0',
// // // // //       name: '',
// // // // //       description: '',
// // // // //       permissions: [],
// // // // //     });
// // // // //   };

// // // // //   const handleEditRole = (id: string) => {
// // // // //     const roleToEdit = roles.find((role) => role.id === id);
// // // // //     if (roleToEdit) {
// // // // //       setNewRole({ ...roleToEdit });
// // // // //       setModalOpen(true);
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteRole = (id: string) => {
// // // // //     setRoleToDelete(id);
// // // // //     setConfirmModalOpen(true);
// // // // //   };

// // // // //   const handlePermissionChange = (permission: string) => {
// // // // //     const isChecked = newRole.permissions.includes(permission);
// // // // //     const updatedPermissions = isChecked
// // // // //       ? newRole.permissions.filter((p) => p !== permission)
// // // // //       : [...newRole.permissions, permission];

// // // // //     setNewRole({ ...newRole, permissions: updatedPermissions });
// // // // //   };

// // // // //   const confirmDelete = () => {
// // // // //     if (roleToDelete !== null) {
// // // // //       const updatedRoles = roles.filter((role) => role.id !== roleToDelete);
// // // // //       setRoles(updatedRoles);
// // // // //       setRoleToDelete(null);
// // // // //       setConfirmModalOpen(false);
// // // // //       setCurrentPage(1); // Reset to the first page after deletion
// // // // //     }
// // // // //   };

// // // // //   const cancelDelete = () => {
// // // // //     setRoleToDelete(null);
// // // // //     setConfirmModalOpen(false);
// // // // //   };

// // // // //   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
// // // // //     const term = e.target.value.toLowerCase();
// // // // //     setSearchTerm(term);

// // // // //     const filtered = roles.filter(
// // // // //       (role) =>
// // // // //         role.name.toLowerCase().includes(term) ||
// // // // //         role.description.toLowerCase().includes(term)
// // // // //     );

// // // // //     setRoles(filtered);
// // // // //     setCurrentPage(1); // Reset to the first page after search
// // // // //   };

// // // // //   // Pagination
// // // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // // //   const currentItems = roles.slice(indexOfFirstItem, indexOfLastItem);

// // // // //   const renderPageNumbers = () => {
// // // // //     const pageNumbers = Math.ceil(roles.length / itemsPerPage);
// // // // //     const pages = [];

// // // // //     for (let i = 1; i <= pageNumbers; i++) {
// // // // //       pages.push(
// // // // //         <button
// // // // //           key={i}
// // // // //           className={`mr-2 px-4 py-2 rounded focus:outline-none ${
// // // // //             i === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-300'
// // // // //           }`}
// // // // //           onClick={() => setCurrentPage(i)}
// // // // //         >
// // // // //           {i}
// // // // //         </button>
// // // // //       );
// // // // //     }

// // // // //     return (
// // // // //       <div className="flex mt-4 justify-center">
// // // // //         {currentPage > 1 && (
// // // // //           <button
// // // // //             className="mr-2 px-4 py-2 rounded focus:outline-none bg-gray-300"
// // // // //             onClick={() => setCurrentPage(currentPage - 1)}
// // // // //           >
// // // // //             &laquo; Prev
// // // // //           </button>
// // // // //         )}
// // // // //         {pages}
// // // // //         {currentPage < pageNumbers && (
// // // // //           <button
// // // // //             className="ml-2 px-4 py-2 rounded focus:outline-none bg-gray-300"
// // // // //             onClick={() => setCurrentPage(currentPage + 1)}
// // // // //           >
// // // // //             Next &raquo;
// // // // //           </button>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="container mx-auto mt-8 block with-shadow">
// // // // //       <h1 className="text-lg font-semibold mb-4">Roles Management</h1>

// // // // //       <div className="mb-2 flex justify-end gap-2">
// // // // //         <label>Search:</label>
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search roles..."
// // // // //           className="form-input mt-1 block rounded border"
// // // // //           value={searchTerm}
// // // // //           onChange={handleSearch}
// // // // //         />
// // // // //       </div>

// // // // //       <button
// // // // //         className="add__role bg-indigo-950 hover:bg-indigo-900 text-white font-bold py-2 px-4 mb-4 rounded"
// // // // //         onClick={() => setModalOpen(true)}
// // // // //       >
// // // // //         Add Role
// // // // //       </button>

// // // // //       <table className="w-full">
// // // // //         <thead>
// // // // //           <tr className='bg-gray-300'>
// // // // //             <th className="text-left">ID</th>
// // // // //             <th className="text-left">Name</th>
// // // // //             <th className="text-left">Description</th>
// // // // //             <th className="text-left hidden">Permissions</th>
// // // // //             <th className="text-left">Total Permissions</th>
// // // // //             <th className="text-left">Actions</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {currentItems.map((role) => (
// // // // //             <tr key={role.id}>
// // // // //               <td>{role.id}</td>
// // // // //               <td>{role.name}</td>
// // // // //               <td>{role.description}</td>
// // // // //               <td className='hidden'>
// // // // //                 {predefinedPermissions.map((permission) => (
// // // // //                   <label key={permission} className="inline-flex items-center mr-2">
// // // // //                     <input
// // // // //                       type="checkbox"
// // // // //                       checked={role.permissions.includes(permission)}
// // // // //                       onChange={() => handlePermissionChange(permission)}
// // // // //                       className="form-checkbox h-5 w-5 text-indigo-600"
// // // // //                     />
// // // // //                     <span className="ml-2">{permission}</span>
// // // // //                   </label>
// // // // //                 ))}
// // // // //               </td>
// // // // //               <td>{role.permissions.length}</td>
// // // // //               <td>
// // // // //                 <button
// // // // //                   className="text-indigo-900 hover:underline mr-2"
// // // // //                   onClick={() => handleEditRole(role.id)}
// // // // //                 >
// // // // //                   Edit
// // // // //                 </button>
// // // // //                 <button
// // // // //                   className="text-pink-500 hover:underline"
// // // // //                   onClick={() => handleDeleteRole(role.id)}
// // // // //                 >
// // // // //                   Delete
// // // // //                 </button>
// // // // //               </td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>

// // // // //       {renderPageNumbers()}

// // // // //       {modalOpen && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// // // // //           <div className="bg-white p-8 rounded-lg shadow-2xl">
// // // // //             <h2 className="text-2xl font-bold mb-4">{newRole.id ? 'Edit' : 'Add'} Role</h2>
// // // // //             <label className="block mb-4">
// // // // //               Name:
// // // // //               <input
// // // // //                 type="text"
// // // // //                 className="form-input mt-1 block w-full"
// // // // //                 value={newRole.name}
// // // // //                 onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
// // // // //               />
// // // // //             </label>
// // // // //             <label className="block mb-4">
// // // // //               Description:
// // // // //               <textarea
// // // // //                 className="form-input mt-1 block w-full"
// // // // //                 value={newRole.description}
// // // // //                 onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
// // // // //               />
// // // // //             </label>
// // // // //             <div className="mb-4">
// // // // //               Permissions:
// // // // //               {predefinedPermissions.map((permission) => (
// // // // //                 <label key={permission} className=" items-center mr-2 block">
// // // // //                   <input
// // // // //                     type="checkbox"
// // // // //                     checked={newRole.permissions.includes(permission)}
// // // // //                     onChange={() => handlePermissionChange(permission)}
// // // // //                     className="form-checkbox h-5 w-5 text-indigo-600"
// // // // //                   />
// // // // //                   <span className="ml-2">{permission}</span>
// // // // //                 </label>
// // // // //               ))}
// // // // //             </div>
// // // // //             <div className="flex justify-end">
// // // // //               <button
// // // // //                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
// // // // //                 onClick={handleAddRole}
// // // // //               >
// // // // //                 {newRole.id ? 'Save' : 'Add'}
// // // // //               </button>
// // // // //               <button
// // // // //                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
// // // // //                 onClick={() => setModalOpen(false)}
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {confirmModalOpen && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// // // // //           <div className="bg-white p-8 rounded-lg shadow-2xl">
// // // // //             <p className="text-lg mb-4">Are you sure you want to delete this role?</p>
// // // // //             <div className="flex justify-end">
// // // // //               <button
// // // // //                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
// // // // //                 onClick={confirmDelete}
// // // // //               >
// // // // //                 Yes
// // // // //               </button>
// // // // //               <button
// // // // //                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
// // // // //                 onClick={cancelDelete}
// // // // //               >
// // // // //                 No
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default RolesPage;






