// ProductList.tsx
import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([


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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [filter, setFilter] = useState({ name: '', category: '', date: '' });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this value to adjust the number of items per page

  useEffect(() => {
    // Update sortedProducts when products or filter changes
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        product.date.includes(filter.date)
    );
    setSortedProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filter changes
  }, [products, filter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSort = (field: keyof Product) => {
    let direction = 'asc';

    if (sortConfig && sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: field, direction });
    const sorted = [...products].sort((a, b) => {
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    setSortedProducts(sorted);
  };

  const getSortIcon = (field: keyof Product) => {
    if (!sortConfig || sortConfig.key !== field) {
      return <FaSort />;
    }

    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        product.date.includes(filter.date)
    );
    setSortedProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmation(id);
  };

  const handleEdit = (editedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  const handleAdd = (newProduct: Product) => {
    const id = (products.length + 1).toString();
    const updatedProducts = [...products, { ...newProduct, id }];
    setProducts(updatedProducts);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6 block">
      <h1 className="text-3xl font-semibold mb-6">Product List Page</h1>

      <button
        onClick={() => {
          setSelectedProduct({
            id: (products.length + 1).toString(),
            name: '',
            category: '',
            price: 0,
            quantity: 0,
            date: '',
            photo: '',
          });
          setModalOpen(true);
        }}
        className=" bg-indigo-950 rounded-md px-4 py-2  mb-4 hover:m-2 rounded-md text-white"
      >
        Add Product
      </button>

      <ProductTable
        products={currentItems}
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

      <div className="flex justify-center items-center mt-4">
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
      </div>

      {deleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <p>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</p>
            <button
              onClick={() => {
                const updatedProducts = products.filter(
                  (product) => product.id !== deleteConfirmation
                );
                setProducts(updatedProducts);
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
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          onSave={(editedProduct) => {
            if (selectedProduct) {
              handleEdit(editedProduct);
            } else {
              handleAdd(editedProduct);
            }
            setModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;










// // ProductList.tsx
// import React, { useState } from 'react';
// import ProductTable from '../components/ProductTable';
// import ProductModal from '../components/ProductModal';
// import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

// import '../styles/productList.css';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   quantity: number;
//   date: string;
//   photo: string;
// }

// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([

//     {
//       id: '1',
//       name: 'Product 1',
//       category: 'Category A',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '2',
//       name: 't-shirt',
//       category: 'cloth',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '3',
//       name: 'iphone',
//       category: 'Electronics',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '4',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '5',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
    
//     {
//       id: '6',
//       name: 'Product 1',
//       category: 'Category A',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '7',
//       name: 't-shirt',
//       category: 'cloth',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '8',
//       name: 'iphone',
//       category: 'Electronics',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '9',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '10',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
    
//     {
//       id: '11',
//       name: 'Product 1',
//       category: 'Category A',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '12',
//       name: 't-shirt',
//       category: 'cloth',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '13',
//       name: 'iphone',
//       category: 'Electronics',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '14',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '16',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
    
//     {
//       id: '17',
//       name: 'Product 1',
//       category: 'Category A',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '18',
//       name: 't-shirt',
//       category: 'cloth',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '19',
//       name: 'iphone',
//       category: 'Electronics',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '20',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },
//     {
//       id: '6',
//       name: 'sofa',
//       category: 'Furniture',
//       price: 10,
//       quantity: 5,
//       date: '2024-01-30',
//       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
//     },


//     // Your initial products
//   ]);

//   const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
//   const [filter, setFilter] = useState({ name: '', category: '', date: '' });
//   const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: string } | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(5);

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     const totalPages = Math.ceil(sortedProducts.length / pageSize);
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleSort = (field: keyof Product) => {
//     let direction = 'asc';

//     if (sortConfig && sortConfig.key === field && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }

//     setSortConfig({ key: field, direction });
//     const sorted = [...products].sort((a, b) => {
//       if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
//       if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
//       return 0;
//     });

//     setSortedProducts(sorted);
//   };

//   const getSortIcon = (field: keyof Product) => {
//     if (!sortConfig || sortConfig.key !== field) {
//       return <FaSort />;
//     }

//     return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
//   };

//   const handleFilter = () => {
//     const filtered = products.filter(
//       (product) =>
//         product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//         product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
//         product.date.includes(filter.date)
//     );
//     setSortedProducts(filtered);
//   };

//   const handleDelete = (id: string) => {
//     setDeleteConfirmation(id);
//   };

//   const handleEdit = (editedProduct: Product) => {
//     const updatedProducts = products.map((product) =>
//       product.id === editedProduct.id ? editedProduct : product
//     );
//     setProducts(updatedProducts);
//   };

//   const handleAdd = (newProduct: Product) => {
//     const id = (products.length + 1).toString();
//     const updatedProducts = [...products, { ...newProduct, id }];
//     setProducts(updatedProducts);
//   };

//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentProducts = sortedProducts.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(sortedProducts.length / pageSize);

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => setCurrentPage(i)}
//           className={`mx-2 px-3 py-1 rounded-md ${
//             i === currentPage ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className="container mx-auto p-6 block">
//       <h1 className="text-3xl font-bold mb-6">Product List Page</h1>

//       <button
//         onClick={() => {
//           setSelectedProduct({
//             id: (products.length + 1).toString(),
//             name: '',
//             category: '',
//             price: 0,
//             quantity: 0,
//             date: '',
//             photo: '',
//           });
//           setModalOpen(true);
//         }}
//         className="px-4 py-2 bg-indigo-950 rounded-md  mb-4 hover: m-2 border rounded-md bg-indigo-800  text-white"
//       >
//         Add Product
//       </button>

//       <ProductTable
//         products={currentProducts}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPreviousPage={handlePreviousPage}
//         onNextPage={handleNextPage}
//       />

//       <div className="flex justify-center items-center mt-4">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           className="bg-gray-200 px-3 py-1 rounded-md mr-2"
//         >
//           Previous
//         </button>
//         {renderPageNumbers()}
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="bg-gray-200 px-3 py-1 rounded-md ml-2"
//         >
//           Next
//         </button>
//       </div>

//       {deleteConfirmation && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md w-96">
//             <p>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</p>
//             <button
//               onClick={() => {
//                 const updatedProducts = products.filter(
//                   (product) => product.id !== deleteConfirmation
//                 );
//                 setProducts(updatedProducts);
//                 setDeleteConfirmation(null);
//               }}
//               className="yes px-4 py-2 rounded-md mr-2 hover:bg-red-700"
//             >
//               Yes
//             </button>
//             <button
//               onClick={() => setDeleteConfirmation(null)}
//               className="cancel px-4 py-2 rounded-md hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {modalOpen && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => {
//             setModalOpen(false);
//             setSelectedProduct(null);
//           }}
//           onSave={(editedProduct) => {
//             if (selectedProduct) {
//               handleEdit(editedProduct);
//             } else {
//               handleAdd(editedProduct);
//             }
//             setModalOpen(false);
//             setSelectedProduct(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductList;














// // // ProductList.tsx
// // import React, { useState } from 'react';
// // import ProductTable from '../components/ProductTable';
// // import ProductModal from '../components/ProductModal';
// // import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

// // import '../styles/productList.css';

// // interface Product {
// //   id: string;
// //   name: string;
// //   category: string;
// //   price: number;
// //   quantity: number;
// //   date: string;
// //   photo: string;
// // }

// // const ProductList: React.FC = () => {
// //   const [products, setProducts] = useState<Product[]>([
// //     // Your initial products
// //   ]);

// //   const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// //   const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
// //   const [filter, setFilter] = useState({ name: '', category: '', date: '' });
// //   const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: string } | null>(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [pageSize] = useState(5);

// //   const handlePreviousPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(currentPage - 1);
// //     }
// //   };

// //   const handleNextPage = () => {
// //     const totalPages = Math.ceil(sortedProducts.length / pageSize);
// //     if (currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     }
// //   };

// //   const handleSort = (field: keyof Product) => {
// //     let direction = 'asc';

// //     if (sortConfig && sortConfig.key === field && sortConfig.direction === 'asc') {
// //       direction = 'desc';
// //     }

// //     setSortConfig({ key: field, direction });
// //     const sorted = [...products].sort((a, b) => {
// //       if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
// //       if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
// //       return 0;
// //     });

// //     setSortedProducts(sorted);
// //   };

// //   const getSortIcon = (field: keyof Product) => {
// //     if (!sortConfig || sortConfig.key !== field) {
// //       return <FaSort />;
// //     }

// //     return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
// //   };

// //   const handleFilter = () => {
// //     const filtered = products.filter(
// //       (product) =>
// //         product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
// //         product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
// //         product.date.includes(filter.date)
// //     );
// //     setSortedProducts(filtered);
// //   };

// //   const handleDelete = (id: string) => {
// //     setDeleteConfirmation(id);
// //   };

// //   const handleEdit = (editedProduct: Product) => {
// //     const updatedProducts = products.map((product) =>
// //       product.id === editedProduct.id ? editedProduct : product
// //     );
// //     setProducts(updatedProducts);
// //   };

// //   const handleAdd = (newProduct: Product) => {
// //     // For simplicity, generating a unique ID here (you may use a more robust method)
// //     const id = (products.length + 1).toString();
// //     const updatedProducts = [...products, { ...newProduct, id }];
// //     setProducts(updatedProducts);
// //   };

// //   const startIndex = (currentPage - 1) * pageSize;
// //   const endIndex = startIndex + pageSize;
// //   const currentProducts = sortedProducts.slice(startIndex, endIndex);
// //   const totalPages = Math.ceil(sortedProducts.length / pageSize);

// //   return (
// //     <div className="container mx-auto p-6 block">
// //       <h1 className="text-3xl font-bold mb-6">Product List Page</h1>

// //       <button
// //         onClick={() => {
// //           setSelectedProduct({
// //             id: (products.length + 1).toString(),
// //             name: '',
// //             category: '',
// //             price: 0,
// //             quantity: 0,
// //             date: '',
// //             photo: '',
// //           });
// //           setModalOpen(true);
// //         }}
// //         className="px-4 py-2 bg-indigo-950 rounded-md  mb-4 hover: m-2 border rounded-md bg-indigo-800  text-white"
// //       >
// //         Add Product
// //       </button>

// //       <ProductTable
// //         products={currentProducts}
// //         onDelete={handleDelete}
// //         onEdit={handleEdit}
// //         currentPage={currentPage}
// //         totalPages={totalPages}
// //         onPreviousPage={handlePreviousPage}
// //         onNextPage={handleNextPage}
// //       />

// //       <div className="flex justify-center items-center mt-4">
// //         <button
// //           onClick={handlePreviousPage}
// //           disabled={currentPage === 1}
// //           className="bg-gray-200 px-3 py-1 rounded-md mr-2"
// //         >
// //           Previous
// //         </button>
// //         <span className="text-gray-700">
// //           Page {currentPage} of {totalPages}
// //         </span>
// //         <button
// //           onClick={handleNextPage}
// //           disabled={currentPage === totalPages}
// //           className="bg-gray-200 px-3 py-1 rounded-md ml-2"
// //         >
// //           Next
// //         </button>
// //       </div>

// //       {deleteConfirmation && (
// //         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
// //           <div className="bg-white p-6 rounded-md w-96">
// //             <p>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</p>
// //             <button
// //               onClick={() => {
// //                 const updatedProducts = products.filter(
// //                   (product) => product.id !== deleteConfirmation
// //                 );
// //                 setProducts(updatedProducts);
// //                 setDeleteConfirmation(null);
// //               }}
// //               className="yes px-4 py-2 rounded-md mr-2 hover:bg-red-700"
// //             >
// //               Yes
// //             </button>
// //             <button
// //               onClick={() => setDeleteConfirmation(null)}
// //               className="cancel px-4 py-2 rounded-md hover:bg-gray-400"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {modalOpen && (
// //         <ProductModal
// //           product={selectedProduct}
// //           onClose={() => {
// //             setModalOpen(false);
// //             setSelectedProduct(null);
// //           }}
// //           onSave={(editedProduct) => {
// //             if (selectedProduct) {
// //               // Editing existing product
// //               handleEdit(editedProduct);
// //             } else {
// //               // Adding new product
// //               handleAdd(editedProduct);
// //             }
// //             setModalOpen(false);
// //             setSelectedProduct(null);
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductList;














// // import React, { useState } from 'react';
// // import ProductTable from '../components/ProductTable';
// // import ProductModal from '../components/ProductModal';
// // import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

// // import '../styles/productList.css';

// // interface Product {
// //   id: string;
// //   name: string;
// //   category: string;
// //   price: number;
// //   quantity: number;
// //   date: string;
// //   photo: string;
// // }

// // const ProductList: React.FC = () => {
// //   const [products, setProducts] = useState<Product[]>([

// //     {
// //       id: '1',
// //       name: 'Product 1',
// //       category: 'Category A',
// //       price: 10,
// //       quantity: 5,
// //       date: '2024-01-30',
// //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// //     },
// //     {
// //       id: '2',
// //       name: 't-shirt',
// //       category: 'cloth',
// //       price: 10,
// //       quantity: 5,
// //       date: '2024-01-30',
// //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// //     },
// //     {
// //       id: '3',
// //       name: 'iphone',
// //       category: 'Electronics',
// //       price: 10,
// //       quantity: 5,
// //       date: '2024-01-30',
// //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// //     },
// //     {
// //       id: '4',
// //       name: 'sofa',
// //       category: 'Furniture',
// //       price: 10,
// //       quantity: 5,
// //       date: '2024-01-30',
// //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// //     },
// //     {
// //       id: '6',
// //       name: 'sofa',
// //       category: 'Furniture',
// //       price: 10,
// //       quantity: 5,
// //       date: '2024-01-30',
// //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// //     },

// //     // Your initial products
// //   ]);

// //   const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// //   // Initialize your products array
// //   const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
// //   const [filter, setFilter] = useState({ name: '', category: '', date: '' });
// //   const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: string } | null>(null);
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const PAGE_SIZE = 5;


// //   const handlePreviousPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(currentPage - 1);
// //     }
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     }
// //   };

// //   const handleSort = (field: keyof Product) => {
// //     let direction = 'asc';

// //     if (sortConfig && sortConfig.key === field && sortConfig.direction === 'asc') {
// //       direction = 'desc';
// //     }

// //     setSortConfig({ key: field, direction });
// //     const sorted = [...products].sort((a, b) => {
// //       if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
// //       if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
// //       return 0;
// //     });

// //     setSortedProducts(sorted);
// //   };

// //   const getSortIcon = (field: keyof Product) => {
// //     if (!sortConfig || sortConfig.key !== field) {
// //       return <FaSort />;
// //     }

// //     return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
// //   };

// //   const handleFilter = () => {
// //     const filtered = products.filter(
// //       (product) =>
// //         product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
// //         product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
// //         product.date.includes(filter.date)
// //     );
// //     setSortedProducts(filtered);
// //   };
// //   const startIndex = (currentPage - 1) * PAGE_SIZE;
// //   const endIndex = startIndex + PAGE_SIZE;

// //   // Slice the products array based on the current page
// //   const currentProducts = sortedProducts.slice(startIndex, endIndex);

// //   // Calculate the total number of pages
// //   const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);

// //   const handleDelete = (id: string) => {
// //     setDeleteConfirmation(id);
// //   };

// //   const handleEdit = (editedProduct: Product) => {
// //     const updatedProducts = products.map((product) =>
// //       product.id === editedProduct.id ? editedProduct : product
// //     );
// //     setProducts(updatedProducts);
// //   };

// //   const handleAdd = (newProduct: Product) => {
// //     // For simplicity, generating a unique ID here (you may use a more robust method)
// //     const id = (products.length + 1).toString();
// //     const updatedProducts = [...products, { ...newProduct, id }];
// //     setProducts(updatedProducts);
// //   };

// //   return (
// //     <div className="container mx-auto p-6 block">
// //       <h1 className="text-3xl font-bold mb-6">Product List Page</h1>

// //       <button
// //         onClick={() => {
// //           setSelectedProduct({
// //             id: (products.length + 1).toString(),
// //             name: '',
// //             category: '',
// //             price: 0,
// //             quantity: 0,
// //             date: '',
// //             photo: '',
// //           });
// //           setModalOpen(true);
// //         }}
// //         className="px-4 py-2 bg-indigo-950 rounded-md  mb-4 hover: m-2 border rounded-md bg-indigo-800  text-white"
// //       >
// //         Add Product
// //       </button>

// //       {/* <ProductTable
// //         products={products}
// //         onDelete={handleDelete}
// //         onEdit={handleEdit}
// //         // Pass any additional props if needed
// //       /> */}
// //        <ProductTable
// //         products={currentProducts}
// //         onDelete={handleDelete}
// //         onEdit={handleEdit}
// //         currentPage={currentPage}
// //         totalPages={totalPages}
// //         onPreviousPage={handlePreviousPage}
// //         onNextPage={handleNextPage}
// //       />
// //        <div className="flex justify-center items-center mt-4">
// //         <button
// //           onClick={handlePreviousPage}
// //           disabled={currentPage === 1}
// //           className="bg-gray-200 px-3 py-1 rounded-md mr-2"
// //         >
// //           Previous
// //         </button>
// //         <span className="text-gray-700">
// //           Page {currentPage} of {totalPages}
// //         </span>
// //         <button
// //           onClick={handleNextPage}
// //           disabled={currentPage === totalPages}
// //           className="bg-gray-200 px-3 py-1 rounded-md ml-2"
// //         >
// //           Next
// //         </button>
// //       </div>

// //       {deleteConfirmation && (
// //         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
// //           <div className="bg-white p-6 rounded-md w-96">
// //             <p>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</p>
// //             <button
// //               onClick={() => {
// //                 const updatedProducts = products.filter(
// //                   (product) => product.id !== deleteConfirmation
// //                 );
// //                 setProducts(updatedProducts);
// //                 setDeleteConfirmation(null);
// //               }}
// //               className="yes px-4 py-2 rounded-md mr-2 hover:bg-red-700"
// //             >
// //               Yes
// //             </button>
// //             <button
// //               onClick={() => setDeleteConfirmation(null)}
// //               className="cancel px-4 py-2 rounded-md hover:bg-gray-400"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {modalOpen && (
// //         <ProductModal
// //           product={selectedProduct}
// //           onClose={() => {
// //             setModalOpen(false);
// //             setSelectedProduct(null);
// //           }}
// //           onSave={(editedProduct) => {
// //             if (selectedProduct) {
// //               // Editing existing product
// //               handleEdit(editedProduct);
// //             } else {
// //               // Adding new product
// //               handleAdd(editedProduct);
// //             }
// //             setModalOpen(false);
// //             setSelectedProduct(null);
// //           }}
// //           // Pass any additional props if needed
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductList;




// // // import React, { useState } from 'react';
// // // import ProductTable from '../components/ProductTable';
// // // import ProductModal from '../components/ProductModal';

// // // import '../styles/productList.css'
// // // interface Product {
// // //   id: string;
// // //   name: string;
// // //   category: string;
// // //   price: number;
// // //   quantity: number;
// // //   date: string;
// // //   photo: string;
// // // }

// // // const ProductList: React.FC = () => {
// // //   const [products, setProducts] = useState<Product[]>([
// // //     {
// // //       id: '1',
// // //       name: 'Product 1',
// // //       category: 'Category A',
// // //       price: 10,
// // //       quantity: 5,
// // //       date: '2024-01-30',
// // //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// // //     },
// // //     {
// // //       id: '2',
// // //       name: 't-shirt',
// // //       category: 'cloth',
// // //       price: 10,
// // //       quantity: 5,
// // //       date: '2024-01-30',
// // //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// // //     },
// // //     {
// // //       id: '3',
// // //       name: 'iphone',
// // //       category: 'Electronics',
// // //       price: 10,
// // //       quantity: 5,
// // //       date: '2024-01-30',
// // //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// // //     },
// // //     {
// // //       id: '4',
// // //       name: 'sofa',
// // //       category: 'Furniture',
// // //       price: 10,
// // //       quantity: 5,
// // //       date: '2024-01-30',
// // //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// // //     },
// // //     {
// // //       id: '6',
// // //       name: 'sofa',
// // //       category: 'Furniture',
// // //       price: 10,
// // //       quantity: 5,
// // //       date: '2024-01-30',
// // //       photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', // Example photo URL
// // //     },
    
// // //     // Add more initial products as needed
// // //   ]);

// // //   const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// // //   const [nightMode, setNightMode] = useState(false);

// // //   const handleDelete = (id: string) => {
// // //     setDeleteConfirmation(id);
// // //   };

// // //   const handleEdit = (editedProduct: Product) => {
// // //     const updatedProducts = products.map((product) =>
// // //       product.id === editedProduct.id ? editedProduct : product
// // //     );
// // //     setProducts(updatedProducts);
// // //   };

// // //   const handleAdd = (newProduct: Product) => {
// // //     // For simplicity, generating a unique ID here (you may use a more robust method)
// // //     const id = (products.length + 1).toString();
// // //     const updatedProducts = [...products, { ...newProduct, id }];
// // //     setProducts(updatedProducts);
// // //   };

// // //   const handleNightModeToggle = () => {
// // //     setNightMode(!nightMode);
// // //   };

// // //   return (
// // //     <div className={`container mx-auto p-6 ${nightMode ? 'bg-gray-900 text-white' : ''} block`}> 
// // //       <h1 className="text-3xl font-bold mb-6">Product List Page</h1>

// // //       <button
// // //         onClick={() => {
// // //           setSelectedProduct({
// // //             id: (products.length + 1).toString(),
// // //             name: '',
// // //             category: '',
// // //             price: 0,
// // //             quantity: 0,
// // //             date: '',
// // //             photo: '',
// // //           });
// // //           setModalOpen(true);
// // //         }}
// // //         className={` night px-4 py-2 rounded-md mb-4 ${
// // //           nightMode ? ' hover:bg-gray-950' : ' hover:bg-gray-400'
// // //         }`}
// // //       >
// // //         Add Product
// // //       </button>

// // //       <ProductTable
// // //         products={products}
// // //         onDelete={handleDelete}
// // //         onEdit={handleEdit}
// // //         nightMode={nightMode}
// // //       />

// // //       {deleteConfirmation && (
// // //         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
// // //           <div className="bg-white p-6 rounded-md w-96">
// // //             <p>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</p>
// // //             <button
// // //               onClick={() => {
// // //                 const updatedProducts = products.filter(
// // //                   (product) => product.id !== deleteConfirmation
// // //                 );
// // //                 setProducts(updatedProducts);
// // //                 setDeleteConfirmation(null);
// // //               }}
// // //               className={`yes px-4 py-2 rounded-md mr-2 ${
// // //                 nightMode ? 'hover:bg-red-600' : 'hover:bg-red-700'
// // //               }`}
// // //             >
// // //               Yes
// // //             </button>
// // //             <button
// // //               onClick={() => setDeleteConfirmation(null)}
// // //               className={`cancel px-4 py-2 rounded-md hover:bg-gray-400`}
// // //             >
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {modalOpen && (
// // //         <ProductModal
// // //           product={selectedProduct}
// // //           onClose={() => {
// // //             setModalOpen(false);
// // //             setSelectedProduct(null);
// // //           }}
// // //           onSave={(editedProduct) => {
// // //             if (selectedProduct) {
// // //               // Editing existing product
// // //               handleEdit(editedProduct);
// // //             } else {
// // //               // Adding new product
// // //               handleAdd(editedProduct);
// // //             }
// // //             setModalOpen(false);
// // //             setSelectedProduct(null);
// // //           }}
// // //           nightMode={nightMode}
// // //         />
// // //       )}

// // //       <div className="fixed bottom-4 right-4">
// // //         <button
// // //           onClick={handleNightModeToggle}
// // //           className={`bg-gray-500 text-white px-4 py-2 rounded-md ${
// // //             nightMode ? 'hover:bg-gray-600' : 'hover:bg-gray-700'
// // //           }`}
// // //         >
// // //           {nightMode ? 'Day Mode' : 'Night Mode'}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductList;