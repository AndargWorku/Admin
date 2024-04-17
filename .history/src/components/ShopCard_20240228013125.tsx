// src/components/ShopCard.tsx

import React from 'react';

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    description: string;
    shopUrl: string;
    permissionName: string;
    picture: string;
  };
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <div className="shop-card" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
      <img src={shop.picture} alt={shop.name} />
      <h3>{shop.name}</h3>
      <p>{shop.description}</p>
      <a href={shop.shopUrl} target="_blank" rel="noopener noreferrer">
        Visit Shop
      </a>
    </div>
  );
};

export default ShopCard;
