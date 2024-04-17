// OrderTable.tsx
import React, { useState, useEffect } from 'react';
import OrderModal from './OrderModal';
// import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import '../styles/productList.css';

interface Order {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
  photo: string;
}

interface OrderTableProps {
  orders: Order[];
  onDelete: (id: string) => void;
  onEdit: (order: Order) => void;
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSort: (field: keyof Order) => void;
  getSortIcon: (field: keyof Order) => React.ReactNode;
  onFilter: () => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sortedOrders, setSortedOrders] = useState<Order[]>(orders);
  const [filter, setFilter] = useState({ name: '', category: '', date: '' });
  // const itemsPerPage = 5; // Change this value to adjust the number of items per page

  useEffect(() => {
    // Update sortedProducts when products or filter changes
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        order.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        order.date.includes(filter.date)
    );
    setSortedOrders(filtered);
  }, [orders, filter]);

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleSort = (field: keyof Order) => {
    onSort(field);
  };

  const handleFilter = () => {
    onFilter();
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`mx-2 px-3 py-1 rounded-md ${
          index + 1 === currentPage ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {index + 1}
      </button>
    ));
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
            {['id', 'Photo', 'Name', 'Category', 'Price', 'Quantity', 'Date', 'Total Price', 'Actions'].map((column) => (
              <th
                key={column}
                onClick={() => (column !== 'Actions' ? handleSort(column.toLowerCase() as keyof Order) : null)}
                className="py-2 px-4 border-r cursor-pointer"
              >
                <div className="flex items-center justify-end">
                  <span
                    onClick={() => (column !== 'Actions' ? handleSort(column.toLowerCase() as keyof Order) : null)}
                    className="mr-3"
                  >
                    {column}
                  </span>
                  {column !== 'Actions' && getSortIcon(column.toLowerCase() as keyof Order)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2 px-4 border-r">{order.id}</td>
              <td className="py-2 px-4 border-r">
                <img src={order.photo} alt={`Product ${order.name}`} className="w-16 h-16 rounded-md m-1" />
              </td>
              <td className="py-2 px-4 border-r">{order.name}</td>
              <td className="py-2 px-4 border-r">{order.category}</td>
              <td className="py-2 px-4 border-r">{order.price}</td>
              <td className="py-2 px-4 border-r">{order.quantity}</td>
              <td className="py-2 px-4 border-r">{order.date}</td>
              <td className="py-2 px-4 border-r">{order.price * order.quantity}</td> {/* Total Price */}
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(order)}
                  className="edit hover:underline mr-2 hover:text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(order.id)}
                  className="delete hover:underline hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center text-white">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="bg-pink-500 px-3 py-1 rounded-md mr-2"
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="bg-indigo-950 px-3 py-1 rounded-md ml-2"
        >
          Next
        </button>
      </div>

      {modalOpen && (
        <OrderModal
          order={selectedOrder}
          onClose={() => {
            setModalOpen(false);
            setSelectedOrder(null);
          }}
          onSave={(editedOrder) => {
            onEdit(editedOrder);
            setModalOpen(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderTable;

