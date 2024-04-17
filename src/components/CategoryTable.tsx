import React, { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CategoryModal from './CategoryModal';

interface Category {
  id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  photo: string;
}

interface CategoryTableProps {
  categories: Category[];
  onDelete: (id: string) => void;
  onEdit: (category: Category) => void;
  onAdd: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onDelete, onEdit, onAdd }) => {
  const [sortedCategories, setSortedCategories] = useState<Category[]>(categories);
  const [filter, setFilter] = useState({ name: '', category: '' });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Category; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const itemsPerPage = 5; // Change this value to adjust the number of items per page

  useEffect(() => {
    setSortedCategories(categories);
  }, [categories]);

  const handleSort = (field: keyof Category) => {
    let direction = 'asc';

    if (sortConfig && sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: field, direction });
    const sorted = [...sortedCategories].sort((a, b) => {
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    setSortedCategories(sorted);
    setCurrentPage(1); // Reset to the first page when sorting
  };

  const getSortIcon = (field: keyof Category) => {
    if (!sortConfig || sortConfig.key !== field) {
      return <FaSort />;
    }

    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleFilter = () => {
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        category.category.toLowerCase().includes(filter.category.toLowerCase())
    );
    setSortedCategories(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCategories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

  const handleModalOpen = (category: Category | null) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSaveCategory = (editedCategory: Category) => {
    if (selectedCategory) {
      // Update existing category
      onEdit(editedCategory);
    } else {
      // Add new category
      onAdd(editedCategory);
    }

    setModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <label className="mr-2"> Filter by Name:</label>
          <input
            type="text"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex items-center ml-4">
          <label className="mr-2"> Filter by Category:</label>
          <input
            type="text"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="border p-2 rounded-md"
          />
        </div>
        <button
          onClick={handleFilter}
          className="filter px-4 py-2 ml-4  hover:m-2 border rounded-md hover:bg-red-700"
        >
          Filter
        </button>
        <button
          onClick={() => handleModalOpen(null)}
          className="add bg-indigo-950 px-4 py-2 ml-4 text-white  hover:m-2 border rounded-md hover:bg-indigo-900"
        >
          Add Category
        </button>
      </div>

      <table className="min-w-full border-b border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {['id', 'Photo','Name', 'Category', 'Description', 'Quantity', 'Actions'].map((column) => (
              <th
                key={column}
                onClick={() => (column !== 'Actions' ? handleSort(column.toLowerCase() as keyof Category) : null)}
                className="py-2 px-4 border-r cursor-pointer"
              >
                <div className="flex items-center justify-end">
                  <span
                    onClick={() => (column !== 'Actions' ? handleSort(column.toLowerCase() as keyof Category) : null)}
                    className="mr-3" // Add this line to create a gap of 3px
                  >
                    {column}
                  </span>
                  {column !== 'Actions' && getSortIcon(column.toLowerCase() as keyof Category)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="py-2 px-4 border-r">{category.id}</td>
              <td className="py-2 px-4 border-r">
                <img src={category.photo} alt={`Category ${category.name}`} className="w-16 h-16 rounded-md m-1" />
              </td>
              <td className="py-2 px-4 border-r">{category.name}</td>
              <td className="py-2 px-4 border-r">{category.category}</td>
              <td className="py-2 px-4 border-r">{category.description}</td>
              <td className="py-2 px-4 border-r">{category.quantity}</td>
             
              <td className="py-2 px-4">
                <button onClick={() => handleModalOpen(category)} className="edit hover:underline mr-2 hover:text-gray-700">
                  Edit
                </button>
                <button onClick={() => onDelete(category.id)} className="delete hover:underline hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-3 py-2 mx-1 rounded-md ${currentPage === 1 ? 'bg-gray-200' : 'bg-gray-500 text-white'}`}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-2 mx-1 rounded-md ${
              currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-2 mx-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200' : 'bg-gray-500 text-white'}`}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>

      {modalOpen && (
        <CategoryModal
          category={selectedCategory}
          onClose={handleModalClose}
          onSave={handleSaveCategory}
        />
      )}
    </div>
  );
};

export default CategoryTable;








