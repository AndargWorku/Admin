



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

const PAGE_SIZE = 5;

const PermissionTable: React.FC = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state: RootState) => state.permissions.permissions);

  const [showModal, setShowModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    setSelectedPermission(permissionId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deletePermission(selectedPermission));
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleApplyFilter = () => {
    const filteredData = permissions.filter(permission =>
      permission.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    return filteredData;
  };

  const filteredPermissions = handleApplyFilter();

  const totalPages = Math.ceil(filteredPermissions.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPermissions = filteredPermissions.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
      <div>
        <button
          className='border rounded bg-indigo-950 hover:m-2 text-white'
          onClick={handleCreate}
        >
          Create Permission
        </button>
      </div>
      <div className='flex justify-end'>
        <p className='mt-3'>Filter by Name:</p>
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={handleNameFilterChange}
          className="border rounded p-2 m-2"
        />
        <button
          className='border rounded bg-indigo-950 hover:bg-indigo-800 text-white'
          onClick={handleApplyFilter}
        >
          Apply Filter
        </button>
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

      <div className="flex justify-center mt-4">
        <button
          className={`border rounded bg-indigo-950 hover:m-2 text-white ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className={`border rounded bg-indigo-950 hover:m-2 text-white ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showModal && <PermissionModal onClose={() => setShowModal(false)} permission={selectedPermission} />}
      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold">Are you sure you want to delete this permission?</p>
            <div className="flex justify-end mt-4">
              <button
                className="border rounded bg-pink-500 text-white px-4 py-2 mr-2"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="border rounded bg-indigo-950 px-4 py-2 text-center"
                onClick={cancelDelete}
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

export default PermissionTable;












// // PermissionTable.tsx

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import {
//   fetchPermissions,
//   createPermission,
//   updatePermission,
//   deletePermission,
// } from '../redux/actions/permissionsActions';
// import PermissionModal from './PermissionModal';
// interface Permission {
//   id: string;
//   name: string;
//   description: string;
// }

// interface PermissionsState {
//   permissions: Permission[];
// }


// const PermissionTable: React.FC = () => {
//   const dispatch = useDispatch();
//   const permissions = useSelector((state: RootState) => state.permissions.permissions);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedPermission, setSelectedPermission] = useState(null);

//   useEffect(() => {
//     dispatch(fetchPermissions());
//   }, [dispatch]);

//   const handleCreate = () => {
//     setSelectedPermission(null);
//     setShowModal(true);
//   };

//   const handleEdit = (permission: any) => {
//     setSelectedPermission(permission);
//     setShowModal(true);
//   };

//   const handleDelete = (permissionId: string) => {
//     if (window.confirm('Are you sure you want to delete this permission?')) {
//       dispatch(deletePermission(permissionId));
//     }
//   };

//   return (
//     <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
//       <button 
//       className='border rounded bg-indigo-950 hover:m-2 text-white'
//       onClick={handleCreate}>Create Permission</button>
      
      
//       <table className="min-w-full border-b border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-r cursor-pointer">Name</th>
//             <th className="py-2 px-4 border-r cursor-pointer">Description</th>
//             <th className="py-2 px-4 border-r cursor-pointer">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {permissions.map((permission) => (
//             <tr key={permission.id} className="border-b">
//               <td className="py-2 px-4 border-r">{permission.name}</td>
//               <td className="py-2 px-4 border-r">{permission.description}</td>
//               <td className="py-2 px-4">
//                 <button onClick={() => handleEdit(permission)}
//                 className="edit hover:underline mr-2 hover:text-gray-700"
//                 >Edit</button>
//                 <button onClick={() => handleDelete(permission.id)}
//                  className="delete hover:underline hover:text-red-700"
//                 >Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {showModal && <PermissionModal onClose={() => setShowModal(false)} permission={selectedPermission} />}
//     </div>
//   );
// };

// export default PermissionTable;




// // // PermissionTable.tsx

// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { RootState } from '../redux/store';
// // import {
// //   fetchPermissions,
// //   createPermission as createPermissionAction,
// //   updatePermission as updatePermissionAction,
// //   deletePermission,
// // } from '../redux/actions/permissionsActions';
// // import PermissionModal from './PermissionModal';

// // interface Permission {
// //   id: string;
// //   name: string;
// //   description: string;
// // }

// // interface PermissionsState {
// //   permissions: Permission[];
// // }

// // const PermissionTable: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const allPermissions = useSelector((state: RootState) => state.permissions.permissions);

// //   const [permissions, setPermissions] = useState(allPermissions);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedPermission, setSelectedPermission] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [permissionsPerPage] = useState(5); // Number of permissions per page
// //   const [filterName, setFilterName] = useState('');

// //   useEffect(() => {
// //     dispatch(fetchPermissions());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     setPermissions(allPermissions);
// //   }, [allPermissions]);

// //   const indexOfLastPermission = currentPage * permissionsPerPage;
// //   const indexOfFirstPermission = indexOfLastPermission - permissionsPerPage;
// //   const currentPermissions = permissions.slice(indexOfFirstPermission, indexOfLastPermission);

// //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// //   const handleCreate = () => {
// //     setSelectedPermission(null);
// //     setShowModal(true);
// //   };

// //   const handleEdit = (permission: any) => {
// //     setSelectedPermission(permission);
// //     setShowModal(true);
// //   };

// //   const handleDelete = (permissionId: string) => {
// //     if (window.confirm('Are you sure you want to delete this permission?')) {
// //       dispatch(deletePermission(permissionId));
// //     }
// //   };

// //   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFilterName(e.target.value);
// //     const filteredPermissions = allPermissions.filter(permission =>
// //       permission.name.toLowerCase().includes(e.target.value.toLowerCase())
// //     );
// //     setPermissions(filteredPermissions);
// //     setCurrentPage(1); // Reset to the first page when filtering
// //   };

// //   const createPermission = (newPermission: Permission) => {
// //     dispatch(createPermissionAction(newPermission));
// //     setShowModal(false);
// //   };

// //   const updatePermission = (updatedPermission: Permission) => {
// //     dispatch(updatePermissionAction(updatedPermission));
// //     setShowModal(false);
// //   };

// //   return (
// //     <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
// //       <button
// //         className='border rounded bg-indigo-950 hover:m-2 text-white'
// //         onClick={handleCreate}
// //       >
// //         Create Permission
// //       </button>

// //       <div className="mt-3 mb-4">
// //         <label htmlFor="filterName" className="block text-sm font-medium text-gray-600">
// //           Filter by Name:
// //         </label>
// //         <input
// //           type="text"
// //           id="filterName"
// //           name="filterName"
// //           value={filterName}
// //           onChange={handleFilterChange}
// //           className="mt-1 p-2 border rounded-md w-64"
// //           placeholder="Enter name"
// //         />
// //       </div>

// //       <table className="min-w-full border-b border-gray-300">
// //         <thead className="bg-gray-100">
// //           <tr>
// //             <th className="py-2 px-4 border-r cursor-pointer">Name</th>
// //             <th className="py-2 px-4 border-r cursor-pointer">Description</th>
// //             <th className="py-2 px-4 border-r cursor-pointer">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {currentPermissions.map((permission) => (
// //             <tr key={permission.id} className="border-b">
// //               <td className="py-2 px-4 border-r">{permission.name}</td>
// //               <td className="py-2 px-4 border-r">{permission.description}</td>
// //               <td className="py-2 px-4">
// //                 <button
// //                   onClick={() => handleEdit(permission)}
// //                   className="edit hover:underline mr-2 hover:text-gray-700"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(permission.id)}
// //                   className="delete hover:underline hover:text-red-700"
// //                 >
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <div className="mt-4 flex justify-end">
// //         <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
// //           {Array.from({ length: Math.ceil(permissions.length / permissionsPerPage) }).map((_, index) => (
// //             <button
// //               key={index}
// //               onClick={() => paginate(index + 1)}
// //               className={`whitespace-nowrap px-4 py-2 border ${
// //                 currentPage === index + 1
// //                   ? 'border-indigo-500 text-indigo-600 focus:outline-none focus:border-indigo-700 focus:z-10'
// //                   : 'border-gray-300 text-gray-500 hover:bg-gray-50 focus:outline-none focus:border-gray-700 focus:z-10'
// //               }`}
// //             >
// //               {index + 1}
// //             </button>
// //           ))}
// //         </nav>
// //       </div>

// //       {showModal && (
// //         <PermissionModal
// //           onClose={() => setShowModal(false)}
// //           permission={selectedPermission}
// //           createPermission={createPermission}
// //           updatePermission={updatePermission}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default PermissionTable;
