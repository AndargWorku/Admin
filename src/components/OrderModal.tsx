

import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
  photo: string;
}

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
  onSave: (editedProduct: Order) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState<Order>({
    id: '',
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    date: '',
    photo: '',
  });

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (order) {
      setEditedOrder(order);
      calculateTotalPrice(order.price, order.quantity);
    }
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
    if (name === 'quantity' || name === 'price') {
      calculateTotalPrice(
        name === 'price' ? parseFloat(value) : editedOrder.price,
        name === 'quantity' ? parseInt(value) : editedOrder.quantity
      );
    }
  };

  const calculateTotalPrice = (price: number, quantity: number) => {
    const newTotalPrice = price * quantity;
    setTotalPrice(newTotalPrice);
  };

  const handleSave = () => {
    onSave(editedOrder);
  };

  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setEditedOrder((prevOrder) => ({ ...prevOrder, photo: event.target.result.toString() }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={editedOrder.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={editedOrder.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={editedOrder.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={editedOrder.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date:</label>
          <input
            type="text"
            name="date"
            value={editedOrder.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Photo:</label>
          <div
            className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
            onDrop={handlePhotoDrop}
            onDragOver={handleDragOver}
          > 
            {editedOrder.photo ? (
              <img src={editedOrder.photo} alt={`Category ${editedOrder.name}`}
               className="w-16 h-16 rounded-md object-cover" />
            ) : (
              <p className="text-gray-500 text-center">Drag & Drop a photo here</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Total Price:</label>
          <input
            type="text"
            name="totalPrice"
            value={totalPrice.toFixed(2)}
            className="w-full p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-800"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderModal;



