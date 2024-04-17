
import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  photo: string;
}

interface CategoryModalProps {
  category: Category | null;
  onClose: () => void;
  onSave: (editedCategory: Category) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose, onSave }) => {
  const [editedCategory, setEditedCategory] = useState<Category>({
    id: '',
    name: '',
    category: '',
    description: '',
    quantity: 0,
    photo: '',
  });

  useEffect(() => {
    if (category) {
      setEditedCategory(category);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setEditedCategory((prevCategory) => ({ ...prevCategory, photo: event.target.result.toString() }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSave = () => {
    onSave(editedCategory);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={editedCategory.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={editedCategory.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Description:</label>
          <input
            type="text"
            name="description"
            value={editedCategory.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={editedCategory.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Photo:</label>
          <div
            className="w-full p-4 border border-gray-300 rounded-md"
            onDrop={handlePhotoDrop}
            onDragOver={handleDragOver}
          >
            {editedCategory.photo ? (
              <img src={editedCategory.photo} alt={`Category ${editedCategory.name}`} className="w-full h-32 object-cover" />
            ) : (
              <p className="text-gray-500 text-center">Drag & Drop a photo here</p>
            )}
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-800"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;


