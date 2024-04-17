
// ProductTable.tsx
import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
// import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import '../styles/productList.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
  photo: string;
}

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSort: (field: keyof Product) => void;
  getSortIcon: (field: keyof Product) => React.ReactNode;
  onFilter: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onDelete,
  onEdit,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onSort,
  getSortIcon,
  onFilter,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [filter, setFilter] = useState({ name: '', category: '', date: '' });
  // const itemsPerPage = 5; // Change this value to adjust the number of items per page

  useEffect(() => {
    // Update sortedProducts when products or filter changes
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        product.date.includes(filter.date)
    );
    setSortedProducts(filtered);
  }, [products, filter]);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSort = (field: keyof Product) => {
    onSort(field);
  };

  const handleFilter = () => {
    onFilter();
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        // onClick={() => onPreviousPage(index + 1)}
        className={`mx-2 px-3 py-1 rounded-md ${
          index + 1 === currentPage ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {index + 1}
      </button>
    ));
  }

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
        <div className="flex items-center ml-4">
          <label className="mr-2"> Filter by Date:</label>
          <input
            type="text"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="border p-2 rounded-md"
          />
        </div>
        <button
          onClick={handleFilter}
          className="filter px-4 py-2 ml-4 rounded-md hover:m-2 border hover:bg-red-700"
        >
          Filter
        </button>
      </div>

      <table className="min-w-full border-b border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {['id', 'Photo', 'Name', 'Category', 'Price', 'Quantity', 'Date', 'Actions'].map((column) => (
              <th
                key={column}
                onClick={() => (column !== 'Actions' ? handleSort(column.toLowerCase() as keyof Product) : null)}
                className="py-2 px-4 border-r cursor-pointer"
              >
                <div className="flex items-center justify-end">
                  <span
                    onClick={() => (column !== 'Actions' ? handleSort(column.toLowerCase() as keyof Product) : null)}
                    className="mr-3"
                  >
                    {column}
                  </span>
                  {column !== 'Actions' && getSortIcon(column.toLowerCase() as keyof Product)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4 border-r">{product.id}</td>
              <td className="py-2 px-4 border-r">
                <img src={product.photo} alt={`Product ${product.name}`} className="w-16 h-16 rounded-md m-1" />
              </td>
              <td className="py-2 px-4 border-r">{product.name}</td>
              <td className="py-2 px-4 border-r">{product.category}</td>
              <td className="py-2 px-4 border-r">{product.price}</td>
              <td className="py-2 px-4 border-r">{product.quantity}</td>
              <td className="py-2 px-4 border-r">{product.date}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="edit hover:underline mr-2 hover:text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="delete hover:underline hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {modalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          onSave={(editedProduct) => {
            onEdit(editedProduct);
            setModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;



