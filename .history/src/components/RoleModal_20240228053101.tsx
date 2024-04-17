import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createRole, updateRole } from '../redux/actions/rolesActions';

interface RoleModalProps {
  onClose: () => void;
  role: any | null;
}

const RoleModal: React.FC<RoleModalProps> = ({ onClose, role }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]); // Change the type to string[]
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description);
      setPermissions(role.permissions);
      setIsDefault(role.default);
    } else {
      setName('');
      setDescription('');
      setPermissions([] as string[]); // Initialize as an empty string array
      setIsDefault(false);
    }
  }, [role]);

  const handleSave = () => {
    if (role) {
      dispatch(updateRole({ id: role.id, data: { name, description, permissions, default: isDefault } }));
    } else {
      dispatch(createRole({ name, description, permissions, default: isDefault }));
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-96">
      <h2 className='bg-indigo-950 border rounded hover:m-2'>{role ? 'Edit Role' : 'Create Role'}</h2>
      <div className='mb-4'>
      <label className="block text-sm font-semibold mb-2">
        Name:
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded-md"/>
    
      </div>
      <div className='mb-4'>
      <label className="block text-sm font-semibold mb-2">
        Description:
        </label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded-md"/>
     
      </div>
      <div className='mb-4'>
      <label className="block text-sm font-semibold mb-2">
        Permissions:
        </label>
        <input type="text" value={permissions.join(',')} onChange={(e) => setPermissions(e.target.value.split(','))} 
        className="w-full p-2 border border-gray-300 rounded-md"
        />
     
      </div>
      <div className='mb-4'>
      <label className="block text-sm font-semibold mb-2">
        Default:
        </label>
        <input type="checkbox" checked={isDefault} onChange={() => setIsDefault(!isDefault)} 
        className="w-full p-2 border border-gray-300 rounded-md"/>
      </div>

      <button onClick={handleSave}
      className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-800"
      >Save</button>
      <button onClick={onClose}
       className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700"
      >Cancel</button>
      </div>
     </div>
  );
};

export default RoleModal;
