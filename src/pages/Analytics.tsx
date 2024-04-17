
// Install dependencies:
// npm install react-chartjs-2 chart.js

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import '../styles/analytics.css'
const AnalyticsPage: React.FC = () => {
  // Sample data
  const customerReviewData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','jun','agu','sep','oct','nov','dec'],
    datasets: [
      {
        label: 'Customer Reviews',
        data: [5, 70, 100, 8, 12, 15,98,78,5,56,37,99],
        borderColor: '#37305A',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','jun','agu','sep','oct','nov','dec'],
    datasets: [
      {
        label: 'Orders',
        data: [20, 25, 18, 30, 22, 28,40,50,30,70,80,34],
        backgroundColor: '#F26A8D',
        borderColor: '#37305A',
        borderWidth: 2,
      },
    ],
  };

  const productsData = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5','Category 6','Category 7','Category 8','Category 9','Category 10'],
    datasets: [
      {
        label: 'Products',
        data: [50, 75, 60, 45, 80,90,50,70,30,90],
        backgroundColor: '#37305A',
        borderColor: '#37305A',
        borderWidth: 2,
        
      },
    ],
  };

  return (
    <>
    <h2 className='text-black font-semibold text-2xl mb-16'>Analytics page</h2>

    <div className="col-span-4 md:col-span-2 lg:col-span-1 flex justify-between gap-8 mb-20 ">
          <div className="card1 p-4 rounded-lg shadow-lg flex-1 mr-4">
            <h2 className="text-xl font-bold mb-4">Total Sales</h2>
            <p className="text-4xl font-bold">$12,345</p>
          </div>
                {/* <div className='gap-8 col-span-3 md:col-span-2 lg:col-span-1 flex justify-between w-48'> */}
          <div className=" card2 p-4 rounded-lg shadow-lg flex-1 mr-4">
            <h2 className="text-xl font-bold mb-4">Total Revenue</h2>
            <p className="text-4xl font-bold">$9,876</p>
          </div>



          <div className="card1 p-4 rounded-lg shadow-lg flex-1 mr-4">
            <h2 className="text-xl font-bold mb-4">Total Products</h2>
            <p className="text-4xl font-bold">310</p>
          </div>


          <div className="card2 p-4 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-bold mb-4">Total Orders</h2>
            <p className="text-4xl font-bold">98</p>
          </div>
          {/* <div className="bg-white p-4 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-bold mb-4">Total Categories</h2>
            <p className="text-4xl font-bold">15</p>
          </div> */}
          {/* </div> */}
        </div>
    <div className="container mx-auto my-8 ">
      
      <div className=" chart grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-screen">
        {/* Customer Reviews Chart */}
        <div className="customer bg-white p-4 rounded-lg shadow-lg ">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <Line data={customerReviewData} />
        </div>

        {/* Orders Chart */}
        <div className="orders bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Orders</h2>
          <Bar data={ordersData} />
        </div>

        {/* Products Chart */}
        <div className=" product bg-white p-4 rounded-lg shadow-lg ">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <Bar data={productsData} />
        </div>


      </div>
    </div>
    </>
  );
};

export default AnalyticsPage;
