import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PermissionsPage: React.FC = () => {
  const [permissions, setPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [permissionData, setPermissionData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('https://sheba-app.onrender.com/api/permissions/all');
      if (response.data && response.data.permissions) {
        setPermissions(response.data.permissions);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://sheba-app.onrender.com/api/permissions/${deleteId}/delete`);
      fetchPermissions();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting permission:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('https://sheba-app.onrender.com/api/permissions/create', permissionData);
      fetchPermissions();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating permission:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://sheba-app.onrender.com/api/permissions/${updateId}/update`, permissionData);
      fetchPermissions();
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };

  const handleFilter = () => {
    const filtered = permissions.filter(permission => permission.name.toLowerCase().includes(nameFilter.toLowerCase()));
    setFilteredPermissions(filtered);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prevState => prevState - 1);
    } else if (direction === 'next' && currentPage < Math.ceil(filteredPermissions.length / 10)) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowCreateModal(false);
    setShowUpdateModal(false);
    setDeleteId('');
    setUpdateId('');
    setPermissionData({
      name: '',
      description: ''
    });
  };

  return (
    <div className="container mx-auto block">
      <h1 className='text-font-smi-bold text-2xl m-20 '>permission page</h1>

      <button onClick={() => setShowCreateModal(true)} className="px-2 py-1 bg-indigo-950 hover:m-2 
      text-white rounded text-font-smi-bold">Create</button>
      
      <div className="my-4 flex justify-end gap-1">
        <p className='mt-2'>filter by Name:</p>
        <input
          type="text"
          placeholder="Filter by name"
          className="p-2 border border-gray-300 rounded"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
        />
        <button className="p-2 bg-pink-500 text-white rounded" onClick={handleFilter}>Filter</button>
      </div>
      
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPermissions
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map(permission => (
              <tr key={permission.id}>
                <td className="border px-4 py-2">{permission.id}</td>
                <td className="border px-4 py-2">{permission.name}</td>
                <td className="border px-4 py-2">{permission.description}</td>
                <td className="border px-4 py-2">
                  <button className="bg-indigo-950 text-white px-2 py-1 rounded mr-2" onClick={() => {
                    setShowUpdateModal(true);
                    setUpdateId(permission.id);
                    setPermissionData({
                      name: permission.name,
                      description: permission.description
                    });
                  }}>Edit</button>
                  <button className="bg-pink-500 text-white px-2 py-1 rounded" onClick={() => {
                    setShowDeleteModal(true);
                    setDeleteId(permission.id);
                  }}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
      <div className="flex justify-center mt-4">
        <button disabled={currentPage === 1} onClick={() => handlePageChange('prev')} className="px-2 py-1 bg-gray-200 rounded">Prev</button>
        <button disabled={currentPage === Math.ceil(filteredPermissions.length / 10)} onClick={() => handlePageChange('next')} className="px-2 py-1 bg-gray-200 rounded">Next</button>
      </div>
      
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p className="mb-4">Are you sure you want to delete this permission?</p>
            <div className="flex justify-end">
              <button className="px-2 py-1 bg-pink-500 text-white rounded mr-2" onClick={handleDelete}>Yes</button>
              <button className="px-2 py-1 bg-indigo-950 rounded text-white" onClick={handleModalClose}>No</button>
            </div>
          </div>
        </div>
      )}
      
      {showCreateModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Name:</p>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded mb-2 p-2"
              value={permissionData.name}
              onChange={e => setPermissionData({ ...permissionData, name: e.target.value })}
            />
            <p>Description</p>
            <input
              type="text"
              placeholder="Description"
              className="w-full border border-gray-300 rounded mb-2 p-2"
              value={permissionData.description}
              onChange={e => setPermissionData({ ...permissionData, description: e.target.value })}
            />
            <div className="flex justify-end">
              <button className="px-2 py-1 bg-indigo-950 text-white rounded mr-2" onClick={handleCreate}>Create</button>
              <button className="px-2 py-1 bg-pink-500 rounded text-white" onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {showUpdateModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Name:</p>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded mb-2 p-2"
              value={permissionData.name}
              onChange={e => setPermissionData({ ...permissionData, name: e.target.value })}
            />
            <p>description:</p>
            <input
              type="text"
              placeholder="Description"
              className="w-full border border-gray-300 rounded mb-2 p-2"
              value={permissionData.description}
              onChange={e => setPermissionData({ ...permissionData, description: e.target.value })}
            />
            <div className="flex justify-end">
              <button className="px-2 py-1 bg-indigo-950 text-white rounded mr-2" onClick={handleUpdate}>Update</button>
              <button className="px-2 py-1 bg-pink-500 rounded text-white" onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default PermissionsPage;







// // src/components/PermissionPage.tsx

// import React, { useState, ChangeEvent } from 'react';
// // import '../styles/permission.css';

// interface Permission {
//   id: string;
//   name: string;
//   description: string;
// }

// const PermissionPage: React.FC = () => {
//   const initialPermissions: Permission[] = [
//     { id: '1', name: 'Read', description: 'Permission to read content' },
//     { id: '2', name: 'Write', description: 'Permission to write content' },
//     { id: '3', name: 'Delete', description: 'Permission to delete content' },
//     { id: '4', name: 'Admin', description: 'Full administrative access' },
//     { id: '5', name: 'Moderate', description: 'Permission to moderate content' },
//   ];

//   const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
//   const [newPermission, setNewPermission] = useState<Permission>({
//     id: '0',
//     name: '',
//     description: '',
//   });
//   const [permissionToDelete, setPermissionToDelete] = useState<string | null>(null);

//   const handleAddPermission = () => {
//     setPermissions([...permissions, newPermission]);
//     setModalOpen(false);
//     setNewPermission({
//       id: '0',
//       name: '',
//       description: '',
//     });
//   };

//   const handleEditPermission = (id: string) => {
//     const permissionToEdit = permissions.find((permission) => permission.id === id);
//     if (permissionToEdit) {
//       setNewPermission({ ...permissionToEdit });
//       setModalOpen(true);
//     }
//   };

//   const handleDeletePermission = (id: string) => {
//     setPermissionToDelete(id);
//     setConfirmModalOpen(true);
//   };

//   const confirmDelete = () => {
//     if (permissionToDelete !== null) {
//       const updatedPermissions = permissions.filter((permission) => permission.id !== permissionToDelete);
//       setPermissions(updatedPermissions);
//       setPermissionToDelete(null);
//       setConfirmModalOpen(false);
//     }
//   };

//   const cancelDelete = () => {
//     setPermissionToDelete(null);
//     setConfirmModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto mt-8 block with-shadow-lg">
//       <h1 className="text-lg font-semibold mb-4">Permission Management</h1>

//       <button
//         className="add__permission bg-indigo-950 hover:bg-indigo-900 text-white font-bold py-2 px-4 mb-4 rounded"
//         onClick={() => setModalOpen(true)}
//       >
//         Add Permission
//       </button>

//       <table className="w-full">
//         <thead>
//           <tr className='bg-gray-300'>
//             <th className="text-left">ID</th>
//             <th className="text-left">Name</th>
//             <th className="text-left">Description</th>
//             <th className="text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {permissions.map((permission) => (
//             <tr key={permission.id}>
//               <td>{permission.id}</td>
//               <td>{permission.name}</td>
//               <td>{permission.description}</td>
//               <td>
//                 <button
//                   className="text-indigo-900 hover:underline mr-2"
//                   onClick={() => handleEditPermission(permission.id)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-pink-500 hover:underline"
//                   onClick={() => handleDeletePermission(permission.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-lg shadow-2xl">
//             <h2 className="text-2xl font-bold mb-4">{newPermission.id ? 'Edit' : 'Add'} Permission</h2>
//             <label className="block mb-4">
//               Name:
//               <input
//                 type="text"
//                 className="form-input mt-1 block w-full"
//                 value={newPermission.name}
//                 onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
//               />
//             </label>
//             <label className="block mb-4">
//               Description:
//               <textarea
//                 className="form-input mt-1 block w-full"
//                 value={newPermission.description}
//                 onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
//               />
//             </label>
//             <div className="flex justify-end">
//               <button
//                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
//                 onClick={handleAddPermission}
//               >
//                 {newPermission.id ? 'Save' : 'Add'}
//               </button>
//               <button
//                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {confirmModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-lg shadow-2xl">
//             <p className="text-lg mb-4">Are you sure you want to delete this permission?</p>
//             <div className="flex justify-end">
//               <button
//                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
//                 onClick={confirmDelete}
//               >
//                 Yes
//               </button>
//               <button
//                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
//                 onClick={cancelDelete}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PermissionPage;
