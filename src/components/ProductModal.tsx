import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
  photo: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (editedProduct: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product>({
    id: '',
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    date: '',
    photo: '',
  });

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

 
  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setEditedProduct((prevProduct) => ({ ...prevProduct, photo: event.target.result.toString() }));
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
            value={editedProduct.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={editedProduct.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date:</label>
          <input
            type="text"
            name="date"
            value={editedProduct.date}
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
            {editedProduct.photo ? (
              <img src={editedProduct.photo} alt={`Category ${editedProduct.name}`} 
              className="w-16 h-16 rounded-md object-cover" />
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
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700"
        >
          Cancel
        </button>
        </div>
      </div>
    
  );
};

export default ProductModal;





