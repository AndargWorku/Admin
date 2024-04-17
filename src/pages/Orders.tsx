// ProductList.tsx
import React, { useState, useEffect } from 'react';

import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import '../styles/productList.css';
import OrderModal from '../components/OrderModal';
import OrderTable from '../components/OrderTable';

interface Order {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
  photo: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([


    {
      id: '1',
      name: 'Product 1',
      category: 'Category A',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '2',
      name: 't-shirt',
      category: 'cloth',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '3',
      name: 'iphone',
      category: 'Electronics',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '4',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '5',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    
    {
      id: '6',
      name: 'Product 1',
      category: 'Category A',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '7',
      name: 't-shirt',
      category: 'cloth',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '8',
      name: 'iphone',
      category: 'Electronics',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '9',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '10',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    
    {
      id: '11',
      name: 'Product 1',
      category: 'Category A',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '12',
      name: 't-shirt',
      category: 'cloth',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '13',
      name: 'iphone',
      category: 'Electronics',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrsyw1G1uEi76nM-gHztDgiAL0U4AXV68vQcpcZo_9Q&s', // Example photo URL
    },
    {
      id: '14',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '16',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    
    {
      id: '17',
      name: 'Product 1',
      category: 'Category A',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrsyw1G1uEi76nM-gHztDgiAL0U4AXV68vQcpcZo_9Q&s', // Example photo URL
    },
    {
      id: '18',
      name: 't-shirt',
      category: 'cloth',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '19',
      name: 'iphone',
      category: 'Electronics',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
    },
    {
      id: '20',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg', // Example photo URL
    },
    {
      id: '6',
      name: 'sofa',
      category: 'Furniture',
      price: 10,
      quantity: 5,
      date: '2024-01-30',
      photo: 'https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg', // Example photo URL
    },
    // Your initial products
  ]);

  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sortedOrders, setSortedOrders] = useState<Order[]>(orders);
  const [filter, setFilter] = useState({ name: '', category: '', date: '' });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this value to adjust the number of items per page

  useEffect(() => {
    // Update sortedProducts when products or filter changes
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        order.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        order.date.includes(filter.date)
    );
    setSortedOrders(filtered);
    setCurrentPage(1); // Reset to the first page when filter changes
  }, [orders, filter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  const handleSort = (field: keyof Order) => {
    let direction = 'asc';

    if (sortConfig && sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: field, direction });
    const sorted = [...orders].sort((a, b) => {
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    setSortedOrders(sorted);
  };

  const getSortIcon = (field: keyof Order) => {
    if (!sortConfig || sortConfig.key !== field) {
      return <FaSort />;
    }

    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleFilter = () => {
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        order.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        order.date.includes(filter.date)
    );
    setSortedOrders(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmation(id);
  };

  const handleEdit = (editedOrder: Order) => {
    const updatedOrders = orders.map((order) =>
      order.id === editedOrder.id ? editedOrder : order
    );
    setOrders(updatedOrders);
  };

  const handleAdd = (newOrder: Order) => {
    const id = (orders.length + 1).toString();
    const updatedOrders = [...orders, { ...newOrder, id }];
    setOrders(updatedOrders);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedOrders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6 block">
      <h1 className="text-3xl font-semibold mb-6">Order List Page</h1>

      <button
        onClick={() => {
          setSelectedOrder({
            id: (orders.length + 1).toString(),
            name: '',
            category: '',
            price: 0,
            quantity: 0,
            date: '',
            photo: '',
          });
          setModalOpen(true);
        }}
        className=" bg-indigo-950  px-4 py-2  mb-4 hover:m-2 rounded-md text-white"
      >
        Add Product
      </button>

      <OrderTable
        orders={currentItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        onSort={handleSort}
        getSortIcon={getSortIcon}
        onFilter={handleFilter}
      />

      {/* <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className=" bg-indigo-950 px-3 text-white py-1 rounded-md mr-2 hover:m-2 rounded-md"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-2 mx-1 rounded-md ${
              currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-pink-500 text-white px-3 py-1 rounded-md ml-2 hover:m-2 rounded"
        >
          Next
        </button>
      </div> */}

      {deleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <p>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</p>
            <button
              onClick={() => {
                const updatedOrders = orders.filter(
                  (order) => order.id !== deleteConfirmation
                );
                setOrders(updatedOrders);
                setDeleteConfirmation(null);
              }}
              className="yes px-4 py-2 rounded-md mr-2 bg-pink-500 hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteConfirmation(null)}
              className="cancel px-4 py-2 rounded-md hover:bg-gray-400 "
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <OrderModal
          order={selectedOrder}
          onClose={() => {
            setModalOpen(false);
            setSelectedOrder(null);
          }}
          onSave={(editedOrder) => {
            if (selectedOrder) {
              handleEdit(editedOrder);
            } else {
              handleAdd(editedOrder);
            }
            setModalOpen(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default Orders;